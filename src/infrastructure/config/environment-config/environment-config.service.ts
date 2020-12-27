import * as Joi from '@hapi/joi';
import { ValidationResult } from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { EnvironmentConfigError } from './environment-config.error';
import { ConfigService} from '@nestjs/config'

export interface EnvironmentConfig {
  [key: string]: any;
}

@Injectable()
export class EnvironmentConfigService {
  private readonly environmentConfig: EnvironmentConfig;

  constructor(private configService: ConfigService) {
    this.environmentConfig = EnvironmentConfigService.validateInput({ 
      DATABASE: this.configService.get('DATABASE'), PORT: this.configService.get('PORT')});
  }

  private static validateInput(environmentConfig: EnvironmentConfig): EnvironmentConfig {
    const envVarsDatabaseSchema: Joi.ObjectSchema = Joi.object({
      TYPE: Joi.string().default('sqlite'),
      NAME: Joi.string().default('local-db.sqlite'),
      HOST: Joi.string().when('TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
      PORT: Joi.number().when('TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
      USERNAME: Joi.string().when('TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
      PASSWORD: Joi.string().when('TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
    })
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(3001),
      DATABASE: envVarsDatabaseSchema.default(envVarsDatabaseSchema.validate(environmentConfig.DATABASE).value)
    }).unknown(true);

    const { error, value: validatedEnvironmentConfig }: ValidationResult = envVarsSchema.validate(environmentConfig);
    if (error) {
      throw new EnvironmentConfigError(`Config validation error: ${error.message}`);
    }
    return validatedEnvironmentConfig;
  }

  get(key: string): any {
    return this.environmentConfig[key];
  }
}