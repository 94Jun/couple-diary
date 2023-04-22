import axios from "axios";
import { useState, useEffect, useRef } from "react";
import MemoryCard from "./MemoryCard";
import styles from "./Memories.module.css";
import { useSelector } from "react-redux";
import Loading from "../shared/Loading";
import useToggle from "../../hooks/useToggle";
import MemoryHeader from "./MemoryHeader";

const Memories = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [memories, setMemories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemories, setSelectedMemories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [memoryPage, setMemoryPage] = useState(1);
  const [memoryLength, setMemoryLength] = useState();
  const loadedRef = useRef(null);

  /** coupleId로 memories 불러오기 */
  const getMemoriesByCoupeId = async (couple_id, page) => {
    const config = {
      url: `/api/memory?type=couple&id=${couple_id}&page=${page}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  /** couple_id로 memories 테이블 Length GET */
  const getMemoryLnegth = async (couple_id) => {
    const config = {
      url: `/api/memory/length/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data[0].length;
  };

  /** memory length setState */
  const fetchMemoryLength = async (couple_id) => {
    const loadedLength = await getMemoryLnegth(couple_id);
    setMemoryLength(loadedLength);
  };

  /** memories setState */
  const fetchFirstMemories = async (couple_id, page) => {
    const loadedMemories = await getMemoriesByCoupeId(couple_id, page);
    setMemories(loadedMemories);
  };

  /** fetch data and end loading */
  const fetchFirstData = async (couple_id, page) => {
    await fetchFirstMemories(couple_id, page);
    await fetchMemoryLength(couple_id);
    setIsLoading(false);
  };

  /** 렌더 시 memory 테이블 및 길이 불러오기 */
  useEffect(() => {
    if (userInfo && memoryPage === 1) {
      fetchFirstData(userInfo.couple_id, 1);
    }
  }, [userInfo]);

  const fetchNextMemories = async (couple_id, page) => {
    setIsFetching(true);
    setMemoryPage(page + 1);
    const loadedMemories = await getMemoriesByCoupeId(couple_id, page + 1);
    setMemories((prev) => {
      return [...prev, ...loadedMemories];
    });
    setIsFetching(false);
  };

  /** scroll loading */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px 200px 0px",
    threshold: 0.1,
  };
  const handleObserver = (entries, observer) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isFetching && memoryLength !== memories.length) {
      fetchNextMemories(userInfo.couple_id, memoryPage);
    }
  };
  const observer = new IntersectionObserver(handleObserver, observerOptions);

  useEffect(() => {
    if (loadedRef.current) {
      observer.observe(loadedRef.current);
    }
    return () => {
      if (loadedRef.current) {
        observer.unobserve(loadedRef.current);
      }
    };
  }, [loadedRef, observer]);
  
  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <MemoryHeader isSetting={false} />
        <div className={styles.card_container}>
          {memories &&
            memories.length > 0 &&
            memories.map((memory) => {
              return (
                <div key={memory.memory_id} className={styles.card_wrap} ref={loadedRef}>
                  <MemoryCard memory={memory} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return content;
};

export default Memories;
