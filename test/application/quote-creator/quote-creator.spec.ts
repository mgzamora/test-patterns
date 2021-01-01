import { QuoteMockRepository } from '../../mocks/quote-mock.repository';
import { Quote } from '../../../src/domain/quote';
import { QuoteMother } from '../../domain/quote.mother';
import { Nullable } from '../../../src/domain/nullable';
import { QuoteCreator } from '../../../src/application/quote-creator/quote-creator';
import { QuoteAlreadyExistsError } from '../../../src/domain/quote-already-exists.error';

let creator: QuoteCreator;
let repository: QuoteMockRepository;

describe('Quote creator', () => {
    beforeEach(() => {
        repository = new QuoteMockRepository();
        creator = new QuoteCreator(repository);
    });

    it('should create a quote', async () => {
        // Given
        const quote : Nullable<Quote> = QuoteMother.random();
        const quoteId : string = quote.id.value;
        const quoteText: string = quote.text.value;
        repository.returnOnFind(undefined);
        //When
        const response = await creator.execute({ id: quoteId, text: quoteText });
        //then
        repository.assertFind(quote.id);
        repository.assertSave(quote);
        expect(response).toEqual(undefined);
    })

    it('should get an already exists exception', async () => {
        // Given
        const quote : Nullable<Quote> = QuoteMother.random();
        const quoteId : string = quote.id.value;
        const quoteText: string = quote.text.value;
        repository.returnOnFind(quote);
        //When
        await expect(creator.execute({ id: quoteId, text: quoteText })).rejects.toBeInstanceOf(QuoteAlreadyExistsError);
        //then
        repository.assertFind(quote.id);
    })
})