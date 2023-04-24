import AnniversaryLink from "./AnniversaryLink";
import LetterLink from "./LetterLink";
import styles from "./NavCard.module.css";
import ScheduleLink from "./ScheduleLink";

const NavCard = ({ anniversary, schedules, letters }) => {
  return (
    <div className={`${styles.container} container`}>
      <ScheduleLink schedules={schedules} />
      <AnniversaryLink anniversary={anniversary} />
      <LetterLink letters={letters} />
    </div>
  );
};

export default NavCard;
