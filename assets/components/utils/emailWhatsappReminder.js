import { classSelector } from './Selectors.js';
import sendWhatsapp from './sendWhatsapp.js';
import sendEmail from './sendEmail.js';

const emailWhatsappReminder = (
  id = '',
  email = '',
  phone = '',
  message = ''
) => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.closeremform')) {
      e.target.parentElement.remove();
    }
    if (e.target.matches('.reminderbtnwhatsapp')) {
      const { phone, message } = e.target.dataset;
      sendWhatsapp(phone, message);
    }

    if (e.target.matches('.reminderbtnemail')) {
      const { email, message } = e.target.dataset;
      const subject = `Duration expiry reminder`;
      sendEmail(
        email,
        subject,
        message,
        'router.php?controller=widget&task=send_pdf_email'
      );
    }

    if (e.target.matches('.addmessg')) {
      const { id, email, phone, message } = e.target.dataset;
      let mess = '';
      if (phone) {
        mess = `<div><a href="javascript:void(0);" class="closeremform">Close</a>
        <br />
        <input type="text" value="${phone}" class="emailphone" />
        <br />
        <textarea class="remessage">${message}</textarea>
        <a href="javascript:void(0);" data-phone="${phone}" data-message="${message}" class="reminderbtnwhatsapp">SEND WHATSAPP</a></div>`;
      } else {
        mess = `<div><a href="javascript:void(0);"  class="closeremform">Close</a>
        <br />
        <input type="text" value="${email}" class="emailphone" />
        <br />
        <textarea class="remessage">${message}</textarea>
        <a href="javascript:void(0);"  data-email="${email}" data-message="${message}"  class="reminderbtnemail">SEND EMAIL</a></div>`;
      }
      classSelector(`formoutput${id}`).innerHTML = mess;
    }
  });

  const whatsap = phone
    ? `<a href="javascript:void(0);">
        <i class="fa fa-whatsapp fa-lg addmessg" data-id="${id}" data-phone="${phone}"  data-message="${message}"></i>
        </a>`
    : ' ';

  const eml = email
    ? `      <a href="javascript:void(0);">
            <i class="fa fa-envelope fa-lg addmessg" data-id="${id}" data-email="${email}" data-message="${message}"></i>
            </a>`
    : '';

  return `
    <div class="emailwhatsappform">
      ${whatsap}  ${eml}
    <div class="formoutput${id}"></div>
  `;
};

export default emailWhatsappReminder;
