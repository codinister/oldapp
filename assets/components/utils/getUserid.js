const getUserid = () => {
  const { user_id } = JSON.parse(localStorage.getItem('zsdf'));
  return user_id;
};

export default getUserid;
