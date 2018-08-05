export const getFutureDates = (): string[] => {
  const dates = [];
  const today: Date = new Date();
  for (let i = 0; i < 7; i++) {
    const year = today.getFullYear();
    const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const day = today.getDate() + i < 10 ? `0${today.getDate() + i}` : today.getDate() + i;
    dates.push(`${year}-${month}-${day}`);
  }
  return dates;
};
