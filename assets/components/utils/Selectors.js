const idSelector = (id) => {
  return document.getElementById(id);
};

const classSelector = (cls) => {
  return document.querySelector(`.${cls}`);
};

const classValueSelector = (cls) => {
  return document.querySelector(`.${cls}`).value;
};

const classModifyValue = (cls, data) => {
  return (document.querySelector(`.${cls}`).value = data);
};

export { idSelector, classSelector, classValueSelector, classModifyValue };
