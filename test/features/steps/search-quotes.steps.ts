import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/infrastructure/app.module';
import { EnvironmentArranger } from '../../infrastructure/shared/environment-arranger'
import { TypeOrmEnvironmentArranger } from '../../infrastructure/shared/mysql-environment-arranger';
import { QuoteMother } from '../../domain/quote.mother';

const feature = loadFeature('../search-quotes.feature', { loadRelativePath: true, errors: true });

let _response: request.Response;
let app;
let environmentArranger : EnvironmentArranger;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    environmentArranger = new TypeOrmEnvironmentArranger();
});

beforeEach(async () => {
    await environmentArranger.arrange();
});

afterEach(async () => {
    await environmentArranger.clean();
})

afterAll(async () => {
    await app.close();
})

defineFeature(feature, test => {

    test('Retrieve an empty list of quotes', ({ when, then, and }) => {

        when(/^I send a GET request to "(.*)"$/, async (route: string) => {
            await getRequest(route);           
        });

        then(/^the response status code should be (\d+)$/, (status: string) => {
            responseStatus(status);
        });

        and(/^the response content should be an empty list$/, () => {
            responseBody('[]')
        });
    });

    test('Retrieve a list of quotes', ({ given, when, then, and }) => {

        given('a previous quotes already created in db with values:', async (quotes: any) => {
            await addQuotes(quotes);
        });

        when(/^I send a GET request to "(.*)"$/, async (route: string) => {
            await getRequest(route);           
        });

        then(/^the response status code should be (\d+)$/, (status: string) => {
            responseStatus(status);
        });

        and('the response content should be:', (body: string) => {
            responseBody(body);
        });
    });
});

const getRequest = async (route: string) : Promise<void> => {
    _response = await request(app.getHttpServer()).get(route);
}

const responseBody = (body: any): void => {
    expect(_response.body).toEqual(JSON.parse(body));
}

const responseStatus = (status: string): void => {
    expect(_response.status).toEqual(parseInt(status));
}

const addQuotes = async (quotes: any[]): Promise<void> => {
    for (const quote of quotes) {   
        await addQuote(quote);
    }
    return;
}

const addQuote = async ({id, text}) : Promise<void> => {
    const quote = QuoteMother.fromPrimitives(id, text);
    await environmentArranger.addQuote(quote);
}

// Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
//   _request = request(app).put(route).send(JSON.parse(body));
// });

// Given('I send a POST request to {string} with body:', (route: string, body: string) => {
//   _request = request(app).post(route).send(JSON.parse(body));
// });

// Then('the response status code should be {int}', async (status: number) => {
//   _response = await _request.expect(status);
// });

// Then('the response should be empty', () => {
//   assert.deepEqual(_response.body, {});
// });

// Then('the response content should be:', (response: any) => {
//   assert.deepEqual(_response.body, JSON.parse(response));
// });

// Given('a previous course has been already created', async () => {
//   const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
//   await (await environmentArranger).addCourseWithId('ef8ac118-8d7f-49cc-abec-78e0d05af80b');
// });

// Given('Previous courses has been already created', async () => {
//   const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
//   await (await environmentArranger).addCourseWithId('ef8ac118-8d7f-49cc-abec-78e0d05af80b');
//   await (await environmentArranger).addCourseWithId('ef8ac118-8d7f-49cc-abec-78e0d05af80c');
// });

// Before(async () => {
//   const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
//   await (await environmentArranger).arrange();
// });

// AfterAll(async () => {
//   const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
//   await (await environmentArranger).arrange();
//   await (await environmentArranger).close()
