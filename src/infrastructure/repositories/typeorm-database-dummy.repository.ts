import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dummy } from '../../domain/dummy';
import { DummyRepository } from '../../domain/dummy.repository';
import { Repository } from 'typeorm';
import { DummyEntity } from './entities/dummy.entity';

@Injectable()
export class TypeOrmDatabaseDummyRepository implements DummyRepository {
  constructor(@InjectRepository(DummyEntity) private readonly dummyEntityRepository: Repository<DummyEntity>) {}

  async findAll(): Promise<Dummy[]> {
    const foundDummyEntities: DummyEntity[] = await this.dummyEntityRepository.find();
    
    return foundDummyEntities.map((dummyEntity: DummyEntity) => this.toDummy(dummyEntity));
  }

  async save(dummy: Dummy): Promise<Dummy> {
    const dummyEntity: DummyEntity = this.toDummyEntity(dummy);

    const savedDummyEntity: DummyEntity = await this.dummyEntityRepository.save(dummyEntity);

    return this.toDummy(savedDummyEntity);
  }

  private toDummy(dummyEntity: DummyEntity): Dummy {
    return Dummy.fromPrimitives(dummyEntity);
  }

  private toDummyEntity(dummy: Dummy): DummyEntity {
    const dummyEntity: DummyEntity = dummy.toPrimitives();

    return dummyEntity;
  }
}
