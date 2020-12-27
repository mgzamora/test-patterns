import { Dummy } from "../domain/dummy";

export class DummyResponse {
    readonly id: string;
    readonly value: string;
     
    constructor(dummy: Dummy) {
        this.id = dummy.id.value;
        this.value = dummy.value.value;
    }
}