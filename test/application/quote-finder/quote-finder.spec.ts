import { QuoteMockRepository } from '../../mocks/quote-mock.repository';
import { QuoteFinder } from "../../../src/application/quote-finder/quote-finder";
import { QuoteResponse } from '../../../src/application/shared/quote-response';
import { Quote } from '../../../src/domain/quote';
import { QuoteMother } from '../../domain/quote.mother';
import { Nullable } from '../../../src/domain/nullable';
import { QuoteId } from '../../../src/domain/quote-id';
import { QuoteIdMother } from '../../domain/quote-id.mother';
import { QuoteNotFoundError } from '../../../src/domain/quote-not-found.error';

let finder: QuoteFinder;
let repository: QuoteMockRepository;

describe('Quote finder', () => {
    beforeEach(() => {
        repository = new QuoteMockRepository();
        finder = new QuoteFinder(repository);
    });

    it('should get a quote', async () => {
        // Given
        const quote : Nullable<Quote> = QuoteMother.random();
        const id : QuoteId = quote.id;
        const quoteId : string = id.value;
        const expectedResponse : QuoteResponse = new QuoteResponse(quote);
        repository.returnOnFind(quote);
        //When
        const response = await finder.execute(quoteId);
        //then
        repository.assertFind(id);
        expect(response).toEqual(expectedResponse);
    })

    it('should get an exception', async () => {
        // Given
        const id : QuoteId = QuoteIdMother.random();
        const quoteId : string = id.value;
        repository.returnOnFind(null);
        //When
        await expect(finder.execute(quoteId)).rejects.toBeInstanceOf(QuoteNotFoundError);
        //then
        repository.assertFind(id);
    })
})