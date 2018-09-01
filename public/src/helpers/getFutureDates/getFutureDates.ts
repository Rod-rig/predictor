export const getFutureDates = (date: Date = new Date()): string[] => {
  const dates = [];
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  const monthsDurations = [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for (let i = 0; i < 7; i++) {
    if (day > monthsDurations[month]) {
      month = (month + 1) % 12;
      day = 1;
    }
    if (day === 1 && month === 0) {
      year += 1;
    }
    const finalMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
    const finalDay = day < 10 ? `0${day}` : day;
    dates.push(`${year}-${finalMonth}-${finalDay}`);
    day += 1;
  }
  return dates;
};
