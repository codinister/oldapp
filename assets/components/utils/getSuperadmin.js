const getSuperadmin = () => {
  const { superadmin } = JSON.parse(localStorage.getItem('zsdf'));
  return superadmin;
};
export default getSuperadmin;
