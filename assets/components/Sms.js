import Modalboxnoreload from './utils/Modalboxnoreload.js';
import { classSelector } from './utils/Selectors.js';
import Table from './utils/Table.js';
import searchBox from './utils/searchBox.js';
import displayToast from './utils/displayToast.js';
import smsStatusCodes from './sms/smsStatusCodes.js';
import Layout from './Layout.js';
import Spinner from './utils/Spinner.js';
import customersprofile from './data/serverside/fetch/customersprofile.js';
import getSmsBalance from './sms/getSmsBalance.js';

const Sms = () => {
  customersprofile((data) => {
    const divcolmFunc = (v) => `
    <tr class="smsdispflex">
        <td>
        <input type="checkbox" data-phone="${v.phone}" class="csms" />
        </td>
        <td>${v.fullname}</td>
        <td>${v.phone}</td>
    </tr>`;

    const get_only_customers_withphone = data.filter((v) => {
      if (v.phone) return v;
    });

    document.addEventListener('keyup', (e) => {
      if (e.target.matches('.smsmessage')) {
        const len = e.target.value.length;
        classSelector('totalcharentered').textContent = len;
        const per = Math.floor(Number(len) / 160) + 1;
        classSelector('perreceipient').textContent = per;
      }

      if (e.target.matches('.searchsmsclass')) {
        const inpt = e.target.value;
        const output = get_only_customers_withphone
          .filter((v) =>
            Object.values(v)
              .join('')
              .toLowerCase()
              .includes(inpt.toLowerCase()),
          )
          .slice(0, 20)
          .map((v) => divcolmFunc(v))
          .join('');

        classSelector('tableBodyClass').innerHTML = output;
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('.sendsms')) {
        const commasepcontacts = classSelector('commasepcontacts').value;

        const smsmessage = classSelector('smsmessage').value;

        if (!commasepcontacts) {
          displayToast('bgdanger', 'Contacts field required!');
          return;
        }

        if (!smsmessage) {
          displayToast('bgdanger', 'Message field required!');
          return;
        }

        classSelector('sendsmswrapper').innerHTML = Spinner('sendsmsspin');

        const sett = JSON.parse(localStorage.getItem('sinpt'));

        const contacts = commasepcontacts.split(',');
        fetch(sett?.sms_api_url + '?key=' + sett?.sms_api_key, {
          method: 'POST',
          body: JSON.stringify({
            recipient: contacts,
            sender: sett?.sms_sender_id,
            message: smsmessage,
            is_schedule: false,
            schedule_date: '',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.text())
          .then((data) => {
          console.log(data)
            const result = JSON.parse(data);
            const status = result?.status;
            const message = result?.message;
            const balance = result?.summary.credit_left;

            if (status === 'success') {
              displayToast('lightgreen', message);

              classSelector('smsrembalance').textContent = balance;

              classSelector('sendsmswrapper').innerHTML =
                `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE <span class="sendsmsspin"></span></a>`;
            } else {
              displayToast('bgdanger', data?.error);
              classSelector('sendsmswrapper').innerHTML =
                `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE <span class="sendsmsspin"></span></a>`;
            }
          });
      }

      if (e.target.matches('.smscheckall')) {
        const selctall = Array.from(document.querySelectorAll('.csms'));
        if (e.target.checked) {
          selctall.forEach((v) => (v.checked = true));
        } else {
          selctall.forEach((v) => (v.checked = false));
        }
      }

      if (e.target.matches('.addsmsconts')) {
        Spinner('addsmscontsspin');
        const selctall = Array.from(
          document.querySelectorAll('.csms'),
          (v) => v.checked && v.dataset.phone.split(' ').join(''),
        )
          .filter(Boolean)
          .join(',');

        classSelector('commasepcontacts').value = selctall;
        classSelector('noreload').classList.remove('show');
        document.body.style.overflow = 'scroll';
      }

      if (e.target.matches('.addexistingcont')) {
        const customersdetails = get_only_customers_withphone
          .map((v) => {
            if (v.phone) return divcolmFunc(v);
          })
          .join('');

        classSelector('smscontacts').innerHTML = `
          ${searchBox('searchsmsclass', 'Search Contacts')}

          ${Table(
            'sms-tbl',
            'smstbl',
            `<tr class="mobiletb smsdispflex">
                <td>
                &nbsp; &nbsp;<input type="checkbox" class="smscheckall" />
                </td>
                <td>Customers</td>
                <td>Contacts</td>
            </tr>`,
            `${customersdetails}`,
            'tableBodyClass',
          )}
          <a href="javascript:void(0);" class="addsmsconts">Add Contacts<span class="addsmscontsspin"></span></a>
          `;
        classSelector('noreload').classList.add('show');
        document.body.style.overflow = `hidden`;

        if (classSelector('addsmscontsspin')) {
          classSelector('addsmscontsspin').innerHTML = '';
        }
      }
    });

    const page = `
      <div class="dash-container  bulksms">
      <div>
        <div>
        
          <div class="smsbalance">SMS Balance: <strong class="smsrembalance"></strong></div>

          <textarea placeholder="Message" class="smsmessage"></textarea>

          <div>Total characters entered: <span class="totalcharentered"></span></div>

        </div>
      <div>

      <a href="javascript:void(0);" class="addexistingcont">ADD EXISTING CONTACTS TO MESSAGE</a>

        <textarea placeholder="Enter mobile numbers seperated by commas" class="commasepcontacts"></textarea>
        <div>Number of Messages Per Recipient: <span class="perreceipient"></span></div>
        <br>
        <div class="sendsmswrapper">
      <a href="javascript:void(0)" class="sendsms">SEND MESSAGE <span class="sendsmsspin"></span></a>
      </div>
      </div>
  
    </div>

  </div>

  ${Modalboxnoreload('', '<div class="smscontacts"></div>')}
  `;

    document.querySelector('.root').innerHTML = Layout('sms', page);
  });
};

export default Sms;
