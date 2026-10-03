const DetailsBox = (detailbx1, detailbx2) => {
  return `
	<div class="bgwhite mb-2 flex detailsbox">
		<div class="p-2 col-300 ${detailbx1}"></div>
		<div class="p-2  col-300 ${detailbx2}"></div>
	</div>
	`;
};

export default DetailsBox;
