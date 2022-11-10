export ENV_NAME ?= dev
export PROJECT_NAME ?= vvc
export TF_WORKSPACE ?= $(PROJECT_NAME)-$(ENV_NAME)

NAMESPACE = $(ENV_NAME)-$(PROJECT_NAME)
TF_DIR = terraform
BACKEND_WORKSPACE = "@volunteer-victoria/community-backend"
BACKEND_BUILD_DIR = "./packages/backend/dist"
FRONTEND_WORKSPACE = "@volunteer-victoria/community-frontend"
FRONTEND_BUILD_DIR = "./packages/frontend/dist"
APP_SRC_BUCKET = $(NAMESPACE)-app-dist
TARGET_ARCH = arm64

define TFVARS_DATA
env_name = "$(ENV_NAME)"
project_name = "$(PROJECT_NAME)"
domain = "$(ENV_NAME).vvc.sonnex.name"
cert_domain = "vvc.sonnex.name"
app_sources_bucket = "$(APP_SRC_BUCKET)"
target_arch = "$(TARGET_ARCH)"
endef
export TFVARS_DATA

backend-build:
	rm -r $(BACKEND_BUILD_DIR) || true
	yarn workspace $(BACKEND_WORKSPACE) build
	npm_config_target_arch=$(TARGET_ARCH) yarn workspaces focus $(BACKEND_WORKSPACE) --production 
	mv node_modules $(BACKEND_BUILD_DIR)/.
	cd $(BACKEND_BUILD_DIR) && zip -qr api-lambda.zip *
	mv $(BACKEND_BUILD_DIR)/api-lambda.zip ./terraform/.

frontend-build:
	rm -r $(FRONTEND_BUILD_DIR) || true
	yarn workspace $(FRONTEND_WORKSPACE) build
	mv $(FRONTEND_BUILD_DIR) ./terraform/app-dist

frontend-deploy:
	aws s3 sync ./terraform/app-dist s3://$(APP_SRC_BUCKET) --delete

api-schema-generate:
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
