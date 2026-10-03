import { classSelector } from './Selectors.js';

function dataListDropdown(
  textInput,
  classname,
  label,
  hiddeninptclass,
  linkclass,
  wrapperclass,
  value = ''
) {

  const textinptclass = classname.split(' ')[0]

  window.addEventListener('click', (e) => {
    if (
      !e.target.matches('.data-list input') &&
      !e.target.matches(`.${wrapperclass} a`)
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
    if (e.target.matches(`.${linkclass}`)) {
      const { id } = e.target.dataset;
      const inputText = e.target.textContent;
      classSelector(textinptclass).value = inputText;

      classSelector(wrapperclass).classList.remove('showmodal');
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
    value
  })}
	<ul class="data-list-container ${wrapperclass}">

	</ul>
  <input type="hidden"  class="${hiddeninptclass}" />
	</div>
	`;
}

export default dataListDropdown;
