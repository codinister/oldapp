import getUsersLocalstorage from '../data/clientside/localstorage/GET/getUsersLocalstorage.js';
import Buttons from '../utils/Buttons.js';
import { classSelector } from '../utils/Selectors.js';

const showSaveuserbtn = () => {
  const obj = getUsersLocalstorage();

  const length = Object.values(obj).filter(Boolean).length;

  if (length > 13) {
    classSelector('saveuser-wrapper').innerHTML = Buttons([
      {
        btnclass: 'saveuserbtn',
        btnname: 'SAVE USER',
      },
    ]);
  } else {
    classSelector('saveuser-wrapper').innerHTML =
      '<span>User details fields required!</span>';
  }
};

export default showSaveuserbtn;
