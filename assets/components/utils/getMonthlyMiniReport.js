const getMonthlyMiniReport = async (callback) => {
  const data = JSON.parse(localStorage.getItem('kwikprodminireport'));
  callback(data);
};

export default getMonthlyMiniReport;
