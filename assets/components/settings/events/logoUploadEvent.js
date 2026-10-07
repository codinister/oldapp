import { classSelector } from '../../utils/Selectors.js';
import postMethod from '../../utils/v2/postMethod.js';
import Spinner from '../../utils/v2/Spinner.js';
import { successMessage, warningMessage } from '../../utils/v2/modal.js';
import {
  removeDisabledAttribute,
  setDisabledAttribute,
} from '../../utils/v2/attributes.js';
const logoUploadEvent = () => {
  document.addEventListener('change', (e) => {
    //Logo File upload
    if (e.target.matches('.comp_logo')) {
      if (e.target.files && e.target.files[0]) {
        const fr = new FileReader();

        fr.onload = function (e) {
          const res = e.target.result;
          classSelector('logoimg').setAttribute('src', res);
        };

        fr.readAsDataURL(e.target.files[0]);
      }

      //Save Logo

      let logo = [];
      if (
        classSelector('comp_logo').files &&
        classSelector('comp_logo').files[0]
      ) {
        logo = classSelector('comp_logo').files[0];
      }

      postMethod({
        inputs: [
          {
            comp_logo: logo,
          },
        ],
        controller: 'settings',
        task: 'update_logo',
        callback: (data) => {
          console.log(data);
          if (data.indexOf('errors') != -1) {
            warningMessage({
              title: 'Error Message',
              sub_title: data,
            });
          } else {
            const obj = JSON.parse(localStorage.getItem('sinpt'));
            obj['comp_logo'] = data;

            localStorage.setItem('sinpt', JSON.stringify(obj));
            successMessage({
              title: 'Logo Uploaded',
              sub_title: 'Logo has been uploaded successfully',
            });
          }
        },
      });
    }
  });
};

export default logoUploadEvent;
