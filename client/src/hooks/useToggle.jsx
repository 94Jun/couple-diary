import { useState } from "react";
const useToggle = (initial) => {
  const [data, setData] = useState(initial || false);
  const toggleData = () => {
    setData((prev) => !prev);
  };
  return [data, toggleData];
};

export default useToggle;
