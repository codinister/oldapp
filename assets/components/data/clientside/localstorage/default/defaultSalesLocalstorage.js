import { ymd } from '../../../../utils/DateFormats.js';

const defaultSalesLocalstorage = () => {
  const crypto = self?.crypto?.randomUUID
    ? self.crypto.randomUUID()
    : 'UUID not available';

  if (!localStorage.getItem('sales')) {
    const sess = JSON.parse(localStorage.getItem('zsdf'));

    const sett = JSON.parse(localStorage.getItem('sinpt'));

    const newdate = new Date();

    const sales = {
      vat: 0,
      nhil: 0,
      getfund: 0,
      sub_total: 0,
      discount: 0,
      withholdingtax: 0,
      total: 0,
      profile: '',
      transportation: 0,
      installation: 0,
      location: '',
      previouspayment: 0,
      newpayment: 0,
      balance: 0,
      taxchecked: false,
      withholdingchecked: false,
      user_id: sess?.user_id,
      cust_id: 0,
      cust_name: '',
      cust_email: '',
      cust_phone: '',
      tax_id: 0,
      trans_type: 'proforma',
      pay_type: 'Cash',
      prepared_by: '',
      note: '',
      invoice_date: ymd(newdate),
      exp_date: '',
      addbank: '',
      receipt_date: ymd(newdate),
      vat_rate: sett?.vat,
      nhil_rate: sett?.nhil,
      getfund_rate: sett?.getfund,
      withholdingtax_rate: sett?.withholdingtax,
      code: sess?.code,
      bank_acc_number: '',
      contract: '',
      uuid: crypto,
    };

    localStorage.setItem('sales', JSON.stringify(sales));
  }
};

export default defaultSalesLocalstorage;
