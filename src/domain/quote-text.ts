import { isEmpty }  from 'lodash';
import { InvalidQuoteError } from "./invalid-quote.error";
import { StringValueObject } from "../shared/value-objects/string-value-object";

export class QuoteText extends StringValueObject {
    constructor(value: string) {
        if (isEmpty(value)) {
            throw new InvalidQuoteError('text cannot be null or empty');
        }
        super(value);
    }
}