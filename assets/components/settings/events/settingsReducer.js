import updateSettings from '../utils/updateSettings.js';

import apiEndpoint from '../../utils/apiEndpoint.js';
import { classSelector } from '../../utils/Selectors.js';
import {
  isEmail,
  isPhone,
  isSenderId,
  isWebsite,
} from '../../utils/v2/inputValidations.js';

const settingsReducer = (e) => {
  //Logo File upload
  if (e.target.matches('.comp_logo')) {
    if (e.target.files && e.target.files[0]) {
      const fr = new FileReader();

      fr.onload = function (e) {
        const res = e.target.result;
        classSelector('logoimg').setAttribute('src', res);
      };

      fr.readAsDataURL(e.target.files[0]);
    }

    //Save Logo

    let logo = [];
    if (
      classSelector('comp_logo').files &&
      classSelector('comp_logo').files[0]
    ) {
      logo = classSelector('comp_logo').files[0];
    }

    const fd = new FormData();
    fd.append('comp_logo', logo);

    fetch(apiEndpoint('settings', 'update_logo'), {
      method: 'Post',
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data.indexOf('errors') != -1) {
          return displayToast('bgdanger', data);
        } else {
          const obj = JSON.parse(localStorage.getItem('sinpt'));
          obj['comp_logo'] = data;

          localStorage.setItem('sinpt', JSON.stringify(obj));
          return displayToast('lightgreen', 'Logo updated!');
        }
      })
      .catch((err) => console.log(err));
  }

  //Settings form control
  if (e.target.matches('.sinpt')) {
    const { name: inputName, value, checked } = e.target;

    //Email validation
    if (inputName === 'comp_email') {
      isEmail({
        inputValue: value,
        errorClass: 'comp_email-error',
        errorMessage: 'Valid email required!',
      });
    }

    //Phone validation
    if (inputName === 'comp_phone') {
      isPhone({
        inputValue: value,
        errorClass: 'comp_phone-error',
        errorMessage: 'Valid phone required!',
      });
    }

    //Phone validation
    if (inputName === 'sms_cc') {
      isPhone({
        inputValue: value,
        errorClass: 'sms_cc-error',
        errorMessage: 'Valid phone required!',
      });
    }

    //Phone validation
    if (inputName === 'exp_reminder_phone') {
      isPhone({
        inputValue: value,
        errorClass: 'exp_reminder_phone-error',
        errorMessage: 'Valid phone required!',
      });
    }

    //Website validation
    if (inputName === 'comp_website') {
      isWebsite({
        inputValue: value,
        errorClass: 'comp_website-error',
        errorMessage: 'Valid url required!',
      });
    }

    //Website validation
    if (inputName === 'sms_sender_id') {
      isSenderId({
        inputValue: value,
        errorClass: 'sms_sender_id-error',
        errorMessage: 'Valid sender id required!',
      });
    }
    let obj;
    obj = JSON.parse(localStorage.getItem('settingupdate'));

    if (!obj) {
      const sett = JSON.parse(localStorage.getItem('sinpt'));
      localStorage.setItem('settingupdate', JSON.stringify(sett));
      obj = JSON.parse(localStorage.getItem('settingupdate'));
    }

    obj['modify'] = 1;

    if (inputName === 'daily_sales_report_alert') {
      updateSettings(obj, 'daily_sales_report_alert', checked, inputName);
    }

    if (inputName === 'customers_who_owe_alert') {
      updateSettings(obj, 'customers_who_owe_alert', checked, inputName);
    }

    if (inputName === 'low_stocks_alert') {
      updateSettings(obj, 'low_stocks_alert', checked, inputName);
    }

    if (inputName === 'exp_rentals_alert') {
      updateSettings(obj, 'exp_rentals_alert', checked, inputName);
    }

    if (inputName === 'activate_receipt_sms') {
      updateSettings(obj, 'activate_receipt_sms', checked, inputName);
    }

    const keys = [
      'activate_receipt_sms',
      'daily_sales_report_alert',
      'customers_who_owe_alert',
      'low_stocks_alert',
      'exp_rentals_alert',
    ];

    if (!keys.includes(inputName)) {
      const newobj = { ...obj, [inputName]: value };
      localStorage.setItem('settingupdate', JSON.stringify(newobj));
    }
  }
};

export default settingsReducer;
