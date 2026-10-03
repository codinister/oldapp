import { classSelector } from '../../../utils/Selectors.js';
import customerProfile from './customerProfile.js';

const displayCustomerProfile = (
  customers,
  user_id,
  usid,
  cust_id,
  invoice_exist,
) => {
  if (customers.length > 0) {
    const obj = customers
      .filter((v) => String(v.cust_id) === String(cust_id))
      .map((v) => ({
        ...v,
        bol: user_id === usid ? true : false,
      }))[0];

    if (obj) {
      const { fullname, phone, email, location, ref_type, debt } = obj;
      const profile = {
        fullname,
        phone,
        email,
        location,
        ref_type,
        debt,
        cust_id,
        invoice_exist,
      };
      classSelector('top-part').innerHTML = customerProfile(profile);
    }
  }
};

export default displayCustomerProfile;
