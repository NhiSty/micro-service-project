import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  HERO_CR_UD_SERVICE_NAME,
  Hero,
  UpdateRequest,
  UpdateResponse,
} from 'src/stubs/hero/hero';

@Controller('hero')
export class HeroController {
  heroes: Hero[] = [
    {
      hp: 100,
      id: 1,
      name: 'Batman',
      power: 4,
    },
  ];

  @GrpcMethod(HERO_CR_UD_SERVICE_NAME)
  get(req: GetRequest): GetResponse {
    if (!req.id) {
      return {
        heroes: this.heroes,
      };
    }

    const hero = this.heroes.find((h) => h.id === +req.id);

    if (!hero) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Hero not found for id: ' + req.id,
      });
    }

    return {
      heroes: [hero],
    };
  }

  @GrpcMethod(HERO_CR_UD_SERVICE_NAME)
  create(req: CreateRequest): CreateResponse {
    // if (!req.name || !req.power) {
    //   return {
    //     error: 'Name and power are required',
    //   };
    // }
    const hero = {
      hp: 100,
      id: this.heroes.length + 1,
      name: req.name,
      power: req.power,
    };

    if (!hero) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Hero not found for id: ' + hero.id,
      });
    }
    this.heroes.push(hero);

    return {
      hero,
    };
  }

  @GrpcMethod(HERO_CR_UD_SERVICE_NAME)
  update(req: UpdateRequest): UpdateResponse {
    // if (!req.name || !req.power) {
    //   return {
    //     error: 'Name and power are required',
    //   };
    // }
    const updatedHero = {
      id: +req.id,
      name: req.name,
      power: req.power,
    };

    if (!updatedHero) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Hero not found for id: ' + updatedHero.id,
      });
    }

    const hero = this.heroes.find((h) => h.id === +updatedHero.id);

    if (!hero) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Hero not found for id: ' + req.id,
      });
    }

    hero.name = updatedHero.name;
    hero.power = updatedHero.power;

    return {
      hero,
    };
  }

  @GrpcMethod(HERO_CR_UD_SERVICE_NAME)
  delete(req: DeleteRequest): DeleteResponse {
    const heroToDelete = {
      id: +req.id,
    };
    const hero = this.heroes.find((h) => h.id === +heroToDelete.id);

    if (!hero) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Hero not found for id: ' + req.id,
      });
    }

    this.heroes = this.heroes.filter((hero) => hero.id !== +req.id);

    return {
      hero,
    };
  }
}
