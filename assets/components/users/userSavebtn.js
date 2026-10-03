import getUsersLocalstorage from '../data/clientside/localstorage/GET/getUsersLocalstorage.js';
import Buttons from '../utils/Buttons.js';

const userSavebtn = () => {

  if (getUsersLocalstorage()) {
    const obj = getUsersLocalstorage();
    const length = Object.values(obj).filter(Boolean).length;

    if (obj?.modified && length > 13) {
      return Buttons([
        {
          btnclass: 'saveuserbtn',
          btnname: 'SAVE USER',
        },
      ]);
    } else if (!obj?.modified && length > 13) {
      return `<span>No changes made!</span>`;
    } else {
      return `<span>All User details fields required!</span>`;
    }
  } else {
    return `<span>All User details fields required!</span>`;
  }
};

export default userSavebtn;
