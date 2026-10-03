document.addEventListener('click', (e) => {
  if (e.target.matches('.togglepass')) {
    const cls = document.querySelector('.showpass');

    if (cls.getAttribute('type') === 'password') {
      cls.setAttribute('type', 'text');
    } else {
      cls.setAttribute('type', 'password');
    }
  }

  if (e.target.matches('.register-btn')) {
    e.stopImmediatePropagation();

    const dataobj = localStorage.getItem('reginpt');
    if (!dataobj) {
      document.querySelector(
        '.result'
      ).innerHTML = `<div class="error">All fields required!</div>`;
      return;
    }

    const fd = new FormData();
    fd.append('data', dataobj);

    document.querySelector(
      '.result'
    ).innerHTML = `<div class="error"><h4>Please wait...</h4></div>`;

    fetch('model/register.php', {
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
          const {username,password} = JSON.parse(localStorage.getItem('reginpt'));
          localStorage.setItem(
            'loginfields',
            JSON.stringify({
              username,
              password,
            })
          );

          history.replaceState(null, '', 'https://www.kwikreceipt.com');
          window.location = 'https://www.kwikreceipt.com';
        }
      });
  }
});

document.addEventListener('input', (e) => {
  if (e.target.matches('.reg-inpt')) {
    const { name, value } = e.target;

    if (!localStorage.getItem('reginpt')) {
      localStorage.setItem('reginpt', JSON.stringify({}));
    }

    const data = JSON.parse(localStorage.getItem('reginpt'));

    localStorage.setItem('reginpt', JSON.stringify({ ...data, [name]: value }));

    const obj = JSON.parse(localStorage.getItem('reginpt'));

    if (Object.values(obj).filter(Boolean).length < 8) {
      document.querySelector('.result').innerHTML =
        '<p class="allrequired">All fields required!</p>';
    }

    if (Object.values(obj).filter(Boolean).length === 8) {
      document.querySelector('.result').innerHTML = '';
      document.querySelector('.register-btn').classList.add('show');
    } else {
      document.querySelector('.register-btn').classList.remove('show');
    }
  }
});

window.addEventListener('load', (e) => {
  if (localStorage.getItem('reginpt')) {
    const obj = JSON.parse(localStorage.getItem('reginpt'));

    Array.from(document.querySelectorAll('.reg-inpt')).forEach((v) => {
      if (obj[v.name]) {
        v.value = obj[v.name];
      }
    });

    if (Object.values(obj).filter(Boolean).length === 8) {
      document.querySelector('.register-btn').classList.add('show');
    } else {
      document.querySelector('.register-btn').classList.remove('show');
    }
  }
});
