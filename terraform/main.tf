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
