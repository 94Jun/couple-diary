export const formatDate = (date) => {
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = (date.getHours() + 9).toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${year}. ${month}. ${day}. ${hour}:${minute}`;
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
        return { anniversary_id, event_date, event_name };
      });
      const yearAnniversaries = yearMilestones.map((year) => {
        const anniversary_id = "ann_" + Date.now() + Math.floor(Math.random() * 1000000);
        const event_date = new Date(startDate.getFullYear() + year, startDate.getMonth(), startDate.getDate()).toISOString();
        const event_name = `${year}주년`;
        return { anniversary_id, event_date, event_name };
      });
      const generatedAnniversaries = [...anniversaries, ...dayAnniversaries, ...yearAnniversaries].sort((a, b) => {
        return a.event_date >= b.event_date ? 1 : -1;
      });
      return generatedAnniversaries;
    }
  }
};
