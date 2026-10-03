import getIndustry from './getIndustry.js';

const posTableclasses = (duration = '', k = '') => {
  const industry = getIndustry();

  let product_size = '';
  let table_class = '';
  let length_duration = '';

  if (industry === 'roofing company') {
    length_duration = `<td>Length</td>`;
    table_class = 'roofing-table';
    product_size = `<td>
    <input class="sumitems duration" name="duration" type="number" data-key="${k}" value="${duration}" />
    </td>`;
  } else if (industry === 'service provider') {
    length_duration = `
    <td >
    <span class="hideonmobile">Duration</span>
    <span class="hideondesktop">Dur</span>
    </td>  
    `;
    table_class = 'service-table';
    product_size = `<td>
    <input class="sumitems duration" name="duration" type="number" data-key="${k}" value="${duration}" />
    </td>`;
  } else if (industry === 'rentals') {

    length_duration = `
    <td >
    <span class="hideonmobile">Duration</span>
    <span class="hideondesktop">Dur</span>
    </td>  
    `;

    table_class = 'rental-table';
    
    product_size = `
    <td>
    <input class="sumitems duration" name="duration" type="number" data-key="${k}" value="${duration}" />
    </td>
    `;


  } else if (industry === 'retails') {
    table_class = 'retail-table';
  }

  return {
    product_size,
    table_class,
    length_duration,
  };
};

export default posTableclasses;
