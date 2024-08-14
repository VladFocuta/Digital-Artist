import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as serveStatic from 'serve-static';
async function bootstrap() {
  /* const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
     prefix: '/uploads/',
   });*/
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/uploads', serveStatic(join(__dirname, '..', 'uploads')));
  await app.listen(8000);
}
bootstrap();
