import { classSelector } from '../../utils/Selectors.js';
import Spinner from '../../utils/v2/Spinner.js';
import innerHTML from '../../utils/v2/innerHTML.js';
import textContent from '../../utils/v2/textContent.js';
import apiEndpoint from '../../utils/apiEndpoint.js';
import {
  removeDisabledAttribute,
  setDisabledAttribute,
} from '../../utils/v2/attributes.js';
import postMethod from '../../utils/v2/postMethod.js';
import signinResponse from '../utils/signinResponse.js';
const loginEvent = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.reveal-pass')) {
      const att = classSelector('password').getAttribute('type');

      if (att === 'password') {
        classSelector('password').setAttribute('type', 'text');
      } else {
        classSelector('password').setAttribute('type', 'password');
      }
    }

    if (e.target.matches('.login-btn')) {
      e.preventDefault();

      let username = '';
      let password = '';

      if (classSelector('username') && classSelector('password')) {
        username = classSelector('username').value;
        password = classSelector('password').value;
      }

      Spinner('login-btn');
      
      setDisabledAttribute('login-btn');

      if (!password || !username) {
        removeDisabledAttribute('login-btn');

        return textContent({
          data: 'All fields required!',
          outputClass: 'login-btn',
        });
      }

      postMethod({
        inputs: [{ username }, { password }],
        controller: 'login',
        task: 'signin',
        callback: signinResponse,
      });
    }
  });
};

export default loginEvent;
