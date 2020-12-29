import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'quote' })
export class QuoteEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid'})
  id: string;

  @Column({ name: 'text', type: 'text', nullable: false })
  text: string;
}
