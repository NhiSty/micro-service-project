import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  public heroes = [];
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('HelloService')
  sayHello(req) {
    const name = req.name;
    return {
      message: `Hello ${name}`,
    };
  }

  @GrpcMethod('HeroCRUDService')
  Create(req) {
    const hero = {
      power: req.power,
      name: req.name,
      id: this.heroes.length + 1,
      hp: 100,
    };

    this.heroes.push(hero);
    return { hero };
  }
}
