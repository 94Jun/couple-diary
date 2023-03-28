const pool = require("../../../config/db");
const { generateRandomId } = require("../../../common");

/** couple_id를 통해 해당 커플이 작성한 letters및 작성자 nickname GET */
const getLettersByCoupleId = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { couple_id } = req.params;
    const sql = `
    SELECT l.*, r.readers, u.nickname
    FROM letters l
    LEFT JOIN (
      SELECT letter_id, JSON_ARRAYAGG(JSON_OBJECT('read_id', read_id, 'user_id', user_id, 'read_at', read_at)) as readers
        FROM letter_readers
        GROUP BY letter_id
    )r ON l.letter_id = r.letter_id
    LEFT JOIN users u ON l.user_id = u.user_id
    WHERE couple_id = ?
    ORDER BY created_at DESC;
    `;
    const params = [couple_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "편지 목록을 불러오는데 실패했습니다." });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

/** letters 테이블 POST */
const postLetter = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { content, user_id, couple_id, paper_style, font_style } = req.body;
    const letter_id = generateRandomId("letter"); // 편지 ID 생성
    const sql = `
      INSERT INTO letters (letter_id, couple_id, user_id, content, paper_style, font_style)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const params = [letter_id, couple_id, user_id, content, paper_style, font_style];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "편지 작성에 실패했습니다." });
      } else {
        res.status(201).json({ message: "편지가 성공적으로 등록되었습니다." });
      }
    });
    conn.release();
  });
};

/** 편지 열람에 따른 letter_readers 테이블 POST */
const postLetterReader = (req, res) => {
  const { letter_id, user_id } = req.body;
  const read_id = generateRandomId("read");
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `INSERT INTO letter_readers (read_id, letter_id, user_id) VALUES (?, ?, ?)`;
    const params = [read_id, letter_id, user_id];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "편지 조회 등록에 실패했습니다." });
      } else {
        res.status(201).json({ message: "편지 조회가 성공적으로 등록되었습니다." });
      }
    });
    conn.release();
  });
};

module.exports = { getLettersByCoupleId, postLetter, postLetterReader };
