import { loadFeature, defineFeature } from 'jest-cucumber';
import { TestApp } from '../../shared/test-app';
import * as mockDate from 'mockdate';

const feature = loadFeature('../create-quote.feature', { loadRelativePath: true, errors: true });
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
    mockDate.reset();
    await testApp.close();
})

defineFeature(feature, test => {

    test('A quote is created', ({ when, then, and }) => {

        when(/^I send a PUT request to "(.*)" with body:$/, async (route: string, body: string) => {
            await testApp.putRequest(route, body);           
        });

        then(/^the response status code should be (\d+)$/, (status: string) => {
            testApp.responseStatus(status);
        });

        and('the response content should be empty', () => {
            testApp.responseEmptyBody();
        });
    });
});