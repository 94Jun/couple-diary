import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../shared/Loading";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./Couple.module.css";
import axios from "axios";
import { formatDate } from "../../common";
import CoupleDisconnect from "./CoupleDisconnect";
import useToggle from "../../hooks/useToggle";
import CancelButton from "../shared/button/CancelButton";
import MainButton from "../shared/button/MainButton";
import useLoginMaintenance from "../../hooks/useLoginMaintenance";
import { modalActions } from "../../modules/modalSlice";

const Couple = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [anniversaries, setAnniversaries] = useState();
  const [editMode, toggleEditMode] = useToggle(false);
  const [profile, setProfile] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const start = anniversaries?.find((ann) => ann.event_name === "시작") || null;
  const startDate = start ? formatDate(new Date(start?.event_date)).slice(0, 14) : "등록 필요"
  const loginMaintenance = useLoginMaintenance();

  const getAnniversaries = async (couple_id) => {
    const config = {
      url: `/api/anniversary/couple/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  const fetchAnniversaries = async (couple_id) => {
    const loadedAnniversaries = await getAnniversaries(couple_id);
    setAnniversaries(loadedAnniversaries);
  };

  const fetchData = async (couple_id) => {
    await fetchAnniversaries(couple_id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
      setProfileUrl(userInfo.profile_url);
    }
  }, [userInfo]);

  const handleChangeProfile = (e) => {
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);
      const previewURLs = URL.createObjectURL(e.target.files[0]);
      setProfileUrl(previewURLs);
    }
  };

  const handleCancel = () => {
    setProfile("");
    setProfileUrl(userInfo.profile_url);
    toggleEditMode();
  };

  const updateProfile = async (couple_id) => {
    const formData = new FormData();
    formData.append("profile", profile);
    const config = {
      url: `/api/couple/${couple_id}`,
      method: "PUT",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    };
    await axios(config);
  };

  const HandleUpdateCoupleInfo = async (e) => {
    e.preventDefault();
    if (profile) {
      await updateProfile(userInfo.couple_id);
      await loginMaintenance();
      toggleEditMode();
    } else {
      alert("커플정보를 수정해주세요.");
    }
  };

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>커플 정보</h3>
          <button className={styles.icon_wrap} onClick={toggleEditMode}>
            <SettingsIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
        <form className={styles.form} onSubmit={HandleUpdateCoupleInfo}>
          <p>커플 프로필</p>
          <div className={styles.edit_profile}>
            <div className={styles.img_wrap}>
              <img src={profileUrl} />
            </div>
            {editMode && (
              <div>
                <label htmlFor="profile_upload">프로필 변경</label>
                <input type="file" id="profile_upload" accept="image/*" onChange={handleChangeProfile} />
              </div>
            )}
          </div>
          <label htmlFor="other_name">상대방 이름</label>
          <input type="text" id="other_name" value={userInfo.couple_user_info.nickname} disabled />
          <label htmlFor="first_meet">시작일</label>
          <input type="text" id="first_meet" value={startDate} disabled />
          {editMode && (
            <div className={styles.btn_wrap}>
              <CancelButton onClick={handleCancel}>취소</CancelButton>
              <MainButton>수정</MainButton>
            </div>
          )}
        </form>
        <div className={styles.disconnect_wrap}>
          <p>커플 연결 해제</p>
          <MainButton onClick={() => dispatch(modalActions.OPEN_MODAL("disconnect"))} className={styles.disconnect}>
            커플 연결 해제
          </MainButton>
        </div>
      </div>
    );
  }
  return content;
};

export default Couple;
