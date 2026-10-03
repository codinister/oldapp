

const productsprofile = async (industry) => {
  const baseURL = 'router.php?controller=productsprofile&task';

  const result = await Promise.allSettled([
    fetch(`${baseURL}=findAllCategories`).then((resp) => resp.json()),
    fetch(`${baseURL}=findAllProductQty`).then((resp) => resp.json()),
    fetch(`${baseURL}=findAllProducts`).then((resp) => resp.json()),
    fetch(`${baseURL}=findAllSales`).then((resp) => resp.json()),
  ]);

  const categories = await result[0].value;
  const prod_quantities = await result[1].value;
  const all_products = await result[2].value;
  const all_sales = await result[3].value;

  if (industry === 'rentals') {
    return {
      categories,
      prod_quantities,
      all_products,
      all_sales,
    };
  }
  if (industry === 'retails') {
    return {
      categories,
      prod_quantities,
      all_products,
      all_sales,
    };
  }
  if (industry === 'service provider') {
    return {
      categories,
      all_products
    };
  }
  if (industry === 'roofing company') {
    return {
      categories,
      prod_quantities,
      all_products
    };
  }
};

export default productsprofile;
