import { formatDate } from '../utils/DateFormats.js';
const onclickDisplayAsingleUser = ({ ...v }) => {
  return `<ul>
    <li> 
        <ul class="userdetailsbox">
            <li><i class="fa fa-user text-muted"></i> Fullname:</li> 
            <li>${v?.firstname} ${v?.lastname}</li>
        </ul>
    </li>

    <li> 
        <ul class="userdetailsbox">
            <li><i class="fa fa-calendar text-muted"></i> Hire Date:</li> 
            <li>${
              v.hire_date.split('-')[0] === '0000'
                ? ''
                : formatDate(v.hire_date)
            }</li>
        </ul>
    </li>

    <li> 
        <ul class="userdetailsbox">
            <li><i class="fa fa-home text-muted"></i> Residence:</li> 
            <li>${v?.residence}</li>
        </ul>
    </li>

    <li> 
        <ul class="userdetailsbox">
            <li><i class="fa fa-phone text-muted"></i> Phone:</li> 
            <li>${v?.phone}</li>
        </ul>
    </li>

</ul>`;
};

export default onclickDisplayAsingleUser;
