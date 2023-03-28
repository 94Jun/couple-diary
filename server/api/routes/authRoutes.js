const express = require("express");
const router = express.Router();
const { kakaoLogin, checkLogin, kakaoLogout } = require("../controllers/authController");

router.get("/kakao/callback/login", kakaoLogin);
router.get("/kakao/callback/logout", kakaoLogout)
router.get("/login/maintenance", checkLogin);

module.exports = router;
