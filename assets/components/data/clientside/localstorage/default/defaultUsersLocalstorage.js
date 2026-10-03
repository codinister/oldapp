import { ymd } from '../../../../utils/DateFormats.js';

const defaultUsersLocalstorage = () => {
  const date = new Date();
  if (!localStorage.getItem('userlocalstorage')) {
    localStorage.setItem(
      'userlocalstorage',
      JSON.stringify({
        user_id: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        residence: '',
        photo: '',
        birthdate: '',
        role_id: '2',
        hire_date: '',
        username: '',
        password: '',
        createdAt: ymd(date),
        status: 'Unblock',
        signature: '',
        note: [],
        menus: {
          Dashboard: {
            usermenu_id: '',
            menu_name: 'Dashboard',
            menu_parent: 'null',
            menu_id: '1',
          },
          Sell: {
            usermenu_id: '',
            menu_name: 'Sell',
            menu_parent: 'null',
            menu_id: '2',
          },
        },
      })
    );
  }
};

export default defaultUsersLocalstorage;
