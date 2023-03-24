const express = require("express");
const { getUserByKakaoId, postUser } = require("../controllers/userController");
const router = express.Router();

router.get("/kakao/:kakao_id", getUserByKakaoId);
router.post("/", postUser)

module.exports = router;
