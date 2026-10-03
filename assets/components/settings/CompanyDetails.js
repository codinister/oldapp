import { textInput, emailInput } from '../utils/InputFields.js';

const CompanyDetails = (sett) => {
  if (!sett) return console.error('Settings data is not available');

  return `
      <div class="bg-white shadow-md rounded p-15 mb-4">
        <h6 class="mb-6">Company Details</h6>
        <div class="flex flex-col sm:flex-row gap-12">
            <div class="flex-1">
                ${textInput({
                  type: 'text',
                  classname: 'comp_name sinpt',
                  name: 'comp_name',
                  required: true,
                  label: 'Company Name',
                  value: sett ? sett?.comp_name : '',
                })}
                ${textInput({
                  type: 'text',
                  classname: 'comp_addr sinpt',
                  name: 'comp_addr',
                  required: true,
                  label: 'Company Address',
                  value: sett ? sett?.comp_addr : '',
                })}

                ${textInput({
                    type: 'text',
                    classname: 'comp_location sinpt',
                    name: 'comp_location',
                    required: true,
                    label: 'Company Location',
                    value: sett ? sett?.comp_location : '',
                })}

              
      </div>

        <div class="flex-1">
    
            ${textInput({
              type: 'text',
              classname: 'comp_phone sinpt',
              name: 'comp_phone',
              required: true,
              label: 'Phone',
              value: sett ? sett?.comp_phone : '',
            })}
       
            ${textInput({
              type: 'text',
              classname: 'digitaladdress sinpt',
              name: 'digitaladdress',
              required: true,
              label: 'Digital address',
              value: sett ? sett?.digitaladdress : '',
            })}

            ${textInput({
              type: 'email',
              classname: 'sinpt comp_email',
              name: 'comp_email',
              label: 'Email',
              value: sett ? sett?.comp_email : '',
            })}

            ${textInput({
              type: 'text',
              classname: 'comp_website sinpt',
              name: 'comp_website',
              required: false,
              label: 'Company Website',
              value: sett ? sett?.comp_website : '',
            })}
            </div>
            </div>
        </div>
  `;
};

export default CompanyDetails;
