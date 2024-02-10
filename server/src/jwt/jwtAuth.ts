import jwt from 'jsonwebtoken';

export const jwtSign = (payload: any, secret: any, options: any) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

export const jwtVerify = (token: any, secret: any) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

export const getJwt = (req: any) => {
  return req.headers.authorization.split(' ')[1];
};
