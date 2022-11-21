export ENV_NAME ?= dev
export PROJECT_NAME ?= vvc
export TF_WORKSPACE ?= $(PROJECT_NAME)-$(ENV_NAME)

NAMESPACE = $(PROJECT_NAME)-$(ENV_NAME)
TF_DIR = terraform
BACKEND_WORKSPACE = "@volunteer-victoria/community-backend"
BACKEND_BUILD_DIR = "./packages/backend/dist"
API_LAMBDA_ZIP_PATH = $(BACKEND_BUILD_DIR)/api-lambda.zip
FRONTEND_WORKSPACE = "@volunteer-victoria/community-frontend"
FRONTEND_BUILD_DIR = "./packages/frontend/dist"
APP_SRC_BUCKET = $(NAMESPACE)-app-dist
TARGET_ARCH = arm64
CERT_DOMAIN = community.volunteervictoria.bc.ca
DOMAIN = $(ENV_NAME).$(CERT_DOMAIN)

AUTH0_ISSUER_URL = https://dev-71ee1qantl30gloi.us.auth0.com/
AUTH0_AUDIENCE = https://$(DOMAIN)/api
AUTH0_CLIENT_ID = gWVmaB2m8JYW7QeJeLgAscP0SWdLgKj6

# Front-end build parameters
export REACT_APP_AUTH0_AUDIENCE = $(AUTH0_AUDIENCE)
export REACT_APP_API_BASE_PATH = https://$(DOMAIN)

ifeq ($(ENV_NAME), dev)
CLOUDFRONT_ID = E2V91EEXG7I3BC
endif

ifeq ($(ENV_NAME), test)
CLOUDFRONT_ID = E2DCH2Y2F2YP49
endif

define TFVARS_DATA
env_name = "$(ENV_NAME)"
project_name = "$(PROJECT_NAME)"
domain = "$(DOMAIN)"
cert_domain = "$(CERT_DOMAIN)"
app_sources_bucket = "$(APP_SRC_BUCKET)"
target_arch = "$(TARGET_ARCH)"

auth0_issuer_url = "$(AUTH0_ISSUER_URL)"
auth0_audience = "$(AUTH0_AUDIENCE)"
auth0_client_id = "$(AUTH0_CLIENT_ID)"
api_lambda_zip_path = "$(API_LAMBDA_ZIP_PATH)"
endef
export TFVARS_DATA

backend-build:
	cd $(BACKEND_BUILD_DIR)/.. && make package-lambda

backend-deploy:
	aws lambda update-function-code \
		--function-name $(NAMESPACE)-api \
		--zip-file fileb://$(API_LAMBDA_ZIP_PATH)

backend-test:
	yarn workspace $(BACKEND_WORKSPACE) test

backend-coverage:
	yarn workspace $(BACKEND_WORKSPACE) test:cov

backend-start:
	yarn workspace $(BACKEND_WORKSPACE) start

frontend-build:
	rm -r $(FRONTEND_BUILD_DIR) || true
	yarn workspaces focus $(FRONTEND_WORKSPACE)
	yarn workspace $(FRONTEND_WORKSPACE) build
	rm -r ./terraform/app-dist || true
	mv $(FRONTEND_BUILD_DIR) ./terraform/app-dist

frontend-deploy:
	aws s3 sync ./terraform/app-dist s3://$(APP_SRC_BUCKET) --delete
	aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"

frontend-start: 
	yarn workspace $(FRONTEND_WORKSPACE) start

api-client-generate:
	yarn workspace $(BACKEND_WORKSPACE) export:openapi
	rm -r ./packages/frontend/src/api || true
	yarn openapi generate -i openapi.yml -g typescript-fetch -o ./packages/frontend/src/api

tf-write-config:
	@echo "$$TFVARS_DATA" > $(TF_DIR)/.auto.tfvars

tf-init:
	terraform -chdir=$(TF_DIR) init

tf-plan: tf-write-config
	terraform -chdir=$(TF_DIR) plan

tf-apply: tf-write-config 
	terraform -chdir=$(TF_DIR) apply -auto-approve -input=false
