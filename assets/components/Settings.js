import getIndustry from './utils/getIndustry.js';
import SettingsHeader from './settings/SettingsHeader.js';
import SettingsFileUpload from './settings/SettingsFileUpload.js';
import CompanyDetails from './settings/CompanyDetails.js';
import TermsCondition from './settings/TermsCondition.js';
import BankDetails from './settings/BankDetails.js';
import SMSDetails from './settings/SMSDetails.js';
import TaxDetails from './settings/TaxDetails.js';
import Other from './settings/Other.js';
import ReceiptType from './settings/ReceiptType.js';
import settingsDuration from './settings/utils/settingsDuration.js';
import settingsEvents from './settings/events/settingsEvents.js';
import setPage from './utils/setPage.js';
import Notifications from './settings/Notifications.js';
import rerender from './utils/rerender.js';
import Button from './utils/v2/Button.js';

const Settings = () => {
  const sett = JSON.parse(localStorage.getItem('sinpt'));

  const industry = getIndustry();

  if (!sett && !industry) {
    return console.error('Settings and Industry required ');
  }

  settingsEvents(sett);

  const duration = settingsDuration(industry);
  const page = `
      <div class="cont">
        ${SettingsHeader(sett)}
        ${CompanyDetails(sett)}
        ${TermsCondition()}
        ${BankDetails(sett)}
        ${SMSDetails(sett)}
        ${TaxDetails(sett)}
        ${Notifications(sett)}
        ${Other(duration)}
        ${ReceiptType(sett)}

        <div>
          <a href="javascript:void(0);" class="save_setting">
            ${Button({
              className: 'save_setting',
              buttonName: 'SAVE SETTING',
            })}
          </a>
        </div>


      </div>
    `;

  setPage('settings', page);

  //CKEDITOR INSTANCE
  CKEDITOR.replace('comp_terms', {
    height: '300px',
  });
};

rerender(Settings, 2);

export default Settings;
