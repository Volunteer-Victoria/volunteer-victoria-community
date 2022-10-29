export ENV_NAME ?= dev
export PROJECT_NAME ?= vvc
export TF_WORKSPACE ?= $(PROJECT_NAME)-$(ENV_NAME)

NAMESPACE = $(ENV_NAME)-$(PROJECT_NAME)
TF_DIR = terraform
BACKEND_WORKSPACE = "@volunteer-victoria/community-backend"
BACKEND_DIR = "./packages/backend"
APP_SRC_BUCKET = $(NAMESPACE)-app-dist

define TFVARS_DATA
env_name = "$(ENV_NAME)"
project_name = "$(PROJECT_NAME)"
domain = "$(ENV_NAME).vvc.sonnex.name"
cert_domain = "vvc.sonnex.name"
app_sources_bucket = "$(APP_SRC_BUCKET)"
endef
export TFVARS_DATA

backend-package:
	rm -r $(BACKEND_DIR)/dist || true
	yarn workspace $(BACKEND_WORKSPACE) build
	yarn workspaces focus $(BACKEND_WORKSPACE) --production 
	mv node_modules $(BACKEND_DIR)/dist/.
	cd $(BACKEND_DIR)/dist && zip -qr api-lambda.zip *
	mv $(BACKEND_DIR)/dist/api-lambda.zip ./terraform/.

tf-write-config:
	@echo "$$TFVARS_DATA" > $(TF_DIR)/.auto.tfvars

tf-init:
	terraform -chdir=$(TF_DIR) init

tf-plan: tf-write-config
	terraform -chdir=$(TF_DIR) plan

tf-apply: tf-write-config 
	terraform -chdir=$(TF_DIR) apply -auto-approve -input=false
