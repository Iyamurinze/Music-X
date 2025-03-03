import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe ());

/* YOU CAN ENABLE THE SEEDING HERE */

  // const seedService = app.get(SeedService);
  // await seedService.seed();

 const config = new DocumentBuilder()
 .setTitle("Spotify Clone")
 .setDescription("The Spotify Clone Api documentation")
 .setVersion("1.0")
 .build();
const document = SwaggerModule.createDocument(app, config); 
SwaggerModule.setup("api", app, document);  

const configService = app.get(ConfigService);
const port = configService.get<number>('port') || 5000;  
await app.listen(port);

if (module.hot) {
 module.hot.accept();
 module.hot.dispose(() => app.close());
}
}
bootstrap();
