export const categoryHTMLList = (v, editClassName, deltClassName) => {
  return `<tr class="list-box">

  			<td>
			<a href="javascript:void(0);"  class="prodcats">
			<span class="prodbycat" data-id="${v.cat_id}">${v.cat_name}</span> 
			</a>
			</td>

			<td>
			<i class="fa fa-pencil edit-prod-cat" data-cat_id="${v.cat_id}" data-cat_name = "${v.cat_name}"></i>
			</td>

		 </tr>`;
};

export default categoryHTMLList