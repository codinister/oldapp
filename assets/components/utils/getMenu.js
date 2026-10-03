const getMenu = (callback) => {
  const { menus } = JSON.parse(localStorage.getItem('zsdf'));
  callback(menus);
};
export default getMenu;
