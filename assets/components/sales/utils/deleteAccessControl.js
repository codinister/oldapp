const deleteAccessControl = (element, id = '') => {
  const userData = JSON.parse(localStorage.getItem('zsdf') || '{}');
  const { role_id, user_id } = userData;

  if (!role_id || !user_id) {
    return '';
  }

  const allowedRoles = new Set(['111', '1', '5']);
  const hasAccess = allowedRoles.has(role_id) || user_id === id;

  const output = hasAccess ? element : '<i class="fa fa-lock"></i>';


  return output 
};

export default deleteAccessControl;