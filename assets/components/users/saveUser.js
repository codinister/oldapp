import hideModal from '../utils/hideModal.js';
import displayToast from '../utils/displayToast.js';
import setUsersLocalstorage from '../data/clientside/localstorage/SET/setUsersLocalstorage.js';
import getUsersLocalstorage from '../data/clientside/localstorage/GET/getUsersLocalstorage.js';

const saveUser = async ({ ...obj }) => {
  const { users, menus } = obj;


  //SET PASSWORD COUNT
  users['password_count'] = users?.password.length;

  const fd = new FormData();
  fd.append('users', JSON.stringify(users));
  fd.append('menus', JSON.stringify(menus));
  try {
    const resp = await fetch('router.php?controller=user&task=add_user', {
      method: 'Post',
      body: fd,
    });

    const data = await resp.text();

    if (data.indexOf('errors') != -1) {
      displayToast('bgdanger', data);
    } else {
      const res = data.split('-');
      displayToast('lightgreen', res[0]);

      const obj = getUsersLocalstorage();
      obj['user_id'] = res[1];
      setUsersLocalstorage(obj);
      localStorage.setItem('rend', 1);
    }
  } catch (err) {
    console.log(err);
  }
};

export default saveUser;
