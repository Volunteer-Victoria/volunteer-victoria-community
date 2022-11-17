data "aws_sns_topic" "alerts" {
  name = "developer-alerts"
}

resource "aws_cloudwatch_metric_alarm" "api-http-500s" {
  alarm_name                = "${local.api_name}-too-many-500s"
  comparison_operator       = "GreaterThanOrEqualToThreshold"
  evaluation_periods        = "1"
  metric_name               = "5xx"
  namespace                 = "AWS/ApiGateway"
  dimensions = {
    ApiId = aws_apigatewayv2_api.api.id
  }
  period                    = "${60 * 20}"
  statistic                 = "Maximum"
  threshold                 = "1"
  alarm_description         = "Have any 500s occurred in the past 20 minutes"
  insufficient_data_actions = []

  alarm_actions       = [data.aws_sns_topic.alerts.arn]
  ok_actions          = [data.aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "api-http-400s" {
  alarm_name                = "${local.api_name}-too-many-400s"
  comparison_operator       = "GreaterThanThreshold"
  evaluation_periods        = "1"
  metric_name               = "4xx"
  namespace                 = "AWS/ApiGateway"
  dimensions = {
    ApiId = aws_apigatewayv2_api.api.id
  }
  period                    = "${60 * 20}"
  statistic                 = "Average"
  threshold                 = "0.05"
  alarm_description         = "Have more than 5% of requests been 400s in the past 20 minutes"
  insufficient_data_actions = []
  
  alarm_actions       = [data.aws_sns_topic.alerts.arn]
  ok_actions          = [data.aws_sns_topic.alerts.arn]
}

