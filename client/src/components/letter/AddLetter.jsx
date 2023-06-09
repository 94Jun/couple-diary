import { useState } from "react";
import styles from "./AddLetter.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainButton from "../shared/button/MainButton";
import CancelButton from "../shared/button/CancelButton";

const AddLetter = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.login.userInfo);
  const [content, setContent] = useState("");
  const [paperStyle, setPaperStyle] = useState("default");
  const [fontStyle, setFontStyle] = useState("default");

  /** 편지 정보 POST */
  const postLetter = async () => {
    const config = {
      url: "/api/letter",
      method: "POST",
      headers: { "Content-type": "application/json" },
      // 더미 데이터를 사용, 로그인 구현 후 수정 필요
      data: { content, user_id: userInfo.user_id, couple_id: userInfo.couple_id, paper_style: paperStyle, font_style: fontStyle },
    };
    try {
      await axios(config);
      navigate("/letter");
    } catch (error) {
      console.error("편지 등록에 실패했습니다.", error);
      alert("편지 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInfo.is_couple) {
      if (content.trim().length > 0) {
        await postLetter();
        setContent("");
      }
    } else {
      alert("커플 등록이 필요합니다.");
    }
  };

  return (
    <div className={styles.write_letter_container}>
      <h2 className={styles.letter_title}>편지 쓰기</h2>
      <form className={styles.letter_form} onSubmit={handleSubmit}>
        <div className={styles.text_wrap}>
          <textarea className={styles.letter_textarea} value={content} onChange={(event) => setContent(event.target.value)} placeholder="편지를 작성하세요." />
        </div>
        <div className={styles.button_wrap}>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <MainButton type="submit">편지 등록</MainButton>
        </div>
      </form>
    </div>
  );
};

export default AddLetter;
