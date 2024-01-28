import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpException, Logger, ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import * as compression from "compression";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigKey } from "./config/config";
import { HttpExceptionFilter } from "./utils/http-exception.filter";
import rateLimit from "express-rate-limit";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("bootstrap");

  // configs
  const configService = app.get(ConfigService);
  const { port, env, appName, prefix } = configService.get(ConfigKey.App);

  // middlewares
  app.enableCors({ origin: "*" });
  app.setGlobalPrefix(prefix);

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    handler: (req, res, next) => {
      throw new HttpException("Rate limit exceeded", 429); // 429 - Too Many Requests
    },
  });
  app.use(limiter);

  // Security headers
  app.use(helmet());
  app.use(compression());

  // Validation pipe
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  // Swagger
  const options = new DocumentBuilder()
    .setTitle(appName)
    .setDescription("Nest.js Auth Module")
    .setVersion("1.0")
    .addTag("Auth Module")
    .addBearerAuth({ type: "http", scheme: "bearer" })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("", app, document);

  await app.listen(port);
  logger.log(`App running in ${env} mode! Listening on port ${port}`);
}
bootstrap();
