const hideModal = (wrapper = 'modalboxone')=>{
	setTimeout(() => {
		document.querySelector(`.${wrapper}`).classList.remove('show');
		document.body.style.overflow = 'scroll';
		//window.location.reload()
	  }, 1000);
}

export default hideModal