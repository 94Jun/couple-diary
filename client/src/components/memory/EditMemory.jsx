import { useState, useEffect } from "react";
import styles from "./EditMemory.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../shared/Loading";
import CancelButton from "../shared/button/CancelButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { useSelector } from "react-redux";
import MainButton from "../shared/button/MainButton";
import PhotoUploadModal from "./photo/PhotoUploadModal";
const EditMemory = () => {
  const { memory_id } = useParams();
  const userInfo = useSelector((state) => state.login.userInfo);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [memory, setMemory] = useState();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [prevPhotos, setPrevPhotos] = useState([]);
  const [photoUploadModal, togglePhotoUploadModal] = useToggle(false);
  const prevTags = memory ? memory.tags?.map((tag) => tag.tag_name) : null;
  const prevDate = memory
    ? new Date(memory.memory_date.slice(0, 4), +memory.memory_date.slice(5, 7) - 1, +memory.memory_date.slice(8, 10) + 2, 0).toISOString().slice(0, 10)
    : null;

  const getMemoryByMemoryId = async (memory_id) => {
    const config = {
      url: `/api/memory?type=memory&id=${memory_id}`,
      method: "GET",
    };
    const res = await axios(config);
    setMemory(res.data[0]);
  };

  useEffect(() => {
    if (userInfo && isLoading) {
      getMemoryByMemoryId(memory_id);
      setIsLoading(false);
    }
  }, [userInfo]);
  useEffect(() => {
    if (memory) {
      setTitle(memory.title !== "null" ? memory.title : "");
      setContent(memory.content !== "null" ? memory.content : "");
      setTags(prevTags ? prevTags : []);
      setPrevPhotos(memory ? memory.photos?.sort((a, b) => (a.created_at >= b.created_at ? 1 : -1)).map((photo) => photo) : []);
      setDate(prevDate ? new Date(prevDate).toISOString() : null);
    }
  }, [memory]);

  const handlePhotosUpload = (uploadedPhotos) => {
    setPhotos((prevPhotos) => [...prevPhotos, ...uploadedPhotos]);
  };

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value).toISOString());
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
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

  const handlePhotoDelete = (photo) => {
    const filteredPhotos = photos.filter((el) => {
      return el !== photo;
    });
    setPhotos(filteredPhotos);
  };

  const handlePrevPhotoDelete = (id) => {
    const filteredPrevPhotos = prevPhotos.filter((photo) => {
      return photo.photo_id !== id;
    });
    setPrevPhotos(filteredPrevPhotos);
  };

  const updateMemory = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key !== "photos" && key !== "tags" && key !== "deletedPhotos") {
        formData.append(key, data[key]);
      }
    }
    for (let i = 0; i < data.photos.length; i++) {
      formData.append(`photos`, data.photos[i]);
    }
    for (let i = 0; i < data.tags.length; i++) {
      formData.append("tags", data.tags[i]);
    }
    for (let i = 0; i < data.deletedPhotos.length; i++) {
      formData.append("deletedPhotos", data.deletedPhotos[i].photo_id);
    }
    const config = {
      url: `/api/memory/edit/${memory_id}`,
      method: "PUT",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    };
    await axios(config);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deletedPhotos = memory.photos
      ? memory.photos.filter((photo) => {
          return !prevPhotos.includes(photo);
        })
      : null;
    const data = {
      title: title ? title : null,
      content: content ? content : null,
      memory_date: date ? date : null,
      photos,
      tags,
      deletedPhotos: deletedPhotos ? deletedPhotos : [],
    };
    await updateMemory(data);
    setTitle("");
    setContent("");
    setDate("");
    setPhotos([]);
    setTags([]);
    navigate("/memory");
  };
  let element = <Loading />;
  if (!isLoading) {
    element = (
      <div className={styles.container}>
        <h2 className={styles.title}>추억 수정</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="memoryTitle">제목</label>
          <input type="text" id="memoryTitle" value={title} onChange={handleTitleChange} />

          <label htmlFor="memoryDate">날짜</label>
          <input type="date" id="memoryDate" onChange={handleDateChange} defaultValue={prevDate} />

          <label htmlFor="memoryTags">태그</label>
          <input type="text" id="memoryTags" placeholder="#태그" onChange={handleTagsChange} defaultValue={prevTags?.map((tag) => `#${tag} `).join("")} />
          <div>
            <div className={styles.add_photo_wrap}>
              <span>사진</span>
              <button className={styles.add_photo_btn} onClick={togglePhotoUploadModal} type="button">
                <AddPhotoAlternateIcon />
              </button>
            </div>
            <div className={styles.photo_wrap}>
              {prevPhotos?.length > 0 &&
                prevPhotos.map((photo) => {
                  return (
                    <div className={styles.preview_wrap} key={photo.photo_id} onClick={() => handlePrevPhotoDelete(photo.photo_id)}>
                      <img src={photo.photo_url} alt="preview" />
                    </div>
                  );
                })}
              {photos.length > 0 &&
                photos.map((photo, idx) => {
                  const url = URL.createObjectURL(photo);
                  return (
                    <div key={idx} className={styles.preview_wrap} onClick={() => handlePhotoDelete(photo)}>
                      <img src={url} alt="preview" />
                    </div>
                  );
                })}
            </div>
          </div>
          <label htmlFor="memoryContent">내용</label>
          <textarea id="memoryContent" value={content} onChange={handleContentChange}></textarea>
          <div className={styles.button_wrap}>
            <CancelButton className={styles.cancel_btn} onClick={() => navigate(-1)}>
              취소
            </CancelButton>
            <MainButton>추억 수정</MainButton>
          </div>
        </form>
        {photoUploadModal && <PhotoUploadModal togglePhotoUploadModal={togglePhotoUploadModal} handlePhotosUpload={handlePhotosUpload} />}
      </div>
    );
  }

  return element;
};

export default EditMemory;
