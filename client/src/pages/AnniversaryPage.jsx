import Anniversary from "../components/anniversary/Anniversary";
import LinkButton from "../components/shared/button/LinkButton";

const AnniversaryPage = () => {
  return (
    <div>
      <LinkButton url="/anniversary/add">기념일 등록</LinkButton>
      <Anniversary />
    </div>
  );
};

export default AnniversaryPage;
