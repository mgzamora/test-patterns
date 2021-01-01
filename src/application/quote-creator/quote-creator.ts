import { QuoteId } from "../../domain/quote-id";
import { QuoteRepository } from "../../domain/quote.repository";
import { QuoteAlreadyExistsError } from "../../domain/quote-already-exists.error";
import { Quote } from "../..//domain/quote";
import { QuoteText } from "../../domain/quote-text";

export class QuoteCreator {
    constructor(private repository: QuoteRepository) {}

    async execute({ id, text }): Promise<void> {
        const quoteId = new QuoteId(id);
        const quoteText = new QuoteText(text);
        const qoute: Quote = new Quote(quoteId, quoteText);

        const quoteResponse = await this.repository.find(quoteId);

        if (quoteResponse) {
            throw new QuoteAlreadyExistsError(id);
        }

        await this.repository.save(qoute)
      }
}