import { Module } from '@nestjs/common';
import { RestModule } from './rest/rest.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RestModule,
    ConfigModule.forRoot({
      load: [configuration],
    })
  ],
})
export class AppModule {}