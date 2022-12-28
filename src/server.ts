import * as dotenv from "dotenv";
dotenv.config();

import * as http from "http";

import { parseBodyJson } from "./middleware/parseBody";
import { UserHandlers } from "./handlers/UserHandlers";
import { Router } from "./router";
import { Store } from "./store";
import { ROUTES } from "./router/consts";

export const createServer = async ({ notify } = { notify: true }) => {
  const router = new Router({ baseUrl: "" });
  const store = new Store();
  const handlers = new UserHandlers({ store });

  router.use(parseBodyJson);

  router
    .get(ROUTES.users, handlers.getUsersHandler.bind(handlers))
    .post(ROUTES.users, handlers.addUserHandler.bind(handlers))
    .get(ROUTES.singleUser, handlers.getUserByIdHandler.bind(handlers))
    .put(ROUTES.singleUser, handlers.updateUserByIdHandler.bind(handlers))
    .delete(ROUTES.singleUser, handlers.deleteUserById.bind(handlers));

  const server = http.createServer(router.handle);

  server.listen(process.env.RSS_APP_PORT, () => {
    if (notify) {
      console.log(`Server listening on port: ${process.env.RSS_APP_PORT}`);
    }
  });

  return server;
};
