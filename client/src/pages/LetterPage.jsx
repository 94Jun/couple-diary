import LetterList from "../components/letter/LetterList";
import LinkButton from "../components/shared/button/LinkButton";

// 커플이 아닌 경우 보여줄 데이터 추가 필요
const LetterPage = () => {
  return (
    <div>
      <LinkButton url="/letter/add">편지 쓰기</LinkButton>
      <LetterList />
    </div>
  );
};

export default LetterPage;
