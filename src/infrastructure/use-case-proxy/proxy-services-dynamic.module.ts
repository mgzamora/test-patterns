import { DynamicModule, Module } from '@nestjs/common';
import { QuoteFinder } from '../../application/quote-finder/quote-finder';
import { QuoteSearcher } from '../../application/quote-searcher/quote-searcher';
import { RepositoriesModule } from '../repositories/repositories.module';
import { TypeOrmDatabaseQuoteRepository } from '../repositories/typeorm-database-quote.repository';
import { UseCaseProxy } from './use-case-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class ProxyServicesDynamicModule {
  static QUOTE_SEARCHER_PROXY_SERVICE: string = 'QuoteSearcherProxyService';
  static QUOTE_FINDER_PROXY_SERVICE: string = 'QuoteFinderProxyService';
  
  static register(): DynamicModule {
    return {
      module: ProxyServicesDynamicModule,
      providers: [
        {
          inject: [TypeOrmDatabaseQuoteRepository],
          provide: ProxyServicesDynamicModule.QUOTE_SEARCHER_PROXY_SERVICE,
          useFactory: (databaseQuoteRepository: TypeOrmDatabaseQuoteRepository) => new UseCaseProxy(new QuoteSearcher(databaseQuoteRepository)),
        },
        {
          inject: [TypeOrmDatabaseQuoteRepository],
          provide: ProxyServicesDynamicModule.QUOTE_FINDER_PROXY_SERVICE,
          useFactory: (databaseQuoteRepository: TypeOrmDatabaseQuoteRepository) => new UseCaseProxy(new QuoteFinder(databaseQuoteRepository)),
        }
      ],
      exports: [ProxyServicesDynamicModule.QUOTE_SEARCHER_PROXY_SERVICE, ProxyServicesDynamicModule.QUOTE_FINDER_PROXY_SERVICE],
    };
  }
}
