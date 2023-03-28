const axios = require("axios");
const { generateRandomId } = require("../../../common");

/** couple_sign 테이블 GET 요청 */
const requestGetSign = async (user_id) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/couple/couple-sign/${user_id}`,
    method: "GET",
  };
  const res = await axios(config);
  return res.data;
};

/** couple_sign 테이블 DELETE 요청 */
const requestDeleteSignByUserId = async (user_id1, user_id2) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/couple/couple-sign/user-id?user_id1=${user_id1}&user_id2=${user_id2}`,
    method: "DELETE",
  };
  await axios(config);
};

/** couple_sign 테이블 DELETE 요청 */
const requestDeleteSignByCoupleCode = async (couple_code1, couple_code2) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/couple/couple-sign/couple-code?couple_code1=${couple_code1}&couple_code2=${couple_code2}`,
    method: "DELETE",
  };
  await axios(config);
};

/** couple_sign 테이블 POST 요청 */
const requestPostSign = async (user_id, couple_code) => {
  const sign_id = generateRandomId("sign");
  const config = {
    url: `${process.env.SERVER_URL}/api/couple/couple-sign`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { sign_id, user_id, couple_code },
  };
  await axios(config);
};

/** couple 테이블 POST 요청 */
const requestPostCouple = async (user_id1, user_id2) => {
  const couple_id = generateRandomId("couple");
  const config = {
    url: `${process.env.SERVER_URL}/api/couple`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { couple_id, user_id1, user_id2 },
  };
  await axios(config);
};

/** couples 테이블 DELETE 요청 */
const requestDeleteCoupleByCoupleId = async (couple_id) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/couple/${couple_id}`,
    method: "DELETE",
  };
  await axios(config);
};

module.exports = {
  requestGetSign,
  requestDeleteSignByUserId,
  requestDeleteSignByCoupleCode,
  requestPostSign,
  requestPostCouple,
  requestDeleteCoupleByCoupleId,
};
