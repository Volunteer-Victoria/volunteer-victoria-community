resource "aws_lambda_function" "api" {
  description      = "API for ${local.namespace}"
  function_name    = local.api_name
  role             = aws_iam_role.api_lambda.arn
  runtime          = "nodejs16.x"
  filename         = "lambda.zip"
  source_code_hash = filebase64sha256("lambda.zip")
  handler          = "index.handler"
  memory_size      = 1024
  timeout          = 10
  architectures    = ["arm64"]
}

resource "aws_iam_role" "api_lambda" {
  name        = "${local.api_name}-lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "sts:AssumeRole"
        Principal = {
          Service = [
            "lambda.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "api_lambda" {
  name = "${local.api_name}-lambda"
  role = aws_iam_role.api_lambda.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "logs:CreateLogGroup"
        Resource = "arn:aws:logs:${var.region}:${local.aws_account_id}:*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = [
          "arn:aws:logs:${var.region}:${local.aws_account_id}:log-group:/aws/lambda/${local.api_name}:*"
        ]
      }
    ]
  })
}
