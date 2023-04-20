import useToggle from "../../../hooks/useToggle";
import styles from "./PhotoCard.module.css";
import { useState } from "react";
import PhotoModal from "./PhotoModal";
const PhotoCard = (props) => {
  const { photo, photos, selectedPhotos, handleSelectedPhotos, editMode, maxPhotoLength, photoPage, setNextPhotos } = props;
  const [photoModal, togglePhotoModal] = useToggle(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const handlePhotoModal = () => {
    const idx = photos?.findIndex((el) => el.photo_id === photo.photo_id);
    if (idx !== -1 && !editMode) {
      setSelectedIdx(idx);
      togglePhotoModal();
    }
  };
  /** photoModal에서 클릭한 위치를 통해 전 사진 혹은 다음 사진 슬라이드F */
  const handlePhotoSlide = (idx) => {
    setSelectedIdx(idx);
  };
  return (
    <>
      <div className={styles.img_wrap} onClick={handlePhotoModal}>
        {editMode ? (
          <label>
            <input
              type="checkbox"
              className={styles.check}
              checked={selectedPhotos.includes(photo.photo_id)}
              onChange={() => handleSelectedPhotos(photo.photo_id)}
            />
            <img src={photo.photo_url} />
          </label>
        ) : (
          <img src={photo.photo_url} />
        )}
      </div>
      {photoModal && selectedIdx !== null && (
        <PhotoModal photos={photos} idx={selectedIdx} togglePhotoModal={togglePhotoModal} handlePhotoSlide={handlePhotoSlide} maxPhotoLength={maxPhotoLength} photoPage={photoPage} setNextPhotos={setNextPhotos} />
      )}
    </>
  );
};

export default PhotoCard;
