import type { CostParameters } from '../cost-queue/ICostQueue';

export interface IService {
  get description(): IServiceDescription;
  test: (operation: IOperation) => Promise<IOperationTestResult>;
  run: (operation: IOperation) => Promise<string | undefined>;
}

export interface IServiceDescription {
  toString: () => string;
}

export interface IOperationTestResult {
  aggregatorService: IService;
  operation: IOperation;
  runnable: boolean;
  operationResult?: IOperationResult;
  costParameters?: CostParameters;
}

export interface IOperationResult {
  aggregatorService: IService;
  operation: IOperation;
  serviceEndpoint: string;
}

export interface IOperation {
  operation: string;
  sources: string[];
}
