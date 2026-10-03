import format_number from '../../../utils/format_number.js';

const setTotal = (val) => {
  return format_number(val?.total);
};

export default setTotal;
