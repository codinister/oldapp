import { checkBox, textInput } from '../utils/InputFields.js';
import notificationsInputs from './utils/notificationsInputs.js';

const Notifications = (sett) => {
  const arr = [
    sett.daily_sales_report_alert === '0' ? '' : 1,
    sett.customers_who_owe_alert === '0' ? '' : 1,
    sett.low_stocks_alert === '0' ? '' : 1,
    sett.exp_rentals_alert === '0' ? '' : 1,
  ].filter(Boolean);


  return `
      <div class="bg-white shadow-md rounded p-15 mb-4">
        <h6 class="mb-6">Notifications</h6>
        <div class="flex flex-col sm:flex-row gap-12">

            <div class="flex-1">
              
              ${textInput({
                type: 'number',
                classname: 'exp_limit sinpt',
                name: 'exp_limit',
                required: false,
                label: 'Expiry limit',
                value: sett ? sett?.exp_limit : '',
              })}

              ${textInput({
                type: 'number',
                classname: 'stock_limit sinpt',
                name: 'stock_limit',
                required: false,
                label: 'Stock Limit',
                value: sett ? sett?.stock_limit : '',
              })}

            </div>
  
            <div class="flex-1">
             
                ${checkBox({
                  classname: 'sinpt dailyreport',
                  labelname: 'Daily report',
                  name: 'dailyreport',
                  check: arr.length > 0 ? 'checked' : '',
                })}
                <div class="mini-report-phone">
                ${arr.length > 0 ? notificationsInputs(sett) : ''}
                </div>
            </div>
        </div>
        </div>

  `;
};

export default Notifications;
