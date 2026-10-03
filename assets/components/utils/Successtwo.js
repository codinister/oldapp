const Successtwo = (buttonText, outputClass, message) => {
  setTimeout(() => {
    document.querySelector(`.${outputClass}`).textContent = buttonText;
  }, 1000);

  return (document.querySelector(`.${outputClass}`).textContent = `
	SUCCESS: ${message}
	`);
};

export default Successtwo;
