import { Test, TestingModule } from '@nestjs/testing';
import { TicketsTypeService } from './tickets-type.service';

describe('TicketsTypeService', () => {
  let service: TicketsTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsTypeService],
    }).compile();

    service = module.get<TicketsTypeService>(TicketsTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
