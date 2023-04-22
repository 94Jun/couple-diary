import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LetterCard from "./LetterCard";
import Loading from "../shared/Loading";
import LinkButton from "../shared/button/LinkButton";
import styles from "./LetterList.module.css";

const LetterList = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const letterTrigger = useSelector((state) => state.letter.letterTrigger);
  const [letters, setLetters] = useState([]);
  const [letterFilter, setLetterFilter] = useState("yours");
  const [isLoading, setIsLoading] = useState(true);

  const filterLetter = (letters, filter) => {
    if (letters) {
      if (filter === "all") {
        return letters;
      } else if (filter === "mine") {
        return letters.filter((letter) => letter.user_id === userInfo.user_id);
      } else {
        return letters.filter((letter) => letter.user_id !== userInfo.user_id);
      }
    } else {
      return;
    }
  };
  const filteredLetter = filterLetter(letters, letterFilter);

  /** letters 테이블에서 couple_id에 해당하는 튜플 GET */
  const getLettersByCoupleId = async (couple_id) => {
    const config = {
      url: `/api/letter/${couple_id}`,
      method: "GET",
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching letters.", error);
    }
  };

  const fetchLetters = async (couple_id) => {
    const loadedLetters = await getLettersByCoupleId(couple_id);
    setLetters(loadedLetters);
  };

  const fetchData = async (couple_id) => {
    await fetchLetters(couple_id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
    }
  }, [userInfo, letterTrigger]);

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className="container">
        <div className={styles.header}>
          <LinkButton url="/letter/add">편지 쓰기</LinkButton>
        </div>
        <ul className={styles.nav}>
          <li className={letterFilter === "all" ? styles.selected : ""} onClick={() => setLetterFilter("all")}>
            전체 보기
          </li>
          <li className={letterFilter === "yours" ? styles.selected : ""} onClick={() => setLetterFilter("yours")}>
            내게 온 편지
          </li>
          <li className={letterFilter === "mine" ? styles.selected : ""} onClick={() => setLetterFilter("mine")}>
            내가 쓴 편지
          </li>
        </ul>
        {filteredLetter && (
          <div className={styles.card_container}>
            {filteredLetter.map((letter) => (
              <LetterCard key={letter.letter_id} letter={letter} fetchData={fetchData} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return content;
};

export default LetterList;
