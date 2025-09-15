import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger @ /docs (safe even if you later add a global prefix)
  const config = new DocumentBuilder()
    .setTitle("Resource Tracker API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: { persistAuthorization: true },
    // If you do app.setGlobalPrefix('api') later and want /api/docs, set:
    // useGlobalPrefix: true,
  });

  // Health is at /health; projects at /projects
  await app.listen(3000, "0.0.0.0");
}
void bootstrap();
