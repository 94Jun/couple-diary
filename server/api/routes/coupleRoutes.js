const express = require("express");
const {
  getCoupleSign,
  deleteCoupleSignByUserId,
  postCouple,
  postCoupleSign,
  getCoupleSignWithUser,
  deleteCoupleSignBySignId,
  deleteCoupleSignByCoupleCode,
  disconnectCouple,
  deleteCoupleByCoupleId,
  registCouple,
  updateCouple,
} = require("../controllers/coupleController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/regist", registCouple);
router.get("/couple-sign/:user_id", getCoupleSign);
router.get("/couple-sign/join-user/:user_id", getCoupleSignWithUser);
router.delete("/couple-sign/user-id", deleteCoupleSignByUserId);
router.delete("/couple-sign/couple-code", deleteCoupleSignByCoupleCode);
router.delete("/couple-sign/:sign_id", deleteCoupleSignBySignId);
router.delete("/:couple_id", deleteCoupleByCoupleId);
router.post("/", postCouple);
router.post("/couple-sign", postCoupleSign);
router.post("/disconnect", disconnectCouple);
router.put("/:couple_id", upload.single("profile"), updateCouple);

module.exports = router;
