import getLoginuser from '../data/clientside/localstorage/GET/getLoginuser.js';

const accessControl = (arr) => {
  if (Array.isArray(arr)) {
    const { user_id, role_id } = getLoginuser();

    if(!user_id && !role_id ){
      return console.error('No user id or role id!')
    }

    const filter = ['1', '111', '5'].includes(role_id);
    if (filter) {
      return arr;
    } else {
      if (arr[0]?.user_id) {
        return arr.filter((v) => v.user_id === user_id);
      } else {
        console.error('[' + arr[0] + ']' + ' does not contain a user_id');
      }
    }
  } else {
    console.error(arr + ' is not a valid array');
  }
};

export default accessControl;
