import { QuoteNotFoundError } from "../../domain/quote-not-found.error";
import { QuoteId } from "../../domain/quote-id";
import { QuoteRepository } from "../../domain/quote.repository";
import { QuoteResponse } from "../shared/quote-response";

export class QuoteFinder {
    constructor(private repository: QuoteRepository) {}

    async execute(quoteId: string): Promise<QuoteResponse> {
        const id = new QuoteId(quoteId);
        const quote = await this.repository.find(id);

        if (!quote) {
            throw new QuoteNotFoundError(id);
        }

        return new QuoteResponse(quote);
      }
}