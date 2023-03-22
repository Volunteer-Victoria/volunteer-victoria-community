locals {
  api_name = "${local.namespace}-api"
}

resource "aws_lambda_function" "api" {
  description      = "API for ${local.namespace}"
  function_name    = local.api_name
  role             = aws_iam_role.api_lambda.arn
  runtime          = "nodejs16.x"
  filename         = "api-lambda.zip"
  source_code_hash = filebase64sha256("api-lambda.zip")
  handler          = "api-lambda.handler"
  memory_size      = 768
  timeout          = 10
  architectures    = [var.target_arch]
  publish          = true

  depends_on = [
    aws_cloudwatch_log_group.api_lambda,
  ]

  environment {
    variables = {
      API_URL = "https://${var.domain}/api/v1"

      DB_DATABASE = "api"
      DB_USERNAME = "api"
      DB_PORT     = "26257"
      DB_HOST     = data.aws_ssm_parameter.cdb_host.value

      // TODO need to fetch properly from inside lambda so this doesn't leak into tfstate
      DB_PASSWORD = data.aws_ssm_parameter.cdb_password.value

      AUTH0_ISSUER_URL  = var.auth0_issuer_url
      AUTH0_AUDIENCE    = var.auth0_audience
      AUTH0_CLIENT_ID   = var.auth0_client_id

      EMAIL_DOMAIN = var.domain
    }
  }
}

resource "aws_lambda_alias" "api" {
  name             = "latest"
  function_name    = aws_lambda_function.api.arn
  function_version = aws_lambda_function.api.version
}

resource "aws_lambda_provisioned_concurrency_config" "api" {
  count = local.is_prod ? 1 : 0
  function_name = aws_lambda_function.api.function_name
  provisioned_concurrent_executions = 1
  qualifier = aws_lambda_alias.api.name
}

data "aws_ssm_parameter" "cdb_host" {
  name = "${local.namespace}-cdb-host"
}

data "aws_ssm_parameter" "cdb_password" {
  name = "${local.namespace}-cdb-password"
}

resource "aws_cloudwatch_log_group" "api_lambda" {
  name              = "/aws/lambda/${local.api_name}"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "api_gateway" {
  name              = "/aws/api-gateway/${local.api_name}"
  retention_in_days = 14
}

resource "aws_apigatewayv2_api" "api" {
  name          = local.api_name
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "api" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "AWS_PROXY"
  connection_type    = "INTERNET"
  description        = local.api_name
  integration_method = "POST"
  integration_uri    = aws_lambda_alias.api.invoke_arn
}

resource "aws_apigatewayv2_route" "api" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.api.id}"
}

locals {
  api_gateway_log_format_with_newlines = <<EOF
{ 
"requestId":"$context.requestId",
"ip":"$context.identity.sourceIp",
"requestTime":"$context.requestTime",
"httpMethod":"$context.httpMethod",
"status":"$context.status",
"path":"$context.path",
"responseLength":"$context.responseLength",
"errorMessage":"$context.error.message"
}
EOF

  api_gateway_log_format = replace(local.api_gateway_log_format_with_newlines, "\n", "")
}

resource "aws_apigatewayv2_stage" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway.arn
    format          = local.api_gateway_log_format
  }
}

resource "aws_lambda_permission" "api_allow_gateway" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_alias.api.function_name
  qualifier     = aws_lambda_alias.api.name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_stage.api.execution_arn}/*"
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
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = [
          "arn:aws:logs:${var.region}:${local.aws_account_id}:log-group:/aws/lambda/${local.api_name}:*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ],
        Resource = "*"
      }
    ]
  })
}
