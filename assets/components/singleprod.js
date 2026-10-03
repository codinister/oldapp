import getData from './utils/getData.js';
import googlemap from './utils/googlemap.js';
const page = new URLSearchParams(window.location.search);

getData((data) => {
  const { allproducts } = data;

  const prod_id = page.get('p');
  const { prod_image, selling_price, prod_name, prod_size, prod_code } =
    allproducts.find((v) => v.prod_id === prod_id);

  const map = googlemap(prod_code);
  const img = `assets/uploads/${prod_image ? prod_image : 'noimage.jpg'}`;

  document.querySelector('.title').innerHTML = prod_name;

  document.addEventListener('click', (e) => {
    if (e.target.matches('.goback')) {
      window.history.back();
    }
  });

  document.querySelector('.root').innerHTML = `

  
  `;
});
