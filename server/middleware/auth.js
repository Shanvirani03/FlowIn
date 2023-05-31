import jwt from 'jsonwebtoken';
import { UserModel } from '../src/models/Users.js';

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'you must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({error: "you must be logged in"})
    }
    const { _id } = payload;
    UserModel.findById(_id)
      .then((userdata) => {
        req.user = userdata;
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ error: 'you must be logged in' });
      });
  });
};



