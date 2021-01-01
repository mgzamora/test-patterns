import { loadFeature, defineFeature } from 'jest-cucumber';
import { QuoteMother } from '../../domain/quote.mother';
import { TestApp } from '../../shared/test-app';

const feature = loadFeature('../search-quotes.feature', { loadRelativePath: true, errors: true });
const testApp: TestApp = new TestApp();

beforeAll(async () => {
    await testApp.start();
});

beforeEach(async () => {
    await testApp.environmentArranger.arrange();
});

afterEach(async () => {
    await testApp.environmentArranger.clean();
})

afterAll(async () => {
    await testApp.close();
})

defineFeature(feature, test => {

    test('Retrieve an empty list of quotes', ({ when, then, and }) => {

        when(/^I send a GET request to "(.*)"$/, async (route: string) => {
            await testApp.getRequest(route);           
        });

        then(/^the response status code should be (\d+)$/, (status: string) => {
            testApp.responseStatus(status);
        });

        and(/^the response content should be an empty list$/, () => {
            testApp.responseBody('[]')
        });
    });

    test('Retrieve a list of quotes', ({ given, when, then, and }) => {

        given('a previous quotes already created in db with values:', async (quotes: any) => {
            await addQuotes(quotes);
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
});

const addQuotes = async (quotes: any[]): Promise<void> => {
    for (const quote of quotes) {   
        await addQuote(quote);
    }
    return;
}

const addQuote = async ({id, text}) : Promise<void> => {
    const quote = QuoteMother.fromPrimitives(id, text);
    await testApp.environmentArranger.addQuote(quote);
}