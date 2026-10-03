import getIndustry from '../../utils/getIndustry.js';
import { classSelector } from '../../utils/Selectors.js';
import { Tabs, tabContent, tabMenu } from '../../utils/Tabs.js';

const TabsSections = () => {
  const industry = getIndustry();

  const us = JSON.parse(localStorage.getItem('zsdf'));
  let proforma = industry === 'retails' ? 'Estimates' : 'Proforma';

  let tabMenuObj;

  if (industry === 'roofing company') {

    if(us?.role_id === '111' || us?.role_id === '1'){
    tabMenuObj = [
      { name: proforma, active: 'active', tabTarget: 'tab1' },
      { name: 'Sales Invoice', active: '', tabTarget: 'tab2' },
      { name: 'Receipt', active: '', tabTarget: 'tab3' },
      { name: 'Production', active: '', tabTarget: 'tab4' },
      { name: 'Waybill', active: '', tabTarget: 'tab5' },
    ];
  }



  else if(us?.role_id === '4'){
    tabMenuObj = [
      { name: proforma, active: 'active', tabTarget: 'tab1' },
      { name: 'Sales Invoice', active: '', tabTarget: 'tab2' },
      { name: 'Receipt', active: '', tabTarget: 'tab3' },
      { name: 'Production', active: '', tabTarget: 'tab4' },
    ];
  }
  else{
    tabMenuObj = [
      { name: proforma, active: 'active', tabTarget: 'tab1' },
      { name: 'Sales Invoice', active: '', tabTarget: 'tab2' },
      { name: 'Receipt', active: '', tabTarget: 'tab3' }
    ];
  }



  }
  else{
    tabMenuObj = [
      { name: proforma, active: 'active', tabTarget: 'tab1' },
      { name: 'Sales Invoice', active: '', tabTarget: 'tab2' },
      { name: 'Receipt', active: '', tabTarget: 'tab3' }
    ];
  }

  let tabContentObj = [
    {
      tab: `<div id="tab1" class="active hide-tab cuts-tabs proformainvoice">
      </div>`,
    },
    {
      tab: `<div id="tab2" class="hide-tab  cuts-tabs salesinvoice">
      </div>`,
    },
    {
      tab: `<div id="tab3" class="hide-tab  cuts-tabs receipts">
      </div>`,
    },
    {
      tab: `<div id="tab4" class="hide-tab  cuts-tabs production">
      </div>`,
    },
    {
      tab: `<div id="tab5" class="hide-tab  cuts-tabs waybills">
      </div>`,
    },
  ];

  if (classSelector('bottom-part-desktop')) {
    classSelector('bottom-part-desktop').innerHTML = Tabs(
      tabMenu(tabMenuObj),
      tabContent(tabContentObj)
    );
  }
};

export default TabsSections;
