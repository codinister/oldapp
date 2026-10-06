import { checkBox, textInput } from '../utils/InputFields.js';
import AccessControlsInputs from './components/AccessControlsInputs.js';
import notificationsInputs from './utils/notificationsInputs.js';

const AccessControls = (data) => {
  return `
      <div class="bg-white shadow-md rounded p-15 mb-4 mt-10">

        <h6 class="mb-6">Access Controls</h6>


        <div class="flex gap-6">
          <div>
          <h4 class="my-6">ADMIN</h4>
            ${AccessControlsInputs({
              role: 'admin',
              data: '',
            })}
          </div>
          <div>
             <h4 class="my-6">USER</h4>
            ${AccessControlsInputs({
              role: 'user',
              data: '',
            })}
          </div>
        </div>

        <div class="flex gap-6">
          <div>
          <h4 class="my-6">CASHIER</h4>
            ${AccessControlsInputs({
              role: 'admin',
              data: '',
            })}
          </div>
          <div>
            <h4 class="my-6">
             INVENTORY MANAGER
            </h4>
            ${AccessControlsInputs({
              role: 'user',
              data: '',
            })}
          </div>
        </div>

        
        </div>

  `;
};

export default AccessControls;
