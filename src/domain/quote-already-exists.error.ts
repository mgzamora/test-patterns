import { QuoteId } from "./quote-id";

export class QuoteAlreadyExistsError extends Error {
    constructor(id: QuoteId) {
      super(`The quote with id <${id.value}> already exists.`);
      this.name = "QuoteAlreadyExistsError";
    }
}