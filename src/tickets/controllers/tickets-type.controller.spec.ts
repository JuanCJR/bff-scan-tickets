import { Test, TestingModule } from '@nestjs/testing';
import { TicketsTypeController } from './tickets-type.controller';

describe('TicketsTypeController', () => {
  let controller: TicketsTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsTypeController],
    }).compile();

    controller = module.get<TicketsTypeController>(TicketsTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
