const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const productRoute = require("./routes/productRoute")
const app = express();
const path = require("path");

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname,"uploads")));


// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api", productRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
  });
  
  // Error Middleware
  app.use(errorHandler);
  app.use(authMiddleware)
  // connect to db
  const PORT = process.env.PORT || 8000;
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
      });
    })
    .catch((err) => console.log(err));