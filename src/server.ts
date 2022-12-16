import * as dotenv from "dotenv";
dotenv.config();
import * as http from "http";
import { Router } from "./router";

const main = async () => {
  const router = new Router({ baseUrl: "/api" });

  router
    .post("/users", (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("ok");
    })
    .get("/users", (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("ok");
    });

  const server = http.createServer(router.handle);

  server.listen(process.env.RSS_APP_PORT, () => {
    console.log(`Server listening on port: ${process.env.RSS_APP_PORT}`);
  });
};

main().catch((error) => {
  console.error("Backend failed to start up", error);
  process.exit(1);
});
