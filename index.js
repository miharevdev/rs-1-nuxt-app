require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error-middleware');

const userRouter = require("./routes/user.routes.js");
const postRouter = require("./routes/post.routes.js");
const authRouter = require("./routes/auth.routes.js")

const port  = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", authRouter);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`SERVER STARTED on port ${port}` );
})  