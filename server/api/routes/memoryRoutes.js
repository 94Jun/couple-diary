const express = require("express");
const { postMemoryByAdd, postMemory, postMemoryPhoto, postMemoryTag, getMemoriesById } = require("../controllers/memoryController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.array("photos"), postMemoryByAdd);
router.post("/", postMemory);
router.post("/photo", postMemoryPhoto);
router.post("/tag", postMemoryTag);

router.get("/", getMemoriesById);

module.exports = router;
