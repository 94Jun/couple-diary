const { requestDeleteCoupleByCoupleId } = require("./requestCouple");
const { requestUserUpdate } = require("../userController/requestUser");

/** 커플 연결 해제에 따라 couples 테이블 DELETE 및 users 테이블 UPDATE */
const disconnectCouple = async (req, res) => {
  const { couple_id, user_id1, user_id2 } = req.body;
  try {
    await requestUserUpdate(user_id1, user_id2, false);
    await requestDeleteCoupleByCoupleId(couple_id);
    res.status(201).json({ message: "커플 연결이 해제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "커플 연결 해제 실패" });
  }
};

module.exports = { disconnectCouple };
