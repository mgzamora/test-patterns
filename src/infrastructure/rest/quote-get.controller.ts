import { Controller, Get, Inject, Param } from '@nestjs/common';
import { QuoteFinder } from '../../application/quote-finder/quote-finder';
import { QuoteSearcher } from '../../application/quote-searcher/quote-searcher';
import { QuoteResponse } from '../../application/shared/quote-response';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../use-case-proxy/use-case-proxy';

@Controller('/api/quote')
export class QuoteGetController {
  constructor(
    @Inject(ProxyServicesDynamicModule.QUOTE_SEARCHER_PROXY_SERVICE) private readonly quoteSearcher: UseCaseProxy<QuoteSearcher>,
    @Inject(ProxyServicesDynamicModule.QUOTE_FINDER_PROXY_SERVICE) private readonly quoteFinder: UseCaseProxy<QuoteFinder>,
  ) {}

  @Get('/')
  async getAllQuoteData(): Promise<QuoteResponse[]> {
    return this.quoteSearcher.getInstance().execute();
  }

  @Get('/:id')
  async findQuote(@Param('id') id: string): Promise<QuoteResponse> {
    return this.quoteFinder.getInstance().execute(id);
  }
}
