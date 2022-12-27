import * as dotenv from "dotenv";
dotenv.config();
import * as http from "http";

import { parseBodyJson } from "./middleware/parseBody";
import { UserHandlers } from "./handlers/UserHandlers";
import { Router } from "./router";
import { Store } from "./store";
import { ROUTES } from "./router/consts";

const main = async () => {
  const router = new Router({ baseUrl: "" });
  const store = new Store();
  const handlers = new UserHandlers({ store });

  router.use(parseBodyJson);

  router
    .get(ROUTES.users, handlers.getUsersHandler)
    .post(ROUTES.users, handlers.addUserHandler)
    .get(ROUTES.singleUser, handlers.getUserByIdHandler)
    .put(ROUTES.singleUser, handlers.updateUserByIdHandler);

  const server = http.createServer(router.handle);

  server.listen(process.env.RSS_APP_PORT, () => {
    console.log(`Server listening on port: ${process.env.RSS_APP_PORT}`);
  });
};

main().catch((error) => {
  console.error("Backend failed to start up", error);
  process.exit(1);
});
