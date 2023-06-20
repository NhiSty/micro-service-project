import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { HERO_PACKAGE_NAME } from './stubs/hero/hero';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3010',
        package: ['hello', HERO_PACKAGE_NAME],
        protoPath: [
          join(__dirname, 'proto/hello/hello.proto'),
          join(__dirname, 'proto/hero/hero.proto'),
        ],
      },
    },
  );

  await app.listen();
}
bootstrap();
