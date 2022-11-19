
package-lambda:
	rm -r dist || true
	yarn build
	yarn webpack:lambda
	cd dist/webpacked && zip -qr api-lambda.zip *
	mv dist/webpacked/api-lambda.zip dist/api-lambda.zip
