import getUsersLocalstorage from '../data/clientside/localstorage/GET/getUsersLocalstorage.js';
import setUsersLocalstorage from '../data/clientside/localstorage/SET/setUsersLocalstorage.js';
import { classSelector } from '../utils/Selectors.js';

import showSaveuserbtn from './showSaveuserbtn.js';

const inputValidation = (name, message,errorclass) => {
  classSelector(errorclass).textContent = message;
  const ps = getUsersLocalstorage();
  ps[name] = '';
  setUsersLocalstorage(ps);
  showSaveuserbtn();
};

export default inputValidation;
