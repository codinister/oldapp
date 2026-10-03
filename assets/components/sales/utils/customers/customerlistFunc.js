import deleteAccessControl from '../deleteAccessControl.js';

const customerlistFunc = (v,desc) => {


  return `
  <tr class="cust-list-box">

  <td class="custfullnamebx">
    <a href="javascript:void(0);" 
    data-cust_id="${v.cust_id}" 
    data-fullname = "${v.fullname}"
    data-phone = "${v.phone}"
    data-email = "${v.email}"
        data-ref_type = "${v.ref_type}"
    data-location = "${v.location}"
    data-description = "${v.description}"
    data-type = "${v.type}"
    data-desc="${desc}"
    data-user_id = "${v.user_id}"
    class="displaycustdetails" title= "Assigned to: ${v.firstname} ${
    v.lastname
  }">
    ${v.fullname}
    </a>
  </td>


  <td>
  <a href="javascript:void(0);">
  <i class="fa fa-pencil editcust"
    data-cust_id="${v.cust_id}" 
    data-fullname = "${v.fullname}"
    data-phone = "${v.phone}"
    data-email = "${v.email}"
        data-type = "${v.type}"
    data-ref_type = "${v.ref_type}"
    data-location = "${v.location}"
    data-debt = "${v.debt}"
  ></i>
  </a>
  </td>

  <td>
  <a href="javascript:void(0);">
  ${deleteAccessControl(
    `<i class="fa fa-trash delt-cust"  
    data-cust_id="${v.cust_id}" 
    data-fullname = "${v.fullname}"
    ></i>`, v.user_id
  )}
  </a>
  </td>


</tr>`;
};

export default customerlistFunc;
