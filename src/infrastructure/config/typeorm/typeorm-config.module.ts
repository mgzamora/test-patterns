import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { QuoteEntity } from '../../repositories/entities/quote.entity';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (environmentConfigService: EnvironmentConfigService): TypeOrmModuleOptions =>
  {
    const databaseConfig = environmentConfigService.get('DATABASE');
    return {
      type: databaseConfig.TYPE,
      host: databaseConfig.HOST,
      port: parseInt(databaseConfig.PORT, 10),
      username: databaseConfig.USERNAME,
      password: databaseConfig.PASSWORD,
      database: databaseConfig.NAME,
      entities: [QuoteEntity],
      ssl: true,
    } as TypeOrmModuleOptions;
  };

export const getTypeOrmMigrationsOptions = (environmentConfigService: EnvironmentConfigService) => ({
  ...getTypeOrmModuleOptions(environmentConfigService),
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrations: ['**/migrations/*migration*.ts'],
  name: 'schema',
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
