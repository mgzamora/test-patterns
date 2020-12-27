import { isEmpty }  from 'lodash';
import { InvalidDummyError } from "./invalid-dummy.error";
import { StringValueObject } from "./value-objects/string-value-object";

export class DummyValue extends StringValueObject {
    constructor(value: string) {
        if (isEmpty(value)) {
            throw new InvalidDummyError('value cannot be null or empty');
        }
        super(value);
    }
}