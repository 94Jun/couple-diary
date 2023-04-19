import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LetterCard from "./LetterCard";
import Backdrop from "../shared/modal/Backdrop";
import ModalContainer from "../shared/modal/ModalContainer";
import LetterView from "./LetterView";
import useToggle from "../../hooks/useToggle";
import Loading from "../shared/Loading";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkButton from "../shared/button/LinkButton";
import styles from "./LetterList.module.css";

const LetterList = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, toggleEditMode] = useToggle(false);

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

  /** selectedLetter 설정 */
  const openLetterView = (letter) => {
    setSelectedLetter(letter);
  };

  const closeLetterView = () => {
    setSelectedLetter(null);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
    }
  }, [userInfo]);

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div>
        <div className={styles.header}>
          <LinkButton url="/letter/add">편지 쓰기</LinkButton>
          <button className={styles.setting_icon} type="button" onClick={toggleEditMode}>
            <SettingsIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
        {letters.map((letter) => (
          <LetterCard key={letter.letter_id} letter={letter} openLetterView={openLetterView} fetchData={fetchData} editMode={editMode} />
        ))}
        {selectedLetter && (
          <Backdrop onClick={closeLetterView}>
            <ModalContainer>
              <LetterView letter={selectedLetter} closeLetterView={closeLetterView} />
            </ModalContainer>
          </Backdrop>
        )}
      </div>
    );
  }

  return content;
};

export default LetterList;
