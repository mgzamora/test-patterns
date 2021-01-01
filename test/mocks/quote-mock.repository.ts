import { QuoteRepository } from '../../src/domain/quote.repository';
import { Quote } from '../../src/domain/quote';
import { QuoteId } from '../../src/domain/quote-id';

export class QuoteMockRepository implements QuoteRepository {
    private mockSave = jest.fn();
    private mockSearch = jest.fn();
    private mockFind = jest.fn();
    private quotes: Quote[] = [];
    private quote: Quote;
    
    save(quote: Quote): Promise<void> {
        this.mockSave(quote);
        return;
    }

    async search(): Promise<Quote[]> {
        this.mockSearch();
        return this.quotes;
    }

    async find(id: QuoteId): Promise<Quote> {
        this.mockFind(id);
        return this.quote;
    }

    returnOnSearch(quotes: Quote[]) {
        this.quotes = quotes;
    }

    returnOnFind(quote: Quote) {
        this.quote = quote;
    }

    assertLastSearchedQuoteIs(expected: QuoteId): void {
        expect(this.mockSearch).toHaveBeenCalledWith(expected);
      }
    
    assertSearch() {
        expect(this.mockSearch).toHaveBeenCalled();
        expect(this.mockSearch).toHaveBeenCalledWith();
    }

    assertFind(expected: QuoteId) {
        expect(this.mockFind).toHaveBeenCalled();
        expect(this.mockFind).toHaveBeenCalledWith(expected);
    }

}