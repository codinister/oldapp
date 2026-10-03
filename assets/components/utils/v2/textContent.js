import { classSelector } from "../Selectors.js";


const textContent = ({ ...options }) => {
  const { outputClass = '', data = '' } = options;
  if (classSelector(outputClass)) {
    classSelector(outputClass).textContent = data;
  }
};

export default textContent
