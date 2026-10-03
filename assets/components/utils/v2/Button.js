

// Button({
// 	className: '', 
// 	buttonName: ''
// })
const Button = ({...options}) => {
	const {className, buttonName} = options

  return `
	<button class="mt-6 ${className} bg-blue-600 hover:bg-blue-800 text-white cursor-pointer font-bold py-2 px-4 rounded" type="button">
  ${buttonName} 
  </button>
	`;
};

export default Button;
