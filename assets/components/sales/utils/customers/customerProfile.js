import format_number from '../../../utils/format_number.js';
import getCurrency from '../../../utils/getCurrency.js';

const customerProfile = ({ ...obj }) => {
  document.addEventListener('change', (e) => {
    if (e.target.matches('.updatecust')) {
      const { name, value } = e.target;
      const customerinfo = JSON.parse(localStorage.getItem('custinfo'));
      const obj = { ...customerinfo, [name]: value };
      localStorage.setItem('custinfo', JSON.stringify(obj));
    }

    if (e.target.matches('.custinfo')) {
      const { name, value } = e.target;

      if (!localStorage.getItem('custinp'))
        localStorage.setItem(
          'custinp',
          JSON.stringify({
            cemail: '',
            cfullname: '',
            clocation: '',
            cphone: '',
            custname: '',
            rphone: '',
            ref_id: '',
            ref_type: '',
          })
        );
      const getobj = JSON.parse(localStorage.getItem('custinfo'));
      const newobj = { ...getobj, [name]: value };

      localStorage.setItem('custinfo', JSON.stringify(newobj));
    }
  });

  const {
    fullname = '',
    phone = '',
    email = '',
    location = '',
    ref_type = '',
    debt = 0,
    editing = false,
    cust_id = '',
    invoice_exist = false,
  } = obj;

  const fullname_row = editing
    ? `<input type="text" class="updatecust" name="fullname" value="${fullname}" />`
    : fullname;

  const phone_row = editing
    ? `<input type="text" class="updatecust" name="phone" value="${phone}" />`
    : phone;

  const email_row = editing
    ? `<input type="text"  class="updatecust" name="email" value="${email}" />`
    : email;

  const location_row = editing
    ? `<input type="text"  class="updatecust" name="location" value="${location}" />`
    : location;

  const debt_row = debt > 0 ? getCurrency() + ' ' + format_number(debt) : 0;

  const referrer_type = `
  <td>Referrer type:</td>
  <td>
  ${
    editing
      ? `
          <select  class="ref_type custinfo"  name="ref_type">   
          <option hidden></option>
          <option>Customer</option>
          <option>Friend</option>
          <option>Family</option>
          <option>Agent</option>
          <option>Other</option>
          </select>`
      : ref_type
  }
  </td>
  <td></td>
  `;

  return `
  <table class="customer-prof-table"> 
  <tbody>

    <tr class="cutomname">
    <td>Fullname:</td><td>${fullname_row}</td>    

    <td>
    ${
      invoice_exist
        ? `<button class="acc-statement" data-cust_id="${cust_id}">Account Statement</button>`
        : ''
    }
    </td>
    </tr>

    <tr>
    <td>Phone:</td><td>${phone_row}</td>
    </tr>

    <tr>
    <td>Email:</td><td>${email_row}</td>
    </tr>

    <tr>
    <td>Location:</td>
    <td>${location_row}</td>

      <td class="save-cust-btn">
      ${editing ? `<button class="save-customer">Save customer</button> ` : ''}
      </td>
    </tr>

    <tr>
      ${referrer_type}
    </tr>

    <tr class="debt-box">
      <td>
        Total debt:
      </td>
      <td>
        ${debt_row}
      </td>
    </tr>


  
    </tbody>
    </table>
  `;
};

export default customerProfile;
