import ModalContainer from "../../shared/modal/ModalContainer";
import styles from "./PhotoModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PhotoModal = (props) => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const { photos, idx, photoPage, maxPhotoLength, togglePhotoModal, handlePhotoSlide, setNextPhotos = { setNextPhotos } } = props;
  const limit = 50;

  /** 사진 클릭 위치에 따라 부모 컴포넌트에 index 전달 */
  const handleIdx = (event) => {
    const { pageX } = event;
    const point = window.innerWidth / 2;

    // 클릭이 화면 기준 오른쪽 일 때 다음 index 전달
    if (pageX > point) {
      if (idx === photos.length - 1) {
        if (photos.length !== maxPhotoLength) {
          setNextPhotos(userInfo.couple_id, photoPage);
        }
      } else {
        handlePhotoSlide(idx + 1);
      }
    }

    // 클릭이 화면 기준 왼쪽일 때 이전 index 전달
    if (pageX < point) {
      if (idx !== 0) {
        handlePhotoSlide(idx - 1);
      }
    }
  };
  useEffect(() => {
    if (idx === limit * (photoPage - 1) - 1) {
      handlePhotoSlide(idx + 1);
    }
  }, [photos, photoPage]);

  return (
    <ModalContainer>
      <div className={styles.container}>
        <div className={styles.img_wrap} onClick={handleIdx}>
          <img src={photos[idx]?.photo_url} alt="couple_photo" />
        </div>
        <button className={styles.close_btn} onClick={togglePhotoModal}>
          <ClearIcon fontSize="large" />
        </button>
        <div className={styles.arrow_wrap}>
          <span className={styles.back} onClick={handleIdx}>
            <ArrowBackIosNewIcon color="inherit" fontSize="large" />
          </span>
          <span className={styles.forward} onClick={handleIdx}>
            <ArrowForwardIosIcon color="inherit" fontSize="large" />
          </span>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PhotoModal;
