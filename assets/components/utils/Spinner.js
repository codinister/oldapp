const Spinner = (outputClass) => {
  return (document.querySelector(`.${outputClass}`).innerHTML = `
	<i class="fa fa-spinner fa-spin"></i>
	`);
};

export default Spinner;
