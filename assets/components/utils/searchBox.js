import { classSelector } from '../utils/Selectors.js';

const searchBox = (inputClass, labelText) => {
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
