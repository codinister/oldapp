const customerReport = () => {
  const { role_id } = JSON.parse(localStorage.getItem('zsdf'));
  let customer_reports = '';

  if (role_id === '111' || role_id === '1' || role_id === '5') {
    customer_reports = `
    <div class="view-rep">
    <span>CUSTOMER REPORTS </span> <span>^</span>
    </div>

    <div> 
    <button class="cust-rep-btn">CUSTOMERS REPORT</button>
    <button class="vend-rep-btn">VENDORS REPORT</button>
    <button class="ref-rep-btn">REFERRERS REPORT</button>
    </div>
    `;
  }

  return customer_reports;
};

export default customerReport;
