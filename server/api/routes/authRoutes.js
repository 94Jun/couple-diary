const express = require("express");
const router = express.Router();
const { kakaoLogin, getTokenValidation } = require("../controllers/authController");

router.get("/kakao/callback/login", kakaoLogin);
router.get("/token/validation", getTokenValidation);

module.exports = router;
