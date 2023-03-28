const express = require("express");
const { getLettersByCoupleId, postLetter, postLetterReader } = require("../controllers/letterController");
const router = express.Router();

router.get("/:couple_id", getLettersByCoupleId);
router.post("/", postLetter);
router.post("/reader", postLetterReader)

module.exports = router;
