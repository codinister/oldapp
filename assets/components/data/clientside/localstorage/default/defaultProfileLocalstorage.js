import { ymd } from '../../../../utils/DateFormats.js';

const defaultProfileLocalstorage = () => {
  const date = new Date();

  if (!localStorage.getItem('userprofile')) {
    const obj = JSON.parse(localStorage.getItem('zsdf'));
    localStorage.setItem(
      'userprofile',
      JSON.stringify({
        firstname: obj?.firstname,
        lastname: obj?.lastname,
        email: obj?.email,
        phone: obj?.phone,
        residence: obj?.residence,
        password: '',
        birthdate: ymd(obj?.birthdate),
        photo: obj?.photo,
        signature: obj?.signature,
        createdAt: ymd(date),
      })
    );
  }
};

export default defaultProfileLocalstorage;
