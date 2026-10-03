const productsTableBody = (
  productListFunc,
  products,
  editClassName,
  deltClassName
) => {
  if (products) {
    const tableBodyList = Object.values(products)
      .map((v) => productListFunc(v, editClassName, deltClassName))
      .join('');

    return tableBodyList;
  } else {
    return [];
  }
};

export default productsTableBody;
