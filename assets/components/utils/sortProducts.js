
const sortProducts = (resp) => {
  const products = resp.sort((a, b) => {
    if (a.prod_name > b.prod_name) return 1;
    else if (a.prod_name < b.prod_name) return -1;
    else return 0;
  });

  return products
}

export default sortProducts