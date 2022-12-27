import { createServer } from "./server";

createServer().catch((error) => {
  console.error("Backend failed to start up", error);
  process.exit(1);
});
