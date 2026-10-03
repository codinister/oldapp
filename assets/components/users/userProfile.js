import userReducer from '../data/clientside/reducers/userReducer.js';
import {
  textInput,
  dateInput,
  passwordInput,
  phoneInput,
  emailInput,
} from '../utils/InputFields.js';
import { ymd } from '../utils/DateFormats.js';
import Buttons from '../utils/Buttons.js';
import getLoginuser from '../data/clientside/localstorage/GET/getLoginuser.js';
import displayToast from '../utils/displayToast.js';
import { classSelector } from '../utils/Selectors.js';

const userProfile = () => {
  const user = getLoginuser();

  document.addEventListener('input', (e) => {
    userReducer(e);
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.saveprofile')) {
      const obj = JSON.parse(localStorage.getItem('userprofile'));

      if (!obj) {
        return displayToast('bgdanger', 'No changes made');
      }

      const uploadprofimg = classSelector('uploadprofimg');
      const uploadsig = classSelector('uploadsig');

      let photo = [];
      if (uploadprofimg.files && uploadprofimg.files[0]) {
        photo = uploadprofimg.files[0];
      }

      let signature = [];
      if (uploadsig.files && uploadsig.files[0]) {
        signature = uploadsig.files[0];
      }

      const fd = new FormData();
      fd.append('user', JSON.stringify(obj));
      fd.append('photo', photo);
      fd.append('signature', signature);

      fetch('router.php?controller=user&task=update_profile', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
          } else {
            const user = JSON.parse(localStorage.getItem('zsdf'));

            const res = data.split('-');
            const photo = res[1];
            const signature = res[2];

            user['firstname'] = obj?.firstname;
            user['lastname'] = obj?.lastname;
            user['email'] = obj?.email;
            user['phone'] = obj?.phone;
            user['birthdate'] = obj?.birthdate;
            user['residence'] = obj?.residence;
            user['photo'] = photo;
            user['signature'] = signature;

            localStorage.setItem('zsdf', JSON.stringify(user));

            displayToast('lightgreen', res[0]);
            localStorage.removeItem('userprofile');
          }
        })
        .catch((err) => console.log(err));
    }
  });

  return `
      <div class="profileformbox">

      <div class="close-profile">
        <a href="javascript:void(0)" title="Close" class="close-profile-box">X</a>
      </div>
      <div>

          <div>  
            ${textInput({
              type: 'text',
              classname: 'userprof',
              required: true,
              label: 'First Name',
              name: 'firstname',
              value: user?.firstname,
            })}

            ${phoneInput({
              classname: 'userprof',
              name: 'phone',
              value: user ? user?.phone : '',
              errorclass: 'phoneerr1',
            })}

            ${textInput({
              type: 'text',
              classname: 'userprof',
              required: true,
              label: 'Residence',
              name: 'residence',
              value: user?.residence,
            })}
            ${passwordInput({
              classname: 'passwordn userprof',
              name: 'password',
              errorclass: 'passworderr1',
            })}

          </div>
          <div>

          ${textInput({
            type: 'text',
            classname: 'userprof',
            required: true,
            label: 'Last Name',
            name: 'lastname',
            value: user?.lastname,
          })}

        ${emailInput({
          classname: 'userprof',
          name: 'email',
          value: user?.email,
          errorclass: 'emailerr1',
        })}

  
            ${dateInput({
              classname: 'userprof',
              required: true,
              label: 'Birth Date',
              name: 'birthdate',
              value: ymd(user?.birthdate),
            })}


            <div class="profile-upload-bx">

            <label>
              <div class="upload-div-box">
                <div>Profile</div>
                <div>
                <img src="assets/uploads/${
                  user ? user?.photo : ''
                }" alt="" class="pimg" />
                </div>
              </div>
              <input type="file" class="uploadprofimg" />
            </label>

            <label title="80px x 30px">
            <div class="upload-div-box">
              <div>Signature</div>
              <div>
              <img src="assets/uploads/${
                user ? user?.signature : ''
              }" alt="" class="simg" />
              </div>
              </div>
              <input type="file" class="uploadsig" />

            </label>
            </div>
          </div>
          </div>
          <div>
          ${Buttons([
            {
              btnclass: 'saveprofile',
              btnname: 'SAVE PROFILE',
            },
          ])}
          </div>
      </div>`;
};
export default userProfile;
