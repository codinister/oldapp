import { classSelector } from './Selectors.js';
import format_number from './format_number.js';

const filterSales = (
  val,
  receipts,
  divcolmFunc,
  tableoutput,
  amountoutput,
  ymd
) => {
  const day = 1000 * 60 * 60 * 24;
  const month = day * 30;

  const data = {
    [1]: () => {
      return receipts;
    },
    [2]: () => {
      const result = receipts.filter(
        (v) =>
          new Date(v.createdAt).getFullYear() === new Date().getFullYear() - 1
      );
      return result;
    },
    [3]: () => {
      const result = receipts.filter(
        (v) => ymd(new Date(v.createdAt)) === ymd(new Date())
      );
      return result;
    },
    [4]: () => {
      const result = receipts.filter(
        (v) => ymd(v.createdAt) === ymd(new Date(new Date().getTime() - day))
      );
      return result;
    },
    [5]: () => {
      const result = receipts.filter(
        (v) =>
          ymd(v.createdAt) > ymd(new Date(new Date().getTime() - month)) &&
          ymd(v.createdAt) < ymd(new Date())
      );
      return result;
    },
  };

  const arr = data[val]().map((v) => divcolmFunc(v));

  classSelector(tableoutput).innerHTML = arr;

  classSelector(amountoutput).textContent = format_number(
    data[val]().reduce((a, b) => {
      return Number(a) + Number(b.payment);
    }, 0)
  );
};

export default filterSales;
