require("dotenv").config(); //loads environment variables from .env file into process.env
var helmet= require("helmet");
const express = require("express");
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const app = express();
app.use(helmet());
const port = 3001;

app.use(express.json()) // parses incoming requests with JSON payloads
app.use(cookieParser()) //parses cookies attached to the client request object
app.use(fileUpload())

const apiRoutes = require("./routes/apiRoutes");


// mongodb connection
const connectDB = require("./config/db");
connectDB();


app.use("/api", apiRoutes);

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html")));
} else {
 app.get("/", (req,res) => {
    res.json({ message: "API running..." }); 
 }) 
}

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
      res.status(500).json({
         message: error.message, 
      })
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

