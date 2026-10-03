
const Error = (outputClass, message, buttonText) => {
  setTimeout(() => {
    document.querySelector(`.${outputClass}`).innerHTML = buttonText;
  }, 4000);
  return (document.querySelector(`.${outputClass}`).innerHTML = `
	ERROR: ${message}
	`);
};

export default Error;
