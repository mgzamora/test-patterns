import { Quote } from './quote';
import { QuoteId } from './quote-id';

export interface QuoteRepository {
  save(quote: Quote): Promise<void>;
  search(): Promise<Quote[]>;
  find(id: QuoteId): Promise<Quote>;
}