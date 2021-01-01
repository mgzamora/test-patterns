import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/infrastructure/app.module';
import request from 'supertest';
import { EnvironmentArranger } from '../infrastructure/shared/environment-arranger';
import { TypeOrmEnvironmentArranger } from '../infrastructure/shared/mysql-environment-arranger';

export class TestApp {
    private response: request.Response;
    private app: any;
    public environmentArranger : EnvironmentArranger;

    async start(): Promise<void> {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
          }).compile();
      
        this.app = moduleFixture.createNestApplication();
        await this.app.init();
        this.environmentArranger = new TypeOrmEnvironmentArranger();
    }

    async close(): Promise<void> {
        await this.app.close();
    }

    async getRequest(route: string) : Promise<void> {
        this.response = await request(this.app.getHttpServer()).get(route);
    }

    async putRequest(route: string, body: string) : Promise<void> {
        this.response = await request(this.app.getHttpServer()).put(route).send(JSON.parse(body));
    }

    responseBody(body: any): void {
        expect(this.response.body).toEqual(JSON.parse(body));
    }

    responseEmptyBody(): void {
        expect(this.response.body).not.toBeDefined();
    }


    responseStatus = (status: string): void => {
        expect(this.response.status).toEqual(parseInt(status));
    }
}