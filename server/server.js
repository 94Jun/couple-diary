const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
const lettersRouter = require("./api/routes/lettersRoutes");
const authRouter = require("./api/routes/authRoutes");
const userRouter = require("./api/routes/userRoutes");
const coupleRouter = require("./api/routes/coupleRoutes");

/** 기본 설정 */
const app = express();
const PORT = 4000;
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(cookieEncrypter(process.env.COOKIE_SECRET_KEY));
app.use("/api/letter", lettersRouter);
app.use("/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/couple", coupleRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
