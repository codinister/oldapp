import {
  textInput,
  checkBox
} from '../utils/InputFields.js';

const SMSDetails = (sett) => {
  return `
  
      <div class="bg-white shadow-md rounded p-15 mb-4">
        <h6 class="mb-6">SMS</h6>
        <div class="flex flex-col sm:flex-row gap-12">
            <div class="flex-1">
                ${textInput({
                  type: 'text',
                  classname: 'sms_sender_id  sinpt',
                  name: 'sms_sender_id',
                  required: false,
                  label: 'Sender ID',
                  value: sett ? sett?.sms_sender_id : '',
                })}
                ${textInput({
                  type: 'password',
                  classname: 'sms_api_key  sinpt',
                  name: 'sms_api_key',
                  value: sett?.sms_api_key ? sett?.sms_api_key : '',
                  required: false,
                  label: 'API Key',
                  value: sett ? sett?.sms_api_key : '',
                })}
       
            </div>


            <div class="flex-1">

               ${checkBox({
                  classname: 'sinpt',
                  labelname: 'SMS Receipt alert',
                  name: 'activate_receipt_sms',
                  check: sett?.activate_receipt_sms === '1' ? 'checked' : '',
                })}

         
                  ${textInput({
                  type: 'text',
                  classname: 'sms_api_url sinpt',
                  name: 'sms_api_url',
                  required: false,
                  label: 'API Url',
                  value: sett ? sett?.sms_api_url : '',
                })}
              
     
            </div>

        </div>
        </div>

  `;
};

export default SMSDetails;
