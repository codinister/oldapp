import { classSelector } from '../utils/Selectors.js';
import getData from '../utils/getData.js';

const searchBox = (
  inputClass,
  labelText,
  divcolmFunc,
  outputClass,
  editClass = '',
  deleteClass = ''
) => {
  document.addEventListener('keyup', (e) => {
    if (e.target.matches(`.${inputClass}`)) {
      getData((data) => {
        const { categories } = data;
        const inpt = e.target.value;
        const output = categories
          .filter((v) =>
            Object.values(v).join('').toLowerCase().includes(inpt.toLowerCase())
          )
          .map((v) => {
            return divcolmFunc(v, editClass, deleteClass);
          })
          .join('');
        classSelector(outputClass).innerHTML = output;
      });
    }
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

export default searchBox;
