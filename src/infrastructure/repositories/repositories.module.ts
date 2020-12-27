import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { DummyEntity } from './entities/dummy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm-config.module';
import { TypeOrmDatabaseDummyRepository } from './typeorm-database-dummy.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([DummyEntity]), EnvironmentConfigModule],
  providers: [TypeOrmDatabaseDummyRepository],
  exports: [TypeOrmDatabaseDummyRepository],
})
export class RepositoriesModule {}
