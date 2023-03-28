const { requestGetSign, requestDeleteSignByUserId, requestDeleteSignByCoupleCode, requestPostCouple, requestPostSign } = require("./requestCouple");

const { requestUserUpdate } = require("../userController/requestUser");

/** 커플 등록 시 실행되는 함수
 * 1. couple_sign 테이블에 본인의 couple_code가 없는 경우 : couple_sign 테이블 POST
 * 2. couple_sign 테이블에 본인의 couple_code가 있는 경우 : couple_sign 테이블 DELETE + couples 테이블 POST
 */
const registCouple = async (req, res) => {
  const { user_id1, user_id2, couple_code1, couple_code2 } = req.body;
  try {
    const signInfo = await requestGetSign(user_id2);
    const validCode = signInfo ? signInfo.find((sign) => (sign.couple_code = couple_code1)) : null;
    if (validCode) {
      await requestDeleteSignByUserId(user_id1, user_id2);
      await requestDeleteSignByCoupleCode(couple_code1, couple_code2);
      await requestPostCouple(user_id1, user_id2);
      await requestUserUpdate(user_id1, user_id2, true);
    } else {
      await requestPostSign(user_id1, couple_code2);
    }
    res.status(200).json({ message: "커플 등록 완료" });
  } catch (error) {
    res.status(500).json({ message: "커플 등록 실패" });
  }
};

module.exports = { registCouple };
