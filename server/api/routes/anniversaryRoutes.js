const express = require("express");
const router = express.Router();
const {
  getAnniversariesByCoupleId,
  postAnniversary,
  deleteAnniversaryById,
  getAnniversaryById,
  updateAnniversary,
} = require("../controllers/anniversaryController");

router.get("/couple/:couple_id", getAnniversariesByCoupleId);
router.get("/:anniversary_id", getAnniversaryById);
router.put("/:anniversary_id", updateAnniversary);
router.post("/", postAnniversary);
router.delete("/:anniversary_id", deleteAnniversaryById);

module.exports = router;
