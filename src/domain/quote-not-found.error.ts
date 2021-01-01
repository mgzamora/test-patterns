import { QuoteId } from "./quote-id";

export class QuoteNotFoundError extends Error {
    constructor(id: QuoteId) {
      super(`The quote with id <${id.value}> does not exist.`);
      this.name = "QuoteNotFoundError";
    }
}