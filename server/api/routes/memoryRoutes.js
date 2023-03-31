const express = require("express");
const { postMemoryByAdd, postMemory, postMemoryPhoto, postMemoryTag, getMemoriesById, getPhotosByCoupleId } = require("../controllers/memoryController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.array("photos"), postMemoryByAdd);
router.post("/", postMemory);
router.post("/photo", postMemoryPhoto);
router.post("/tag", postMemoryTag);

router.get("/", getMemoriesById);
router.get("/photo/:couple_id", getPhotosByCoupleId)

module.exports = router;
