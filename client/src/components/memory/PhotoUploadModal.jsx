import { useState } from "react";
import ModalContainer from "../shared/ModalContainer";
import MainButton from "../shared/button/MainButton";
import CancelButton from "../shared/button/CancelButton";
import styles from "./PhotoUploadModal.module.css";
import Backdrop from "../shared/Backdrop";

const PhotoUploadModal = ({ togglePhotoUploadModal, handlePhotosUpload }) => {
  const [photos, setPhotos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewPhotos(previewURLs);
  };

  const handleUpload = () => {
    handlePhotosUpload(photos);
    togglePhotoUploadModal();
  };

  const handleClose = () => {
    setPhotos([]);
    setPreviewPhotos([]);
    togglePhotoUploadModal();
  };

  return (
    <Backdrop onClick={togglePhotoUploadModal}>
      <ModalContainer>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.title}>사진 업로드</h2>
          <div className={styles.upload_wrap}>
            <div className={styles.file_wrap}>
              <label htmlFor="photoUpload">
                + 이미지 추가
              </label>
              <input type="file" id="photoUpload" multiple accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
          <div className={styles.preview_container}>
            {previewPhotos.map((url, index) => (
              <img key={index} src={url} className={styles.preview_photo} alt="preview" />
            ))}
          </div>
          <div className={styles.button_wrap}>
            <CancelButton onClick={handleClose}>취소</CancelButton>
            <MainButton onClick={handleUpload}>사진 등록</MainButton>
          </div>
        </div>
      </ModalContainer>
    </Backdrop>
  );
};

export default PhotoUploadModal;
