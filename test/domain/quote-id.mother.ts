import { QuoteId } from '../../src/domain/quote-id';
import { UuidMother } from './uuid.mother';

export class QuoteIdMother {
  static create(value: string): QuoteId {
    return new QuoteId(value);
  }

  static random(): QuoteId {
    return this.create(UuidMother.random());
  }
}