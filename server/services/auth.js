// const sessionIdToUseMap = new Map(); // implementation of session and maintaining state
import jwt from 'jsonwebtoken';
const secret = "ayush$123@$";

function setUser(user) {
    // sessionIdToUseMap.set(id, user)
    return jwt.sign({
      _id: user.id,
      email:user.email,
      role :user.role,
    }, secret);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

export {
  setUser,
  getUser
};