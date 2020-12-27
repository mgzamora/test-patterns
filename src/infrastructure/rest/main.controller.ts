import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/api')
export class MainController {

  @Get('health-check')
  @HttpCode(200)
  async healthCheck(): Promise<string> {
    return 'OK';
  }
}
