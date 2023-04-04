const { checkTokenValidation, refreshToken } = require("./kakao");
const { requestGetUserByKakaoId } = require("../userController/requestUser");

/** 로그인 검사 */
const checkLogin = async (req, res) => {
  const { access_token, refresh_token } = req.signedCookies;
  const tokenValidation = await checkTokenValidation(access_token);
  console.log(tokenValidation);
  if (tokenValidation.validation) {
    const user = await requestGetUserByKakaoId(tokenValidation.kakao_id);
    res.status(200).json({ isLogin: true, userInfo: user });

    //access_token이 유효하지 않고 refresh_token이 유효한 경우
  } else if (refresh_token) {
    const newToken = await refreshToken(refresh_token);
    // token 정보 쿠키 저장
    res.cookie("access_token", newToken.token.access_token, {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: newToken.token.expires_in * 1000,
      sameSite: "lax",
    });
    if (newToken.token.refresh_token) {
      res.cookie("refresh_token", newToken.token.refresh_token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: newToken.token.refresh_token_expires_in * 1000,
        sameSite: "lax",
      });
    }
    const user = await requestGetUserByKakaoId(newToken.kakao_id);
    res.status(200).json({ isLogin: true, userInfo: user });
  } else {
    res.status(200).json({ isLogin: false, userInfo: {} });
  }
};

module.exports = { checkLogin };
