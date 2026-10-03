import { classSelector } from './Selectors.js';

const productsSearchBox = (labelText, inputClass) => {
  setTimeout(() => {
    if (classSelector(inputClass)) {
      var input = classSelector(inputClass);
      input.focus();
      input.select();
    }
  }, 0);

  //'stockstitle' can be find in this function ->displayAvailableStock

  return `
	<div class="productsSearchBox">

  
		<div>
		<div class="form-group  pt-0 input-animate">	
		<input type="text"  placeholder=" " class="fminpt form-control ${inputClass}" required="true" >
		<label>${labelText}</label>
		</div>
		</div>


		<div class="stockstitle">
		</div>


	</div>
	`;
};

export default productsSearchBox;
