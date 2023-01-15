locals {
  emails_name = "${local.namespace}-emails-received"
}

resource "aws_s3_bucket" "emails_received" {
  bucket = local.emails_name
}

resource "aws_s3_bucket_acl" "emails_received" {
  bucket = aws_s3_bucket.emails_received.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "emails_received" {
  bucket = aws_s3_bucket.emails_received.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "AllowSESPuts"
        Effect = "Allow"
        Principal = {
          Service = "ses.amazonaws.com"
        }
        Action = "s3:PutObject",
        Resource = "${aws_s3_bucket.emails_received.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceAccount" = local.aws_account_id
          }
        }
      },
    ]
  })
}

resource "aws_lambda_function" "emails_received" {
  description      = "Email processor for ${local.namespace}"
  function_name    = local.emails_name
  role             = aws_iam_role.emails_received_lambda.arn
  runtime          = "nodejs16.x"
  // For now I am using the same lambda code for both, I am a lazy person I know
  filename         = "api-lambda.zip"
  source_code_hash = filebase64sha256("api-lambda.zip")
  handler          = "email-lambda.handler"
  memory_size      = 2048
  timeout          = 10
  architectures    = [var.target_arch]

  depends_on = [
    aws_cloudwatch_log_group.emails_received_lambda,
  ]
}

resource "aws_s3_bucket_notification" "emails_received" {
  bucket = aws_s3_bucket.emails_received.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.emails_received.arn
    events              = ["s3:ObjectCreated:*"]
  }

  depends_on = [aws_lambda_permission.emails_received_allow_bucket]
}

resource "aws_lambda_permission" "emails_received_allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.emails_received.arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.emails_received.arn
}

resource "aws_iam_role" "emails_received_lambda" {
  name = "${local.emails_name}-lambda"

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

resource "aws_iam_role_policy" "emails_received_lambda" {
  name = "${local.emails_name}-lambda"
  role = aws_iam_role.emails_received_lambda.id
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
          "arn:aws:logs:${var.region}:${local.aws_account_id}:log-group:/aws/lambda/${local.emails_name}:*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject"
        ]
        Resource = "${aws_s3_bucket.emails_received.arn}/*"
      }
    ]
  })
}

resource "aws_cloudwatch_log_group" "emails_received_lambda" {
  name              = "/aws/lambda/${local.emails_name}"
  retention_in_days = 14
}
