import getIndustry from './utils/getIndustry.js';
import Layout from './Layout.js';
import productsprofile from './data/serverside/fetch/productsprofile.js';
import Modalboxone from './utils/Modalboxone.js';
import { classSelector } from './utils/Selectors.js';
import rerender from './utils/rerender.js';

import Service from './products/services/Service.js';
import Roofing from './products/roofing/Roofing.js';
import Retail from './products/retails/Retail.js';
import Rental from './products/rentals/Rental.js';

const Products = async () => {
  const industry = getIndustry();
  const data = await productsprofile(industry);

  let pages;

  if (industry === 'service provider') {
    pages = Service(data);
  } else if (industry === 'roofing company') {
    pages = Roofing(data);
  } else if (industry === 'retails') {
    pages = Retail(data);
  } else if (industry === 'rentals') {
    pages = Rental(data);
  }

  const Page = `
      ${pages}
      ${Modalboxone('', '')}
      `;
  classSelector('root').innerHTML = Layout('products', Page);
};
rerender(Products, 2);
export default Products;
