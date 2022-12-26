import { Middleware, promisifyMessage } from "./../utils/message";

export const parseBodyJson: Middleware = async (req, res, next) => {
  const textData = await promisifyMessage(req);
  let data;

  if (textData) {
    data = JSON.parse(textData);
  }
  req.body = data;
  next();
};
