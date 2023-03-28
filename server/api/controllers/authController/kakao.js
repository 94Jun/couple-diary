const axios = require("axios");
const jwtDecode = require("jwt-decode");

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
};

/** access_token 유효성 확인 */
const checkTokenValidation = async (access_token) => {
  if (access_token) {
    const config = {
      url: "https://kapi.kakao.com/v1/user/access_token_info",
      method: "GET",
      headers: { Authorization: `Bearer ${access_token}` },
    };
    try {
      const res = await axios(config);
      return { validation: true, kakao_id: res.data.id };
    } catch (error) {
      return { validation: false };
    }
  } else {
    return { validation: false };
  }
};

/** refresh_token을 이용한 access_token 갱신 */
const refreshToken = async (refresh_token) => {
  const config = {
    url: "https://kauth.kakao.com/oauth/token",
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      grant_type: "refresh_token",
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      refresh_token,
    },
  };
  try {
    const result = await axios(config);
    const token = result.data;
    const kakao_id = jwtDecode(token.id_token).sub;
    return { token, kakao_id };
  } catch (error) {
    console.error("refresh_token is invalid", error);
  }
};

/** 카카오 로그아웃 */
const kakaoLogout = async (req, res) => {
  const { access_token } = req.signedCookies;
  const config = {
    url: "https://kapi.kakao.com/v1/user/logout",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${access_token}` },
  };
  try {
    await axios(config);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  } catch (error) {
    console.error("kakao logout fail", error);
    res.status(500).json({ message: "로그아웃 실패" });
  }
  res.redirect(`${process.env.CLIENT_URL}`);
};

module.exports = { getToken, getUserInfo, checkTokenValidation, kakaoLogout, refreshToken };
