
import Menus from './Menus.js'
const Hamburger = (user) => {

  const menu = user?.menus.filter(v => v.menu_parent !== 'Privileges')


  return `
<img src="assets/images/hamburger.jpg" width="25" height="25" alt="" />

${Menus(menu)}
  `
}

export default Hamburger