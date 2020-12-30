import { QuoteText } from '../../src/domain/quote-text';
import { WordMother } from './word.mother';

export class QuoteTextMother {
  static create(value: string): QuoteText {
    return new QuoteText(value);
  }

  static random(): QuoteText {
    return this.create(WordMother.random());
  }
}