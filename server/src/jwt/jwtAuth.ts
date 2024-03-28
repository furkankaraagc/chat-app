import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const jwtSign = (
  payload: object,
  secret: jwt.Secret,
  options: jwt.SignOptions,
) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

export const jwtVerify = (token: string, secret: jwt.Secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

export const getJwt = (req: Request) => {
  if (req.headers.authorization) {
    return req.headers.authorization.split(' ')[1];
  }
};
