import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dummy' })
export class DummyEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid'})
  id: string;

  @Column({ name: 'value', type: 'text', nullable: false })
  value: string;
}
