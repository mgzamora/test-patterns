import { loadFeature, defineFeature } from 'jest-cucumber';
import { QuoteMother } from '../../domain/quote.mother';
import { TestApp } from '../../shared/test-app';
import * as mockDate from 'mockdate';

const feature = loadFeature('../find-quote.feature', { loadRelativePath: true, errors: true });
const testApp: TestApp = new TestApp();

beforeAll(async () => {
    mockDate.set('2021-01-01 01:00:00');
    await testApp.start();
});

beforeEach(async () => {
    await testApp.environmentArranger.arrange();
});

afterEach(async () => {
    await testApp.environmentArranger.clean();
})

afterAll(async () => {
    mockDate.reset();
    await testApp.close();
})

defineFeature(feature, test => {

    test('Retrieve an existing quote', ({ given, when, then, and }) => {

        given('a previous quote already created in db with values:', async (quote: any[]) => {
            await addQuote(quote[0]);
        });

        when(/^I send a GET request to "(.*)"$/, async (route: string) => {
            await testApp.getRequest(route);           
        });

        then(/^the response status code should be (\d+)$/, (status: string) => {
            testApp.responseStatus(status);
        });

        and('the response content should be:', (body: string) => {
            testApp.responseBody(body);
        });
    });

    test('Try to retrieve a not existing quote', ({ when, then, and }) => {

        when(/^I send a GET request to "(.*)"$/, async (route: string) => {
            await testApp.getRequest(route);           
        });

        then(/^the response status code should be (\d+)$/, (status: string) => {
            testApp.responseStatus(status);
        });

        and('the response content should be:', (body: string) => {
            testApp.responseBody(body);
        });
    });
});

const addQuote = async ({id, text}) : Promise<void> => {
    const quote = QuoteMother.fromPrimitives(id, text);
    await testApp.environmentArranger.addQuote(quote);
}