require("dotenv").config();
var helmet = require('helmet')
const { createServer } = require("http");

const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();

app.use(helmet({
    contentSecurityPolicy: false, 
    crossOriginEmbedderPolicy: false
}))

const httpServer = createServer(app);


app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const admins = [];
let activeChats = [];
function get_random(array) {
   return array[Math.floor(Math.random() * array.length)]; 
}




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
    });
  }
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

