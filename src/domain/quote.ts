import { QuoteId } from './quote-id';
import {QuoteText } from './quote-text';

export class Quote {
  readonly id: QuoteId;
  text: QuoteText;

  constructor(id: QuoteId, text: QuoteText) {
    this.id = id;
    this.text = text;
  }

  static fromPrimitives(plainData: { id: string; text: string }): Quote {
    return new Quote(
      new QuoteId(plainData.id),
      new QuoteText(plainData.text)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      text: this.text.value,
    };
  }
}
