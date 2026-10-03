import viewcustomers from './viewCustomers.js';
import addCustomer from './addCustomer.js';
import { textInput } from '../../utils/InputFields.js';
import { classSelector } from '../../utils/Selectors.js';
import dataListDropdown from '../../utils/dataListDropdown.js';
import salesLocalstorage from '../../data/clientside/localstorage/default/defaultSalesLocalstorage.js';
import displayProductList from '../utils/displayProductList.js';
import getIndustry from '../../utils/getIndustry.js';
import { ymd } from '../../utils/DateFormats.js';
import updateTaxlocalstorage from '../utils/updateTaxlocalstorage.js';
import getPrevilleges from '../utils/getPrevilleges.js';
import usersprofile from '../../data/serverside/fetch/usersprofile.js';
import deleteAccessControl from '../utils/deleteAccessControl.js';

const salesTopbar = (customersDatas, receipts, proforma, invoice) => {
  usersprofile((data) => {
    const users = data.map((v) => ({
      user_id: v.user_id,
      fullname: v.firstname + ' ' + v.lastname,
    }));

    document.addEventListener('click', (e) => {
      if (e.target.matches('.userwrapperinpt')) {
        if (users) {
          const usersdata = users
            .slice(0, 10)
            .map((v) => usersIteratorFunc(v))
            .join('');
          classSelector('userwrapper').innerHTML = usersdata;
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.target.matches('.userwrapperinpt')) {
        const val = e.target.value;
        if (users) {
          const usersdata = users
            .filter((v) =>
              Object.values(v)
                .join('')
                .toLowerCase()
                .includes(val.toLowerCase())
            )
            .slice(0, 10)
            .map((v) => usersIteratorFunc(v))
            .join('');
          classSelector('userwrapper').innerHTML = usersdata;
        }
      }
    });
  });

  const industry = getIndustry();
  const { role_id, user_id } = JSON.parse(localStorage.getItem('zsdf'));

  let customersData = [];

  if (role_id === '111' || role_id === '1' || role_id === '5') {
    customersData = customersDatas;
  } else {
    customersData = customersDatas.filter((v) => v.user_id === user_id);
  }

  document.addEventListener('change', (e) => {
    if (e.target.matches('.invoice_date')) {
      e.preventDefault();

      if (classSelector('invoice_date')) {
        const value = classSelector('invoice_date').value;
        updateTaxlocalstorage('invoice_date', value);
      }
    }

    if (e.target.matches('.exp_date')) {
      e.preventDefault();

      if (classSelector('exp_date')) {
        const value = classSelector('exp_date').value;
        updateTaxlocalstorage('exp_date', value);
      }
    }
  });

  const customerIteratorFunc = (v) => {
    return `
      <li>
      <a href="javascript:void(0);" 
      class="customerlink" 
      data-name="${v.fullname}"
      data-phone="${v.phone}"
      data-location="${v.location}"
      data-email="${v.email}"
      data-id="${v.cust_id}"
      data-funds="${v.funds}"
      >
      ${v.fullname}
      </a>
      </li>
    `;
  };

  const mobileCustomerIteratorFunc = (v) => {
    return `

    <div class="cust-list-box">


    <div class="custfullnamebx">
      <a href="javascript:void(0);" 
      data-cust_id="${v.cust_id}" 
      data-fullname = "${v.fullname}"
      data-phone = "${v.phone}"
      data-email = "${v.email}"
      data-ref_type = "${v.ref_type}"
      data-location = "${v.location}"
      data-description = "${v.description}"
      data-type = "${v.type}"
      data-desc="customer"
      data-user_id = "${v.user_id}"
      class="mobile-customerlink" title= "Assigned to: ${v.firstname} ${
      v.lastname
    }">
      ${v.fullname}
      </a>
    </div>


    <div>

    <a href="javascript:void(0);">
    <i class="fa fa-pencil editcust"
      data-cust_id="${v.cust_id}" 
      data-fullname = "${v.fullname}"
      data-phone = "${v.phone}"
      data-email = "${v.email}"
          data-type = "${v.type}"
      data-ref_type = "${v.ref_type}"
      data-location = "${v.location}"
      data-debt = "${v.debt}"
    ></i>
    </a>


    <a href="javascript:void(0);">
    ${deleteAccessControl(
      `<i class="fa fa-trash delt-cust"  
      data-cust_id="${v.cust_id}" 
      data-fullname = "${v.fullname}"
      ></i>`
    )}
    </a>
    
    </div>
  
  
  </div>
  
  
  `;
  };

  const usersIteratorFunc = (v) => {
    return `
      <td>
      <a href="javascript:void(0);" 
      class="userlink" 
      data-fullname="${v.fullname}"
      data-user_id="${v.user_id}"
      >
      ${v.fullname}
      </a>
      </td>
    `;
  };

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.customerinptclass')) {
      const val = e.target.value;
      if (customersData) {
        const searchres = customersData
          .filter((v) =>
            Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, 10)
          .map((v) => customerIteratorFunc(v))
          .join('');
        classSelector('customerwrapper').innerHTML = searchres;
      }
    }

    if (e.target.matches('.mobile-customerinptclass')) {
      const val = e.target.value;
      if (customersData) {
        const searchres = customersData
          .filter((v) =>
            Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, 10)
          .map((v) => mobileCustomerIteratorFunc(v))
          .join('');
        classSelector('mobile-customerwrapper').innerHTML = searchres;
      }
    }
  });

  //ADD EMPRTY ROWS
  document.addEventListener('click', (e) => {
    if (e.target.matches('.customerinptclass')) {
      if (customersData) {
        const searchres = customersData
          .filter((v) => v.type === 'customer')
          .slice(0, 10)
          .map((v) => customerIteratorFunc(v))
          .join('');
        classSelector('customerwrapper').innerHTML = searchres;
      }
    }

    if (e.target.matches('.mobile-customerinptclass')) {
      if (customersData) {
        const searchres = customersData
          .filter((v) => v.type === 'customer')
          .slice(0, 10)
          .map((v) => mobileCustomerIteratorFunc(v))
          .join('');
        classSelector('mobile-customerwrapper').innerHTML = searchres;
      }
    }

    if (e.target.matches('.addrows')) {
      e.stopImmediatePropagation();
      salesLocalstorage();

      let getItem;
      if (localStorage.getItem('prozdlist')) {
        getItem = JSON.parse(localStorage.getItem('prozdlist'));
      } else {
        getItem = [{}];
      }

      const listItems = [
        ...getItem,
        {
          s_id: '',
          qty: '1',
          prod_id: '',
          prod_name: '',
          duration: '',
          prod_size: '',
          prod_price: '',
          total: 0,
        },
      ];

      if (classSelector('pos-sales-output')) {
        localStorage.setItem('prozdlist', JSON.stringify(listItems));
        classSelector('pos-sales-output').innerHTML = displayProductList();
      }

      if (localStorage.getItem('sales')) {
        const tx = JSON.parse(localStorage.getItem('sales'));

        if (tx['invoice_date'].length < 1) {
          const date = new Date();
          const value = ymd(date);
          tx['invoice_date'] = value;
          tx['receipt_date'] = value;
          localStorage.setItem('sales', JSON.stringify(tx));
        }
      }
    }
  });

  const showbtn = getPrevilleges('addrowsbutton') ? 'show' : 'hide';
  const assigntovalid = getPrevilleges('assignto');

  const assignto = assigntovalid
    ? `
      ${dataListDropdown(
        textInput,
        'userwrapperinpt',
        'Assign to',
        '',
        'userlink',
        'userwrapper'
      )}
  
  `
    : '';

  let endDate = '';
  let startDate = '';
  let invoiceDate = '';

  if (['rentals', 'service provider'].includes(industry)) {
    startDate = `${textInput({
      type: 'date',
      classname: 'invoice_date',
      required: true,
      label: 'Start Date',
    })}`;

    endDate = `
      ${textInput({
        type: 'date',
        classname: 'exp_date',
        required: false,
        label: 'End Date',
      })}
      `;
  } else {
    invoiceDate = `
      ${textInput({
        type: 'date',
        classname: 'invoice_date',
        required: true,
        label: 'Invoice Date',
      })}
    `;
  }

  setTimeout(() => {
    const tx = JSON.parse(localStorage.getItem('sales'));
    const invoice_date = tx?.invoice_date;
    const exp_date = tx?.exp_date;

    if (classSelector('invoice_date')) {
      if (invoice_date === undefined) {
        classSelector('invoice_date').valueAsDate = new Date();
      } else {
        classSelector('invoice_date').valueAsDate = new Date(ymd(invoice_date));
      }
    }




    if (classSelector('exp_date')) {
      if (exp_date !== undefined) {
        classSelector('exp_date').valueAsDate = new Date(ymd(exp_date));
      }
    }




  }, 0);

  return `
    <div class="salesTopbar">
    <div>
    <div>
    ${dataListDropdown(
      textInput,
      'customerinptclass',
      'Choose Customer',
      '',
      'customerlink',
      'customerwrapper'
    )}
    </div>
    <div class="flex custbtns">
      ${addCustomer(customersData)}
      ${viewcustomers(customersData, receipts, proforma, invoice)}
    </div>
    </div>

    <div>
    <div class="assignto-wrapper">
    ${startDate}
    </div>
    </div>
    <div class="addrowbtn">
      ${endDate}
      ${invoiceDate}
      <a href="javascript:void(0);" class="addrows ${showbtn}">Add empty rows</a>
      
    </div>

    </div>
    `;
};

export default salesTopbar;
