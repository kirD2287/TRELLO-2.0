import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Trello Api')
  .setDescription('Документация REST API')
  .setVersion('1.0.0')
  .addTag('Kirill Dyachkov')
  .build()

  const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  });
}

start();
