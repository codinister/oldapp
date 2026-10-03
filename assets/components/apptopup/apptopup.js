document.addEventListener('click', (e) => {
  if (e.target.matches('.payment-btn')) {
    e.stopImmediatePropagation();

    const data = localStorage.getItem('paymentinpt');
    if (!data) {
      document.querySelector(
        '.result'
      ).innerHTML = `<div class="error">All fields required!</div>`;
      return;
    }

    const fd = new FormData();
    fd.append('data', data);

    document.querySelector(
      '.result'
    ).innerHTML = `<div class="success">Please wait...</div>`;

    fetch('model/payments.php', {
      method: 'Post',
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data.indexOf('errors') != -1) {
          document.querySelector(
            '.result'
          ).innerHTML = `<div class="error">${data}</div>`;

          setTimeout(() => {
            document.querySelector('.result').innerHTML = null;
          }, 3000);

          return;
        } else {
            localStorage.removeItem('paymentinpt')
          document.querySelector('.registeration-box').innerHTML = `
            <div class="success-payment">
                <h4>Payment was successful!</h4>
            </div>
            `;
        }
      });
  }
});

document.addEventListener('input', (e) => {
  if (e.target.matches('.pay-inpt')) {
    const { name, value } = e.target;

    if (!localStorage.getItem('paymentinpt')) {
      localStorage.setItem('paymentinpt', JSON.stringify({}));
    }

    const data = JSON.parse(localStorage.getItem('paymentinpt'));

    localStorage.setItem(
      'paymentinpt',
      JSON.stringify({ ...data, [name]: value })
    );

    const obj = JSON.parse(localStorage.getItem('paymentinpt'));

    if (Object.values(obj).filter(Boolean).length === 3) {
      document.querySelector('.payment-btn').classList.add('show');
    } else {
      document.querySelector('.payment-btn').classList.remove('show');
    }
  }
});

window.addEventListener('load', (e) => {
  if (localStorage.getItem('paymentinpt')) {
    const obj = JSON.parse(localStorage.getItem('paymentinpt'));

    const allinpt = Array.from(document.querySelectorAll('.pay-inpt')).forEach(
      (v) => (v.value = obj[v.name])
    );

    if (Object.values(obj).filter(Boolean).length === 8) {
      document.querySelector('.payment-btn').classList.add('show');
    } else {
      document.querySelector('.payment-btn').classList.remove('show');
    }
  }
});
