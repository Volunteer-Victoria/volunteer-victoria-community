
data "aws_acm_certificate" "app" {
  provider = aws.global
  domain   = var.cert_domain
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_origin_access_identity" "app" {
  comment = local.namespace
}

resource "aws_cloudfront_response_headers_policy" "api" {
  name    = local.api_name

  cors_config {
    access_control_allow_credentials = false

    access_control_allow_origins {
      items = ["localhost:3000"]
    }

    access_control_allow_methods {
      items = ["ALL"]
    }

    access_control_allow_headers {
      items = ["*"]
    }

    origin_override = true
  }
}

resource "aws_cloudfront_distribution" "app" {
  aliases = [var.domain]

  origin {
    domain_name = aws_s3_bucket.app.bucket_regional_domain_name
    origin_id   = local.app_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.app.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = trimsuffix(trimprefix(aws_apigatewayv2_stage.api.invoke_url, "https://"), "/")
    origin_id   = local.api_name

    custom_origin_config {
      http_port  = 80
      https_port = 443

      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # We only need the US/Canada
  price_class = "PriceClass_100"

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  // Serve the root (static webapp) directory uncached
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.app_name
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0
    compress    = true
  }

  // Proxy the API directly through, with no caching
  ordered_cache_behavior {
    path_pattern           = "/api/*"
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.api_name
    viewer_protocol_policy = "redirect-to-https"

    response_headers_policy_id = aws_cloudfront_response_headers_policy.api.id

    forwarded_values {
      query_string = true
      headers      = ["authorization", "user-agent", "x-forwarded-for"]
      cookies {
        forward = "all"
      }
    }

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0
    compress    = true
  }

  viewer_certificate {
    cloudfront_default_certificate = false

    acm_certificate_arn      = data.aws_acm_certificate.app.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
