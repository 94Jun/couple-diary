import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CancelButton from "../shared/button/CancelButton";
import MainButton from "../shared/button/MainButton";
import styles from "./AddMemory.module.css";

const AddMemory = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [validation, setValidation] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    if (files) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value).toISOString());
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (e.target.value.trim().length > 0) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  /** # 입력을 통한 태그 등록(배열 형태) 및 공백 제거  */
  const handleTagsChange = (e) => {
    const tagList = e.target.value
      .split("#")
      .filter((tag, idx) => {
        return idx !== 0 && tag.trim().length > 0;
      })
      .map((tag) => {
        return tag.replace(/\s+/g, "");
      });
    setTags(tagList);
  };

  const postMemoryByAdd = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key !== "photos" && key !== "tags") {
        formData.append(key, data[key]);
      }
    }
    for (let i = 0; i < data.photos.length; i++) {
      formData.append(`photos`, data.photos[i]);
    }
    for (let i = 0; i < data.tags.length; i++) {
      formData.append("tags", data.tags[i]);
    }
    const config = {
      url: "/api/memory/add",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    };
    await axios(config);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation) {
      const data = {
        couple_id: userInfo.couple_id,
        user_id: userInfo.user_id,
        title: title ? title : null,
        content: content ? content : null,
        memory_date: date ? date : null,
        photos,
        tags,
      };
      await postMemoryByAdd(data);
      setTitle("");
      setContent("");
      setDate("");
      setPhotos([]);
      setTags([]);
      navigate("/memory");
    } else {
      alert("본문이나 사진을 등록해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>추억 등록</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="memoryTitle">제목</label>
        <input type="text" id="memoryTitle" value={title} onChange={handleTitleChange} />

        <label htmlFor="memoryDate">날짜</label>
        <input type="date" id="memoryDate" onChange={handleDateChange} />

        <label htmlFor="memoryTags">태그</label>
        <input type="text" id="memoryTags" placeholder="#부산 #일상" onChange={handleTagsChange} />

        <label htmlFor="memoryContent">내용</label>
        <textarea id="memoryContent" value={content} onChange={handleContentChange}></textarea>

        <label htmlFor="memoryPhotos">사진</label>
        <input type="file" id="memoryPhotos" multiple onChange={handleFileChange} />
        <div className={styles.button_wrap}>
          <CancelButton className={styles.cancel_btn} onClick={() => navigate("/memory")}>
            취소
          </CancelButton>
          <MainButton>추억 등록</MainButton>
        </div>
      </form>
    </div>
  );
};

export default AddMemory;