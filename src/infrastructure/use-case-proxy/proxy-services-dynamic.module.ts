import { DynamicModule, Module } from '@nestjs/common';
import { QuoteCreator } from '../../application/quote-creator/quote-creator';
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
  static QUOTE_CREATOR_PROXY_SERVICE: string = 'QuoteCreatorProxyService';
  
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
        },
        {
          inject: [TypeOrmDatabaseQuoteRepository],
          provide: ProxyServicesDynamicModule.QUOTE_CREATOR_PROXY_SERVICE,
          useFactory: (databaseQuoteRepository: TypeOrmDatabaseQuoteRepository) => new UseCaseProxy(new QuoteCreator(databaseQuoteRepository)),
        }
      ],
      exports: [
        ProxyServicesDynamicModule.QUOTE_SEARCHER_PROXY_SERVICE, 
        ProxyServicesDynamicModule.QUOTE_FINDER_PROXY_SERVICE,
        ProxyServicesDynamicModule.QUOTE_CREATOR_PROXY_SERVICE
      ],
    };
  }
}
