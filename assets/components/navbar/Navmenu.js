import getIndustry from '../utils/getIndustry.js'
import getSettingLocalstorage from '../data/clientside/localstorage/GET/getSettingLocalstorage.js';
import getLoginuser from '../data/clientside/localstorage/GET/getLoginuser.js';
import Hamburger from './components/Hamburger.js';

import ExpiryNotifications from './components/ExpiryNotifications.js'
import AccountProfile from './components/AccountProfile.js'


const Navmenu = () => {


  const industry = getIndustry();
  const sett = getSettingLocalstorage();
  const user = getLoginuser();


  return `
  <nav class="w-full bg-white shadow-sm z-20 fixed">
    <div class="cont py-3 flex items-center justify-between">

    <div class="flex gap-6">
      <div>
      ${Hamburger(user)}
      </div>
      <div>
        <h6>${sett?.comp_name}</h6>
      </div>
    </div>


    <div class="flex gap-10 items-center flex-row">
      ${ExpiryNotifications()}
      ${AccountProfile(user)}
    </div>

    </div>
  </nav>
  `

}

export default Navmenu