import {
  Methods,
  METHODS,
  Middleware,
  PatchedIncomingMessage,
  RequestHandler,
} from "../utils/message";
import { HandlersStore } from "./HandlersStore";

interface RouterOptions {
  baseUrl?: string;
}

export class Router {
  private handlersStore: HandlersStore;
  private baseUrl = "";
  private middleware: Middleware[] = [];

  constructor(options: RouterOptions) {
    this.handlersStore = new HandlersStore();
    this.baseUrl = options.baseUrl || "";
  }

  private registerHandler(
    method: Methods,
    path: string,
    handler: RequestHandler,
  ) {
    const fullPath = this.getFullUrl(path);

    this.handlersStore.setHandler(method, fullPath, handler);
  }

  private getFullUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  use(middleware: Middleware) {
    this.middleware.push(middleware);
  }

  post(path: string, handler: RequestHandler) {
    this.registerHandler(METHODS.POST, path, handler);
    return this;
  }
  options(path: string, handler: RequestHandler) {
    this.registerHandler(METHODS.OPTIONS, path, handler);
    return this;
  }
  get(path: string, handler: RequestHandler) {
    this.registerHandler(METHODS.GET, path, handler);
    return this;
  }
  put(path: string, handler: RequestHandler) {
    this.registerHandler(METHODS.PUT, path, handler);
    return this;
  }
  delete(path: string, handler: RequestHandler) {
    this.registerHandler(METHODS.DELETE, path, handler);
    return this;
  }

  applyMiddleware: RequestHandler = async (req, res) => {
    for (const middlewareItem of this.middleware) {
      await new Promise((resolve, reject) => {
        try {
          middlewareItem(req as PatchedIncomingMessage, res, resolve);
        } catch (err) {
          reject(err);
        }
      });
    }
  };

  handle: RequestHandler = async (req, res) => {
    try {
      await this.handleRequest(req, res);
    } catch (error) {
      res.writeHead(500);
      res.end({ error: "Internal server error" });
    }
  };

  private handleRequest: RequestHandler = async (req, res) => {
    await this.applyMiddleware(req, res);

    const method = req.method as Methods;
    const path = req.url || "";

    if (!method) {
      throw new Error("Method not specified");
    }

    const handler = this.handlersStore.getHandler(method, path);

    if (!handler) {
      res.writeHead(404);
      res.end();
      return;
    }

    return handler(req, res);
  };
}
