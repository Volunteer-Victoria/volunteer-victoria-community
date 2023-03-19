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

variable "auth0_issuer_url" {}
variable "auth0_audience" {}
variable "auth0_client_id" {}

locals {
  namespace = "${var.project_name}-${var.env_name}"
  aws_account_id = data.aws_caller_identity.current.account_id
  is_prod = var.env_name == "prod"
}
