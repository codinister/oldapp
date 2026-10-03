import { textInput } from '../utils/InputFields.js';

const TaxDetails = (sett) => {
  return `
      <div class="bg-white shadow-md rounded p-15 mb-4">
        <h6 class="mb-6">TAX</h6>
        <div class="flex flex-col sm:flex-row gap-12">
            <div class="flex-1">
                ${textInput({
                  type: 'text',
                  classname: 'vat sinpt',
                  name: 'vat',
                  required: false,
                  label: 'VAT',
                  value: sett ? sett?.vat : '',
                })}
                ${textInput({
                  type: 'text',
                  classname: 'nhil sinpt',
                  name: 'nhil',
                  required: false,
                  label: 'NHIL',
                  value: sett ? sett?.nhil : '',
                })}
            </div>
            <div class="flex-1">
                ${textInput({
                  type: 'text',
                  classname: 'getfund sinpt',
                  name: 'getfund',
                  required: false,
                  label: 'GETFUND',
                  value: sett ? sett?.getfund : '',
                })}

                ${textInput({
                  type: 'text',
                  classname: 'withholdingtax sinpt',
                  name: 'withholdingtax',
                  required: false,
                  label: 'Withholding Tax',
                  value: sett ? sett?.withholdingtax : '',
                })}
            </div>
            </div>
        </div>
  `;
};

export default TaxDetails;
