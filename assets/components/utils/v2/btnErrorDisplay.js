import { removeDisabledAttribute } from './attributes.js';
import textContent from './textContent.js';

// btnErrorDisplay({
//   btn_class: '',
//   btn_name: '',
//   error_message: ''
// })
const btnErrorDisplay = ({ ...options }) => {
  const { btn_class, btn_name, error_message } = options;

  textContent({
    data: error_message,
    outputClass: btn_class,
  });

  setTimeout(() => {
    removeDisabledAttribute(btn_class);
    textContent({
      data: btn_name,
      outputClass: btn_class,
    });
  }, 3000);
};

export default btnErrorDisplay;
