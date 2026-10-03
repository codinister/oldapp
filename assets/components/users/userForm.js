
import {
  textInput,
  radioButton,
  checkBox,
  passwordInput,
  phoneInput,
  emailInput,
} from '../utils/InputFields.js';
import Title from '../utils/Title.js';
import Role from './Role.js';
import getUsersLocalstorage from '../data/clientside/localstorage/GET/getUsersLocalstorage.js';
import saveUser from './saveUser.js';
import userSavebtn from './userSavebtn.js';

const userForm = () => {
  const us = getUsersLocalstorage();


  document.addEventListener('click', (e) => {



    if (e.target.matches('.saveuserbtn')) {
      e.stopImmediatePropagation()
      const obj = getUsersLocalstorage();
      const menus = Object.values(obj?.menus).filter(
        (v) => v.menu_id || v.usermenu_id
      );
      delete obj['menus'];
      delete obj['note'];
      delete obj['modified'];
      const users = obj;
      saveUser({ users, menus });
    }



  });

  return `    

    ${Title('User Details')}

    <div class="usersDetails">
        <div>
          ${textInput({
            type: 'text',
            classname: 'firstnamen us',
            name: 'firstname',
            required: true,
            label: 'First Name',
            value: us ? us?.firstname : '',
          })}
          ${textInput({
            type: 'text',
            classname: 'lastnamen us',
            name: 'lastname',
            required: true,
            label: 'Last Name',
            value: us ? us?.lastname : '',
          })}
          ${phoneInput({
            classname: 'phonen us',
            name: 'phone',
            value: us ? us?.phone : '',
            errorclass: 'phoneerr5',
          })}
          ${textInput({
            type: 'text',
            classname: 'residencen us',
            name: 'residence',
            required: true,
            label: 'Residence',
            value: us ? us?.residence : '',
          })}

          ${emailInput({
            classname: 'emailn us',
            name: 'email',
            value: us ? us?.email : '',
            errorclass: 'emailerr4',
          })}
        </div>
        <div>
          ${textInput({
            type: 'date',
            classname: 'hire_daten us',
            name: 'hire_date',
            required: true,
            label: 'Hire Date',
            value: us ? us?.hire_date : '',
          })}

          ${textInput({
            type: 'date',
            classname: 'birthdaten us',
            name: 'birthdate',
            required: true,
            label: 'Birthdate',
            value: us ? us.birthdate : '',
          })}
    
          ${textInput({
            type: 'text',
            classname: 'usernamen us',
            name: 'username',
            required: true,
            label: 'Username',
            value: us ? us?.username : '',
          })}
          ${passwordInput({
            classname: 'passwordn us',
            name: 'password',
            errorclass: 'passworderr6',
          })}


        </div>
    </div>


    ${Role(radioButton)}

    ${Title('User Previlleges')}

    <div class="addUserPrevileges">

    <div> 
        ${checkBox({
          classname: 'previllege salesinvoice uchk',
          labelname: 'Receive Payment',
          name: 'Salesinvoice',
          check: us?.menus?.Salesinvoice?.menu_id > 0 ? 'checked' : '',
        })}
        ${checkBox({
          classname: 'previllege productsn uchk',
          labelname: 'Products',
          name: 'Products',
          check: us?.menus?.Products?.menu_id > 0 ? 'checked' : '',
        })}

        ${checkBox({
          classname: 'previllege assignto uchk',
          labelname: 'Enable assign to',
          name: 'Assignto',
          check: us?.menus?.Assignto?.menu_id > 0 ? 'checked' : '',
        })}

    </div>
    <div> 
        ${checkBox({
          classname: 'previllege smsn uchk',
          labelname: 'Bulk SMS Page',
          name: 'SMS',
          check: us?.menus?.SMS?.menu_id > 0 ? 'checked' : '',
        })}
        ${checkBox({
          classname: 'previllege invoicedesc uchk',
          labelname: 'Activate invoice description field',
          name: 'Invoicedesc',
          check: us?.menus?.Invoicedesc?.menu_id > 0 ? 'checked' : '',
        })}
    </div>
    <div> 
      ${checkBox({
        classname: 'previllege addrowsbutton uchk',
        labelname: 'Activate add rows button',
        name: 'Addrowsbutton',
        check: us?.menus?.Addrowsbutton?.menu_id > 0 ? 'checked' : '',
      })}
      ${checkBox({
        classname: 'previllege unitprice uchk',
        labelname: 'Activate unit price field',
        name: 'Unitprice',
        check: us?.menus?.Unitprice?.menu_id > 0 ? 'checked' : '',
      })}
    </div>
 
  
    </div>
    <div class="saveuser-wrapper">
      ${userSavebtn()}
    </div>
    
    `;
};

export default userForm;
