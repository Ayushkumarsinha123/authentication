import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.js'
import { setUser } from '../services/auth.js';

async function handleCreateNewUser(req, res) {
  const { name , email , password} = req.body;

  if(
    !name ||
    !email ||
    !password
  ) return res.status(400).json({msg : "all fields are required"});
  const newUser = await User.create({
    name, 
    email,
    password
  })
  return res.redirect('/home')
}

async function handleLoginUser(req,res) {
  const {email , password} = req.body;
  const result = await User.findOne({
    email, password
  })
  if(!result) return res.render("login", {
    error : "invalid email or password"
  })
  console.log(result);
  console.log(result.role);
  // const sessionId = uuidv4();
  const token = setUser(result);
  res.cookie("token",token)
  return res.redirect('/home');
}

async function handleHome(req, res) {
  const name = req.query.name;
 return res.render('home',{name});
}
export {
  handleCreateNewUser,
  handleLoginUser, 
  handleHome
}