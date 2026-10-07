import { radioButton } from '../utils/InputFields.js';
import Button from '../utils/v2/Button.js';

const ReceiptType = (sett) => {
  return `
        <div class="bg-white shadow-md rounded px-15 mb-4 py-6">
        <h6 class="mb-6">Receipt Type</h6>
        <div class="flex flex-col sm:flex-row gap-12">
            <div class="flex-1">
                ${radioButton({
                  labelname: 'A5',
                  name: 'receipt_type',
                  check: sett?.receipt_type === 'A5' ? 'checked' : '',
                  value: 'A5',
                  cls: 'sinpt',
                })}
            </div>
            <div class="flex-1">
                ${radioButton({
                  labelname: 'Thermnal paper',
                  name: 'receipt_type',
                  check: sett?.receipt_type === 'THERMNAL' ? 'checked' : '',
                  value: 'THERMNAL',
                  cls: 'sinpt',
                })}
            </div>
            </div>
        </div>
    
        <div>
            ${Button({
              className: 'save_setting',
              buttonName: 'SAVE SETTING',
            })}
        </div>
  `;
};

export default ReceiptType;
