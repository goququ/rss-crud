import { IncomingMessage } from "node:http";

export const promisifyMessage = (stream: IncomingMessage) =>
  new Promise((res, rej) => {
    let data = "";

    stream.on("data", (chunk: string) => {
      data += chunk;
    });

    stream.on("end", () => {
      res(data);
    });

    stream.on("error", rej);
  });
