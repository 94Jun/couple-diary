import { useState, useEffect } from "react";
import axios from "axios";
import LetterCard from "./LetterCard";
import Backdrop from "../shared/Backdrop";
import ModalContainer from "../shared/ModalContainer";
import LetterView from "./LetterView";

const couple_id = "couple1";

const LetterList = () => {
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  /** letters 테이블에서 couple_id에 해당하는 튜플 GET */
  const getLettersByCoupleId = async () => {
    const config = {
      url : `/api/letter/${couple_id}`,
      method : "GET"
    }
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
    getLettersByCoupleId();
  }, [couple_id]);

  return (
    <div>
      {letters.map((letter) => (
        <LetterCard key={letter.letter_id} letter={letter} openLetterView={openLetterView} />
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
