import { textInput } from '../../utils/InputFields.js';
import Buttons from '../../utils/Buttons.js';
import { dmy } from '../../utils/DateFormats.js';
import { classSelector } from '../../utils/Selectors.js';
import displayToast from '../../utils/displayToast.js';
import Spinner from '../../utils/Spinner.js';

const Contract = (fullname, tax_id, cust_id, fullpayment) => {
  const fn = fullname.split(' ');

  const one = fn[0]?.slice(0, 1);
  const two = fn[1]?.slice(0, 1);
  const three = fn[2]?.slice(0, 1);
  const four = fn[3]?.slice(0, 1);

  const sales = JSON.parse(localStorage.getItem('sales'));

  if (sales?.contract) {

    const {
      cont_id,
      title,
      start_date,
      refferedtoas,
      contractnumber,
      otherinfo,
      tax_id,
      cust_id,
    } = sales?.contract;

    localStorage.setItem(
      'contract',
      JSON.stringify({
        cont_id,
        title,
        start_date,
        refferedtoas,
        contractnumber,
        otherinfo,
        tax_id,
        cust_id,
      })
    );

    setTimeout(()=>{
      if(classSelector('otherinfo')){
        CKEDITOR.instances.otherinfo.setData(otherinfo)
      }
      classSelector('title').value = title 
      classSelector('start_date').valueAsDate = new Date(start_date)
      classSelector('refferedtoas').value = refferedtoas
    }, 1000)

  }
  else{
  
    setTimeout(() => {
      if (classSelector('start_date')) {
        classSelector('start_date').valueAsDate = new Date();
      }
      if(classSelector('title')){
        classSelector('title').value = 'OUT OF HOME ADVERTISING CONTRACT'
      }
      if(classSelector('refferedtoas')){
        classSelector('refferedtoas').value = 'Agency'
      }
    }, 1000);
  }



  const contnumber = `SP AGENCY/${one || ''}${two || ''}${three || ''}${
    four || ''
  }/${dmy(new Date())}`;



  if (!localStorage.getItem('contract')) {
    localStorage.setItem(
      'contract',
      JSON.stringify({
        cont_id: '',
        title: 'OUT OF HOME ADVERTISING CONTRACT',
        start_date: dmy(new Date()),
        refferedtoas: 'Agency',
        contractnumber: contnumber,
        otherinfo: '',
        tax_id,
        cust_id,
      })
    );
  }

  document.addEventListener('click', (e) => {
    if (e.target.matches('.contract-btn')) {

      const st = JSON.parse(localStorage.getItem('contract'));
      st['otherinfo'] = CKEDITOR.instances.otherinfo.getData();
      localStorage.setItem('contract', JSON.stringify(st));

      const sales = JSON.parse(localStorage.getItem('sales'));


      const  otherinfo1 = sales?.contract?.otherinfo
      const  otherinfo2 = JSON.parse(localStorage.getItem('contract'))?.otherinfo
      const  touched = JSON.parse(localStorage.getItem('contract'))?.touched


      // console.log({otherinfo1, otherinfo2, touched})

      // return 

      const obj = JSON.parse(localStorage.getItem('contract'));

      const trim = Object.values(obj)
        .map((v) => v)
        .filter(Boolean);

      if (trim.length < 5) {
        return displayToast('bgdanger', 'All fields required!');
      }

      const fd = new FormData();
      fd.append('data', JSON.stringify(obj));

      Spinner('btn-wrapper');

      fetch('router.php?controller=sales&task=save_contract', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {

          if (data !== 'error') {
            console.log('Cleard');
            localStorage.removeItem('sales');
            localStorage.removeItem('prozdlist');
            localStorage.removeItem('contract');
            window.location = `assets/pdf/contract.php?inv=${btoa(data)}`;
          } else {
            displayToast('bgdanger', 'An error occured!');
          }
        });
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.contr')) {
      const { name, value } = e.target;

      if (!localStorage.getItem('contract')) {
        localStorage.setItem(
          'contract',
          JSON.stringify({
            cont_id: '',
            title: 'OUT OF HOME ADVERTISING CONTRACT',
            start_date: dmy(new Date()),
            refferedtoas: 'Agency',
            contractnumber: contnumber,
            otherinfo: '',
            tax_id: '',
            cust_id: '',
          })
        );
      }

      const obj = JSON.parse(localStorage.getItem('contract'));
      const newobj = { ...obj, [name]: value };
      const update = {...newobj, touched: true}
      localStorage.setItem('contract', JSON.stringify(update));

    }
  });

  setTimeout(() => {
    //CKEDITOR INSTANCE
    CKEDITOR.replace('otherinfo', {
      height: '300px',
    });
  }, 500);

  return `
  <div class="contract-form"> 

  <h3> CONTRACT FORM</h3>

  ${textInput({
    type: 'text',
    classname: 'title contr',
    required: true,
    name: 'title',
    label: 'Title',
  })}



  ${textInput({
    type: 'date',
    classname: 'start_date contr',
    required: true,
    name: 'start_date',
    label: 'Start date',
  })}

  ${textInput({
    type: 'text',
    classname: 'refferedtoas contr',
    required: true,
    name: 'refferedtoas',
    label: 'referred to as',
  })}


  <div class="form-control otherinfo">
  <label>Additional information</label>
  <textarea class="otherinfo" id="otherinfo"></textarea>
  </div>

  <div class="btn-wrapper">
  ${Buttons([
    {
      btnclass: 'contract-btn',
      btnname: 'CREATE CONTRACT',
    },
  ])}
  </div>

  </div>
  `;
};

export default Contract;
