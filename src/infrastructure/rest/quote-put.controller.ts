import { Body, Controller, HttpCode, Inject, Param, Put } from '@nestjs/common';
import { QuoteCreator } from '../../application/quote-creator/quote-creator';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../use-case-proxy/use-case-proxy';
import { QuotePutBodyDto } from './dto/quote-put.dto';

@Controller('/api/quote')
export class QuotePutController {
  constructor(
    @Inject(ProxyServicesDynamicModule.QUOTE_CREATOR_PROXY_SERVICE) private readonly quoteCreator: UseCaseProxy<QuoteCreator>,
  ) {}

  @Put('/:id')
  @HttpCode(201)
  async findQuote(@Param('id') id: string, @Body() body: QuotePutBodyDto): Promise<void> {
    return this.quoteCreator.getInstance().execute({ id, text: body.text });
  }
}
