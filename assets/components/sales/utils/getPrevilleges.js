

const getPrevilleges = (str) => {
  const sess = JSON.parse(localStorage.getItem('zsdf'))
    .menus.filter((v) => v.menu_parent === 'Privileges')
    .map((v) => v.menu_name.toLowerCase())
    .filter((v) => v.includes(str));

  return sess.length > 0 ? true : false;
};

export default getPrevilleges;
