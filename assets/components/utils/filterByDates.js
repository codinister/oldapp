import allStocksFunc from '../products/allStocksFunc.js';
import displayStockList from '../products/displayStockList.js';
import { classSelector } from './Selectors.js';
import productsTableBody from './productsTableBody.js';
import getIndustry from './getIndustry.js';
import displaySoldStocks from '../products/displaySoldStocks.js';
import displayAvailableStock from '../products/displayAvailableStock.js';
import soldStocksFunc from '../products/soldStocksFunc.js';
import availableStocksFunc from '../products/availableStocksFunc.js';

const filterByDates = (products) => {
  const industry = getIndustry();

  const filterbycreateddate = (product, start, end) => {
    const prod = product.filter((v) => {
      const dt = new Date(v.createdAt).getTime();
      if (dt >= start && dt <= end) {
        return v;
      }
    });
    return prod;
  };

  const filterbyexpirydate = (product, start, end) => {
    const prod = product
      .filter((v) => {
        const dt = new Date(v.exp_date).getTime();
        if (dt >= start && dt <= end) {
          return v;
        }
      })
      .map((v) => ({
        ...v,
        createdAt: v.exp_date,
      }));
    return prod;
  };

  const search_by_selected_option = (products, start, end) => {
    const sold = products
      .map((v) => v.soldprodlist)
      .flat(2)
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1;
        } else if (a.createdAt < b.createdAt) {
          return -1;
        } else {
          return 0;
        }
      });

    let prods = [];
    const filterby = localStorage.getItem('filterby');
    if (filterby === '2') {
      prods = filterbyexpirydate(sold, start, end);
    } else if (filterby === '1') {
      prods = filterbycreateddate(sold, start, end);
    }

    displaySoldStocks(
      prods,
      productsTableBody,
      soldStocksFunc,
      industry,
      classSelector
    );
  };

  document.addEventListener('change', (e) => {
    if (e.target.matches('.filterby_rent_exp')) {
      //Get value and set in local storage
      const { value } = e.target;
      localStorage.setItem('filterby', value);

      //Terminate if newrec is not set
      if (!localStorage.getItem('newrec')) return;

      //if newrec is set get start_date and end_date
      const { start_date, end_date } = JSON.parse(
        localStorage.getItem('newrec')
      );

      const start = new Date(start_date).getTime();
      const end = new Date(end_date).getTime();

      //START------------------------------------------------
      //Set the ACTION heading of the products table
      const filterby = localStorage.getItem('filterby');
      const rec = JSON.parse(localStorage.getItem('newrec'));
      if (filterby === '2' && rec?.start_date) {
        classSelector('action').textContent = 'EXPIRY DATE';
      } else {
        classSelector('action').textContent = 'RENTED ON';
      }
      //END--------------------------------------------------

      search_by_selected_option(products, start, end);
    }

    if (e.target.matches('.filterbydate')) {
      const { name, value } = e.target;

      if (!localStorage.getItem('newrec')) {
        localStorage.setItem('newrec', JSON.stringify({}));
      }

      const obj = JSON.parse(localStorage.getItem('newrec'));

      const newrec = { ...obj, [name]: value };

      localStorage.setItem('newrec', JSON.stringify(newrec));

      //START------------------------------------------------
      const filterby = localStorage.getItem('filterby');
      const rec = JSON.parse(localStorage.getItem('newrec'));

      if (filterby === '2' && rec?.start_date) {
        classSelector('action').textContent = 'EXPIRY DATE';
      } else {
        classSelector('action').textContent = 'RENTED ON';
      }
      //END------------------------------------------------

      const res = JSON.parse(localStorage.getItem('newrec'));

      if (res.start_date && res.end_date) {
        const { start_date, end_date } = res;

        const start = new Date(start_date).getTime();
        const end = new Date(end_date).getTime();

        const stock = localStorage.getItem('stocks');

        if (stock === '1') {
          const prods = filterbycreateddate(products, start, end);
          displayStockList(
            productsTableBody,
            allStocksFunc,
            prods,
            industry,
            classSelector
          );
        } else if (stock === '2') {
          const sold = products
            .map((v) => v.soldprodlist)
            .flat(2)
            .sort((a, b) => {
              if (a.createdAt > b.createdAt) {
                return 1;
              } else if (a.createdAt < b.createdAt) {
                return -1;
              } else {
                return 0;
              }
            });

          const prods = filterbycreateddate(sold, start, end);
          displaySoldStocks(
            prods,
            productsTableBody,
            soldStocksFunc,
            industry,
            classSelector
          );
        } else if (stock === '3') {
          const avail = products.filter((v) => v.available > 0);
          const prods = filterbycreateddate(avail, start, end);
          displayAvailableStock(
            productsTableBody,
            availableStocksFunc,
            prods,
            industry,
            classSelector
          );
        }
      }
    }
  });

  return `
  
  <div class="filterbydate">

  <div class="drentwrapper">

  </div>

  <div class="fcontrol">
  <label>Start Date</label>
  <input name="start_date" class="filterbydate" type="date" />
  </div>
  <div class="fcontrol">
  <label>End Date</label>
  <input type="date" class="filterbydate" name="end_date" />
  </div>

  </div>
  
  
  `;
};

export default filterByDates;
