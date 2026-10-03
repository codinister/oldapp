const getIndustry = () => {
  const sett = JSON.parse(localStorage.getItem('sinpt'));
  if (sett?.industry) return sett?.industry;
};

export default getIndustry;
