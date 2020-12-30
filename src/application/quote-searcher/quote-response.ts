import { Quote } from "../../domain/quote";

export class QuoteResponse {
    readonly id: string;
    readonly text: string;
     
    constructor(quote: Quote) {
        this.id = quote.id.value;
        this.text = quote.text.value;
    }
}