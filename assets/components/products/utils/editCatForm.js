import Buttons from '../../utils/Buttons.js';
import { textInput } from '../../utils/InputFields.js';
import displayToast from '../../utils/displayToast.js';
import productsLocalstorage from '../../data/clientside/localstorage/default/defaultProductsLocalstorage.js';

const editCatForm = (cat_name) => {

  document.addEventListener('input', (e) => {
    if (e.target.matches('.prod-inpt')) {
      if (!localStorage.getItem('prodlocalstorage')) {
        productsLocalstorage();
      }
      const { name, value } = e.target;
      const obj = JSON.parse(localStorage.getItem('prodlocalstorage'));
      const newobj = { ...obj, [name]: value };
      localStorage.setItem('prodlocalstorage', JSON.stringify(newobj));
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.saveCategory')) {
      e.stopImmediatePropagation();

      const obj = JSON.parse(localStorage.getItem('prodlocalstorage'));

      if (obj?.cat_name.length < 1) {
        return displayToast('bgdanger', 'Category field required!');
      }

      const { cat_id, cat_name } = obj;

      const fd = new FormData();

      fd.append(
        'cat',
        JSON.stringify({
          cat_id,
          cat_name,
        })
      );

      fetch('router.php?controller=products&task=update_category', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          displayToast('lightgreen', data);


          document.body.style.overflow = 'scroll'

          localStorage.removeItem('prodlocalstorage');
          localStorage.setItem('rend', 2);
        });
    }
  });

  return `
    <div class="prod-form-wrapper">
    <div>
        ${textInput({
          type: 'text',
          classname: 'cat_name prod-inpt',
          name: 'cat_name',
          required: true,
          label: 'Category Name',
          value: cat_name,
        })}

        ${Buttons([
          {
            btnclass: 'saveCategory',
            btnname: 'Update category',
          },
        ])}
    </div>
    <div></div>
    <div></div>
    </div>
    `;
};

export default editCatForm;
