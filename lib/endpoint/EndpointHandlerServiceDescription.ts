import type { IncomingMessage, ServerResponse } from 'node:http';
import type { IServiceRegistry } from '../service-registry/IServiceRegistry';
import type { IEndpointHandler } from './Endpoint';

export class EndpointHandlerServiceDescription implements IEndpointHandler {
  public readonly serviceRegistry: IServiceRegistry;
  public readonly endpointUrl: string;

  public constructor(serviceRegistry: IServiceRegistry, endpointUrl: string) {
    this.serviceRegistry = serviceRegistry;
    this.endpointUrl = endpointUrl;
  }

  public async test(request: IncomingMessage): Promise<boolean> {
    if (request.url === undefined) {
      throw new Error('Test failed because the url is undefined!');
    }
    return /^[^#?^|]*/u.exec(request.url)![0] === this.endpointUrl;
  }

  public async run(request: IncomingMessage, response: ServerResponse): Promise<void> {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(this.serviceRegistry.descriptions));
  }
}
