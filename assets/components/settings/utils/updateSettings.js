const updateSettings = (obj, key, checked, inputName) => {
  
  if (!obj && !key && !inputName) {
    return console.error('Valid arguements requried!');
  }

  if (checked && inputName === key) {
    obj[key] = '1';
    localStorage.setItem('settingupdate', JSON.stringify(obj));
  } else if (inputName === key) {
    obj[key] = '0';
    localStorage.setItem('settingupdate', JSON.stringify(obj));
  }
};

export default updateSettings;
