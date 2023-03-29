const express = require("express");
const { postMemoryByAdd, postMemory, postMemoryPhoto, postMemoryTag, getMemoriesByCoupleId } = require("../controllers/memoryController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.array("photos"), postMemoryByAdd);
router.post("/", postMemory);
router.post("/photo", postMemoryPhoto);
router.post("/tag", postMemoryTag);

router.get("/:couple_id", getMemoriesByCoupleId);

module.exports = router;
