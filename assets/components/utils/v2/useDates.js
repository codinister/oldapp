import loginDate from './loginDate.js';

export const daysLeft = (date) => {
  const cur_date = new Date(loginDate()).getTime();
  const end_date = new Date(date).getTime();

  const diff = end_date - cur_date;

  if (diff < cur_date) return 0;

  const TIME_STAMP = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / TIME_STAMP);
  return days;
};


export const daysAgo = (date) => {
  
  const cur_date = new Date(loginDate()).getTime();
  const start_date = new Date(date).getTime();

  const diff = cur_date - start_date;

  if (diff < cur_date) return 0;

  const TIME_STAMP = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / TIME_STAMP);
  return days;
};
