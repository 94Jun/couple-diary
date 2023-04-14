import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LetterCard from "./LetterCard";
import Backdrop from "../shared/modal/Backdrop";
import ModalContainer from "../shared/modal/ModalContainer";
import LetterView from "./LetterView";

const LetterList = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  
  /** letters 테이블에서 couple_id에 해당하는 튜플 GET */
  const getLettersByCoupleId = async (couple_id) => {
    const config = {
      url: `/api/letter/${couple_id}`,
      method: "GET",
    };
    try {
      const response = await axios(config);
      setLetters(response.data);
    } catch (error) {
      console.error("Error occurred while fetching letters.", error);
    }
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
      getLettersByCoupleId(userInfo.couple_id);
    }
  }, [userInfo]);

  return (
    <div>
      {letters.map((letter) => (
        <LetterCard key={letter.letter_id} letter={letter} openLetterView={openLetterView} getLettersByCoupleId={getLettersByCoupleId} />
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
};

export default LetterList;
