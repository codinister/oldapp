import { expdate_left } from './DateFormats.js';
const expiryChecker = (exp_date) => {
  const expdate = expdate_left(exp_date);
  if (expdate > 1) return true;
  else return false;
};

export default expiryChecker;
