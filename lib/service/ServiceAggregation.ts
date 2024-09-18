import { StreamParser, StreamWriter } from 'n3';
import type { IFetch } from '../fetch/IFetch';
import type { Endpoint } from '../endpoint/Endpoint';
import type { IOperation, IOperationTestResult, IService, IServiceDescription } from './IService';

export class ServiceAggregation implements IService {
  public fetch: IFetch;
  public endpoint: Endpoint;

  public constructor(args: ServiceAggregationArgs) {
    this.fetch = args.fetch;
    this.endpoint = args.endpoint;
  }

  public async test(operation: IOperation): Promise<IOperationTestResult> {
    if (operation.operation !== 'Aggregation') {
      throw new Error('Not an aggregation operation');
    }
    return {
      aggregatorService: this,
      operation,
      runnable: true,
    };
  }

  public async run(operation: IOperation): Promise<string> {
    const streamWriter = new StreamWriter();
    for (const source of operation.sources) {
      const streamParser = new StreamParser();
      // eslint-disable-next-line ts/no-unsafe-argument
      (await this.fetch.fetch(source)).body?.pipeThrough(streamParser as any);
      streamParser.pipe(streamWriter);
    }

    const chunks = [];
    for await (const chunk of streamWriter) {
      chunks.push(Buffer.from(chunk)); // eslint-disable-line ts/no-unsafe-argument
    }
    const result = Buffer.concat(chunks).toString('utf-8');

    const serviceEndpoint = this.endpoint.newServiceEndpoint((request, response): void => {
      response.writeHead(200);
      response.setHeader('Content-Type', 'text/turtle');
      response.write(result);
    });

    return serviceEndpoint;
  }

  public get description(): IServiceDescription {
    return {
      toString: (): string => 'Aggregation',
    };
  }
}

export type ServiceAggregationArgs = {
  fetch: IFetch;
  endpoint: Endpoint;
};
