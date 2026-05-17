import  fs  from 'fs';
import type { NextFunction, Request, Response } from "express";

export const logger=(req: Request, res: Response, next: NextFunction) => {
  const time = new Date().toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});
  const log = `\nThis is ${req.method} method and Url ==> ${req.url}, and Time is ${time}\n`;
  fs.appendFile("log.txt", log, (err) => {
    err;
  });
  next();
}