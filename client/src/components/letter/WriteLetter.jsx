import { useState } from "react";
import styles from "./WriteLetter.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WriteLetter = () => {
  const navigate = useNavigate();
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
      data: { content, user_id: "user1", couple_id: "couple1", paper_style: paperStyle, font_style: fontStyle },
    };
    try {
      const res = await axios(config);
      alert("편지가 성공적으로 등록되었습니다.");
      navigate("/letter");
    } catch (error) {
      console.error("편지 등록에 실패했습니다.", error);
      alert("편지 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.trim().length > 0) {
      await postLetter();
      setContent("");
    }
  };

  return (
    <div className={styles.write_letter_container}>
      <h2 className={styles.letter_title}>편지 쓰기</h2>
      <form className={styles.letter_form} onSubmit={handleSubmit}>
        <textarea
          className={styles.letter_textarea}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="편지를 작성하세요."
        />
        <div className={styles.button_wrap}>
        <button type="button" className={styles.cancel_button} onClick={()=>navigate("/letter")}>
          취소
        </button>
        <button type="submit" className={styles.submit_button}>
          편지 등록
        </button>
        </div>
      </form>
    </div>
  );
};

export default WriteLetter;
