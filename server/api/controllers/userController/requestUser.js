const axios = require("axios");
const { generateRandomId } = require("../../../common");

/** 커플 등록에 따른 users 테이블 update 요청 */
const requestUserUpdate = async (user_id1, user_id2, status) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/user/change-couple`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: { status, user_id1, user_id2 },
  };
  await axios(config);
};

/** access_token으로 users 테이블에 있는 유저 정보 확인 */
const requestGetUserByKakaoId = async (kakao_id) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/user/kakao/${kakao_id}`,
    method: "GET",
  };
  const res = await axios(config);
  return res.data[0];
};

/** 회원 가입 */
const createMembership = async (userInfo) => {
  const user = await requestGetUserByKakaoId(userInfo.id);
  if (user) {
    return;
  } else {
    const { id, connected_at, kakao_account } = userInfo;
    const { profile, email, age_range, birthday, birthday_type, gender } = kakao_account;
    const { nickname } = profile;
    const user_id = generateRandomId("user");
    const couple_code = generateRandomId("code").slice(5, 11);
    const data = { user_id, kakao_id: id, nickname, age_range, birthday, birthday_type, email, gender, connected_at, couple_code, is_couple: false };
    const postMemberConfig = {
      url: `${process.env.SERVER_URL}/api/user`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    };
    await axios(postMemberConfig);
  }
};

module.exports = { requestUserUpdate, createMembership, requestGetUserByKakaoId };
