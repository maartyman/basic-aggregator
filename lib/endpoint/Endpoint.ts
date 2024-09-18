import type { IncomingMessage, Server, ServerResponse } from 'node:http';
import { createServer } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import type { IServiceRegistry } from '../service-registry/IServiceRegistry';

export class Endpoint {
  public readonly serviceRegistry: IServiceRegistry;
  public readonly endpointHandlers: IEndpointHandler[];
  private readonly httpServer: Server;
  private readonly endpoints =
    new Map<string, (request: IncomingMessage, response: ServerResponse) => void>();

  public constructor(serviceRegistry: IServiceRegistry, endpointHandlers: IEndpointHandler[]) {
    this.serviceRegistry = serviceRegistry;
    this.endpointHandlers = endpointHandlers;
    this.httpServer = createServer();
  }

  public async start(): Promise<void> {
    // TODO [2024-10-01]: Make port configurable
    this.httpServer.listen(1612);
    this.httpServer.on('request', (request: IncomingMessage, response: ServerResponse): void => {
      this.handleRequest(request, response)
        .catch((error): void => {
          // TODO [2024-10-01]: implement proper logging
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
    // TODO [2024-10-01]: Make port configurable
    this.httpServer.listen(1613);
    this.httpServer.on('request', (request: IncomingMessage, response: ServerResponse): void => {
      const endpointLocation = request.url?.split('/')[1];
      if (endpointLocation === undefined) {
        response.statusCode = 404;
        response.end();
        return;
      }
      const endpoint = this.endpoints.get(endpointLocation);
      if (endpoint === undefined) {
        response.statusCode = 404;
        response.end();
        return;
      }
      endpoint(request, response);
      response.end();
    });
  }

  private async handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const currentEndpointHandler = await Promise.any(
      this.endpointHandlers.map(
        async(endpointHandler): Promise<IEndpointHandler> => {
          if (await endpointHandler.test(request)) {
            return endpointHandler;
          }
          throw new Error('Test returned false.');
        },
      ),
    ).catch((): void => {
      response.statusCode = 404;
    });

    if (currentEndpointHandler) {
      await currentEndpointHandler.run(request, response)
        .catch((): void => {
          response.statusCode = 500;
        });
    }

    await new Promise<void>((resolve): void => {
      response.end((): void => {
        resolve();
      });
    });
  }

  public newServiceEndpoint(handleFunction: (request: IncomingMessage, response: ServerResponse) => void): string {
    const endpointLocation = uuidv4();
    this.endpoints.set(endpointLocation, handleFunction);
    return endpointLocation;
  }
}

export interface IEndpointHandler {
  test: (request: IncomingMessage) => Promise<boolean>;
  run: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
}
