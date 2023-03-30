import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSectedDate] = useState(new Date());
  useEffect(() => {
    setSelectedYear(currentDate.getFullYear());
    setSelectedMonth(currentDate.getMonth());
  }, [currentDate]);

  const calendarInfo = {
    year: selectedYear,
    month: selectedMonth,
    prevMonth: new Date(selectedYear, selectedMonth - 1).getMonth(),
    nextMonth: new Date(selectedYear, selectedMonth + 1).getMonth(),
    startDate: new Date(selectedYear, selectedMonth).getDate(),
    startDay: new Date(selectedYear, selectedMonth).getDay(),
    endDate: new Date(selectedYear, selectedMonth + 1, 0).getDate(),
    prevEndDate: new Date(selectedYear, selectedMonth, 0).getDate(),
  };

  const calendarDate = [];
  let prev = calendarInfo.prevEndDate - calendarInfo.startDay + 1;
  let next = 1;
  let thisMonth = 1;
  for (let i = 0; i < 42; i++) {
    if (i < calendarInfo.startDay) {
      let selectedDate = {
        fullDate: new Date(calendarInfo.year, calendarInfo.prevMonth, prev),
        isWeekend: function () {
          return this.fullDate.getDay === 0 || this.fullDate.getDay === 6;
        },
        date: prev,
      };
      if (calendarInfo.prevMonth === 11) {
        selectedDate.fullDate = new Date(calendarInfo.year - 1, calendarInfo.prevMonth, prev);
      }
      calendarDate.push(selectedDate);
      prev++;
    } else if (i - calendarInfo.startDay >= calendarInfo.endDate) {
      let selectedDate = {
        fullDate: new Date(calendarInfo.year, calendarInfo.nextMonth, next),
        isWeekend: function () {
          return this.fullDate.getDay === 0 || this.fullDate.getDay === 6;
        },
        date: next,
      };
      if (calendarInfo.nextMonth === 0) {
        selectedDate.fullDate = new Date(calendarInfo.year + 1, calendarInfo.nextMonth, next);
      }
      calendarDate.push(selectedDate);
      next++;
    } else {
      const selectedDate = {
        fullDate: new Date(calendarInfo.year, calendarInfo.month, thisMonth),
        isWeekend: function () {
          return this.fullDate.getDay() === 0 || this.fullDate.getDay() === 6;
        },
        date: thisMonth,
      };
      calendarDate.push(selectedDate);
      thisMonth++;
    }
  }
  const slicedCalendarDate = [];
  for (let i = 0; i < calendarDate.length; i += 7) {
    slicedCalendarDate.push(calendarDate.slice(i, i + 7));
  }

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };
  const handleThisMonth = () => {
    setCurrentDate(new Date());
    setSectedDate(new Date());
  };
  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };
  const handleSelectedDate = (date) => {
    setSectedDate(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_title}>
          <h3>
            {calendarInfo.year}년 {months[calendarInfo.month]}
          </h3>
          <img src={`${process.env.REACT_APP_AWS_S3_BUCKET_URL}/sticker/test.png`} />
        </div>
        <div className={styles.btn_wrap}>
          <button onClick={handlePrevMonth}>
            <span>
              <ArrowBackIosNewIcon fontSize="small" />
            </span>
          </button>
          <button onClick={handleThisMonth}>{"오늘"}</button>
          <button onClick={handleNextMonth}>
            <span>
              <ArrowForwardIosIcon fontSize="small" />
            </span>
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.day_tr}>
            {daysOfWeek.map((day) => (
              <th key={day}>
                <span>{day}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slicedCalendarDate.map((dates, idx) => {
            return (
              <tr key={idx} className={styles.date_tr}>
                {dates.map((date) => {
                  const isThisMonth = date.fullDate.getMonth() === selectedMonth;
                  const selected = selectedDate.toDateString() === date.fullDate.toDateString();
                  const isWeekend = date.isWeekend();
                  return (
                    <td key={date.date} onClick={() => handleSelectedDate(date.fullDate)} className={`${styles.td} ${selected ? styles.selected : ""}`}>
                      <div className={styles.date_wrap}>
                        <span className={`${styles.date} ${isWeekend ? styles.weekend : ""} ${!isThisMonth ? styles.else_month : styles.this_month}`}>
                          {date.date}
                        </span>

                        {date.date % 6 == 0 && (
                          <div className={styles.schedule_wrap}>
                            <span className={styles.schedule}>
                              <FiberManualRecordRoundedIcon color="inherit" fontSize="inherit" />
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
