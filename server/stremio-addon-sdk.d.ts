declare module "stremio-addon-sdk" {
  export interface Manifest {
    id: string;
    version: string;
    name: string;
    description?: string;
    logo?: string;
    background?: string;
    types: string[];
    resources: any[];
    catalogs: any[];
    behaviorHints?: any;
  }

  export interface StreamHandlerArgs {
    type: string;
    id: string;
    extra?: Record<string, any>;
  }

  export interface StreamResponse {
    streams: Array<{
      name?: string;
      title?: string;
      url: string;
      sources?: string[];
    }>;
  }

  export class addonBuilder {
    constructor(manifest: Manifest);
    defineStreamHandler(
      handler: (args: StreamHandlerArgs) => Promise<StreamResponse>
    ): void;
    defineCatalogHandler(handler: (args: any) => Promise<any>): void;
    defineMetaHandler(handler: (args: any) => Promise<any>): void;
    defineSubtitlesHandler(handler: (args: any) => Promise<any>): void;
    getInterface(): AddonInterface;
  }

  export interface AddonInterface {
    manifest: Manifest;
    get(args: {
      resource: string;
      type: string;
      id: string;
      extra?: Record<string, any>;
    }): Promise<any>;
  }

  export function serveHTTP(
    addonInterface: AddonInterface,
    options: { port: number; cacheMaxAge?: number; static?: string }
  ): void;

  export function getRouter(addonInterface: AddonInterface): any;

  export function publishToCentral(url: string): Promise<void>;
}
