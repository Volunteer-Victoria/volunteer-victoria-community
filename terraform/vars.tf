variable "env_name" {}
variable "project_name" {}
variable "domain" {}

variable "target_arch" {
  default = "arm64"
}

// Not the same as domain as we might use a wildcard
variable "cert_domain" {}

variable "app_sources_bucket" {}

variable "region" {
  default = "ca-central-1"
}

locals {
  namespace = "${var.project_name}-${var.env_name}"
  aws_account_id = data.aws_caller_identity.current.account_id
}
