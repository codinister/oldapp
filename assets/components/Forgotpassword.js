import { textInput, Button } from './utils/InputFields.js';
import { classValueSelector, classSelector } from './utils/Selectors.js';
import FormSubmitUtils from './utils/FormSubmitUtils.js';

const Forgotpassword = () => {
  const InputFields = () => {
    if (classSelector('email')) {
      return {
        email: classValueSelector('email'),
      };
    } else {
      return {
        email: '',
      };
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target.matches('.fminpt')) {
      e.target.removeAttribute('readonly');
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.matches('.forgot-password-form')) {
      e.preventDefault();
      e.stopImmediatePropagation();

      const { email } = InputFields();
      const { Loader, ErrorResult, SuccessResult } = FormSubmitUtils();

      Loader('reset-output');

      const fd = new FormData();
      fd.append('email', email);
      fd.append('url', window.location.host);

      fetch('router.php?controller=login&task=forgotpassword', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            ErrorResult('reset-output', data);
          } else {
            SuccessResult('reset-output', data);
          }
        });
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.fgpwd')) {
      e.stopImmediatePropagation();
      const { email } = InputFields();
      const evry = [email].every((v) => v);
      if (evry) {
        document.querySelector('.button-rounded').style.display = 'block';
      } else {
        document.querySelector('.button-rounded').style.display = 'none';
      }
    }
  });

  setTimeout(() => {
    if (document.querySelector('.login-wrapper')) {
      document.querySelector(
        '.login-wrapper'
      ).style.backgroundImage = `url('./assets/images/cover.jpg')`;
    }
  }, 0);

  return `
        <div class="login-wrapper" style="background-size: cover; background-position: center;">

                <div class="login-inner">

                    <form autocomplet="off" class="forgot-password-form">

                        <div class="comp_name">
                        <h4 class="compnameX">KWIK POS</h4>
                        <p>Reset password with your valid email</p>
                        </div>

                        ${textInput({
                          type: 'text',
                          classname: 'email fgpwd',
                          required: true,
                          label: 'Email',
                        })}
          

                        <a href="javascript:void(0);"
                        data-navlinks="index.html"
                        class="navlinks forgot-pass"
                        >Login</a>

                        ${Button({
                          output: 'reset-output',
                          classname: 'reset-btn',
                          buttonname: 'SUBMIT',
                          buttonType: 'submit',
                        })}
                    

                    </form>
            </div>
    </div>

    `;
};

export default Forgotpassword;
