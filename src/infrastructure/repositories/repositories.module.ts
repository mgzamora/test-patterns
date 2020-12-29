import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { QuoteEntity } from './entities/quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm-config.module';
import { TypeOrmDatabaseQuoteRepository } from './typeorm-database-quote.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([QuoteEntity]), EnvironmentConfigModule],
  providers: [TypeOrmDatabaseQuoteRepository],
  exports: [TypeOrmDatabaseQuoteRepository],
})
export class RepositoriesModule {}
