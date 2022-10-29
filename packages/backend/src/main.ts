import { createNestApp } from "./app";

async function bootstrap() {
  const app = await createNestApp();
  app.listen(3000);
}
bootstrap();
