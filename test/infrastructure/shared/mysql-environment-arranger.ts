import { EnvironmentArranger } from './environment-arranger';
import { Connection, Repository, getConnection} from "typeorm";
import { QuoteEntity } from '../../../src/infrastructure/repositories/entities/quote.entity';
import { Quote } from 'src/domain/quote';



export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
  private connection : Connection;
  private repository : Repository<any>;
  constructor() {
    super()
  }

  public async arrange(): Promise<void> {
    await this.connect();
    this.repository = this.connection.getRepository(QuoteEntity);
    await this.cleanDatabase();
  }

  public async addQuote(quote: Quote): Promise<void> {
    const quoteEntity: QuoteEntity = quote.toPrimitives();
    await this.repository.save(quoteEntity)

  }

  public async clean(): Promise<void> {
    await this.cleanDatabase();
  }

  private async connect() : Promise<void> {
    if (!this.connection || !this.connection.isConnected) {
      this.connection = await getConnection('default');
    }
  }

  private async cleanDatabase(): Promise<void> {
    await this.repository.query('DELETE FROM library.quote');
  }

}