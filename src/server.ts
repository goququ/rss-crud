import * as dotenv from "dotenv";
dotenv.config();
import * as http from "http";

import { parseBodyJson } from "./middleware/parseBody";
import { UserHandlers } from "./handlers/UserHandlers";
import { Router } from "./router";
import { Store } from "./store";

const main = async () => {
  const router = new Router({ baseUrl: "/api" });
  const store = new Store();
  const handlers = new UserHandlers({ store });

  router.use(parseBodyJson);

  router
    .get("/users", handlers.getUsersHandler)
    .post("/users", handlers.addUserHandler);

  const server = http.createServer(router.handle);

  server.listen(process.env.RSS_APP_PORT, () => {
    console.log(`Server listening on port: ${process.env.RSS_APP_PORT}`);
  });
};

main().catch((error) => {
  console.error("Backend failed to start up", error);
  process.exit(1);
});
