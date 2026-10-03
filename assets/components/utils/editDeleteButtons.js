import getRoleid from './getRoleid.js';

const editDeleteButtons = (editClassName, deltClassName, id) => {
  const role_id = getRoleid();

  if (role_id === '4' || role_id === '111') {
    return `
	<div class="edit-delete">
	  <i class="fa fa-edit edit-record ${editClassName}" title="EDIT"  data-id="${id}"></i>
	  <i class="fa fa-trash delete-record ${deltClassName}" title="DELETE" data-id="${id}"></i>
	</div>
	`;
  } else {
    return `
	<div class="edit-delete">
	  <i class="fa fa-lock"></i>
	  <i class="fa fa-lock"></i>
	</div>
	`;
  }
};

export default editDeleteButtons;
