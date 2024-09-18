import type { IOperation, IService } from '../service/IService';
import type { ICostQueueFactory } from '../cost-queue/ICostQueue';
import type { IServiceRegistry } from './IServiceRegistry';

export class ServiceRegistryHardcodedTestOnly implements IServiceRegistry {
  public readonly costQueueFactory: ICostQueueFactory;
  public readonly services: IService[];

  public constructor(aggregatorServices: IService[], costQueueFactory: ICostQueueFactory) {
    this.services = aggregatorServices;
    this.costQueueFactory = costQueueFactory;
  }

  public async run(operation: IOperation): Promise<void> {
    const costQueue = this.costQueueFactory.create();

    await Promise.all(this.services.map(
      async(aggregatorService): Promise<void> => aggregatorService.test(operation).then(
        (testResult): void => {
          if (testResult.runnable) {
            costQueue.push(testResult);
          }
        },
      ),
    ));

    let operationResult = costQueue.pop();
    while (operationResult === undefined || operationResult.operationResult === undefined) {
      if (costQueue.length === 0) {
        throw new Error('No aggregator services can handel operation.');
      }
      operationResult = costQueue.pop();
    }
  }

  public get descriptions(): string[] {
    const result = [];
    for (const service of this.services) {
      result.push(service.description.toString());
    }
    return result;
  }
}
