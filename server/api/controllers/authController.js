const axios = require("axios");
const { generateRandomId } = require("../../common");

/** access_token 및 refresh_token 발급 */
const getToken = async (code) => {
  const tokenConfig = {
    url: "https://kauth.kakao.com/oauth/token",
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_LOGIN_REDIRECT_URI,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      code,
    },
  };
  const tokenResponse = await axios(tokenConfig);
  return tokenResponse.data;
  /**{access_token, token_type, refresh_token, id_token, expires_in, scope, refresh_token_expires_in} */
};

/** access_token을 사용한 유저 정보 확인 */
const getUserInfo = async (access_token) => {
  const userInfoConfig = {
    url: "https://kapi.kakao.com/v2/user/me",
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
  };
  const userInfoResponse = await axios(userInfoConfig);
  return userInfoResponse.data;
  /**{id, connected_at, properties: {nickname}, kakao_account: { profile: { nickname}, email, age_range, birthday, birthday_type, gender}}*/
};

/** 회원 가입 */
const createMembership = async (userInfo) => {
  const userInfoConfig = {
    url: `${process.env.SERVER_URL}/api/user/kakao/${userInfo.id}`,
    method: "GET",
  };
  const userInfoResponse = await axios(userInfoConfig);
  if (userInfoResponse.data.length > 0) {
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
    const postMemberResult = await axios(postMemberConfig);
  }
};

/** 카카오 로그인 */
const kakaoLogin = async (req, res) => {
  const { code } = req.query;
  try {
    const token = await getToken(code);
    const userInfo = await getUserInfo(token.access_token);
    const registeredUserInfo = await createMembership(userInfo);

    // token 정보 쿠키 저장
    res.cookie("access_token", token.access_token, {
      signed : true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: token.expires_in * 1000,
      sameSite: "lax",
    });
    res.cookie("refresh_token", token.refresh_token, {
      signed : true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: token.refresh_token_expires_in * 1000,
      sameSite: "lax",
    });

    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    console.error("Error during fetching access token or user info:", error);
    res.status(500).send("Internal Server Error");
  }
};

/** access_key 유효 여부 확인 */
const getTokenValidation = async () => {

}

module.exports = { kakaoLogin, getTokenValidation };
