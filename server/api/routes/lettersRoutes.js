const express = require("express");
const { getLettersByCoupleId, postLetter, postLetterReader, deleteLetterById } = require("../controllers/letterController");
const router = express.Router();

router.get("/:couple_id", getLettersByCoupleId);
router.delete("/:letter_id", deleteLetterById);
router.post("/", postLetter);
router.post("/reader", postLetterReader);

module.exports = router;
