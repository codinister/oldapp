import settingsReducer from './settingsReducer.js';
import apiEndpoint from '../../utils/apiEndpoint.js';
import notificationsInputs from '../../settings/utils/notificationsInputs.js';
import { classSelector } from '../../utils/Selectors.js';
import innerHTML from '../../utils/v2/innerHTML.js';
import checkErrors from '../../utils/v2/checkErrors.js';
import { successMessage, warningMessage } from '../../utils/v2/modal.js';
import Spinner from '../../utils/v2/Spinner.js';
import navigate from '../../navbar/utils/navigate.js';

const settingsEvents = (sett) => {
  const dailyReports = notificationsInputs(sett);

  //Click Event
  document.addEventListener('click', (e) => {
    //Save Settings
    if (e.target.matches('.save_setting')) {


      const obj = JSON.parse(localStorage.getItem('settingupdate'));

      if (!obj) {
        return successMessage({
          title: 'Settings Added',
          sub_title: 'Settings has been added successfully',
        });
      }

      innerHTML({
        data: Spinner(),
        outputClass: 'save_setting',
      });

      if (checkErrors()) {
        return displayToast('bgdanger', 'Fix the errors!');
      }

      obj['comp_terms'] = CKEDITOR.instances.comp_terms.getData();

      delete obj['modify'];

      const fd = new FormData();

      fd.append('data', JSON.stringify(obj));

      fetch(apiEndpoint('settings', 'update_settings'), {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            return warningMessage({
              title: 'Error Message',
              sub_title: data,
            });
          } else {
            localStorage.setItem('sinpt', JSON.stringify(obj));
            successMessage({
              title: 'Settings Added',
              sub_title: 'Settings has been added successfully',
            });
  
            localStorage.setItem('rerender', '2')
          }
          localStorage.removeItem('settingupdate');
        })
        .catch((err) => console.log(err));
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('.dailyreport')) {
      if (e.target.checked) {
        innerHTML({
          outputClass: 'mini-report-phone',
          data: dailyReports,
        });
      } else {
        innerHTML({
          outputClass: 'mini-report-phone',
          data: '',
        });
      }
    }
  });

  document.addEventListener('input', (e) => {
    settingsReducer(e);
  });

  setTimeout(() => {
    if (classSelector('comp_terms')) {
      CKEDITOR.instances.comp_terms.setData(sett.comp_terms);
    }
    if (classSelector('duration')) {
      const dur = sett ? sett?.duration : '';
      classSelector('duration').value = dur;
    }
    if (classSelector('currency')) {
      const cur = sett ? sett?.currency : '';
      classSelector('currency').value = cur;
    }
  });
};

export default settingsEvents;
