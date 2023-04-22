import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../shared/Loading";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./User.module.css";
import Logout from "../login/Logout";
import useToggle from "../../hooks/useToggle";
import MainButton from "../shared/button/MainButton";
import CancelButton from "../shared/button/CancelButton";
import axios from "axios";
import useLoginMaintenance from "../../hooks/useLoginMaintenance";

const User = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, toggleEditMode] = useToggle(false);
  const [nickname, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [isValid, setIsValid] = useState(false);
  const loginMaintenance = useLoginMaintenance();

  useEffect(() => {
    if (userInfo) {
      setNickName(userInfo.nickname);
      setGender(userInfo.gender);
      setIsLoading(false);
    }
  }, [userInfo]);

  const handleCancel = () => {
    setNickName(userInfo.nickname);
    setGender(userInfo.gender);
    toggleEditMode();
  };

  const updateUser = async (user_id) => {
    const config = {
      url: `/api/user/${user_id}`,
      method: "PUT",
      data: { nickname, gender },
    };
    await axios(config);
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    if (isValid) {
      await updateUser(userInfo.user_id);
      toggleEditMode();
      await loginMaintenance();
    } else {
      alert("개인정보를 수정해주세요.");
    }
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
    if (e.target.value !== userInfo.gender) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleChangeNickname = (e) => {
    setNickName(e.target.value);
    if (e.target.value !== userInfo.nickname && e.target.value.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <h3 className={styles.title}>나의 정보</h3>
          <button className={styles.icon_wrap} onClick={toggleEditMode}>
            <SettingsIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
        <form className={styles.form} onSubmit={updateUserInfo}>
          <label htmlFor="user_name">이름(닉네임)</label>
          <input type="text" id="user_name" value={nickname} disabled={editMode ? false : true} onChange={handleChangeNickname} />
          <label htmlFor="user_gender">성별</label>
          <select id="user_gender" value={gender} onChange={handleChangeGender} disabled={editMode ? false : true}>
            <option value={"선택안함"}>선택안함</option>
            <option value={"남"}>남</option>
            <option value={"여"}>여</option>
          </select>
          <label htmlFor="user_code">커플코드</label>
          <input type="text" id="user_code" value={userInfo.couple_code} disabled />
          {editMode && (
            <div className={styles.btn_wrap}>
              <CancelButton onClick={handleCancel}>취소</CancelButton>
              <MainButton>수정</MainButton>
            </div>
          )}
        </form>
        <div className={styles.logout_wrap}>
          <p>로그아웃</p>
          <Logout className={styles.logout} />
        </div>
      </div>
    );
  }
  return content;
};

export default User;
