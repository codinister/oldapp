const Lists = (v) => {
  const btns = `
  	<td>
	<i class="fa fa-edit edit-record ${v.editclass}" title="EDIT"   data-id="${v.id}" ></i>
	</td>
	<td>
	<i class="fa fa-trash delete-record ${v.deltclass}" title="DELETE"  data-id="${v.id}" ></i>
	</td>
	`;

  const adminbtns = `
  	<td>
	<i class="fa fa-lock text-muted"></i>
	</td>
	<td>
	<i class="fa fa-lock text-muted"></i>
	</td>
	`;

  	return `<tr class="list-box">
		<td>
			<a href="javascript:void(0);" data-id="${v.id}" class="${v.fnameclass}">
			${v.name}
			</a>
		</td>
		<td>
		<table>
		<tbody>
		<tr class="user-actions">
			${v.role_id == 111 ? adminbtns : btns}
		</tr>
		</tbody>
		</table>
		</td>
	</tr>`;
};

export default Lists;
