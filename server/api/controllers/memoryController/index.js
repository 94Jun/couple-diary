const pool = require("../../../config/db");
const { postMemoryByAdd } = require("./postMemoryByAdd");
const { editMemoryById } = require("./editMemoryById");

/** memories 테이블 POST */
const postMemory = (req, res) => {
  const { memory_id, couple_id, user_id, title, content, memory_date } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection Error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `
    INSERT INTO memories (memory_id, couple_id, user_id, title, content, memory_date)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [memory_id, couple_id, user_id, title, content, memory_date];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query Error", err);
        res.status(500).json({ message: "메모리 등록에 실패했습니다." });
      } else {
        res.status(201).json({ message: "메모리가 성공적으로 등록되었습니다." });
      }
    });
    conn.release();
  });
};

/** memory_photos 테이블 POST */
const postMemoryPhoto = (req, res) => {
  const { photo_id, memory_id, photo_url } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection Error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `
    INSERT INTO memory_photos (photo_id, memory_id, photo_url)
    VALUES (?, ?, ?)
    `;
    const params = [photo_id, memory_id, photo_url];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query Error", err);
        res.status(500).json({ message: "메모리 사진 등록에 실패했습니다." });
      } else {
        res.status(201).json({ message: "메모리 사진 등록에 성공했습니다." });
      }
    });
    conn.release();
  });
};

/** memory_tags 테이블 POST */
const postMemoryTag = (req, res) => {
  const { tag_id, memory_id, tag_name } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection Error", err);
      res.status(500).json({ message: "서버 에러입니다." });
      return;
    }
    const sql = `
    INSERT INTO memory_tags (tag_id, memory_id, tag_name)
    VALUES (?, ?, ?)
    `;
    const params = [tag_id, memory_id, tag_name];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query Error", err);
        res.status(500).json({ message: "메모리 태그 등록에 실패했습니다." });
      } else {
        res.status(201).json({ message: "메모리 태그 등록에 성공했습니다." });
      }
    });
    conn.release();
  });
};

/** memories 테이블 최신 순 GET */
const getMemoriesById = (req, res) => {
  const { sort, type, id, page } = req.query;
  const limit = 30;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `
    SELECT m.*, p.photos, t.tags, c.comments
    FROM memories m
    LEFT JOIN (
      SELECT memory_id, JSON_ARRAYAGG(JSON_OBJECT('photo_id', photo_id, 'photo_url', photo_url, 'created_at', created_at)) as photos
      FROM memory_photos
      GROUP BY memory_id
    ) p ON m.memory_id = p.memory_id
    LEFT JOIN (
      SELECT memory_id, JSON_ARRAYAGG(JSON_OBJECT('tag_id', tag_id, 'tag_name', tag_name)) as tags
      FROM memory_tags
      GROUP BY memory_id
    ) t ON m.memory_id = t.memory_id
    LEFT JOIN (
      SELECT mc.memory_id, JSON_ARRAYAGG(JSON_OBJECT('comment_id', mc.comment_id, 'user_id', mc.user_id, 'nickname', u.nickname, 'content', mc.content, 'created_at', mc.created_at, 'updated_at', mc.updated_at)) as comments
      FROM memory_comments mc
      JOIN users u ON mc.user_id = u.user_id
      GROUP BY mc.memory_id
    ) c ON m.memory_id = c.memory_id
    WHERE ${type === "memory" ? "m.memory" : type}_id = ?
    ORDER BY m.memory_date DESC
    ${page ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : ""};
    `;
    const params = [id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query Error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

/** memoires 테이블의 memory_date 기준 내림차순 기준으로 memory_photos 테이블 100개 GET*/
const getPhotosByCoupleId = (req, res) => {
  const { couple_id } = req.params;
  const limit = 200;
  const { page } = req.query;

  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection Error", err);
      res.status(500).json({ message: "server error" });
      return;
    }
    const sql = `
    SELECT m.*, mp.photo_id, mp.photo_url
    FROM memories m
    JOIN memory_photos mp ON m.memory_id = mp.memory_id
    WHERE m.couple_id = ?
    ORDER BY m.memory_date DESC
    LIMIT ${limit} OFFSET ${(page - 1) * limit};
    `;
    const params = [couple_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query Error", err);
        res.status(500).json({ message: "query error" });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

/** memory_photos 테이블 count */
const getPhotosLength = (req, res) => {
  const { couple_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection Error", err);
      res.status(500).json({ message: "server error" });
      return;
    }
    const sql = `
    SELECT COUNT(*) AS length
    FROM memories
    JOIN memory_photos ON memories.memory_id = memory_photos.memory_id
    WHERE memories.couple_id = ?;
    `;
    const params = [couple_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query Error", err);
        res.status(500).json({ message: "query error" });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

const deletePhotoById = (req, res) => {
  const { photo_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error(`server error`, err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `DELETE FROM memory_photos WHERE photo_id = ?`;
    const params = [photo_id];
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

const getMemoryLengthByCoupleId = (req, res) => {
  const { couple_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Connection Error", err);
      res.status(500).json({ message: "server error" });
      return;
    }
    const sql = `
    SELECT COUNT(*) AS length
    FROM memories
    WHERE couple_id = ?;
    `;
    const params = [couple_id];
    conn.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error("Query Error", err);
        res.status(500).json({ message: "query error" });
      } else {
        res.status(200).json(rows);
      }
    });
    conn.release();
  });
};

const deleteMemoryById = (req, res) => {
  const { memory_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error(`server error`, err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `DELETE FROM memories WHERE memory_id = ?`;
    const params = [memory_id];
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

const updateMemory = (req, res) => {
  const { memory_id } = req.params;
  const { title, content, memory_date } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("connection error", err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `
    UPDATE memories
    SET title = ?, content = ?, memory_date = ?
    WHERE memory_id = ?
    `;
    const params = [title, content, memory_date, memory_id];
    conn.query(sql, params, (err, result) => {
      if (err) {
        console.error("Query error", err);
        res.status(500).json({ message: "쿼리 에러" });
      } else {
        res.status(200).json({ message: "추억이 수정되었습니다." });
      }
    });
    conn.release();
  });
};

const deleteTagsByMemoryId = (req, res) => {
  const { memory_id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      console.error(`server error`, err);
      res.status(500).json({ message: "서버 에러" });
      return;
    }
    const sql = `DELETE FROM memory_tags WHERE memory_id = ?`;
    const params = [memory_id];
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

module.exports = {
  postMemoryByAdd,
  postMemory,
  postMemoryPhoto,
  postMemoryTag,
  getMemoriesById,
  getPhotosByCoupleId,
  getPhotosLength,
  deletePhotoById,
  getMemoryLengthByCoupleId,
  deleteMemoryById,
  editMemoryById,
  updateMemory,
  deleteTagsByMemoryId
};
