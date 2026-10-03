import { salesdate } from '../widgets/logic/Logic.js';

const monthlyReport = () => {
  const getMonthlyMiniReport = async () => {
    const sess = JSON.parse(localStorage.getItem('zsdf'));
    const { user_id, role_id } = sess;

    const fch = await fetch(
      'router.php?controller=widget&task=get_mini_report'
    );
    const data = await fch.json();

    //Receipts
    let receipts;
    if (role_id == 111) {
      receipts = data.tax.filter(
        (v) => v.trans_type === 'invoice' && v.balance > 0
      ).length;
    } else {
      receipts = data.tax.filter(
        (v) => v.trans_type === 'invoice' && v.user_id === user_id
      ).length;
    }

    //Proforma
    let proforma;
    if (role_id === 111) {
      proforma = data.tax.filter((v) => v.trans_type === 'proforma').length;
    } else {
      proforma = data.tax.filter(
        (v) => v.trans_type === 'proforma' && v.user_id === user_id
      ).length;
    }

    //Customers
    let customers;
    if (role_id === 111) {
      customers = data.customers.map((v) => v).length;
    } else {
      customers = data.customers.filter((v) => v.user_id === user_id).length;
    }

    //Logins
    let logins;
    if (role_id === 111) {
      logins = data.login.map((v) => v).length;
    } else {
      logins = data.login.filter((v) => v.user_id === user_id).length;
    }

    if (document.querySelector('.monthlyminireport')) {
      document.querySelector('.monthlyminireport').innerHTML = `
      <li>
      <span>${Number(proforma)}</span><span>Total Proforma</span>
      </li>
      <li>
      <span>${Number(receipts)}</span><span>Total Receipts</span>
      </li>
      <li>
      <span>${customers}</span><span>Total Customers</span>
      </li>
      <li>
      <span>0</span><span>Total Leads</span>
      </li>
      <li>
      <span>${logins}</span><span>Total Logins</span>
      </li>
      `;
    }
  };
  getMonthlyMiniReport();

  return `
    <div class="monthlyreport">
    <div>
    Monthly Mini Report
    </div>
    <div>
    <div>
        <div class="minirepdate">${salesdate()}</div>
        <ul class="monthlyminireport"></ul>
    </div>
    </div>
    `;
};

export default monthlyReport;
