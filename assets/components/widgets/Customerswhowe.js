import format_number from '../utils/format_number.js';

const Customerswhowe = (data) => {
  return `

  <table cellspacing="0">

  <thead class="arrears-table-head">
  <tr class="arrears-table-row">
  <td>Name</td>
  <td>Phone</td>
  <td>Amount</td>
  </tr>  
  </thead>


  <tbody class="tr-bg">
    ${data
    .map(
      (v) => `
   
      <tr class="arrears-table-row">
        <td>
           <a href="javascript:void(0);" class="accstatement" data-cust_id="${v.cust_id}">
        ${v.fullname}
        </a>
        
        </td>
        <td>${v.phone}</td>
        <td>${format_number(v.debt)}</td>
      </tr>
    
      `
    )
    .join(' ')}
  </tbody>


  </table>
  `;
};

export default Customerswhowe;
