import Dashboard from '../../Dashboard.js';
import Pos from '../../Pos.js';
import Products from '../../Products.js';
import Settings from '../../Settings.js';
import Sms from '../../SMS.js';
import Users from '../../Users.js';
import Login from '../../Login.js';
import innerHTML from '../../utils/v2/innerHTML.js';
import Logout from '../../Logout.js';
import AccessControl from '../../AccessControl.js';
import removeItems from '../../logout/utils/removeItems.js';

const searchParam = () => {
  const p = new URLSearchParams(window.location.search);
  const page = p.get('page');

  const pages = {
    settings: Settings,
    dashboard: Dashboard,
    products: Products,
    sales: Pos,
    sms: Sms,
    users: Users,
    logout: Logout, 
    accesscontrol: AccessControl
  };

  if (pages[page]) {
    pages[page]();
  } else {
  removeItems();
   
    innerHTML({
      data: Login(),
      outputClass: 'root',
    });


 
  }
};

export default searchParam;
