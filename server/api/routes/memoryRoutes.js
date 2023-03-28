const express = require("express");
const { postMemoryByAdd, postMemory, postMemoryPhoto, postMemoryTag, getMemoriesByCoupleId } = require("../controllers/memoryController");
const router = express.Router();

router.post("/add", postMemoryByAdd);
router.post("/", postMemory);
router.post("/photo", postMemoryPhoto);
router.post("/tag", postMemoryTag);

router.get("/:couple_id", getMemoriesByCoupleId);

module.exports = router;
