const express = require("express");
const router = express.Router();
const { getAnniversariesByCoupleId, postAnniversary } = require("../controllers/anniversaryController");

router.get("/:couple_id", getAnniversariesByCoupleId);
router.post("/", postAnniversary);

module.exports = router;
