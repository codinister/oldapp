const getRoleid = () => {
  const { role_id } = JSON.parse(localStorage.getItem('zsdf'));
  return role_id;
};

export default getRoleid;
