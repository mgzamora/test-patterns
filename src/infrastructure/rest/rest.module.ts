import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { DummyController } from './dummy.controller';
import { InvalidArgumentErrorFilter } from './filters/invalid-argument-error.filter';
import { InvalidDummyErrorFilter } from './filters/invalid-dummy-error.filter';
import { MainController } from './main.controller';

@Module({
  imports: [ProxyServicesDynamicModule.register()],
  controllers: [MainController, DummyController],
  providers: [{ provide: APP_FILTER, useClass: InvalidDummyErrorFilter  },
      { provide: APP_FILTER, useClass: InvalidArgumentErrorFilter }],
})
export class RestModule {}
