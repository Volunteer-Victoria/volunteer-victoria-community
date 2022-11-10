
resource "aws_dynamodb_table" "api" {
  name             = local.api_name
  billing_mode     = "PAY_PER_REQUEST"

  hash_key         = "pk"
  range_key        = "sk"

  attribute {
    name = "pk"
    type = "S"
  }
  
  attribute {
    name = "sk"
    type = "S"
  }
}
