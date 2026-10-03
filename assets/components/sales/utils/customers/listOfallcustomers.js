import customerlistFunc from "./customerlistFunc.js";

const listOfallcustomers = (customers,desc) => {
  return customers
  .slice(0,20)
  .map((v) => {
    return customerlistFunc(v,desc);
  })
  .join('');
}

export default listOfallcustomers