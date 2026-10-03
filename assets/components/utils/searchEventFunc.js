import { classSelector } from './Selectors.js';

const searchEventFunc = (
  e,
  data,
  inputClass,
  outputClass,
  editClass,
  deleteClass,
  divcolmFunc
) => {
  const inpt = e.target.value;
  const output = data
    .filter((v) =>
      Object.values(v).join('').toLowerCase().includes(inpt.toLowerCase())
    )
    .map((v) => {
      return divcolmFunc(v, editClass, deleteClass);
    })
    .join('');

  classSelector(outputClass).innerHTML = output;
};

export default searchEventFunc;
