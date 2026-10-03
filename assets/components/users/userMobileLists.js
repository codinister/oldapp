const userMobileLists = (v) => {
  const btns = `
  	<span>
	<i class="fa fa-edit edit-record ${v.editclass}" title="EDIT"   data-id="${v.id}" ></i>
	</span>
	<span>
	<i class="fa fa-trash delete-record ${v.deltclass}" title="DELETE"  data-id="${v.id}" ></i>
	</span>
	`;

  const adminbtns = `
  	<span>
	<i class="fa fa-edit edit-record ${v.editclass}" title="EDIT"   data-id="${v.id}" ></i>
	</span>
	<span>
	<i class="fa fa-lock text-muted"></i>
	</span>
	`;

  	return `<ul class="user-list-box">
		<li>
		<a href="javascript:void(0);" data-id="${v.id}" class="${v.fnameclass}">
		${v.name}
		</a>
		</li>
		<li>
		${v.role_id == 111 ? adminbtns : btns}
		</li>
	</ul>`;
};

export default userMobileLists
