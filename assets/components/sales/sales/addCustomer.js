import displayToast from '../../utils/displayToast.js';
import salesLocalstorage from '../../data/clientside/localstorage/default/defaultSalesLocalstorage.js';
import Buttons from '../../utils/Buttons.js';
import { classSelector } from '../../utils/Selectors.js';
import { textInput } from '../../utils/InputFields.js';
import dataListDropdown from '../../utils/dataListDropdown.js';
import getIndustry from '../../utils/getIndustry.js';
import Spinner from '../../utils/Spinner.js';

const addCustomer = (customersData) => {
  const referrerIteratorFunc = (v) => {
    const rtype = v.ref_type.length > 0 ? v.ref_type : 'other';

    return `
      <li>
      <a href="javascript:void(0);" 
      class="refererlink" 
      data-name="${v.fullname}"
      data-phone="${v.phone}"
      data-location="${v.location}"
      data-email="${v.email}"
      data-type="${v.type}"
      data-cust_id="${v.cust_id}"
      data-ref_type="${rtype}"
      data-ref="${v.ref}"
      >
      ${v.fullname}
      </a>
      </li>
    `;
  };

  document.addEventListener('input', (e) => {
    if (e.target.matches('.custinp')) {
    
      const { name, value } = e.target;

      if (!localStorage.getItem('custinp'))
        localStorage.setItem(
          'custinp',
          JSON.stringify({
            cemail: '',
            cfullname: '',
            clocation: '',
            cphone: '',
            custname: '',
            rphone: '',
            ref_id: '',
            ref_type: '',
          })
        );
      const getobj = JSON.parse(localStorage.getItem('custinp'));
      const newobj = { ...getobj, [name]: value };

      if (name === 'custname') {
        newobj['ref_id'] = '';
        newobj['rphone'] = '';
        newobj['ref_type'] = '';
        classSelector('ref_type').value = '';
        classSelector('rphone').value = '';
      }

      localStorage.setItem('custinp', JSON.stringify(newobj));
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.referrerinptclass')) {
      const val = e.target.value;

      const reffererData = Object.values(customersData);

      const searchres = Object.values(reffererData)
        .filter((v) =>
          Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
        )
        .slice(0, 10)
        .map((v) => referrerIteratorFunc(v))
        .join('');
      classSelector('referrerwrapper').innerHTML = searchres;
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.referrerinptclass')) {
      const val = e.target.value;

      const reffererData = Object.values(customersData);

      const searchres = Object.values(reffererData)
        .filter((v) =>
          Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
        )
        .slice(0, 10)
        .map((v) => referrerIteratorFunc(v))
        .join('');
      classSelector('referrerwrapper').innerHTML = searchres;
    }

    if (e.target.matches('.refererlink')) {
      const { cust_id, ref_type, ref } = e.target.dataset;

      if (!localStorage.getItem('custinp'))
        localStorage.setItem(
          'custinp',
          JSON.stringify({
            cemail: '',
            cfullname: '',
            clocation: '',
            cphone: '',
            custname: '',
            rphone: '',
            ref_id: '',
            ref_type: '',
            ref: '',
          })
        );
      const getobj = JSON.parse(localStorage.getItem('custinp'));
      const newobj = {
        ...getobj,
        ref_id: cust_id,
        ref_type,
        ref,
      };
      localStorage.setItem('custinp', JSON.stringify(newobj));
      const obj = JSON.parse(localStorage.getItem('custinp'));

      classSelector('ref_type').value = obj?.ref_type;
    }

    if (e.target.matches('.referrercheckbox')) {
      if (e.target.checked) {
        classSelector('referrerboxwrapper').classList.add('show');
      } else {
        classSelector('referrerboxwrapper').classList.remove('show');
      }
    }

    if (e.target.matches('.savecustomer')) {
      e.stopImmediatePropagation();
      salesLocalstorage();

      if (!localStorage.getItem('custinp')) {
        return displayToast('bgdanger', 'Valid fullname field required!');
      }

      const data = JSON.parse(localStorage.getItem('custinp'));

      const obj = data ? data : {};

      if (obj?.cfullname.length < 2) {
        return displayToast('bgdanger', 'Valid fullname field required!');
      }

      if (obj?.custname.length > 0) {
        if (obj?.rphone.length < 1) {
          return displayToast('bgdanger', 'Referrer phone required!');
        }

        if (obj?.ref_type.length < 1) {
          return displayToast('bgdanger', 'Referrer type field required!!');
        }
      }

      Spinner('savecustomerspin');

      const fd = new FormData();
      fd.append('data', JSON.stringify(obj));
      fetch(`router.php?controller=customer&task=add_customer`, {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
            classSelector('savecustomerspin').innerHTML = '';
          } else {
            let res;
            if (data) {
              res = data.split('-');
            }

            const info = res[0];
            const cust_id = res[1];

            const txx = JSON.parse(localStorage.getItem('sales'));
            txx['cust_id'] = cust_id;
            txx['cust_name'] = obj?.cfullname;
            txx['cust_phone'] = obj?.cphone;
            txx['cust_email'] = obj?.cemail;
            // txx['cust_location'] = obj?.clocation;
            localStorage.setItem('sales', JSON.stringify(txx));

            displayToast('lightgreen', info);
            classSelector('modalboxtwo').classList.remove('show');
            document.body.style.overflow = 'scroll';
            classSelector('customerinptclass').value = obj?.cfullname;
            classSelector('savecustomerspin').innerHTML = '';

            localStorage.setItem('rend', 3);
            localStorage.removeItem('custinp');
          }
        });
    }

    if (e.target.matches('.addcustomers')) {
      e.stopImmediatePropagation();

      const industry = getIndustry();

      Spinner('addcustomersspin');

      const refoptRoofing = `
        <option value="agent">Agent</option>
        <option  value="carpenter">Carpenter</option>
        <option  value="foreman">Foreman</option>
        <option  value="friend">Friend</option>
        <option  value="family">Family</option>
        <option  value="other">Other</option>
      `;

      const refoptOther = `
        <option  value="customer">Customer</option>
        <option  value="friend">Friend</option>
        <option  value="family">Family</option>
        <option  value="agent">Agent</option>
        <option  value="other">Other</option>
      `;

      const referrer_options =
        industry === 'roofing company' ? refoptRoofing : refoptOther;

      const obj = JSON.parse(localStorage.getItem('custinp'));

      setTimeout(() => {
        classSelector('ref_type').value = obj?.ref_type;
      }, 1000);

      classSelector('addcustomerwrapper').innerHTML = `
      <h2>Add New Customer</h2>
      <div class="customer-flex-bx">
        ${textInput({
          type: 'text',
          classname: 'cfullname custinp',
          name: 'cfullname',
          required: true,
          label: 'Fullname',
          value: obj?.cfullname,
        })}
      ${textInput({
        type: 'text',
        classname: 'cphone custinp',
        name: 'cphone',
        required: false,
        label: 'Phone',
        value: obj?.cphone,
      })}
      </div>
      <div class="customer-flex-bx">
      ${textInput({
        type: 'text',
        classname: 'clocation  custinp',
        name: 'clocation',
        required: false,
        label: 'Location',
        value: obj?.clocation,
      })}

    ${textInput({
      type: 'text',
      classname: 'cemail  custinp',
      name: 'cemail',
      required: false,
      label: 'Email',
      value: obj?.cemail,
    })}
    </div>

    <div class="referrerboxwrapper">
    <div class="referrer-box">
    <h5>Referrer Details</h5>
    ${dataListDropdown(
      textInput,
      'referrerinptclass  custinp',
      'Referrer Name',
      'referrerhiddeninpt',
      'refererlink',
      'referrerwrapper'
    )}

    ${textInput({
      type: 'text',
      classname: 'rphone  custinp',
      name: 'rphone',
      required: true,
      label: 'Referrer Phone',
      value: obj?.rphone,
    })}
    <div class="selectinpt">	
      <select class="ref_type custinp"  name="ref_type" >

        ${referrer_options}

      </select>
    </div>


    </div>
    </div>

    <div class="customerbtndiv">
      ${Buttons([
        {
          btnclass: 'savecustomer',
          btnname: 'SAVE CUSTOMER',
        },
      ])}

      <div>
      <label>Add Referer <input type="checkbox" class="referrercheckbox" /></label>
      </div>
      </div>
      `;

      classSelector('modalboxtwo').classList.add('show');
      document.body.style.overflow = 'hidden';
      classSelector('addcustomersspin').innerHTML = '';
    }
  });

  return `
${Buttons([
  {
    btnclass: 'addcustomers',
    btnname: 'ADD CUSTOMER',
  },
])}
`;
};

export default addCustomer;
