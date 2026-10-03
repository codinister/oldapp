import { checkBox, textInput } from '../../utils/InputFields.js';

const notificationsInputs = (sett) => {
  if (!sett) return 'Seetings data not available!';

  return `<br /> ${textInput({
    type: 'phone',
    classname: 'sinpt exp_reminder_phone',
    name: 'exp_reminder_phone',
    required: true,
    label: 'Phone number to receive notifications',
    value: sett ? sett?.exp_reminder_phone : '',
  })}

      <div class="mt-8">
        <strong>Choose notifications type</strong>
          <div>
            ${checkBox({
              classname: 'sinpt daily_sales_report_alert',
              labelname: 'Daily sales report',
              name: 'daily_sales_report_alert',
              check: sett?.daily_sales_report_alert === '1' ? 'checked' : '',
            })}

            ${checkBox({
              classname: 'sinpt customers_who_owe_alert',
              labelname: 'Customers who owe',
              name: 'customers_who_owe_alert',
              check: sett?.customers_who_owe_alert === '1' ? 'checked' : '',
            })}

            ${checkBox({
              classname: 'sinpt low_stocks_alert',
              labelname: 'Low stocks alert',
              name: 'low_stocks_alert',
              check: sett?.low_stocks_alert === '1' ? 'checked' : '',
            })}

            ${checkBox({
              classname: 'sinpt exp_rentals_alert',
              labelname: 'Expiring rentals alert',
              name: 'exp_rentals_alert',
              check: sett?.exp_rentals_alert === '1' ? 'checked' : '',
            })}

      
             
            </div>
            </div>

`;
};

export default notificationsInputs;
