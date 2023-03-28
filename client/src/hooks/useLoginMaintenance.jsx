import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../modules/loginSlice";
import axios from "axios";

const useLoginMaintenance = () => {
  const dispatch = useDispatch();

  /** 로그인 유지
   * 1. 쿠키 내 access_token 확인 : access_token이 있는 경우 token validation 확인 후 로그인
   * 2. 쿠키 내 refresh_token 확인 : refresh_token이 있는 경우 access_token 갱신 후 로그인
   */

  /** access_token validation 확인 */
  const checkLogin = async () => {
    const config = {
      url: `/auth/login/maintenance`,
      method: "GET",
      withCredentials: true,
    };
    try {
      const res = await axios(config);
      const loginInfo = res.data;
      if (loginInfo.isLogin) {
        dispatch(loginActions.LOGIN(loginInfo));
      } else {
        dispatch(loginActions.LOGOUT());
      }
    } catch (error) {
      console.error("Connection error", error);
      dispatch(loginActions.LOGOUT());
    }
  };

  return checkLogin;
};

export default useLoginMaintenance;
