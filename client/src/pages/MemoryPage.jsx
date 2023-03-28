import Memories from "../components/memory/Memories";
import LinkButton from "../components/shared/button/LinkButton";
const MemoryPage = () => {
  return (
    <div>
      <LinkButton url="/memory/add">추억 등록</LinkButton>
      <Memories/>
    </div>
  );
};

export default MemoryPage;
