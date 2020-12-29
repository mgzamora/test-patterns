import { DynamicModule, Module } from '@nestjs/common';
import { QuoteFinder } from '../../application/quote-finder';
import { RepositoriesModule } from '../repositories/repositories.module';
import { TypeOrmDatabaseQuoteRepository } from '../repositories/typeorm-database-quote.repository';
import { UseCaseProxy } from './use-case-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class ProxyServicesDynamicModule {
  static DUMMY_FINDER_PROXY_SERVICE: string = 'QuoteFinderProxyService';
  
  static register(): DynamicModule {
    return {
      module: ProxyServicesDynamicModule,
      providers: [
        {
          inject: [TypeOrmDatabaseQuoteRepository],
          provide: ProxyServicesDynamicModule.DUMMY_FINDER_PROXY_SERVICE,
          useFactory: (databaseQuoteRepository: TypeOrmDatabaseQuoteRepository) => new UseCaseProxy(new QuoteFinder(databaseQuoteRepository)),
        }
      ],
      exports: [ProxyServicesDynamicModule.DUMMY_FINDER_PROXY_SERVICE],
    };
  }
}
