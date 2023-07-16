import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {grpcConfig} from './grpc.config';
import {PrismaService} from './prisma.service';
import {ClientsModule} from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([grpcConfig])],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
