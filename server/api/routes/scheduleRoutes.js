const express = require("express");
const { getSchedulesByCoupleId, postSchedule } = require("../controllers/scheduleController");
const router = express.Router();

router.get("/couple/:couple_id", getSchedulesByCoupleId);
router.post("/", postSchedule);

module.exports = router;
