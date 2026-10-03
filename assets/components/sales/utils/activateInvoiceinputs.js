const sess = JSON.parse(localStorage.getItem('zsdf'));
export const unitprice = sess?.unitprice === 'Unitprice'? '' : 'readonly';
export const invoicedesc = sess?.invoicedesc === 'Invoicedesc'? '' : 'readonly';


