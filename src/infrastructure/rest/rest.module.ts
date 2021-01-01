import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { InvalidArgumentErrorFilter } from './filters/invalid-argument-error.filter';
import { InvalidQuoteErrorFilter } from './filters/invalid-quote-error.filter';
import { QuoteNotFoundErrorFilter } from './filters/quote-not-found-error.filter';
import { MainController } from './main.controller';
import { QuoteGetController } from './quote-get.controller';

@Module({
  imports: [ProxyServicesDynamicModule.register()],
  controllers: [MainController, QuoteGetController],
  providers: [{ provide: APP_FILTER, useClass: InvalidQuoteErrorFilter  },
      { provide: APP_FILTER, useClass: InvalidArgumentErrorFilter },
      { provide: APP_FILTER, useClass: QuoteNotFoundErrorFilter }],
})
export class RestModule {}
