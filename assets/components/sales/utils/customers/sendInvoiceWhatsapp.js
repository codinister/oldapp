const sendInvoiceWhatsapp = (e) => {
  const { firstname } = JSON.parse(localStorage.getItem('zsdf'));
  const { comp_name } = JSON.parse(localStorage.getItem('sinpt'));
  const { tax_id, cust_name, phone } = e.target.dataset;
  const url = `https://www.kwik2pos.com`;
  //const url = `http://localhost/kwikpos`;
  const mobile = phone.split(' ').join('');

  const mess = [
    `Hi! ${cust_name} this is ${firstname} from ${comp_name} please click on the link below to view your invoice
   `,
    `${url}/assets/pdf/invoice.php?inv=${btoa(tax_id)}`,
  ].join('\n\n');
  window.location.href = `https://wa.me/233${mobile}?text="${decodeURI(
    mess
  )}"`;
};

export default sendInvoiceWhatsapp;
