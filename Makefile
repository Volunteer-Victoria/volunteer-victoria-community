export ENV_NAME ?= dev
export PROJECT_NAME ?= vvc
export TF_WORKSPACE ?= $(PROJECT_NAME)-$(ENV_NAME)

NAMESPACE = $(PROJECT_NAME)-$(ENV_NAME)
TF_DIR = terraform
BACKEND_WORKSPACE = "@volunteer-victoria/community-backend"
BACKEND_BUILD_DIR = "./packages/backend/dist"
FRONTEND_WORKSPACE = "@volunteer-victoria/community-frontend"
FRONTEND_BUILD_DIR = "./packages/frontend/dist"
APP_SRC_BUCKET = $(NAMESPACE)-app-dist
TARGET_ARCH = arm64
CLOUDFRONT_ID = E2V91EEXG7I3BC
AUTH0_ISSUER_URL = https://dev-71ee1qantl30gloi.us.auth0.com/
AUTH0_AUDIENCE = https://dev.vvc.sonnex.name/api

define TFVARS_DATA
env_name = "$(ENV_NAME)"
project_name = "$(PROJECT_NAME)"
domain = "$(ENV_NAME).vvc.sonnex.name"
cert_domain = "vvc.sonnex.name"
app_sources_bucket = "$(APP_SRC_BUCKET)"
target_arch = "$(TARGET_ARCH)"

auth0_issuer_url = "$(AUTH0_ISSUER_URL)"
auth0_audience = "$(AUTH0_AUDIENCE)"
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

frontend-build:
	rm -r $(FRONTEND_BUILD_DIR) || true
	yarn workspaces focus $(FRONTEND_WORKSPACE)
	yarn workspace $(FRONTEND_WORKSPACE) build
	mv $(FRONTEND_BUILD_DIR) ./terraform/app-dist

frontend-deploy:
	aws s3 sync ./terraform/app-dist s3://$(APP_SRC_BUCKET) --delete
	aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"

api-client-generate:
	yarn workspace $(BACKEND_WORKSPACE) export:openapi
	yarn openapi generate -i openapi.yml -g typescript-fetch -o ./packages/frontend/src/api

tf-write-config:
	@echo "$$TFVARS_DATA" > $(TF_DIR)/.auto.tfvars

tf-init:
	terraform -chdir=$(TF_DIR) init

tf-plan: tf-write-config
	terraform -chdir=$(TF_DIR) plan

tf-apply: tf-write-config 
	terraform -chdir=$(TF_DIR) apply -auto-approve -input=false
