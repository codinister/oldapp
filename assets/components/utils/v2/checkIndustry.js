import getIndustry from '../getIndustry.js';

const checkIndustry = (arr) => {
  if (!arr.isArray()) return console.log('Array required!');

  const industry = getIndustry();

  if (arr.includes(industry)) return true;

  return false;
};

export default checkIndustry;
