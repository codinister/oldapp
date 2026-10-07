import { removeDisabledAttribute } from '../../utils/v2/attributes.js';
import btnErrorDisplay from '../../utils/v2/btnErrorDisplay.js';
import textContent from '../../utils/v2/textContent.js';

const signinResponse = (data) => {
  const indx = String(data).indexOf('Invalid');

  if (indx != -1) {
    btnErrorDisplay({
      btn_class: 'login-btn',
      btn_name: 'Sign in',
      error_message: data,
    });
  } else {
    //Get result
    const result = JSON.parse(data);

    //Get settings
    const sett = result?.settings[0];

    //Update settings storage
    localStorage.setItem('sinpt', JSON.stringify(sett));
    localStorage.setItem('settingupdate', JSON.stringify(sett));

    //Delete settings from the dataset
    delete result['settings'];

    //Set user details
    localStorage.setItem('zsdf', JSON.stringify(result));

    const sess = localStorage.getItem('zsdf');
    if (sess !== JSON.stringify(result)) {
      btnErrorDisplay({
        btn_class: 'login-btn',
        btn_name: 'Sign in',
        error_message: 'Unauthorized access!',
      });
    } else {
      window.location = 'index.html?page=dashboard';
    }
  }
};

export default signinResponse;
