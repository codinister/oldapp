import roleAccess from '../../utils/roleAccess.js';
const editInvoiceAcessControl = (elem) => {
  const tx = JSON.parse(localStorage.getItem('sales'));

  const { user_id, role_id } = JSON.parse(localStorage.getItem('zsdf'));

  const role = roleAccess(role_id);

  const trans_type = tx?.trans_type;
  const usid = user_id === tx?.user_id;

  if (trans_type === 'invoice') {
    let output;
    if (role || usid) {
      output = elem;
    } else {
      output = '<i class="fa fa-lock"></i>';
    }

    return output;
  } else {
    return elem;
  }
};

export default editInvoiceAcessControl;
