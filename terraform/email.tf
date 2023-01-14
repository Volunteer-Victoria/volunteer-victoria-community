locals {
  email_bucket = "${local.namespace}-emails-received"
}

resource "aws_s3_bucket" "emails_received" {
  bucket = local.email_bucket
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
