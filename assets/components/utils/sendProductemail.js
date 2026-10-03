import displayToast from './displayToast.js';
import Spinner from './Spinner.js';
import format_number from './format_number.js';
import getCurrency from './getCurrency.js';

const sendProductemail = ({ ...data }) => {
  const currency = getCurrency();
  document.addEventListener('click', (e) => {
    if (e.target.matches('.prodemailbtn')) {
      const email = document.querySelector('.prodemail').value;
      const { prod_image, prod_name, length, price, prod_code } = data;

      if (email.length < 1) {
        return displayToast('bgdanger', 'Email field required!');
      }

      Spinner('prodemailbtn');

      const selling_price = currency + ' ' + format_number(price);

      const { email_serv_user, email_serv_pass, email_serv_provider } =
        JSON.parse(localStorage.getItem('sinpt'));

      // const user = 'emmanuelagyemang3@gmail.com';
      // const pass = 'xffgbxdonknyxhts';

      const user = email_serv_user;
      const pass = email_serv_pass;
      const service = email_serv_provider;

      const formdata = JSON.stringify({
        prod_image,
        prod_name,
        length,
        price: selling_price,
        email,
        user,
        pass,
        service,
        prod_code,
      });

      //'https://kwikposbackend.kwikpos.shop'
      //'http://localhost:5000'

      fetch('https://backend.classicshelter.com/emails/emailproduct', {
        mode: 'cors',
        method: 'Post',
        body: formdata,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          const { success, message } = data;

          if (success) {
            displayToast('lightgreen', message);
            document.querySelector('.prodemailbtn').innerHTML = 'SEND EMAIL';
          } else {
            displayToast('bgdanger', message);
            document.querySelector('.prodemailbtn').innerHTML = 'SEND EMAIL';
          }
        });
    }
  });

  return `
  <div class="sendprodemail">
    <input type="email" placeholder="Enter email" required class="prodemail" />
    <button class="prodemailbtn">SEND EMAIL</button>
  </div>
`;
};

export default sendProductemail;
