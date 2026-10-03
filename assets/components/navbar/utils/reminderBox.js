import { dmy, formatDate } from '../utils/DateFormats.js';
import displayToast from '../utils/displayToast.js';
import smsStatusCodes from '../sms/smsStatusCodes.js';
import getIndustry from '../utils/getIndustry.js';
import getInvoiceDetails from '../sales/utils/getInvoiceDetails.js';
import customersprofile from '../data/serverside/fetch/customersprofile.js';

const remondexbx = () => {
  const industry = getIndustry();
  const { role_id } = JSON.parse(localStorage.getItem('zsdf'));

  customersprofile((data) => {

    const obj = data
      .map((v) => v.expiries)
      .filter((v) => Object.values(v).length)
      .map(v => Object.values(v)).flat(2);


    const count = obj.length;

    if (industry === 'rentals' || industry === 'service provider') {
      if (count > 0) {
        document.querySelector('.alert-rounded').classList.add('show');
        setTimeout(() => {
          document.querySelector('.alert-rounded').textContent = count;
        }, 0);
      }
    }

    const res = obj
      .map((v) => {
        let smslink = '';

        if (role_id === '5' || role_id === '1' || role_id === '111') {
          smslink = `
            <a href="javascript:void(0)"
            class="sendsmsmess"
            data-prod_id = "${v.tax_id}"
            data-phone = "${v.phone}"
            data-fullname = "${v.fullname}"
            data-exp_date = "${v.exp_date}"
            data-profile = "${v.profile}"
            >SEND SMS</a>`;
        }

        return `
        <div class="expiriesbx flex gap-1">
        <div class="expiriesbx-details">
        <h3>${v.fullname.toUpperCase()}</h3>
        <small><i class="fa fa-phone fa-lg"></i> ${v.phone}</small>
        <strong class="explabel"><span>Exp date:</span> ${formatDate(
          v.exp_date
        )}</strong>

        <div class="expbtns">
        ${smslink}
        <a href="javascript:void(0)"
        class="viewinv"
        data-cust_id = "${v.cust_id}"
        data-tax_id = "${v.tax_id}"
        data-user_id = "${v.user_id}"
        >VIEW INVOICE</a>  
        </div>

        <div class="sendsmsbx${v.tax_id}"></div>
        </div>
        </div>
    `;
      })
      .join('');

    if (industry === 'rentals' || industry === 'service provider') {
      document.querySelector('.contarea').innerHTML = res;
    } else [(document.querySelector('.contarea').innerHTML = '')];
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.alert-rounded')) {
      document.querySelector('.remondexbx').classList.add('show');
    }

    if (e.target.matches('.closemainexpbox')) {
      document.querySelector('.remondexbx').classList.remove('show');
    }







    if (e.target.matches('.sendsmstoclient')) {
      e.stopImmediatePropagation();

      const { prod_id } = e.target.dataset;

      const phone = document.querySelector(`.smsinpval${prod_id}`).value;
      const mess = document.querySelector(`.smstexval${prod_id}`).value;

      e.target.textContent = 'SENDING WAIT...';

      if (!phone) {
        return displayToast('bgdanger', 'Phone field required!');
      }

      if (phone.length < 10) {
        return displayToast('bgdanger', 'Phone number must be 10 or more!');
      }

      if (!mess) {
        return displayToast('bgdanger', 'Message field required!!');
      }

      const fd = new FormData();
      fd.append('contacts', phone);
      fd.append('message', mess);

      fetch('router.php?controller=widget&task=send_sms', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data?.code?.split(':')[1]?.length || data.code == 1000) {
            const res = smsStatusCodes(data.code);
            displayToast('lightgreen', res);
          } else if (data.code != 1000) {
            const res = smsStatusCodes(data.code);
            displayToast('bgdanger', res);
            e.target.innerHTML = 'SEND SMS';
          }
        });
    }















    if (e.target.matches('.closesmsbx')) {
      const { prod_id } = e.target.dataset;
      document.querySelector(`.sendsmsbx${prod_id}`).innerHTML = '';
    }

    if (e.target.matches('.sendsmsmess')) {
      const { phone, prod_id, fullname, exp_date,profile } = e.target.dataset;

      document.querySelector(`.sendsmsbx${prod_id}`).innerHTML = `
      <div class="smssbx">
      <span class="closesmsbx" data-prod_id="${prod_id}">Close</span>
      <input type="text" class="smsinpval${prod_id}" value="${
        phone ? phone : ''
      }" placeholder="Phone" />
      <textarea placeholder="Message" class="smstexval${prod_id}">Hello! ${fullname} be informed that your job (${profile}) will expire on ${formatDate(
        exp_date
      )}  </textarea>

      <a href="javascript:void(0);" data-prod_id=${prod_id} class="sendsmstoclient">
       <span>SEND SMS  </span></a>
      </div>
      `;
    }

    if (e.target.matches('.viewinv')) {
      e.stopImmediatePropagation();
      const { cust_id, tax_id, user_id } = e.target.dataset;
      getInvoiceDetails(cust_id, tax_id, user_id, '', (data) => {
        const { products, taxes } = data;
        localStorage.setItem('prozdlist', JSON.stringify(products));
        localStorage.setItem('sales', JSON.stringify(taxes));
        if (localStorage.getItem('prozdlist')) {
          window.location = 'index.html?page=sell';
        }
      });
    }
  });

  return `
  <div class="alert-rounded"></div>
    <div class="remondexbx">
      <a href="javascript:void(0);" class="closemainexpbox">Close</a>
      <div class="remondexbxwrapper">
      <div class="bottomboxx">
      <div class="contarea">
      
      </div>
      </div>
      </div>
    </div>
  `;
};

export default remondexbx;
