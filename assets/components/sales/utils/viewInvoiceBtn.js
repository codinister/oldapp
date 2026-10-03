import Buttons from '../../utils/Buttons.js';

const saveInvoiceBtn = () => {
  const tx = JSON.parse(localStorage.getItem('sales'));

  if (tx?.trans_type) {
    return `
    ${Buttons([
      {
        btnclass: 'viewinvoice',
        btnname: 'VIEW INVOICE',
      },
    ])}
    `;
  } else {
    return '';
  }
};

export default saveInvoiceBtn;
