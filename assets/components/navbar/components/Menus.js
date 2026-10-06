
const Menus = (menu) => {

  if(!menu) return console.error('Menu data unavailable!')

  console.log(menu)

const arr =  menu.map(v => `
      <li class="mb-6">${v.menu_name}</li> 
      `).join(' ')


  return `
  <ul class="text-md text-black/60">
  ${
   arr
  }
  </ul>
  `
}

export default Menus