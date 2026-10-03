import Buttons from '../../utils/Buttons.js';
import { classSelector } from '../../utils/Selectors.js';
import dataListDropdown from '../../utils/dataListDropdown.js';
import displayToast from '../../utils/displayToast.js';
import roleAccess from '../../utils/roleAccess.js';
import searchBox from '../../utils/searchBox.js';
import TabsSections from '../utils/TabsSections.js';
import customerData from '../utils/customers/customerData.js';
import customerProfile from '../utils/customers/customerProfile.js';
import displayCustomerProfile from '../utils/customers/displayCustomerProfile.js';
import listOfallcustomers from '../utils/customers/listOfallcustomers.js';
import getProformas from '../utils/getProformas.js';
import getReceipts from '../utils/getReceips.js';
import getSalesinvoice from '../utils/getSalesinvoice.js';
import { textInput } from '../../utils/InputFields.js';

const viewCustomers = (customer, receipts, allproforma, allinvoices) => {
  const customers = customerData(customer);

  document.addEventListener('click', (e) => {
    if (e.target.matches('.show-customers')) {
      const res = customers.filter((v) => v.type === 'customer');
      classSelector('allcustomers-list').innerHTML = listOfallcustomers(
        res,
        'customer',
      );
    }

    if (e.target.matches('.show-referrers')) {
      const res = customers.filter((v) => v.ref === '1');
      classSelector('allcustomers-list').innerHTML = listOfallcustomers(
        res,
        'referrer',
      );
    }

    if (e.target.matches('.viewcustomers')) {
      if (localStorage.getItem('editreceipts')) {
        localStorage.removeItem('editreceipts');
      }

      if (customers) {
        const { user_id, code } = JSON.parse(localStorage.getItem('zsdf'));

        classSelector('viewcustomerwrapper').innerHTML = `

        <div class="viewcust-sidebar">

        <div class="hideonmobile">
            ${searchBox('customersearch-class', 'Search Customers')}
            </div>

            <div class="side-box-container">
              <button data-user_id="${user_id}" data-code="${code}" class="cust-rep-btn">CUSTOMERS LIST</button>
            </div>

            <div class="referer-conteiner">

              <button class="show-customers hideonmobile">
              Show only customers
              </button>

              <button class="show-referrers hideonmobile">
              Show only referrers
              </button>

            </div>

            <div class="hideondesktop mobile-cust-search">
              ${dataListDropdown(
                textInput,
                'mobile-customerinptclass',
                'Choose Customer',
                '',
                'fff',
                'mobile-customerwrapper',
              )}
            </div>


            <div class=" hideonmobile allcustomers-list-height">
            <table>
            <tbody class="allcustomers-list">
            ${listOfallcustomers(
              customers.filter((v) => v.type === 'customer'),
              'customer',
            )}
            </tbody>
            </table>
            </div>
        </div>
        <div class="viewcust-content">
            <div class="top-part">${customerProfile({})}</div>
            <div class="bottom-part-desktop"></div>
        </div>
        `;
        classSelector('noreload').classList.add('show');
        document.body.style.overflow = 'hidden';

        TabsSections();
      }
    }

    if (e.target.matches('.cust-rep-btn')) {
      const { role_id } = JSON.parse(localStorage.getItem('zsdf'));
      const { user_id, code } = e.target.dataset;

      const roleaccess = roleAccess(role_id);

      if (roleaccess) {
        window.location = `assets/pdf/customers.php?c=${code}`;
      } else {
        window.location = `assets/pdf/customers.php?u=${user_id}`;
      }
    }

    if (e.target.matches(`.mobile-customerlink`)) {
      const inputText = e.target.textContent;
      classSelector('mobile-customerinptclass').value = inputText;

      classSelector('mobile-customerwrapper').classList.remove('showmodal');

      const { cust_id, user_id, desc } = e.target.dataset;

      const usid = JSON.parse(localStorage.getItem('zsdf')).user_id;

      //To display or hide account statement button
      const invoice_exist = allinvoices.some((v) => v.cust_id === cust_id);
      displayCustomerProfile(customers, user_id, usid, cust_id, invoice_exist);

      let prof = [];
      let invs = [];
      let rec = [];

      if (desc === 'customer') {
        prof = allproforma.filter((v) => String(v.cust_id) === String(cust_id));
        invs = allinvoices.filter((v) => String(v.cust_id) === String(cust_id));
        rec = receipts.filter((v) => String(v.cust_id) === String(cust_id));
      } else if (desc === 'referrer') {
        const filtered = customer
          .filter((v) => String(cust_id) === String(v.ref_id))
          .map((v) => v.cust_id);
        prof = allproforma.filter((v) => filtered.includes(v.cust_id));
        invs = allinvoices.filter((v) => filtered.includes(v.cust_id));
        rec = receipts.filter((v) => filtered.includes(v.cust_id));
      }

      TabsSections();
      getProformas(prof);
      getSalesinvoice(invs);
      getReceipts(rec);
    }

    if (e.target.matches('.displaycustdetails')) {
      const { cust_id, user_id, desc } = e.target.dataset;


      const usid = JSON.parse(localStorage.getItem('zsdf')).user_id;

 

      //To display or hide account statement button
      const invoice_exist = allinvoices.some((v) => v.cust_id === cust_id);


      displayCustomerProfile(customers, user_id, usid, cust_id, invoice_exist);

      let prof = [];
      let invs = [];
      let rec = [];

      if (desc === 'customer') {
        prof = allproforma.filter((v) => String(v.cust_id) === String(cust_id) );
        invs = allinvoices.filter((v) => String(v.cust_id) === String(cust_id));
        rec = receipts.filter((v) => String(v.cust_id) === String(cust_id));
      } else if (desc === 'referrer') {
        const filtered = customer
          .filter((v) => String(cust_id) === String(v.ref_id))
          .map((v) => v.cust_id);
        prof = allproforma.filter((v) => filtered.includes(v.cust_id));
        invs = allinvoices.filter((v) => filtered.includes(v.cust_id));
        rec = receipts.filter((v) => filtered.includes(v.cust_id));
      }

      TabsSections();
      getProformas(prof);
      getSalesinvoice(invs);
      getReceipts(rec);
    }

    if (e.target.matches('.editcust')) {
      const obj = e.target.dataset;

      const invoice_exist = allinvoices.some((v) => String(v.cust_id) === String(obj?.cust_id));
      classSelector('top-part').innerHTML = customerProfile({
        ...obj,
        invoice_exist,
        editing: true,
      });
      delete obj['debt'];
      localStorage.setItem('custinfo', JSON.stringify(obj));
    }

    if (e.target.matches('.acc-statement')) {
      const { cust_id } = e.target.dataset;

      window.location = `assets/pdf/accstatement.php?t=${cust_id}`;
    }

    if (e.target.matches('.delt-cust')) {
      e.stopImmediatePropagation();
      if (confirm('Are you sure you want to delete ')) {
        const { cust_id, fullname } = e.target.dataset;

        const fd = new FormData();
        fd.append('data', JSON.stringify({ cust_id, fullname }));

        fetch(`router.php?controller=customer&task=delete_customer`, {
          method: 'Post',
          body: fd,
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data.indexOf('errors') != -1) {
              displayToast('bgdanger', data);
            } else {
              e.target.parentElement.parentElement.parentElement.remove();

              setTimeout(() => {
                localStorage.setItem('rend', 3);
              }, 2000);
            }
          });
      } else {
      }
    }

    if (e.target.matches('.save-customer')) {
      const data = JSON.parse(localStorage.getItem('custinfo'));

      if (data?.fullname.length < 1) {
        return displayToast('bgdanger', 'Fullname field required!');
      }

      const fd = new FormData();
      fd.append('data', JSON.stringify(data));

      //Spinner('save-cust-btn');

      fetch('router.php?controller=customer&task=update_customer', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
          } else {
            displayToast('lightgreen', data);
            const details = JSON.parse(localStorage.getItem('custinfo'));
            const invoice_exist = allinvoices.some(
              (v) => v.cust_id === details?.cust_id,
            );
            classSelector('top-part').innerHTML = customerProfile({
              ...details,
              editing: false,
              invoice_exist,
            });

            setTimeout(() => {
              localStorage.setItem('rend', 3);
            }, 2000);
          }
        });
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.customersearch-class')) {
      const { value } = e.target;
      if (value.length > 0) {
        const res = customers
          .filter((v) =>
            Object.values(v)
              .join(' ')
              .toLowerCase()
              .includes(value.toLowerCase()),
          )
          .slice(0, 10);
        classSelector('allcustomers-list').innerHTML = listOfallcustomers(
          res,
          'customer',
        );
      } else {
        classSelector('allcustomers-list').innerHTML = listOfallcustomers(
          customers,
          'customer',
        );
      }
    }
  });

  return `
  ${Buttons([
    {
      btnclass: 'viewcustomers',
      btnname: 'CUSTOMERS ACCOUNTS',
    },
  ])}
  `;
};

export default viewCustomers;
