import getSuperadmin from './getSuperadmin.js';

const getCustomers = async (callback) => {
  const superid = getSuperadmin();
  const data = await fetch(`assets/appfiles/customers-kwik${superid}-.json`);
  const customers = await data.json();
  callback(customers);
};

export default getCustomers;
