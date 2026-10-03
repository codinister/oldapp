const socialMediaLinks = (
  cust_id,
  email,
  fullname,
  pay_id,
  user_id,
  phone,
  tax_id,
  user,
  title,
  comp_name
) => {
  let whatsapp = '';

  if (phone) {
    whatsapp = `
  <a href="javascript:void(0);">
  <i 
  data-cust_id = "${cust_id}"
  data-email  = "${email}"
  data-fullname = "${fullname}"
  data-pay_id = "${pay_id}"
  data-user_id = "${user_id}"
  data-phone  = "${phone}"
  data-tax_id = "${tax_id}"
  data-user = "${user}"
  data-titl = "${title}"
  data-comp_name = "${comp_name}"
  data-type = "whatsapp"
  class="fa fa-whatsapp sender" title="Share invoice link on whatsapp"></i>
  </a>`;
  }

  let emails = '';

  if (email.length > 0 && email !== 'undefined') {
    emails = `
        <a href="javascript:void(0);">
            <i 
            data-cust_id = "${cust_id}"
            data-email  = "${email}"
            data-fullname = "${fullname}"
            data-pay_id = "${pay_id}"
            data-user_id = "${user_id}"
            data-phone  = "${phone}"
            data-tax_id = "${tax_id}"
            data-user = "${user}"
            data-titl = "${title}"
            data-comp_name = "${comp_name}"
            data-type = "email"
            class="fa fa-envelope sender" title="Send invoice link to email"></i>
        </a>
  `;
  }

  return whatsapp + ' ' + emails;
};

export default socialMediaLinks;
