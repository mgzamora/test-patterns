import { Quote } from './quote';

export interface QuoteRepository {
  save(quote: Quote): Promise<Quote>;
  findAll(): Promise<Quote[]>;
}