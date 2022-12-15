import * as dotenv from "dotenv";
dotenv.config();
import * as http from "http";

const main = async () => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("ok");
  });

  server.listen(process.env.RSS_APP_PORT, () => {
    console.log(`Server listening on port: ${process.env.RSS_APP_PORT}`);
  });
};

main().catch((error) => {
  console.error("Backend failed to start up", error);
  process.exit(1);
});
