
import Button from '../../utils/v2/Button.js';
import AccessControlsInputs from './AccessControlsInputs.js';


const AccessControlsLayout = (data) => {
  return `
      <div class="bg-white shadow-md rounded p-15 mb-4">

        <h6 class="mb-6">Access Controls</h6>


        <div class="flex gap-6 mb-20">
          <div class="flex-1 border-r border-r-black">
          <h6 class="my-6">ADMIN</h6>
            ${AccessControlsInputs({
              role: 'admin',
              data: '',
            })}
          </div>
          <div class="flex-1">
             <h6 class="my-6">USER</h6>
            ${AccessControlsInputs({
              role: 'user',
              data: '',
            })}
          </div>
        </div>

        <div class="flex gap-6">
          <div class="flex-1 border-r border-r-black">
          <h6 class="my-6">CASHIER</h6>
            ${AccessControlsInputs({
              role: 'admin',
              data: '',
            })}
          </div>
          <div class="flex-1">
            <h6 class="my-6">
             INVENTORY MANAGER
            </h6>
            ${AccessControlsInputs({
              role: 'user',
              data: '',
            })}
          </div>
        </div>

            <div>
            ${Button({
              className: 'save_setting',
              buttonName: 'SAVE SETTING',
            })}
        </div>
        </div>

  `;
};

export default AccessControlsLayout
