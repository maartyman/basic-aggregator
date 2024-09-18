import type { Endpoint } from '../endpoint/Endpoint';
import type { IOperation, IOperationTestResult, IService, IServiceDescription } from './IService';

export class ServiceEmpty implements IService {
  public endpoint: Endpoint;

  public constructor(args: ServiceEmptyArgs) {
    this.endpoint = args.endpoint;
  }

  public async test(operation: IOperation): Promise<IOperationTestResult> {
    if (operation.operation !== 'Empty') {
      throw new Error('Not a Empty operation');
    }
    return {
      aggregatorService: this,
      operation,
      runnable: true,
    };
  }

  public async run(): Promise<string> {
    return this.endpoint.newServiceEndpoint((request, response): void => {
      response.writeHead(200);
      response.setHeader('Content-Type', 'text/turtle');
      response.write('');
    });
  }

  public get description(): IServiceDescription {
    return {
      toString: (): string => 'Empty',
    };
  }
}

export type ServiceEmptyArgs = {
  endpoint: Endpoint;
};
