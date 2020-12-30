import { QuoteRepository } from '../../domain/quote.repository';
import { QuoteResponse } from './quote-response';

export class QuoteSearcher {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async execute(): Promise<QuoteResponse[]> {
    const quotes = await this.quoteRepository.search();
    const response = quotes.map(d => new QuoteResponse(d));
    return response;
  }
}
