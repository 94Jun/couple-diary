export const formatDate = (date) => {
  const weeksOfDay = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const week = weeksOfDay[date.getDay()];
  const hour = (date.getHours() + 9).toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${year}. ${month}. ${day}.(${week}) ${hour}:${minute}`;
};

/** 사귄 날짜에 따라 자동으로 기념일 생성해주는 함수(100일, 200일, 300일, 1주년, 2주년 +) */
export const addAutoAnniversaries = (anniversaries) => {
  if (anniversaries) {
    const startAnniversary = anniversaries.find((ann) => ann.event_name === "시작");
    if (startAnniversary) {
      const today = new Date();
      const startDate = new Date(startAnniversary?.event_date);
      const yearsPassed = today.getFullYear() - startDate.getFullYear();
      const dayMilestones = [100, 200, 300];
      const yearMilestones = [];
      for (let i = 1; i <= yearsPassed + 2; i++) {
        yearMilestones.push(i);
      }
      const dayAnniversaries = dayMilestones.map((day) => {
        const anniversary_id = "ann_" + Date.now() + Math.floor(Math.random() * 1000000);
        const event_date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (day - 1)).toISOString();
        const event_name = `${day}일`;
        return { anniversary_id, event_date, event_name, isAuto: true };
      });
      const yearAnniversaries = yearMilestones.map((year) => {
        const anniversary_id = "ann_" + Date.now() + Math.floor(Math.random() * 1000000);
        const event_date = new Date(startDate.getFullYear() + year, startDate.getMonth(), startDate.getDate()).toISOString();
        const event_name = `${year}주년`;
        return { anniversary_id, event_date, event_name, isAuto: true };
      });
      const generatedAnniversaries = [...anniversaries, ...dayAnniversaries, ...yearAnniversaries].sort((a, b) => {
        return a.event_date >= b.event_date ? 1 : -1;
      });
      return generatedAnniversaries;
    }
  }
};

/** 이전 일정과 이후 일정 구분 */
export const divideScheduleByNow = (schedules, isNext) => {
  if (schedules && schedules.length > 0) {
    const updatedSchedules = schedules.filter((schedule) => {
      const date = Object.keys(schedule);
      const year = "20" + date.toString().slice(0, 2);
      const month = date.toString().slice(4, 6);
      const day = date.toString().slice(8, 10);
      const scheduleTime = new Date(year, Number(month) - 1, day).getTime();
      const now = new Date().setHours(0, 0, 0, 0);
      if (isNext) {
        return scheduleTime >= now;
      } else {
        return scheduleTime < now;
      }
    });
    return updatedSchedules;
  }
};

/** 일정 일자별로 구분 */
export const divideSchedule = (schedules) => {
  if (schedules && schedules.length > 0) {
    const dates = schedules.map((schedule) => {
      return schedule.schedule_date;
    });
    const uniqueDates = [...new Set(dates)];
    const updatedSchedule = uniqueDates.map((date) => {
      const scheduleDate = formatDate(new Date(date)).slice(0, 14);
      const updatedSchedules = schedules.filter((schedule) => schedule.schedule_date === date);
      return { [scheduleDate]: updatedSchedules };
    });
    return updatedSchedule;
  } else {
    return;
  }
};
