terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.36.1"
    }
  }

  cloud {
    organization = "volunteer-victoria"
  }
}

provider "aws" {
  region = var.region
}

provider "aws" {
  alias  = "global"
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}
