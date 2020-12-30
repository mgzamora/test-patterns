import { Controller, Get, Inject } from '@nestjs/common';
import { QuoteSearcher } from '../../application/quote-searcher/quote-searcher';
import { QuoteResponse } from '../../application/quote-searcher/quote-response';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../use-case-proxy/use-case-proxy';

@Controller('/api/quote')
export class QuoteGetController {
  constructor(
    @Inject(ProxyServicesDynamicModule.QOUTE_SEARCHER_PROXY_SERVICE) private readonly quoteSearcher: UseCaseProxy<QuoteSearcher>,
  ) {}

  @Get('/')
  async getAllQuoteData(): Promise<QuoteResponse[]> {
    return this.quoteSearcher.getInstance().execute();
  }
}
