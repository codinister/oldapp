import { classSelector } from "../Selectors.js";


const innerHTML = ({ ...options }) => {
  const { outputClass = '', data = '' } = options;
  if (classSelector(outputClass)) {
    classSelector(outputClass).innerHTML = data;
  }
};

export default innerHTML;
