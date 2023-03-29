const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
const lettersRouter = require("./api/routes/lettersRoutes");
const authRouter = require("./api/routes/authRoutes");
const userRouter = require("./api/routes/userRoutes");
const coupleRouter = require("./api/routes/coupleRoutes");
const memoryRouter = require("./api/routes/memoryRoutes");

/** 기본 설정 */
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(cookieEncrypter(process.env.COOKIE_SECRET_KEY));
app.use("/api/letter", lettersRouter);
app.use("/api/user", userRouter);
app.use("/api/couple", coupleRouter);
app.use("/api/memory", memoryRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
