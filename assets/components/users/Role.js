import getUsersLocalstorage from '../data/clientside/localstorage/GET/getUsersLocalstorage.js';

const Role = (radioButton) => {
  const us = getUsersLocalstorage();

  return `
    <div class="role">

    <div>
    <div class="checkinpt-wrapper">
        <h6>User Roles</h6>
    <div>
    ${radioButton({
      labelname: 'Admin',
      name: 'role_id',
      check: us?.role_id === '1' ? 'checked' : '',
      value: 1,
      cls: 'admin uf',
      id: 'admin',
    })}
    ${radioButton({
      labelname: 'User',
      name: 'role_id',
      check: us ? (us?.role_id === '2' ? 'checked' : '') : 'checked',
      value: 2,
      cls: 'user uf',
      id: 'user',
    })}
    ${radioButton({
      labelname: 'Marketer',
      name: 'role_id',
      check: us?.role_id === '3' ? 'checked' : '',
      value: 3,
      cls: 'marketer uf',
      id: 'marketer',
    })}
    ${radioButton({
      labelname: 'Inventory Manager',
      name: 'role_id',
      check: us?.role_id === '4' ? 'checked' : '',
      value: 4,
      cls: 'inventory uf',
      id: 'inventory',
    })}
    ${radioButton({
      labelname: 'Cashier',
      name: 'role_id',
      check: us?.role_id === '5' ? 'checked' : '',
      value: 5,
      cls: 'cashier uf',
      id: 'cashier',
    })}

    </div>
    </div>
    </div>
    <div>

    <div class="checkinpt-wrapper">
    <h6>Block/Unblock User</h6>
    <div>
    ${radioButton({
      labelname: 'Block',
      name: 'blockunblock',
      check: us?.status === 'Block' ? 'checked' : '',
      value: 'Block',
      cls: 'block st',
      id: 'cashier',
    })}
    ${radioButton({
      labelname: 'Unblock',
      name: 'blockunblock',
      check: us ? (us?.status === 'Unblock' ? 'checked' : '') : 'checked',
      value: 'Unblock',
      cls: 'unblock st',
      id: 'cashier',
    })}
    </div>
    </div>
    </div>

    
    </div>
    `;
};

export default Role;
