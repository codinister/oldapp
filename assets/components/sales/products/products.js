import searchBox from '../../utils/searchBox.js';
import Table from '../../utils/Table.js';
import Modalboxnoreload2 from '../../utils/Modalboxnoreload2.js';
import { classSelector } from '../../utils/Selectors.js';
import setSubtotalValue from '../utils/setSubtotalValue.js';
import displayProductList from '../utils/displayProductList.js';
import calculateTransactions from '../utils/calculateTransactions.js';
import salesLocalstorage from '../../data/clientside/localstorage/default/defaultSalesLocalstorage.js';
import displayToast from '../../utils/displayToast.js';
import getIndustry from '../../utils/getIndustry.js';
import { ymd } from '../../utils/DateFormats.js';

const products = (product) => {
  const removenulls = product.filter((v) => v.prod_name !== null);
  const industry = getIndustry();

  const products = Object.values(removenulls).map((v) => {
    const pqty =
      industry === 'retails'
        ? v.remaining
        : industry === 'rentals'
        ? v.remaining
        : v.prod_qty;

    return {
      cat_id: v.cat_id,
      createdAt: v.createdAt,
      prod_code: v.prod_code,
      prod_id: v.prod_id,
      prod_image: v.prod_image,
      prod_name: v.prod_name,
      prod_qty: pqty,
      duration: '0',
      selling_price: v.selling_price,
      prodsize: v.prod_size,
    };
  });

  const productListFunc = (v) => {
    let rows = '';

    if (industry === 'rentals' || industry === 'retails') {
      if (v.prod_qty > 0) {
        rows = v.prod_qty;
      } else {
        rows = '---';
      }
    } else if (
      industry === 'service provider' ||
      industry === 'roofing company'
    ) {
      rows = '<input type="number" class="row-inpt" value="1" />';
    }

    let proddesc = v.prod_name;
    if (industry === 'retails' || industry === 'rentals') {
      proddesc = v.prodsize + ' ' + v.prod_name;
    }

    return `
      <tr>
          <td>
          <a 
          class="prodList"
          data-prod_id="${v.prod_id}"
          data-prod_name="${v.prod_name}"
          data-duration=""
          data-prodsize="${v.prodsize}"
          data-prod_price="${v.selling_price}"
          href="javascript:void(0);">
          ${proddesc}
          </a>
          </td>
          <td class="hideonmobile">
            ${rows}
          </td>
      </tr>`;
  };

  const mobileProductsFunc = (v) => {

        return productListFunc(v);

  };

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.mobile-products-inpt')) {
      const val = e.target.value;

      const productsdata = products
        .filter((v) =>
          Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
        )
        .slice(0, 10)
        .map((v) => productListFunc(v, '', '') )
        .join('');
      classSelector('mobileprodwrapper').innerHTML = productsdata;
    }

    if (e.target.matches('.searchposproducts')) {
      const inpt = e.target.value;
      const output = products
        .filter((v) =>
          Object.values(v).join('').toLowerCase().includes(inpt.toLowerCase())
        )
        .slice(0,20)
        .map((v) => productListFunc(v, '', '')
        )
        .join('');

      classSelector('pos-product-output').innerHTML = output;
    }
  });

  document.addEventListener('input', (e) => {
    //MODIFY INVOICE LIST
    if (e.target.matches('.schprod')) {
      //Get key from prod_name
      const { key } = e.target.dataset;

      //Find item which matches prod_name
      const price = Object.values(products).find(
        (v) => v.prod_name.toLowerCase() == e.target.value.toLowerCase()
      );

      //Filter item which matches prod_name
      const productsData = Object.values(products)
        .filter(
          (v) => v.prod_name.toLowerCase() === e.target.value.toLowerCase()
        )
        .map((v) => {
          if (v.prod_qty > 0) {
            return productListFunc(v);
          }
        })
        .filter(Boolean)
        .sort()
        .join('');

      const productsData2 = Object.values(products)
        .map((v) => {
          if (v.prod_qty > 0) {
            return productListFunc(v);
          }
        })
        .filter(Boolean)
        .sort()
        .join('');

      //Display filtered result in sales products list
      classSelector('pos-product-output').innerHTML =
        productsData || productsData2;

      //If prod_name matches products
      const getItem = JSON.parse(localStorage.getItem('prozdlist'));

      if (price) {
        const parent = e.target.parentElement.parentElement;

        parent.children[4].children[0].value = price.selling_price;
        //parent.children[3].children[0].value = price.prod_size;

        const pqty = getItem[key].qty;
        const duration = price.duration.length > 0 ? price.duration : 1;
        const unit_price = price.selling_price ? price.selling_price : 0;
        const tot = Number(pqty) * Number(duration);
        const ptotal = Number(pqty) * Number(unit_price);

        //SMART SELFLOCK 0.50MM
        getItem[key].prod_id = price?.prod_id;
        getItem[key].prod_name = e.target.value;
        getItem[key].duration = price?.duration;
        getItem[key].prodsize = price?.prodsize;
        getItem[key].prod_price = price?.selling_price;
        getItem[key].total = ptotal;

        parent.children[5].children[0].textContent = ptotal;

        setSubtotalValue();
        calculateTransactions(e);
      } else {
        getItem[key].prod_name = e.target.value;
      }

      localStorage.setItem('prozdlist', JSON.stringify(getItem));
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.mobile-products-inpt')) {
      if (products) {
        const productsdata = products
          .map((v) => mobileProductsFunc(v))
          .slice(0, 10)
          .join('');

        classSelector('mobileprodwrapper').innerHTML = productsdata;
      }
    }

    if (e.target.matches('.bulkaddlink')) {
      e.stopImmediatePropagation();
      const prod_id = classSelector('pos_prod_id').value;

      const prod = Object.values(products)
        .map((v) => {
          if (v.prod_id == prod_id) {
            return {
              s_id: '',
              qty: '1',
              prod_id: v.prod_id,
              prod_name: v.prod_name,
              prod_size: v.prod_size,
              prod_price: v.selling_price,
              total: 0,
            };
          }
        })
        .filter(Boolean);

      salesLocalstorage();

      let getItem;
      if (localStorage.getItem('prozdlist')) {
        getItem = JSON.parse(localStorage.getItem('prozdlist'));
      } else {
        getItem = [{}];
      }

      if (classSelector('pos-sales-output')) {
        classSelector('pos-sales-output').innerHTML = displayProductList();
        setSubtotalValue();
        calculateTransactions(e);
        classSelector('noreload2').classList.remove('show');
        document.body.style.overflow = 'scroll';
      }
    }

    //Get product image details
    if (e.target.matches('.posprodimg')) {
      e.stopImmediatePropagation();
      const {
        img,
        pos_prod_name,
        pos_prod_price,
        pos_prod_remaining,
        pos_prod_id,
      } = e.target.dataset;

      classSelector('prodimg').setAttribute('src', `assets/uploads/${img}`);
      classSelector('pos_prod_name').textContent = pos_prod_name;
      classSelector('pos_prod_price').textContent = pos_prod_price;
      classSelector('pos_prod_id').value = pos_prod_id;
      classSelector('pos_prod_remaining').textContent = pos_prod_remaining;

      classSelector('noreload2').classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    //Set and display product list
    if (e.target.matches('.prodList')) {
      e.stopImmediatePropagation();
      const { prod_id, prod_name, duration, prodsize, prod_price } =
        e.target.dataset;

      displayToast('lightgreen', `You added <br> ${prod_name}`);
      salesLocalstorage();

      if (localStorage.getItem('sales')) {
        const tx = JSON.parse(localStorage.getItem('sales'));
        if (tx['invoice_date'].length < 1) {
          const date = new Date();
          const value = ymd(date);
          tx['invoice_date'] = value;
          tx['receipt_date'] = value;
          localStorage.setItem('sales', JSON.stringify(tx));
        }
      }

      let listItems = [];

      if (
        industry === 'service provider' ||
        industry === 'rentals' ||
        industry === 'retails'
      ) {
        let getItem;
        if (localStorage.getItem('prozdlist')) {
          getItem = JSON.parse(localStorage.getItem('prozdlist'));
        } else {
          getItem = [{}];
        }

        const item = {
          s_id: '',
          qty: '1',
          prod_id,
          prod_name,
          duration,
          prodsize,
          prod_price,
          total: 0
        };

        listItems = [...getItem, item];
      } else {
        const rowValue =
          e.target.parentElement.nextElementSibling.children[0].value;

        let items = [];

        for (let i = 0; i < rowValue; i++) {
          items[i] = {
            s_id: '',
            qty: '1',
            prod_id,
            prod_name,
            duration,
            prodsize,
            prod_price,
            total: 0
          };
        }

        let getItem;
        if (localStorage.getItem('prozdlist')) {
          getItem = JSON.parse(localStorage.getItem('prozdlist'));
        } else {
          getItem = [{}];
        }

        listItems = [...getItem, ...items];
      }

      if (classSelector('pos-sales-output')) {
        localStorage.setItem('prozdlist', JSON.stringify(listItems));
        classSelector('pos-sales-output').innerHTML = displayProductList();
        setSubtotalValue();
        calculateTransactions(e);
      }

      var input = classSelector('searchposproducts');
      input.value = null;
      input.focus();
      input.select();

      if (classSelector('mobileprodwrapper')) {
        classSelector('mobileprodwrapper').classList.remove('showmodal');
      }
    }
  });

  const showImage = () => {
    return `
      <div class="prod-img-bx">
      <div>
        <img src="" class="prodimg" alt="" />
      </div>
      <div>
      <div class="posprodimgbx">
      <span>ITEM</span> <span class="pos_prod_name"> </span>
      </div>
      <div class="posprodimgbx">
      <span>Price</span> <span class="pos_prod_price"> </span>
    
      </div>
      <div class="posprodimgbx">
      <span>STOCK</span> <span class="pos_prod_remaining"> </span>
      </div>
  
      </div>
      <input type="hidden" class="pos_prod_id" />
    </div>
    `;
  };

  const body = Object.values(products)
    .map((v) => {
      return productListFunc(v);
    })
    .filter(Boolean)
    .slice(0,20)
    .sort()
    .join('');

  let rows = '';
  if (industry === 'service provider') {
    rows = '<td>Rows</td>';
  }
  if (industry === 'rentals') {
    rows = '<td>Available</td>';
  } else if (industry === 'retails') {
    rows = '<td>Stock</td>';
  } else if (industry === 'roofing company') {
    rows = '<td>Rows</td>';
  }

  return `
        <div class="total-amnt-box">
        <h6> TOTAL GHs: <span class="top_total"></span> </h6>
        </div>
        <div class="pos-prod-searchbx">
        ${searchBox('searchposproducts', 'Search Products')}
        </div>
        ${Table(
          'pos-prod-table-cls',
          'fff',
          `<tr class="pos-prod-table">
          <td>Item</td>
          ${rows}
          </tr>`,
          `${body}`,
          'pos-product-output'
        )}
        <div class="hide-on-mobile">
        ${Modalboxnoreload2('', showImage())}
        </div>
        
    `;
};

export default products;
