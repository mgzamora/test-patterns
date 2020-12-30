import { Quote } from "../../src/domain/quote";
import { QuoteId } from "../../src/domain/quote-id";
import { QuoteText } from "../../src/domain/quote-text";
import { QuoteIdMother } from "./quote-id.mother";
import { QuoteTextMother } from "./quote-text.mother";

export class QuoteMother {
    static create(id: QuoteId, text: QuoteText): Quote {
        return new Quote(id, text);
    }

    static fromPartial(quote: Partial<Quote>): Quote {
        const id = quote.id || QuoteIdMother.random();
        const text = quote.id || QuoteTextMother.random();
        return new Quote(id, text);
    }

    static random(): Quote {
        return new Quote(QuoteIdMother.random(), QuoteTextMother.random())
    }
}