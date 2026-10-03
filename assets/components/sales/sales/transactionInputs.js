import othercharges from './othercharges.js';
import payment from './payment.js';
import subtotal from './subtotal.js';
import getIndustry from '../../utils/getIndustry.js';
import paymentsMobile from './paymentsMobile.js';

const transactionInputs = (vv, privilege) => {
  const industry = getIndustry();
  let othercharge = '';
  if (industry === 'roofing company') {
    othercharge = `
  <div class="payment-box">
  ${othercharges(vv)}
  </div>
  `;
  }

  let allTransactions = '';

  if (window.screen.width < 400) {
    allTransactions = `
    <div class="hide-on-desktop">
    ${paymentsMobile(vv, privilege)}
    </div>`;
  } else {
    allTransactions = `
    <div class="othercharges-box ">
    ${payment(privilege)}
    </div>
    ${othercharge}
    <div class="subtotal-box hide-on-mobile">
    ${subtotal(vv)}
    </div>`;
  }

  return `
  <div class="transactionInputs">
  ${allTransactions}
  </div>
  `;
};

export default transactionInputs;
