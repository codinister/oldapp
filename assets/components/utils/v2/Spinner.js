import innerHTML from "./innerHTML.js";

const Spinner = (className, content='') => {
  innerHTML({
    data: content ? content : `<i class="fa fa-spinner fa-spin"></i>`,
    outputClass: className,
  });
};

export default Spinner;
