import { Quote } from "../../../src/domain/quote";

export abstract class EnvironmentArranger {
    public abstract arrange(): Promise<void>;
  
    public abstract clean(): Promise<void>;
  
    public abstract addQuote(quote: Quote): Promise<void>;
  }