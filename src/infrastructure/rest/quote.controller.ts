import { Controller, Get, Inject } from '@nestjs/common';
import { QuoteFinder } from '../../application/quote-finder';
import { QuoteResponse } from '../../application/quote-response';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../use-case-proxy/use-case-proxy';

@Controller('/api/quote')
export class QuoteController {
  constructor(
    @Inject(ProxyServicesDynamicModule.DUMMY_FINDER_PROXY_SERVICE) private readonly quoteFinder: UseCaseProxy<QuoteFinder>,
  ) {}

  @Get('/')
  async getAllQuoteData(): Promise<QuoteResponse[]> {
    return this.quoteFinder.getInstance().execute();
  }
}
