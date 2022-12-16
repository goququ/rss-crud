import { METHODS, Methods, RequestHandler } from "../utils/message";

type HandlersStoreType = Record<
  Methods,
  { pathSchema: string; handler: RequestHandler }[]
>;

export class HandlersStore {
  store: HandlersStoreType;

  constructor() {
    this.store = Object.values(METHODS).reduce<HandlersStoreType>(
      (acc, item) => ({ ...acc, [item]: [] }),
      {} as HandlersStoreType,
    );
  }

  getHandler(method: Methods, path: string): undefined | RequestHandler {
    const record = this.store[method].find(({ pathSchema }) => {
      return pathSchema === path;
    });

    return record?.handler;
  }

  setHandler(method: Methods, pathSchema: string, handler: RequestHandler) {
    this.store[method].push({ pathSchema, handler });
  }
}
