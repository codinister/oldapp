const Buttons = (obj) => {
  return `
	<div class="mb-1 flex top-btns">
	${Object.values(obj)
    .map(
      (v) => `
		<button class="submitbtn ${v.btnclass}">
		${v.btnname} <span class="${v.btnclass}spin"></span>
		</button>`
    )
    .join('')}
	</div>
	`;
};

export default Buttons;
