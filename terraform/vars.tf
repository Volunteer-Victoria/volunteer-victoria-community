variable "env_name" {}
variable "project_name" {}

variable "region" {
  default = "ca-central-1"
}

locals {
  namespace = "${var.project_name}-${var.env_name}"

  api_name  = "${local.namespace}-api"
  web_name  = "${local.namespace}-web"
  db_name   = "${local.namespace}-ddb"

  aws_account_id = data.aws_caller_identity.current.account_id
}
