import { createNestApp } from "./app";

async function bootstrap() {
  const { nestApp } = await createNestApp();
  nestApp.listen(3000);
}
bootstrap();
