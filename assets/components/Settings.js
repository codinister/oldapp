import getIndustry from './utils/getIndustry.js';
import SettingsHeader from './settings/SettingsHeader.js';
import CompanyDetails from './settings/CompanyDetails.js';
import TermsCondition from './settings/TermsCondition.js';
import BankDetails from './settings/BankDetails.js';
import SMSDetails from './settings/SMSDetails.js';
import TaxDetails from './settings/TaxDetails.js';
import Other from './settings/Other.js';
import ReceiptType from './settings/ReceiptType.js';
import settingsDuration from './settings/utils/settingsDuration.js';
import settingsEvents from './settings/events/settingsEvents.js';
import Notifications from './settings/Notifications.js';
import rerender from './utils/rerender.js';
import Layout from './Layout.js';

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
      </div>
      
    `;

    Layout(page)

  CKEDITOR.replace('comp_terms', {
    height: '300px',
  })

};



rerender(Settings, 2);

export default Settings;
