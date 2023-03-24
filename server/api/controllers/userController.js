const pool = require("../../config/db");

/** kakao_id를 통한 유저 정보 확인 */
const getUserByKakaoId = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { kakao_id } = req.params;
    const sql = `SELECT * FROM users WHERE kakao_id = ?`;
    const params = [kakao_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "유저 정보를 불러오는데 실패했습니다." });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

/** 신규 회원 등록 */
const postUser = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { user_id, kakao_id, nickname, age_range, birthday, birthday_type, email, gender, connected_at, couple_code, is_couple } = req.body;
    const sql = `
    INSERT INTO users (user_id, kakao_id, nickname, age_range, birthday, birthday_type, email, gender, connected_at, couple_code, is_couple)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [user_id, kakao_id, nickname, age_range, birthday, birthday_type, email, gender, connected_at, couple_code, is_couple];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "회원 등록에 실패했습니다." });
      } else {
        res.status(201).json({ message: "회원이 성공적으로 등록되었습니다." });
      }
    });
    conn.release();
  });
};

module.exports = { getUserByKakaoId, postUser };
