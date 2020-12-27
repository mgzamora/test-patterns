import { DummyRepository } from '../domain/dummy.repository';
import { DummyResponse } from './dummy-response';

export class DummyFinder {
  constructor(private readonly dummyRepository: DummyRepository) {}

  async execute(): Promise<DummyResponse[]> {
    const dummies = await this.dummyRepository.findAll();
    const response = dummies.map(d => new DummyResponse(d));
    return response;
  }
}
