import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useToggle from "../../hooks/useToggle";
import styles from "./Photos.module.css";
import PhotoModal from "./PhotoModal";
import Loading from "../shared/Loading";
import MainButton from "../shared/button/MainButton";
import CancelButton from "../shared/button/CancelButton";
import MemoryHeader from "./MemoryHeader";

const Photos = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [photos, setPhotos] = useState();
  const [photoModal, togglePhotoModal] = useToggle(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [photoPage, setPhotoPage] = useState(1);
  const [maxPhotoLength, setMaxPhotoLength] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, toggleEditMode] = useToggle(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const lastPhotoElementRef = useRef();

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching) {
        nextPhotos(userInfo.couple_id, photoPage);
      }
    },
    [isFetching, photoPage, userInfo]
  );
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const observer = new IntersectionObserver(handleObserver, options);

  // 스크롤을 통한 로딩 구현 필요
  /** couple_id를 통해 memory_photo 불러오기(memory 테이블의 memory_date 기준 내림차순)*/
  const getPhotosByCoupleId = async (couple_id, page) => {
    const config = {
      url: `/api/memory/photo/${couple_id}?page=${page}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  /** 사진 개수 GET */
  const getPhotosLength = async (couple_id) => {
    const config = {
      url: `/api/memory/photo/length/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data[0].length;
  };

  /** 사진 클릭 시 photoModal 오픈 및 사진 index 전달 */
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

  const nextFetchData = async (couple_id, page) => {
    const loadedPhotos = await getPhotosByCoupleId(couple_id, page);
    setPhotos((prev) => [...prev, ...loadedPhotos]);
  };

  const firstFetchData = async (couple_id) => {
    const loadedLength = await getPhotosLength(couple_id);
    setMaxPhotoLength(loadedLength);
    const loadedPhotos = await getPhotosByCoupleId(couple_id, 1);
    setPhotos(loadedPhotos);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      if (photoPage === 1) {
        firstFetchData(userInfo.couple_id);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (lastPhotoElementRef.current) {
      observer.disconnect();
      observer.observe(lastPhotoElementRef.current);
    }
  }, [photos, isLoading]);

  const nextPhotos = async (couple_id, page) => {
    if (photos?.length !== maxPhotoLength) {
      setIsFetching(true);
      setPhotoPage(page + 1);
      await nextFetchData(couple_id, page + 1);
      setIsFetching(false);
    }
  };

  const handleSelectedPhotos = (id) => {
    const isChecked = selectedPhotos.includes(id);
    if (isChecked) {
      const filteredPhotos = selectedPhotos.filter((photo) => {
        return photo !== id;
      });
      setSelectedPhotos(filteredPhotos);
    } else {
      setSelectedPhotos((prev) => {
        return [...prev, id];
      });
    }
  };

  const handleCancelDelete = () => {
    toggleEditMode();
    setSelectedPhotos([]);
  };

  const deletePhotoById = async (photo_id) => {
    const config = {
      url: `/api/memory/photo/${photo_id}`,
      method: "DELETE",
    };
    await axios(config);
  };

  const handleDeletePhotos = async (e) => {
    e.preventDefault();
    for await (let photo of selectedPhotos) {
      await deletePhotoById(photo);
    }
    await firstFetchData(userInfo.couple_id);
    handleCancelDelete();
  };

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <MemoryHeader toggleEditMode={toggleEditMode} />
        <h3 className={styles.length}>{`${maxPhotoLength}개의 사진`}</h3>
        <div className={styles.img_container}>
          {photos &&
            photos.length > 0 &&
            (editMode
              ? photos.map((photo, idx) => {
                  return (
                    <div key={photo.photo_id} className={`${styles.img_wrap}`}>
                      <label>
                        <input
                          type="checkbox"
                          className={styles.check}
                          checked={selectedPhotos.includes(photo.photo_id)}
                          onChange={() => handleSelectedPhotos(photo.photo_id)}
                        />
                        <img src={photo.photo_url} />
                      </label>
                    </div>
                  );
                })
              : photos.map((photo, idx) => {
                  return (
                    <div key={idx} className={styles.img_wrap} onClick={() => handlePhotoModal(photo)}>
                      <img src={photo.photo_url} />
                    </div>
                  );
                }))}
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
        <div>
          <button onClick={() => nextPhotos(userInfo.couple_id, photoPage)}>다음</button>
        </div>
        {selectedPhotos.length > 0 && (
          <form className={styles.delete_modal} onSubmit={handleDeletePhotos}>
            <CancelButton onClick={handleCancelDelete}>취소</CancelButton>
            <MainButton type="submit">선택 사진 삭제</MainButton>
          </form>
        )}
      </div>
    );
  }
  return content;
};

export default Photos;
