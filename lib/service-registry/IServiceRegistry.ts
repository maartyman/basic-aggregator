import type { IOperation } from '../service/IService';

export interface IServiceRegistry {
  get descriptions(): string[];
  run: (operation: IOperation) => Promise<void>;
}
