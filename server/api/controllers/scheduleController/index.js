const pool = require("../../../config/db");
const { generateRandomId } = require("../../../common");

const getSchedulesByCoupleId = (req, res) => {
  const { couple_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `SELECT * FROM schedules WHERE couple_id = ? ORDER BY schedule_date ASC, schedule_time ASC`;
    const params = [couple_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

const postSchedule = (req, res) => {
  const { couple_id, user_id, title, content, schedule_date, schedule_time } = req.body;
  const schedule_id = generateRandomId("schedule");
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `INSERT INTO schedules (schedule_id, couple_id, user_id, title, content, schedule_date, schedule_time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [schedule_id, couple_id, user_id, title, content, schedule_date, schedule_time];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(201).json({ message: "일정이 생성되었습니다." });
      }
    });
    conn.release();
  });
};

const deleteScheduleById = (req, res) => {
  const { schedule_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error(`server error`, err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `DELETE FROM schedules WHERE schedule_id = ?`;
    const params = [schedule_id];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error(`Query error`, err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(200).json({ message: "삭제 완료" });
      }
    });
    conn.release();
  });
};

const getScheduleById = (req, res) => {
  const { schedule_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `SELECT * FROM schedules WHERE schedule_id = ?`;
    const params = [schedule_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

const updateSchedule = (req, res) => {
  const { schedule_id } = req.params;
  const { title, content, schedule_date, schedule_time } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `
    UPDATE schedules
    SET title = ?, content = ?, schedule_date = ?, schedule_time = ?
    WHERE schedule_id = ?
    `;
    const params = [title, content, schedule_date, schedule_time, schedule_id];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(200).json({ message: "일정이 수정되었습니다." });
      }
    });
    conn.release();
  });
};

module.exports = { getSchedulesByCoupleId, postSchedule, deleteScheduleById, getScheduleById, updateSchedule };
