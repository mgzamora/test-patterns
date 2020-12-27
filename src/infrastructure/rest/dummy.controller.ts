import { Controller, Get, Inject } from '@nestjs/common';
import { DummyFinder } from '../../application/dummy-finder';
import { DummyResponse } from '../../application/dummy-response';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../use-case-proxy/use-case-proxy';

@Controller('/api/dummy')
export class DummyController {
  constructor(
    @Inject(ProxyServicesDynamicModule.DUMMY_FINDER_PROXY_SERVICE) private readonly dummyFinder: UseCaseProxy<DummyFinder>,
  ) {}

  @Get('/')
  async getAllDummyData(): Promise<DummyResponse[]> {
    return this.dummyFinder.getInstance().execute();
  }
}
