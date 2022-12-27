import { Middleware, promisifyMessage } from "./../utils/message";

export const parseBodyJson: Middleware = async (req, res, next) => {
  const textData = await promisifyMessage(req);

  if (textData) {
    try {
      req.body = JSON.parse(textData);
      next();
    } catch (error) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  } else {
    next();
  }
};
