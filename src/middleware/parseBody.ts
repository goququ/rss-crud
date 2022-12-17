import { Middleware, promisifyMessage } from "./../utils/message";

export const parseBodyJson: Middleware = async (req, res, next) => {
  const data = await promisifyMessage(req).then(JSON.parse);
  req.body = data;
  next();
};
