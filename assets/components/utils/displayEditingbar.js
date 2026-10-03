import { classSelector } from "./Selectors.js";
const displayEditingbar = (text) => {
  document.querySelector('.editingmode .editing-mode-inner').innerHTML = `<marquee scrollamount="4">${text}</marquee>`
  classSelector('editingmode').classList.add('show')
};
export default displayEditingbar;
