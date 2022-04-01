import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { HttpResponseInterceptor } from './common/http-response.interceptor';

declare const module: any;

async function bootstrap() {
  const logger = new Logger();

  let httpsOptions;
  try {
    httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/jaksim.app/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/jaksim.app/cert.pem'),
    };
  } catch { }

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('JakSim API ')
    .addTag('Auth')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'accessToken',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port);

  logger.log(`http Server is started on port ${port}`);
}
bootstrap();
