import { createServer } from "./server";
import * as http from "http";

describe("GET /user", function () {
  let server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;

  beforeEach(async () => {
    server = await createServer();
  });

  it("responds with json", function (done) {
    // server.
  });
});
