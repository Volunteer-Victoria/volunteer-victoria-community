export ENV_NAME ?= dev
export PROJECT_NAME ?= vvc
export TF_WORKSPACE ?= $(PROJECT_NAME)-$(ENV_NAME)

NAMESPACE = $(PROJECT_NAME)-$(ENV_NAME)
TF_DIR = terraform
BACKEND_WORKSPACE = "@volunteer-victoria/community-backend"
BACKEND_BUILD_DIR = "./packages/backend/dist"
FRONTEND_WORKSPACE = "@volunteer-victoria/community-frontend"
FRONTEND_DIR = "./packages/frontend"
FRONTEND_BUILD_DIR = "$(FRONTEND_DIR)/dist"
APP_SRC_BUCKET = $(NAMESPACE)-app-dist
TARGET_ARCH = arm64
CERT_DOMAIN = community.volunteervictoria.bc.ca

ifeq ($(ENV_NAME), dev)
DOMAIN = $(ENV_NAME).$(CERT_DOMAIN)
CLOUDFRONT_ID = E2V91EEXG7I3BC
AUTH0_CLIENT_ID = gWVmaB2m8JYW7QeJeLgAscP0SWdLgKj6
AUTH0_DOMAIN = dev-71ee1qantl30gloi.us.auth0.com
endif

ifeq ($(ENV_NAME), test)
DOMAIN = $(ENV_NAME).$(CERT_DOMAIN)
CLOUDFRONT_ID = E2DCH2Y2F2YP49
AUTH0_CLIENT_ID = QG9VBSu3MhlybYfIGhqaQMqozyS2kbpF
AUTH0_DOMAIN = volunteer-victoria-community.us.auth0.com
endif

ifeq ($(ENV_NAME), prod)
DOMAIN = $(CERT_DOMAIN)
CLOUDFRONT_ID = E2DCH2Y2F2YP49
AUTH0_CLIENT_ID = QG9VBSu3MhlybYfIGhqaQMqozyS2kbpF
AUTH0_DOMAIN = volunteer-victoria-community.us.auth0.com
endif

AUTH0_AUDIENCE = https://$(DOMAIN)/api
AUTH0_ISSUER_URL = https://$(AUTH0_DOMAIN)/

# Front-end build parameters
define FRONTEND_ENV_DATA
REACT_APP_AUTH0_AUDIENCE="$(AUTH0_AUDIENCE)"
REACT_APP_API_BASE_PATH="https://$(DOMAIN)"
REACT_APP_AUTH0_DOMAIN="$(AUTH0_DOMAIN)"
REACT_APP_AUTH0_CLIENTID="$(AUTH0_CLIENT_ID)"
endef
export FRONTEND_ENV_DATA

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
endef
export TFVARS_DATA

backend-build:
	rm -r $(BACKEND_BUILD_DIR) || true
	yarn workspaces focus $(BACKEND_WORKSPACE)
	yarn workspace $(BACKEND_WORKSPACE) build
	npm_config_target_arch=$(TARGET_ARCH) yarn workspaces focus $(BACKEND_WORKSPACE) --production 
	mv node_modules $(BACKEND_BUILD_DIR)/.
	cd $(BACKEND_BUILD_DIR) && zip -qr api-lambda.zip *
	mv $(BACKEND_BUILD_DIR)/api-lambda.zip ./terraform/.

backend-deploy:
	aws lambda update-function-code \
		--function-name $(NAMESPACE)-api \
		--zip-file fileb://terraform/api-lambda.zip

	aws lambda update-function-code \
		--function-name $(NAMESPACE)-emails-received \
		--zip-file fileb://terraform/api-lambda.zip

backend-test:
	yarn workspace $(BACKEND_WORKSPACE) test

backend-coverage:
	yarn workspace $(BACKEND_WORKSPACE) test:cov

frontend-write-env:
	@echo "$$FRONTEND_ENV_DATA" > $(FRONTEND_DIR)/.env

frontend-build: frontend-write-env
	rm -r $(FRONTEND_BUILD_DIR) || true
	yarn workspaces focus $(FRONTEND_WORKSPACE)
	yarn workspace $(FRONTEND_WORKSPACE) build
	rm -r ./terraform/app-dist || true
	mv $(FRONTEND_BUILD_DIR) ./terraform/app-dist

frontend-deploy:
	aws s3 sync ./terraform/app-dist s3://$(APP_SRC_BUCKET) --delete
	aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"

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
