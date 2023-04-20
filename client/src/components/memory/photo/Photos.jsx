import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useToggle from "../../../hooks/useToggle";
import styles from "./Photos.module.css";
import Loading from "../../shared/Loading";
import MemoryHeader from "../MemoryHeader";
import PhotoCard from "./PhotoCard";
import CancelButton from "../../shared/button/CancelButton";
import MainButton from "../../shared/button/MainButton";

const Photos = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [photos, setPhotos] = useState();
  const [photoPage, setPhotoPage] = useState(1);
  const [maxPhotoLength, setMaxPhotoLength] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, toggleEditMode] = useToggle(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const imgRef = useRef(null);

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

  /** memory_photos 테이블 delete */
  const deletePhotoById = async (photo_id) => {
    const config = {
      url: `/api/memory/photo/${photo_id}`,
      method: "DELETE",
    };
    await axios(config);
  };

  /** 첫 렌더 시 데이터 fetch */
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

  /** photos 데이터 추가 GET*/
  const fetchNextPhotos = async (couple_id, page) => {
    const loadedPhotos = await getPhotosByCoupleId(couple_id, page);
    setPhotos((prev) => [...prev, ...loadedPhotos]);
  };
  const setNextPhotos = async (couple_id, page) => {
    setIsFetching(true);
    setPhotoPage(page + 1);
    await fetchNextPhotos(couple_id, page + 1);
    setIsFetching(false);
  };

  /** 삭제 관련 함수 */
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
  const handleDeletePhotos = async (e) => {
    e.preventDefault();
    for await (let photo of selectedPhotos) {
      await deletePhotoById(photo);
    }
    await firstFetchData(userInfo.couple_id);
    handleCancelDelete();
  };

  /** infinity scroll loading */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px 100px 0px",
    threshold: 0.1,
  };
  const handleObserver = (entries, observer) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isFetching && photos.length < maxPhotoLength) {
      setNextPhotos(userInfo.couple_id, photoPage);
    }
  };
  const observer = new IntersectionObserver(handleObserver, observerOptions);

  useEffect(() => {
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgRef, observer]);

  /** html element */
  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <MemoryHeader toggleEditMode={toggleEditMode} editMode={editMode} setInitial={() => setSelectedPhotos([])} />
        <h3 className={styles.length}>{`${maxPhotoLength}개의 사진`}</h3>
        <div className={styles.img_container}>
          {photos &&
            photos.length > 0 &&
            photos.map((photo, idx) => {
              return (
                <div ref={imgRef} key={photo.photo_id}>
                  <PhotoCard
                    photo={photo}
                    photos={photos}
                    editMode={editMode}
                    selectedPhotos={selectedPhotos}
                    handleSelectedPhotos={handleSelectedPhotos}
                    maxPhotoLength={maxPhotoLength}
                    photoPage={photoPage}
                    setNextPhotos={setNextPhotos}
                  />
                </div>
              );
            })}
        </div>
        {selectedPhotos.length > 0 && (
          <form className={styles.delete_modal} onSubmit={handleDeletePhotos}>
            <CancelButton onClick={handleCancelDelete}>취소</CancelButton>
            <MainButton type="submit">{selectedPhotos.length}개 사진 삭제</MainButton>
          </form>
        )}
      </div>
    );
  }
  return content;
};

export default Photos;
