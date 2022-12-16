import { Methods, METHODS, RequestHandler } from "../utils/message";
import { HandlersStore } from "./HandlersStore";

interface RouterOptions {
  baseUrl?: string;
}

export class Router {
  private handlersStore: HandlersStore;
  private baseUrl = "";

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

  handle: RequestHandler = (req, res) => {
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
