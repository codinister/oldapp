import { textInput, Button } from './utils/InputFields.js';
import { classSelector } from './utils/Selectors.js';
import FormSubmitUtils from './utils/FormSubmitUtils.js';

const Login = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.fminpt')) {
      e.target.removeAttribute('readonly');
    }
    if (e.target.matches('.showppass')) {
      if (classSelector('password').getAttribute('type') === 'password') {
        classSelector('password').setAttribute('type', 'text');
      } else {
        classSelector('password').setAttribute('type', 'password');
      }
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.matches('.login-form')) {
      e.preventDefault();

      const { username, password } = JSON.parse(
        localStorage.getItem('loginfields'),
      );

      const { Loader, ErrorResult } = FormSubmitUtils();

      Loader('output1');

      const fd = new FormData();
      fd.append('data', JSON.stringify({ username, password }));

      fetch('router.php?controller=login&task=signin', {
        method: 'Post',
        credentials: 'same-origin',
        body: new URLSearchParams(fd),
      })
        .then((resp) => resp.json())
        .then((data) => {
          const indx = String(data).indexOf('Invalid');
          if (indx != -1) {
            ErrorResult('output1', data);
          } else {
            const sett = data?.settings[0];

            localStorage.removeItem('loginfields');
            localStorage.setItem('sinpt', JSON.stringify(sett));
            localStorage.setItem('settingupdate', JSON.stringify(sett));

            delete data['settings'];
            localStorage.setItem('zsdf', JSON.stringify(data));

            const sess = localStorage.getItem('zsdf');
            if (sess !== JSON.stringify(data)) {
              return ErrorResult('output1', 'Access denied!');
            } else {
              localStorage.removeItem('sales');
              localStorage.removeItem('prozdlist');
              window.location = 'index.html?page=dashboard';
            }
          }
        });
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.lgn')) {
      e.stopImmediatePropagation();
      const { name, value } = e.target;

      if (!localStorage.getItem('loginfields')) {
        localStorage.setItem('loginfields', JSON.stringify({}));
      }

      const getlog = JSON.parse(localStorage.getItem('loginfields'));
      const obj = { ...getlog, [name]: value };
      localStorage.setItem('loginfields', JSON.stringify(obj));

      const res = Object.values(
        JSON.parse(localStorage.getItem('loginfields')),
      ).filter(Boolean);

      if (res.length === 2) {
        document.querySelector('.button-rounded').style.display = 'block';
      } else {
        document.querySelector('.button-rounded').style.display = 'none';
      }
    }

    if (e.target.matches('.resetemail')) {
      e.stopImmediatePropagation();
      const reset = e.target.value;
      const evry = [reset].every((v) => v);

      if (evry) {
        document.querySelector('.button-rounded').style.display = 'block';
      } else {
        document.querySelector('.button-rounded').style.display = 'none';
      }
    }
  });

  //const img = data.cover_image;

  setTimeout(() => {
    if (document.querySelector('.login-wrapper')) {
      document.querySelector('.login-wrapper').style.backgroundImage =
        `url('./assets/images/cover.jpg')`;
    }
  }, 0);

  setTimeout(() => {
    if (localStorage.getItem('reginpt')) {
      localStorage.removeItem('reginpt');
      classSelector('button-rounded').style.display = 'block';
    }
    if (localStorage.getItem('sinpt')) {
      localStorage.removeItem('sinpt');
      localStorage.removeItem('allstocks');
      localStorage.removeItem('checkall');
    }
    if (localStorage.getItem('loginfields')) {
      const { username, password } = JSON.parse(
        localStorage.getItem('loginfields'),
      );
      classSelector('username').value = username;
      classSelector('password').value = password;

      if (username && password) {
        classSelector('button-rounded').style.display = 'block';
      }
    }
  }, 1000);

  //data-navlinks="index.html?page=forgotpswd"

  return `
        <div class="login-wrapper" style="background-size: cover; background-position: center;">

                <div class="login-inner">

                    <form autocomplet="off" class="login-form">

                        <div class="comp_name">
                        <h4 class="compnamex">KWIKRECEIPT</h4>
                        <p>Sign in with your valid username and password</p>
                        </div>

                        ${textInput({
                          type: 'text',
                          classname: 'username lgn',
                          required: true,
                          name: 'username',
                          label: 'Username',
                        })}
          


                      <div class="form-group  pt-0 input-animate">	
                        <input type="password" placeholder="" class="fminpt form-control password lgn" required readonly  name="password">
                        <label>Password</label>
                        <i class="fa fa-eye showppass"></i>
                      </div>

                        <a href="javascript:void(0);"
                     
                        class="navlinks forgot-pass"
                        >Reset Password?</a>

                        ${Button({
                          output: 'output1',
                          classname: 'login-btn',
                          buttonname: 'LOG IN',
                          buttonType: 'submit',
                        })}
                    

                    </form>
            </div>
    </div>

    `;
};

export default Login;
