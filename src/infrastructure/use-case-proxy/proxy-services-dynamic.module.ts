import { DynamicModule, Module } from '@nestjs/common';
import { DummyFinder } from '../../application/dummy-finder';
import { RepositoriesModule } from '../repositories/repositories.module';
import { TypeOrmDatabaseDummyRepository } from '../repositories/typeorm-database-dummy.repository';
import { UseCaseProxy } from './use-case-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class ProxyServicesDynamicModule {
  static DUMMY_FINDER_PROXY_SERVICE: string = 'DummyFinderProxyService';
  
  static register(): DynamicModule {
    return {
      module: ProxyServicesDynamicModule,
      providers: [
        {
          inject: [TypeOrmDatabaseDummyRepository],
          provide: ProxyServicesDynamicModule.DUMMY_FINDER_PROXY_SERVICE,
          useFactory: (databaseDummyRepository: TypeOrmDatabaseDummyRepository) => new UseCaseProxy(new DummyFinder(databaseDummyRepository)),
        }
      ],
      exports: [ProxyServicesDynamicModule.DUMMY_FINDER_PROXY_SERVICE],
    };
  }
}
