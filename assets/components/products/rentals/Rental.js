import dataListDropdown from '../../utils/dataListDropdown.js';
import Buttons from '../../utils/Buttons.js';
import { textInput } from '../../utils/InputFields.js';
import rentalsEvents from './events/rentalsEvents.js';
import groupProdQty from '../../data/serverside/utils/groupProdQty.js';

import groupSalesQty from '../../data/serverside/utils/groupSalesQty.js';
import availableProducts from '../../data/serverside/utils/availableProducts.js';

const Rental = (data) => {

  rentalsEvents(data);

  const available = availableProducts(data)

  return `

    <div class="dash-container mb-2">

      <div class="dash-row gap-3">
<br /> <br />
      <div class="hideondesktop mobile-cat-dropdown">
      
      ${dataListDropdown(
        textInput,
        'categorylistinpt',
        'Select category',
        '',
        'hyy67f',
        'categwrapper',
      )}
      
      </div>

      
      <div class="sidebar bgwhite prod-side-bar hideonmobile">
      
        <div class="scroll-wrapper">
        <div class="categories-searchbox"></div>
        <div class="scroll-inner">
        
        <table cellspacing="0">
        <tbody class="products-categories"></tbody>
        </table>
        
        </div>
        </div>

      </div>

      <div class="cont">

      <div class="top-box">
        <div class="top-box-left"></div>
        <div class="top-box-middle"></div>
        <div class="top-box-right"></div>
      </div>

   
      <div class="secondbox-wrapper">
          <div class="produsts-btns">
          

          <div class="generate-preview-wrapper">
            ${Buttons([
              {
                btnclass: 'generatepreview',
                btnname: 'GENERATE PREVIEW',
              },
            ])}
            </div>


            <div class="add-product-wrapper">
    
            </div>
          
          </div>
          <div class="other-box"></div>
      </div>


        <div class="products-table-wrapper">
            <div class="products-table-inner">

            <table cellspacing="0">
            <thead class="products-table-header"></thead>
            </table>

            <table cellspacing="0">
            <tbody class="products-table-body-inner"></tbody>
            </table>
            
            </div>
        </div>

      </div>
      </div>
      </div>

`;
};

export default Rental;
