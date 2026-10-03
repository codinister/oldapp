import { textInput, Button } from './utils/InputFields.js';
import { classSelector } from './utils/Selectors.js';
import FormSubmitUtils from './utils/FormSubmitUtils.js';
const { Loader, ErrorResult, SuccessResult } = FormSubmitUtils();
const Resetpassword = () => {
  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.rstpwd')) {
      e.stopImmediatePropagation();
      const password = classSelector('password').value;
      const repassword = classSelector('repassword').value;
      const evry = [password, repassword].every((v) => v);
      if (evry & (password === repassword)) {
        document.querySelector('.button-rounded').style.display = 'block';
      } else {
        document.querySelector('.button-rounded').style.display = 'none';
      }
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.matches('.pswd-reset-form')) {
      e.preventDefault();

      const c = new URLSearchParams(window.location.search);
      const code = c.get('c');

      const password = classSelector('password').value;
      const repassword = classSelector('repassword').value;

      Loader('reset-pwd-output');

      const fd = new FormData();
      fd.append('password', password);
      fd.append('repassword', repassword);
      fd.append('code', code);

      fetch('router.php?controller=login&task=resetpassword', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            ErrorResult('reset-pwd-output', data);
          } else {
            SuccessResult('reset-pwd-output', data);
            setTimeout(() => {
              window.location = 'index.html';
            }, 2000);
            history.replaceState(null, '', window.location.host);
          }
        });
    }
  });

  return `

          <div class="reset-password-wrapper">

          <div class="reset-password-form">
              <form autocomplet="off" class="pswd-reset-form">

                  <div class="compdetails">
                  <h4 class="compnamex">KWIK POS</h4>
                  <p>PASSWORD RESET</p>
                  </div>

                  ${textInput({
                    type: 'password',
                    classname: 'password rstpwd',
                    required: true,
                    label: 'New Password',
                  })}
    
                  ${textInput({
                    type: 'password',
                    classname: 'repassword rstpwd',
                    required: true,
                    label: 'Confirm Password',
                  })}


                  ${Button({
                    output: 'reset-pwd-output',
                    classname: 'reset-btn',
                    buttonname: 'RESET PASSWORD',
                    buttonType: 'submit',
                  })}
              

              </form>
              </div>
      </div>
`;
};

export default Resetpassword;
