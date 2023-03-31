import axios from "axios";
import { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";
import styles from "./Memories.module.css";
import { useSelector } from "react-redux";
import useToggle from "../../hooks/useToggle";
import PhotoModal from "./PhotoModal";
const Memories = ({ viewType }) => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [memories, setMemories] = useState();
  const [photos, setPhotos] = useState();
  const [photoModal, togglePhotoModal] = useToggle(false);
  const [selectedIdx, setSelectedIdx] = useState(null);

  // 스크롤을 통한 로딩 구현 필요
  /** coupleId로 memories 불러오기 */
  const getMemoriesByCoupeId = async (couple_id) => {
    const config = {
      url: `/api/memory?type=couple&id=${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    setMemories(res.data);
  };

  // 스크롤을 통한 로딩 구현 필요
  /** couple_id를 통해 memory_photo 불러오기(memory 테이블의 memory_date 기준 내림차순)*/
  const getPhotosByCoupleId = async (couple_id) => {
    const config = {
      url: `/api/memory/photo/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    setPhotos(res.data);
  };

  const handlePhotoModal = (photo) => {
    const idx = photos.findIndex((el) => {
      return el.photo_id === photo.photo_id;
    });
    setSelectedIdx(idx);
    togglePhotoModal();
  };

  const handlePhotoSlide = (idx) => {
    setSelectedIdx(idx);
  };

  useEffect(() => {
    if (userInfo && viewType === "full") {
      getMemoriesByCoupeId(userInfo.couple_id);
    }
    if (userInfo && viewType === "img") {
      getPhotosByCoupleId(userInfo.couple_id);
    }
  }, [userInfo, viewType]);

  let content = (
    <div className={styles.card_container}>
      {memories &&
        memories.length > 0 &&
        memories.map((memory) => {
          return (
            <div key={memory.memory_id} className={styles.card_wrap}>
              <MemoryCard memory={memory} />
            </div>
          );
        })}
    </div>
  );

  if (viewType === "img") {
    content = (
      <>
        <div className={styles.img_container}>
          {photos &&
            photos.length > 0 &&
            photos.map((photo) => {
              return (
                <div key={photo.photo_id} className={styles.img_wrap} onClick={() => handlePhotoModal(photo)}>
                  <img src={photo.photo_url} />
                </div>
              );
            })}
        </div>
        {photoModal && selectedIdx !== null && <PhotoModal photos={photos} idx={selectedIdx} togglePhotoModal={togglePhotoModal} handlePhotoSlide={handlePhotoSlide} />}
      </>
    );
  }

  return content;
};

export default Memories;
