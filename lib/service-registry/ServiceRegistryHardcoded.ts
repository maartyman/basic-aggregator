import type { IOperation, IService } from '../service/IService';
import type { ICostQueueFactory } from '../cost-queue/ICostQueue';
import type { IServiceRegistry } from './IServiceRegistry';

export class ServiceRegistryHardcodedTestOnly implements IServiceRegistry {
  public readonly costQueueFactory: ICostQueueFactory;
  public readonly services: IService[];

  public constructor(
    aggregatorServices: { service: IService; operations: IOperation[] }[],
    costQueueFactory: ICostQueueFactory,
  ) {
    this.services = aggregatorServices.map((aggregatorService): IService => aggregatorService.service);
    this.costQueueFactory = costQueueFactory;
    for (const aggregatorService of aggregatorServices) {
      for (const operation of aggregatorService.operations) {
        aggregatorService.service.test(operation).then(
          (testResult): void => {
            if (!testResult.runnable) {
              throw new Error('Operation not runnable');
            }
            aggregatorService.service.run(operation).catch(
              (error): void => {
                throw new Error(
                  `Aggregator Service:\n${aggregatorService.service.description.toString()}\n` +
                  `failed to 'run' on operation:\n${JSON.stringify(operation)}\nwith error:\n${error}`,
                );
              },
            );
          },
        ).catch((error): void => {
          throw new Error(
            `Aggregator Service:\n${aggregatorService.service.description.toString()}\n` +
            `failed to 'test' on operation:\n${JSON.stringify(operation)}\nwith error:\n${error}`,
          );
        });
      }
    }
  }

  public async run(operation: IOperation): Promise<void> {
    throw new Error(`Service registry not changeable ${JSON.stringify(operation)}.`);
  }

  public get descriptions(): string[] {
    const result = [];
    for (const service of this.services) {
      result.push(service.description.toString());
    }
    return result;
  }
}
