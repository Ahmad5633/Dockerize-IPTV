import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(cors());

  setupSwagger(app);

  const port = process.env.PORT || 3000;
  await app
    .listen(port, () => {
      Logger.log(`Application running on port ${port}`);
    })
    .catch((err) => {
      Logger.error(`Error starting application: ${err}`);
      process.exit(1);
    });
}

function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('IPTV')
    .setDescription('Backend APIs of IPTV')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

bootstrap().catch((err) => {
  Logger.error(`Error starting Nest application: ${err}`);
  process.exit(1);
});
