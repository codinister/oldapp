import {
  textInput
} from '../utils/InputFields.js';

const BankDetails = (sett) => {
  return `
        <div class="bg-white shadow-md rounded p-15 mb-4">
          <h6 class="mb-6">Bank Details</h6>
          <div class="flex flex-col sm:flex-row gap-12">
              <div class="flex-1">
                  ${textInput({
                    type: 'text',
                    classname: 'comp_bank sinpt',
                    name: 'comp_bank',
                    required: false,
                    label: 'Bank',
                    value: sett ? sett?.comp_bank    : '',
                  })}
                  ${textInput({
                    type: 'text',
                    classname: 'bank_acc sinpt',
                    name: 'bank_acc',
                    required: false,
                    label: 'Account Number',
                    value: sett ? sett?.bank_acc : '',
                  })}
              
              </div>
              <div class="flex-1">
                  ${textInput({
                    type: 'text',
                    classname: 'acc_name sinpt',
                    name: 'acc_name',
                    required: false,
                    label: 'Account Name',
                    value: sett ? sett?.acc_name : '',
                  })}
              </div>
              </div>
          </div>
  `
}

export default BankDetails