const { getToken, getUserInfo } = require("./kakao");
const { createMembership } = require("../userController/requestUser");

/** 카카오 로그인 */
const kakaoLogin = async (req, res) => {
  const { code } = req.query;
  try {
    const token = await getToken(code);
    const userInfo = await getUserInfo(token.access_token);
    await createMembership(userInfo);

    // token 정보 쿠키 저장
    res.cookie("access_token", token.access_token, {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: token.expires_in * 1000,
      sameSite: "lax",
    });
    res.cookie("refresh_token", token.refresh_token, {
      signed: true,
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

module.exports = { kakaoLogin };
