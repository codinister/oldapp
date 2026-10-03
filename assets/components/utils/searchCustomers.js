import { classSelector } from '../utils/Selectors.js';
import getCustomers from './getCustomers.js';

const searchCustomers = (
  inputClass,
  labelText,
  divcolmFunc,
  outputClass,
  editClass = '',
  deleteClass = ''
) => {
  document.addEventListener('keyup', (e) => {
    getCustomers((data) => {
      if (e.target.matches(`.${inputClass}`)) {
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
      }
    });
  });

  setTimeout(() => {
    if (classSelector(inputClass)) {
      var input = classSelector(inputClass);
      input.focus();
      input.select();
    }
  }, 0);

  return `
    <div class="form-group  pt-0 input-animate">	
    <input type="text"  placeholder=" " class="fminpt form-control ${inputClass}" required="true" >
    <label>${labelText}</label>
    </div>
    `;
};

export default searchCustomers;
