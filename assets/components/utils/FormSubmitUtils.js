const FormSubmitUtils = () => {
  const idSelector = (str) => {
    return document.getElementById(str);
  };

  const classSelector = (str) => {
    return document.querySelector(`.${str}`);
  };

  const FileuploadPreview = (e, elem) => {
    const fr = new FileReader();
    fr.onload = (e) =>
      document.getElementById(`${elem}`).setAttribute('src', e.target.result);
    fr.readAsDataURL(e.target.files[0]);
  };

  const FileuploadAutosave = (obj) => {
    const { e, controller, task, filename, file } = obj;

    if (e.target.files || e.target.files[0]) {
      let fd = new FormData();

      fd.append('controller', controller);
      fd.append('task', task);
      fd.append(`${file}`, document.getElementById(`${filename}`).files[0]);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'router.php', true);
      xhr.onload = function () {
        if (this.status !== 200) {
          console.log(this.responseText);
        }
      };
      xhr.send(fd);
    }
  };

  // Loader(result)
  // ErrorResult(result,data)
  // SuccessResult(result,data)

  const Loader = (result) => {
    return (document.querySelector(`.${result}`).innerHTML = `
		<i class="fa fa-spinner fa-spin"></i>`);
  };

  const ErrorResult = (result, data) => {
    document.querySelector(`.${result}`).innerHTML = `
		<div class="bgdanger text-white  lwarning p-1 b-radius-1 f-size-3">
		<strong>Warning!</strong> ${data}
		</div>
		`;
    setTimeout(function () {
      document.querySelector(`.${result}`).innerHTML = null;
    }, 3000);
  };

  const SuccessResult = (result, data) => {
    document.querySelector(`.${result}`).innerHTML = `
		<div class="alert alert-success   lwarning">
		<strong>Success!</strong> ${data}
		</div>
		`;
    setTimeout(function () {
      document.querySelector(`.${result}`).innerHTML = null;
    }, 3000);
  };

  const FormSubmit = async (obj, callback) => {
    /* How to use this function
			const obj = {
				inpts: {

				},
				controller: 'Login',
				task: 'signin'
			}
			FormSubmitXHR(obj, ({success,data})=>{
				if(!success) return ErrorResult(result,data)
				else SuccessResult(result,data)
			})
			*/

    //Check if data is an Object
    if (!Object.keys(obj)) return console.error('Provid a data Object');

    //Get data Object
    const { inpts, controller, task } = obj;

    try {
      const fd = new FormData();

      fd.append('data', JSON.stringify(inpts));
      fd.append('controller', controller);
      fd.append('task', task);

      const fch = await fetch('router.php', {
        method: 'Post',
        body: new URLSearchParams(fd),
      });

      //Check if fetch result is a string or json
      const res = await fch.text();

      const err = res.indexOf('errors');
      if (err != -1) {
        return callback({ success: false, data: res });
      } else {
        return callback({ success: true, data: res });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const FormSubmitXHR = async (obj, callback) => {
    /* How to use this function
			const obj = {
				inpts: {

				},
				controller: 'Login',
				task: 'signin',
				photo: {}
			}
			FormSubmitXHR(obj, ({success,data})=>{
				if(!success) return ErrorResult(result,data)
				else SuccessResult(result,data)
			})
		*/

    //Check if data is an Object
    if (!Object.keys(obj)) return console.error('Provid a data Object');

    try {
      const fd = new FormData();
      fd.append('controller', obj.controller);
      fd.append('task', obj.task);
      fd.append('photo', obj.photo);
      fd.append('data', JSON.stringify(obj.inpts));

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'router.php', true);
      xhr.onload = function () {
        if (this.status == 200) {
          const err = this.responseText.indexOf('errors');
          if (err != -1) {
            return callback({ success: false, data: this.responseText });
          } else {
            return callback({ success: true, data: this.responseText });
          }
        }
      };
      xhr.send(fd);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    Loader,
    FormSubmit,
    ErrorResult,
    SuccessResult,
    FileuploadPreview,
    FileuploadAutosave,
    idSelector,
    classSelector,
    FormSubmitXHR,
  };
};

export default FormSubmitUtils;
