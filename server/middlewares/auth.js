import { getUser } from "../services/auth.js";

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if(!tokenCookie) 
    return next();
  const token = tokenCookie;
  const user = getUser(token)
  
  req.user = user;

  return next();
  
}
// now we are making function that give us role {admins, normal, etc}
function restrictTo(roles=[]) {
 return function(req, res, next) {
  if(!req.user) return res.redirect("/login");
  if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
 return next();
 }
 }
export {
  checkForAuthentication,
  restrictTo
}