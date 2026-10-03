import reminderBox from './reminderBox.js';

const bellIcon = () => {
  return `
  <div class="bellicon">
  <i class="fa fa-bell text-success"></i>
  ${reminderBox()}
  </div>
  `;
};

export default bellIcon;
