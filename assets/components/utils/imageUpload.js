import { classSelector } from './Selectors.js';

const imageUpload = (imgclass, inptclass) => {
  document.addEventListener('change', (e) => {
    if (e.target.matches(`.${inptclass}`)) {
      const inpt = classSelector(inptclass);
      const img = classSelector(imgclass);
      const fr = new FileReader();

      if (inpt.files && inpt.files[0]) {
        fr.onload = function (e) {
          img.setAttribute('src', e.target.result);

          classSelector(
            'prod-img-preview'
          ).innerHTML = `<img src="${e.target.result}" alt="" />`;
        };
      }

      fr.readAsDataURL(inpt.files[0]);
    }
  });

  return `
  <div class="imgupload-wrapper">
	<label id="${inptclass}" class="imageupload">
		Upload Image
		<input type="file" id="${inptclass}" class="${inptclass}" />
	</label>
	<div>
		<img src="" alt="" class="${imgclass}" />
	</div>
	</div>
	`;
};

export default imageUpload;
