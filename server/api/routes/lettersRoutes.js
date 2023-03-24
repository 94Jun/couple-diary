const express = require("express");
const { getLettersByCoupleId, postLetter } = require("../controllers/letterController");
const router = express.Router();

router.get("/:couple_id", getLettersByCoupleId);
router.post("/", postLetter);

module.exports = router;
