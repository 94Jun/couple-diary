const express = require("express");
const { getUserByKakaoId, postUser, getUserByCoupleCode, updateUserByChangeCouple } = require("../controllers/userController");
const router = express.Router();

router.get("/kakao/:kakao_id", getUserByKakaoId);
router.get("/couple-code/:couple_code", getUserByCoupleCode);
router.post("/", postUser);
router.put("/change-couple", updateUserByChangeCouple);

module.exports = router;
