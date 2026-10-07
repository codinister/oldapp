import rerender from './utils/rerender.js';
import AccessControlsLayout from './accesscontrol/components/AccessControlsLayout.js';
import Layout from './Layout.js';

const AccessControl = () => {
  const page = `
      <div class="cont">
        ${AccessControlsLayout([])}
      </div>
      
    `;

  Layout(page);
};

rerender(AccessControl, 2);

export default AccessControl;
