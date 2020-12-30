import { QuoteRepository } from '../../src/domain/quote.repository';
import { Quote } from '../../src/domain/quote';
import { QuoteId } from '../../src/domain/quote-id';

export class QuoteRepositoryMock implements QuoteRepository {
    private mockSave = jest.fn();
    private mockSearch = jest.fn();
    private quote: Quote = null;
    private quotes: Quote[] = [];
    
    save(quote: Quote): Promise<void> {
        this.mockSave(quote);
        return;
    }

    async search(): Promise<Quote[]> {
        this.mockSearch();
        return this.quotes;
    }

    returnOnSearch(quotes: Quote[]) {
        this.quotes = quotes;
    }

    assertLastSearchedQuoteIs(expected: QuoteId): void {
        expect(this.mockSearch).toHaveBeenCalledWith(expected);
      }
    
    assertSearch() {
        expect(this.mockSearch).toHaveBeenCalled();
        expect(this.mockSearch).toHaveBeenCalledWith();
    }

}