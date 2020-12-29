import { QuoteRepository } from 'src/domain/quote.repository';
import { QuoteResponse } from './quote-response';

export class QuoteFinder {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async execute(): Promise<QuoteResponse[]> {
    const quotes = await this.quoteRepository.findAll();
    const response = quotes.map(d => new QuoteResponse(d));
    return response;
  }
}
