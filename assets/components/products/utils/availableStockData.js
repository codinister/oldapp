import getIndustry from '../../utils/getIndustry.js';

const availableStockData = (data) => {
  const industry = getIndustry();

  if (industry === 'rentals') {
    return data?.rentals.availables;
  }
  if (industry === 'retails') {
    return data?.retails.stocks;
  }
  if (industry === 'service provider') {
    return data.service
  }
  if (industry === 'roofing company') {
    return data?.roofing
  }
};

export default availableStockData;
