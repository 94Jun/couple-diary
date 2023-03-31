import ModalContainer from "../shared/ModalContainer";
import styles from "./PhotoModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PhotoModal = (props) => {
  const { photos, idx, togglePhotoModal, handlePhotoSlide } = props;
  const handleIdx = (event) => {
    const { pageX } = event;
    const point = window.innerWidth / 2;
    if (pageX > point) {
      if (idx === photos.length - 1) {
        // 마지막 장일때 구현
      } else {
        handlePhotoSlide(idx + 1);
      }
    }
    if (pageX < point) {
      if (idx === 0) {
        // 첫 장일때 구현
      } else {
        handlePhotoSlide(idx - 1);
      }
    }
  };
  return (
    <ModalContainer>
      <div className={styles.container}>
        <div className={styles.img_wrap} onClick={handleIdx}>
          <img src={photos[idx].photo_url} />
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
