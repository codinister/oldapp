import setInputValue from '../utils/setInputValue.js';
import format_number from '../../utils/format_number.js';
import { textInput } from '../../utils/InputFields.js';
import getIndustry from '../../utils/getIndustry.js';

const othercharges = (vv) => {
  const industry = getIndustry();

  let invoice_desc = '';

  if (industry === 'roofing company') {
    invoice_desc = `${textInput({
      type: 'text',
      classname: 'profile trans',
      required: true,
      name: 'profile',
      label: 'Profile',
      value: setInputValue(vv?.profile || ''),
    })}`;
  }

  return `
    <div>
    ${invoice_desc}
      ${textInput({
        type: 'text',
        classname: 'location trans',
        required: true,
        name: 'location',
        label: 'Site Location',
        value: setInputValue(vv?.location || ''),
      })}

      ${textInput({
        type: 'number',
        classname: 'transportation trans',
        required: false,
        label: 'Transportation',
        name: 'transportation',
        value: setInputValue(vv?.transportation || ''),
      })}
        ${textInput({
          type: 'number',
          classname: 'installation trans',
          required: false,
          label: 'Installation',
          name: 'installation',
          value: setInputValue(vv?.installation || ''),
        })}
      </div>
  `;
};

export default othercharges;
