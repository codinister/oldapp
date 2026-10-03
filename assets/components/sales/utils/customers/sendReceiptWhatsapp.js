const sendReceiptWhatsapp = (e) => {
  const { firstname } = JSON.parse(localStorage.getItem('zsdf'));
  const { comp_name } = JSON.parse(localStorage.getItem('sinpt'));
  const { pay_id, cust_name, phone } = e.target.dataset;
  const url = `https://app.kwik2pos.com`;
  //const url = `http://localhost/kwikpos`;
  const mobile = phone.split(' ').join('');

  const mess = [
    `Hi! ${cust_name} this is ${firstname} from ${comp_name} please click on the link below to view your receipt
  `,
    `${url}/assets/pdf/receipt.php?rec=${btoa(pay_id)}`,
  ].join('\n\n');

  window.location.href = `https://wa.me/233${mobile}?text=${decodeURIComponent(
    mess
  )}`;
};

export default sendReceiptWhatsapp;
