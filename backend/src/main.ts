import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstratp');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  logger.log(`current env: ${process.env.NODE_ENV}`);

  if (
    process.env.NODE_ENV === 'staging' ||
    process.env.NODE_ENV === 'production'
  ) {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from ${serverConfig.origin}`);
  } else {
    logger.log(`CORS enabled for development`);
    app.enableCors();
  }

  const options = new DocumentBuilder()
    .setTitle('NEST API')
    .setDescription('The NEST API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || serverConfig.port);
  logger.log(`Application started listening to port ${serverConfig.port}`);

};

bootstrap();
