export const categoryHTMLList = (v, editClassName, deltClassName) => {
  return `<tr class="list-box">

		<td>
			<a href="javascript:void(0);"  class="prodcats">
			<span class="prodbycat" data-id="${v.cat_id}">${v.cat_name}</span> 
			</a>
		</td>

		<td>
		<span><i class="fa fa-lock"></i></span>
		</td>

	</tr>`;
};

export default categoryHTMLList