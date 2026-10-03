export const mobileCatHTMLlist = (v, editClassName, deltClassName) => {
  return `<ul class="mobile-list-box">
  			<li>
			<a href="javascript:void(0);"  class="prodcats">
			<span class="prodbycat" data-id="${v.cat_id}">${v.cat_name}</span> 
			</a>
			</li>
			<li>
			<i class="fa fa-pencil edit-prod-cat" data-cat_id="${v.cat_id}" data-cat_name = "${v.cat_name}"></i>
			</li>
		 </ul>`;
};

export default mobileCatHTMLlist