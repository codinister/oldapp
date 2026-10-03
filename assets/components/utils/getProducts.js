const getProducts = async (callback) => {
  const products = JSON.parse(localStorage.getItem('kwikproducts'));
  callback(products);
};
export default getProducts;
