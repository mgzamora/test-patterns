import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from '../../domain/quote';
import { QuoteRepository } from '../../domain/quote.repository';
import { Repository } from 'typeorm';
import { QuoteEntity } from './entities/quote.entity';
import { QuoteId } from '../../domain/quote-id';
import { Nullable } from 'src/domain/nullable';

@Injectable()
export class TypeOrmDatabaseQuoteRepository implements QuoteRepository {
  constructor(@InjectRepository(QuoteEntity) private readonly quoteEntityRepository: Repository<QuoteEntity>) {}

  async search(): Promise<Quote[]> {
    const foundQuoteEntities: QuoteEntity[] = await this.quoteEntityRepository.find();
    
    return foundQuoteEntities.map((quoteEntity: QuoteEntity) => this.toQuote(quoteEntity));
  }

  async save(quote: Quote): Promise<void> {
    const quoteEntity: QuoteEntity = this.toQuoteEntity(quote);

    await this.quoteEntityRepository.save(quoteEntity);
  }

  async find(id: QuoteId): Promise<Nullable<Quote>> {
    const quoteId: string = id.value;
    const quoteEntity : QuoteEntity = await this.quoteEntityRepository.findOne(quoteId); 
    return this.toQuote(quoteEntity);
  }

  private toQuote(quoteEntity: QuoteEntity): Nullable<Quote> {
    return quoteEntity ? Quote.fromPrimitives(quoteEntity) : null;
  }

  private toQuoteEntity(quote: Quote): QuoteEntity {
    const quoteEntity: QuoteEntity = quote.toPrimitives();

    return quoteEntity;
  }
}
