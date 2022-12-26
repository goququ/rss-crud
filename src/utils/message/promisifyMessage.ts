import { PatchedIncomingMessage } from "./types";

export const promisifyMessage = (stream: PatchedIncomingMessage) =>
  new Promise<string | undefined>((res, rej) => {
    let data = "";

    stream.on("data" as const, (chunk: string) => {
      data += chunk;
    });

    stream.on("end", () => {
      res(data);
    });

    stream.on("error", rej);
  });
