import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useToggle from "../../hooks/useToggle";
import styles from "./Photos.module.css";
import PhotoModal from "./PhotoModal";

const Photos = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [photos, setPhotos] = useState();
  const [photoModal, togglePhotoModal] = useToggle(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [photoPage, setPhotoPage] = useState(1);
  const [maxPhotoLength, setMaxPhotoLength] = useState();

  // 스크롤을 통한 로딩 구현 필요
  /** couple_id를 통해 memory_photo 불러오기(memory 테이블의 memory_date 기준 내림차순)*/
  const getPhotosByCoupleId = async (couple_id, page) => {
    const config = {
      url: `/api/memory/photo/${couple_id}?page=${page}`,
      method: "GET",
    };
    const res = await axios(config);
    setPhotos((prev) => {
      const hasDuplicate = prev?.find((photo) => photo.photo_id === res.data[0].photo_id) ? true : false;
      if (!prev) {
        return res.data;
      } else if (hasDuplicate) {
        return prev;
      } else {
        return [...prev, ...res.data];
      }
    });
  };

  /** 사진 개수 GET */
  const getPhotosLength = async () => {
    const config = {
      url: `/api/memory/photo/length`,
      method: "GET",
    };
    const res = await axios(config);
    setMaxPhotoLength(res.data[0].length);
  };

  /** img View에서 사진 클릭 시 photoModal 오픈 및 사진 index 전달 */
  const handlePhotoModal = (photo) => {
    const idx = photos.findIndex((el) => {
      return el.photo_id === photo.photo_id;
    });
    setSelectedIdx(idx);
    togglePhotoModal();
  };

  /** photoModal에서 클릭한 위치를 통해 전 사진 혹은 다음 사진 슬라이드F */
  const handlePhotoSlide = (idx) => {
    setSelectedIdx(idx);
  };

  const handlePhotoPage = (page) => {
    setPhotoPage(page);
  };

  useEffect(() => {
    if (userInfo) {
      getPhotosByCoupleId(userInfo.couple_id, photoPage);
      getPhotosLength();
    }
  }, [userInfo, photoPage]);

  return (
    <div className={styles.img_container}>
      {photos &&
        photos.length > 0 &&
        photos.map((photo, idx) => {
          return (
            <div key={idx} className={styles.img_wrap} onClick={() => handlePhotoModal(photo)}>
              <img src={photo.photo_url} />
            </div>
          );
        })}
      {photoModal && selectedIdx !== null && (
        <PhotoModal
          photos={photos}
          idx={selectedIdx}
          togglePhotoModal={togglePhotoModal}
          handlePhotoSlide={handlePhotoSlide}
          handlePhotoPage={handlePhotoPage}
          page={photoPage}
          maxPhotoLength={maxPhotoLength}
        />
      )}
    </div>
  );
};

export default Photos;
