
package:
	rm -rf dist
	pnpm install
	pnpm build
	cd dist && zip -qr api-lambda.zip *
	mv dist/api-lambda.zip .
	pnpm install --production
	zip -urq api-lambda.zip node_modules
	mv api-lambda.zip ../../terraform/.

