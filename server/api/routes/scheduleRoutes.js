const express = require("express");
const { getSchedulesByCoupleId, postSchedule, deleteScheduleById, getScheduleById, updateSchedule } = require("../controllers/scheduleController");
const router = express.Router();

router.get("/couple/:couple_id", getSchedulesByCoupleId);
router.get("/:schedule_id", getScheduleById);
router.put("/:schedule_id", updateSchedule);
router.post("/", postSchedule);
router.delete("/:schedule_id", deleteScheduleById);

module.exports = router;
