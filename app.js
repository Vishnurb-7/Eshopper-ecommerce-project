const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
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

db.connect((err) => {
  if (err) console.log("Connection Error" + err);
  else console.log("Database Connected successfully");
});


app.use('/',userRouter)
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("Server started");
});
