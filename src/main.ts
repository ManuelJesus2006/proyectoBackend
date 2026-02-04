import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const getErrorMessages = (error: ValidationError): string[] => {
  const messages: string[] = [];

  if (error.constraints) {
    if (error.constraints.whitelistValidation) {
      messages.push(`The propert '${error.property}' is not valid.`);
    } else {
      messages.push(...Object.values(error.constraints));
    }
  }

  if (error.children && error.children.length > 0) {
    error.children.forEach(childError => {
      messages.push(...getErrorMessages(childError));
    });
  }

  return messages;
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: false
      },
      exceptionFactory: (errors) => {
        
        const formattedErrors = errors.map(e => getErrorMessages(e)).flat();

        return new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: formattedErrors,
          help: 'You can visit /api/v1/techProducts/docs if you are in need for help',
        });
      }
    })
  )
  const config = new DocumentBuilder()
    .setTitle('Tech Products API')
    .setDescription('Documentación de la tienda de tecnología')
    .setVersion('1.0')
    .addApiKey({ 
       type: 'apiKey', 
       name: 'api_key',
       in: 'header' 
    }, 'api_key') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/techProducts/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

