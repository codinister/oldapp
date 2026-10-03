import { classSelector } from './Selectors.js';

const datalistDropdownEventFunc = (e, data, iteratorFunc, wrapperclass) => {
  const val = e.target.value;
  const searchres = data
    .filter((v) =>
      Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
    )
    .map((v) => iteratorFunc(v))
    .join('');
  classSelector(wrapperclass).innerHTML = searchres;
};

export default datalistDropdownEventFunc;
