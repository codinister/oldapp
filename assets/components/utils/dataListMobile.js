import { classSelector } from './Selectors.js';
import { textInput } from './InputFields.js';

function dataListMobile() {
  const classname = 'mobile-products-inpt';
  const label = 'Select item';
  const linkclass = 'mobprodlistlink';
  const wrapperclass = 'mobileprodwrapper';
  const value = '';

  const textinptclass = classname.split(' ')[0];

  window.addEventListener('click', (e) => {
    if (
      !e.target.matches('.data-list input') &&
      !e.target.matches(`.${wrapperclass}`)
    ) {
      if (document.querySelector('.showmodal')) {
        if (document.querySelector(`.${wrapperclass}`)) {
          document
            .querySelector(`.${wrapperclass}`)
            .classList.remove('showmodal');
        }
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches(`.${textinptclass}`)) {
      classSelector(wrapperclass).classList.add('showmodal');
    }
  });

  return `
	<div class="data-list">
	${textInput({
    type: 'text',
    name: 'custname',
    classname,
    required: true,
    label,
    value,
  })}
	<ul class="data-list-container ${wrapperclass}">

	</ul>

	</div>
	`;
}

export default dataListMobile;
