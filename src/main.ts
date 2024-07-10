import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;
    await app.listen(port);

    Logger.log(`Application running on port ${port}`);
  } catch (error) {
    Logger.error(`Failed to start application`, error.stack);
    process.exit(1);
  }
}

bootstrap();
