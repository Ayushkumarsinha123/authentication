import express from "express"
const port = 3000;
const app = express();
import cookieParser from "cookie-parser";
import userRouter from './routes/user.js';
import homeRouter from './routes/home.js';
import { checkForAuthentication,restrictTo } from "./middlewares/auth.js";
import { connectMongoDb } from "./connection.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);


app.set("view engine", "ejs");
app.set("views", './views');
// mongoDb connection
connectMongoDb("mongodb://localhost:27017/auth-app").then(() => {
  console.log("mongoDb connected");
})

//routes
app.use('/api/users', userRouter);
app.use('/home',restrictTo(['NORMAL']),homeRouter);

//static routes
app.get("/signup",(req, res) => {
  res.render("signup");
})
app.get('/login',(req, res) => {
  res.render("login");
})


app.listen(port,() => {
  console.log(`server running on port:${3000}`);
})