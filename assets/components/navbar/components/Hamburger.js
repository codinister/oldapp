import hamburgerEvent from '../events/hamburgerEvent.js';

const Hamburger = (user) => {
hamburgerEvent(user)

  return `
      <img src="assets/images/hamburger.jpg" width="25" height="25" alt="" class="cursor-pointer hambrg" />
  `;
};

export default Hamburger;
