const Success = (buttonText, outputClass, message, wrapper = 'modalboxone') => {
  setTimeout(() => {
    document.querySelector(`.${wrapper}`).classList.remove('show');
    document.body.style.overflow = 'scroll';
  }, 1000);

  return (document.querySelector(`.${outputClass}`).textContent = `
	SUCCESS: ${message}
	`);
};

export default Success;
