const Select = (arr, val = {}, clss = 'z') => {
  // const arr = [{id: 1,name: 'Thomas'}, {id: 2,name: 'Osam'}]
  // const val = {id: 2, text: 'Firstname'}
  // Select(arr,val,clss)
  document.querySelector(`.${clss}`).innerHTML = null;

  if (val.id) {
    let def = document.createElement('option');
    def.value = val.id;
    def.textContent = val.text;
    document.querySelector(`.${clss}`).append(def);
  }
  for (let i = 0; i < arr.length; i++) {
    const values = Object.values(arr[i]).join(' ');
    if (val.text === values) {
    } else {
      let opt = document.createElement('option');
      opt.value = values;
      opt.textContent = Object.values(arr[i]).join(' ');
      document.querySelector(`.${clss}`).append(opt);
    }
  }
};

export default Select;
