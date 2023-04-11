const pool = require("../../../config/db");
const { generateRandomId } = require("../../../common");

const getAnniversariesByCoupleId = (req, res) => {
  const { couple_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `SELECT * FROM anniversaries WHERE couple_id = ? ORDER BY event_date ASC`;
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

const postAnniversary = (req, res) => {
  const { couple_id, event_name, event_date } = req.body;
  const anniversary_id = generateRandomId("ann");
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `INSERT INTO anniversaries (anniversary_id, couple_id, event_name, event_date) VALUES (?, ?, ?, ?)`;
    const params = [anniversary_id, couple_id, event_name, event_date];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(201).json({ message: "기념일이 생성되었습니다." });
      }
    });
    conn.release();
  });
};

module.exports = { getAnniversariesByCoupleId, postAnniversary };
