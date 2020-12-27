import { DummyId } from './dummy-id';
import { DummyValue } from './dummy-value';

export class Dummy {
  readonly id: DummyId;
  value: DummyValue;

  constructor(id: DummyId, value: DummyValue) {
    this.id = id;
    this.value = value;
  }

  static fromPrimitives(plainData: { id: string; value: string }): Dummy {
    return new Dummy(
      new DummyId(plainData.id),
      new DummyValue(plainData.value)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      value: this.value.value,
    };
  }
}
