import { QuoteMockRepository } from '../../mocks/quote-mock.repository';
import { QuoteSearcher } from "../../../src/application/quote-searcher/quote-searcher";
import { QuoteResponse } from '../../../src/application/quote-searcher/quote-response';
import { Quote } from '../../../src/domain/quote';
import { QuoteMother } from '../../domain/quote.mother';

let searcher: QuoteSearcher;
let repository: QuoteMockRepository;

describe('Quote searcher', () => {
    beforeEach(() => {
        repository = new QuoteMockRepository();
        searcher = new QuoteSearcher(repository);
    });

    it('should get an empty list', async () => {
        // Given
        repository.returnOnSearch([]);
        //When
        const response = await searcher.execute();
        //then
        const searcherResponse : QuoteResponse[] = [];
        repository.assertSearch();
        expect(response).toEqual(searcherResponse);
    })

    it('should get a list of quotes', async () => {
        // Given
        const firstQuote : Quote = QuoteMother.random();
        const secondQuote : Quote = QuoteMother.random();
        const quotes : Quote[] = [firstQuote, secondQuote]
        const expectedResponse : QuoteResponse[] = quotes.map(q => new QuoteResponse(q));
        repository.returnOnSearch(quotes);
        //When
        const response = await searcher.execute();
        //then
        repository.assertSearch();
        expect(response).toEqual(expectedResponse);
    })
})