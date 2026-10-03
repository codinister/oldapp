const checkAllInputs = (classname, e) => {
  document.querySelectorAll(`.${classname}`).forEach((v) => {
    if (e.target.checked) {
      v.checked = true;
    } else {
      v.checked = false;
    }
  });
};

export default checkAllInputs;
