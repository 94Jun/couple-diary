const pool = require("../../../config/db");
const { registCouple } = require("./registCouple");
const { disconnectCouple } = require("./disconnectCouple");

/** user_id를 통한 couple_sign 테이블 GET */
const getCoupleSign = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { user_id } = req.params;
    const sql = `SELECT * FROM couple_sign WHERE user_id = ?`;
    const params = [user_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "커플 사인 정보를 불러오는데 실패했습니다." });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

/** 커플들이 신청한 couple_sign 테이블 DELETE */
const deleteCoupleSignByUserId = (req, res) => {
  const { user_id1, user_id2 } = req.query;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `DELETE FROM couple_sign WHERE user_id IN (?, ?)`;
    const params = [user_id1, user_id2];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러입니다." });
        return;
      }
      res.status(200).json({ message: "삭제되었습니다." });
    });
    conn.release();
  });
};

/** 커플들에게 요청한 couple_sign 테이블 DELETE */
const deleteCoupleSignByCoupleCode = (req, res) => {
  const { couple_code1, couple_code2 } = req.query;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `DELETE FROM couple_sign WHERE couple_code IN (?, ?)`;
    const params = [couple_code1, couple_code2];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러입니다." });
        return;
      }
      res.status(200).json({ message: "삭제되었습니다." });
    });
    conn.release();
  });
};

/** couple_sign 테이블 POST */
const postCoupleSign = (req, res) => {
  const { sign_id, user_id, couple_code } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `
    INSERT INTO couple_sign(sign_id, user_id, couple_code)
    VALUES(?, ?, ?);
    `;
    const params = [sign_id, user_id, couple_code];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "커플 사인 등록에 실패했습니다." });
      } else {
        res.status(201).json({ message: "커플 사인이 성공적으로 등록되었습니다." });
      }
    });
    conn.release();
  });
};

/** couple 테이블 POST */
const postCouple = (req, res) => {
  const { couple_id, user_id1, user_id2 } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const profile_url = `${process.env.AWS_S3_BUCKET_URL}/profile/default_profile.jpeg`;
    const sql = `
    INSERT INTO couples(couple_id, user_id1, user_id2, profile_url)
    VALUES(?, ?, ?, ?);
    `;
    const params = [couple_id, user_id1, user_id2, profile_url];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "커플 등록에 실패했습니다." });
      } else {
        res.status(201).json({ message: "커플이 성공적으로 등록되었습니다." });
      }
    });
    conn.release();
  });
};

/** couple_sign 테이블 및 해당 couple_code 유저 join GET */
const getCoupleSignWithUser = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { user_id } = req.params;
    const sql = `
    SELECT u.*, cs.sign_id FROM users u
    JOIN couple_sign cs ON u.couple_code = cs.couple_code
    WHERE cs.user_id = ?;
    `;
    const params = [user_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "커플 사인 정보를 불러오는데 실패했습니다." });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

/** sign_id를 이용해 couple_sign 테이블 DELETE */
const deleteCoupleSignBySignId = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { sign_id } = req.params;
    const sql = `DELETE FROM couple_sign WHERE sign_id = ?`;
    const params = [sign_id];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러입니다." });
        return;
      }
      res.status(200).json({ message: "삭제되었습니다." });
    });
    conn.release();
  });
};

/** couples 테이블 DELETE */
const deleteCoupleByCoupleId = (req, res) => {
  const { couple_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `DELETE FROM couples WHERE couple_id = ?`;
    const params = [couple_id];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러입니다." });
        return;
      }
      res.status(200).json({ message: "삭제되었습니다." });
    });
    conn.release();
  });
};

module.exports = {
  deleteCoupleSignByCoupleCode,
  deleteCoupleSignBySignId,
  getCoupleSign,
  getCoupleSignWithUser,
  deleteCoupleSignByUserId,
  postCouple,
  postCoupleSign,
  deleteCoupleByCoupleId,
  registCouple,
  disconnectCouple,
};
