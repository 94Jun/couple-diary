const pool = require("../../../config/db");

/** kakao_id를 통한 유저 정보 확인 */
const getUserByKakaoId = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { kakao_id } = req.params;
    const sql = `
    SELECT 
    u.*, c.couple_id, c.profile_url,
    CASE 
        WHEN c.couple_id IS NOT NULL THEN
            JSON_OBJECT(
                'user_id', couple_u.user_id,
                'kakao_id', couple_u.kakao_id,
                'nickname', couple_u.nickname,
                'age_range', couple_u.age_range,
                'birthday', couple_u.birthday,
                'birthday_type', couple_u.birthday_type,
                'email', couple_u.email,
                'gender', couple_u.gender,
                'connected_at', couple_u.connected_at,
                'couple_code', couple_u.couple_code,
                'is_couple', couple_u.is_couple
            )
        ELSE NULL
    END AS couple_user_info
    FROM users u
    LEFT JOIN couples c
    ON (u.user_id = c.user_id1 OR u.user_id = c.user_id2)
    LEFT JOIN users couple_u
    ON (u.user_id = c.user_id1 AND couple_u.user_id = c.user_id2)
        OR (u.user_id = c.user_id2 AND couple_u.user_id = c.user_id1)
    WHERE u.kakao_id = ?;
    `;
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

/** couple_code를 통한 유저 정보 확인 */
const getUserByCoupleCode = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const { couple_code } = req.params;
    const sql = `SELECT * FROM users WHERE couple_code = ?`;
    const params = [couple_code];
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

/** user_id를 통한 유저 정보 확인 */
const getUserById = (req, res) => {
  const { user_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `SELECT * FROM users WHERE user_id = ?`;
    const params = [user_id];
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
    let formattedGender = "선택안함";
    if (gender === "male") {
      formattedGender = "남";
    }
    if (gender === "female") {
      formattedGender = "여";
    }
    const sql = `
    INSERT INTO users (user_id, kakao_id, nickname, age_range, birthday, birthday_type, email, gender, connected_at, couple_code, is_couple)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [user_id, kakao_id, nickname, age_range, birthday, birthday_type, email, formattedGender, connected_at, couple_code, is_couple];
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

/** 커플 등록에 따른 users 테이블의 is_couple 정보 업데이트*/
const updateUserByChangeCouple = (req, res) => {
  const { status, user_id1, user_id2 } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `
    UPDATE users
    SET is_couple = ?
    WHERE user_id IN (?, ?);
    `;
    const params = [status, user_id1, user_id2];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러입니다." });
        return;
      }
      res.status(200).json({ message: "유저 정보가 업데이트 되었습니다." });
    });
    conn.release();
  });
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const { nickname, gender } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `
    UPDATE users
    SET nickname = ?, gender = ?
    WHERE user_id = ?
    `;
    const params = [nickname, gender, user_id];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(200).json({ message: "유저 정보가 수정되었습니다." });
      }
    });
    conn.release();
  });
};

module.exports = { getUserByKakaoId, postUser, getUserByCoupleCode, updateUserByChangeCouple, updateUser, getUserById };
