const customerData = (customer) => {
  const { role_id, user_id } = JSON.parse(localStorage.getItem('zsdf'));

  let customers = [];
  if (role_id === '111' || role_id === '1' || role_id === '5') {
    customers = customer;
  } else {
    customers = customer.filter((v) => v.user_id === user_id);
  }

  return customers
};

export default customerData;
