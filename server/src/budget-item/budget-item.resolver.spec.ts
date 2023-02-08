import { Test, TestingModule } from '@nestjs/testing';
import { BudgetItemResolver } from './budget-item.resolver';
import { BudgetItemService } from './budget-item.service';

describe('BudgetItemResolver', () => {
  let resolver: BudgetItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetItemResolver, BudgetItemService],
    }).compile();

    resolver = module.get<BudgetItemResolver>(BudgetItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
