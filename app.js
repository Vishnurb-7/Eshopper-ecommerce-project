const express = require("express");
const app = express();
const port =5000;
const path = require("path");
const session =require('express-session')
const cookie_parser =require("cookie-parser")
const adminRouter = require("./routes/admin");
const userRouter =require('./routes/user')
const db = require("./config/connection");
const expressLayouts = require("express-ejs-layouts");

app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.set("layout", "./layout/layout");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie_parser())




app.use(session({
  secret:"1234",
  saveUninitialized:true,
  cookie:{maxAge:3000000},
  resave:false

}))
app.use(function (req, res, next) {
  res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});


db.connect((err) => {
  if (err) console.log("Connection Error" + err);
  else console.log("Database Connected successfully");
});


app.use('/',userRouter)
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("Server started");
});
