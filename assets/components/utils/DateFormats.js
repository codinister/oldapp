/*############################# 
    * Y-m-d Date Format
#############################*/
function ymd(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = month < 10 ? '0' + month : month;
  const dy = day < 10 ? '0' + day : day;
  return `${year}-${mnt}-${dy}`;
}

function dmy(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = month < 10 ? '0' + month : month;
  const dy = day < 10 ? '0' + day : day;
  return `${dy}-${mnt}-${year}`;
}

function ymdslash(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = month < 10 ? '0' + month : month;
  const dy = day < 10 ? '0' + day : day;
  return `${mnt}/${dy}/${year}`;
}

function ym(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const mnt = month < 10 ? '0' + month : month;
  return `${year}-${mnt}`;
}

function formatDate(dateObject) {
  const d = new Date(dateObject);
  const day = d.getDate();
  const months = d.getMonth();
  const mnth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = mnth[months];
  const year = d.getFullYear();
  const days = day < 10 ? '0' + day : day;
  const monthx = Number(month) < 10 ? '0' + month : month;
  const date = days + ' ' + monthx + ' ' + year;
  return date;
}


const year = (date) => {
  const dt = new Date(date);
  return dt.getFullYear();
};

const month = (date) => {
  const dt = new Date(date);
  return dt.getMonth()+1;
};

function formatMonth(m) {
  const d = new Date(m);
  const months = d.getMonth();
  const mnth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = mnth[months];
  return month;
}

function daysleft(cdate, fdate) {
  const futuredate = new Date(fdate);
  const curdate = new Date(cdate);
  const newdate = futuredate.getTime() - curdate.getTime();
  const days = Math.floor(newdate / (1000 * 60 * 60 * 24));
  return days;
}

const daytodate = (date, day) => {
  const days = 1000 * 60 * 60 * 24;
  const calc = day * days;
  const calcdate = new Date(date).getTime() + calc;
  const newdate = new Date(calcdate);
  return newdate;
};

const expdate_left = (exp_date) => {
  const cur_date = new Date().getTime();
  const expdate = new Date(exp_date).getTime();
  const remain = expdate - cur_date;
  const days = Math.floor(remain / (1000 * 60 * 60 * 24));
  return days;
};

const dateValidator = (d) => {
  const date = new Date(d);
  if (date.getDay() > 0) return true;
  else return false;
};

const datetoms = (date) => {
  const dt = new Date(date).getTime();
  return dt;
};

export {
  ymd,
  dmy,
  formatDate,
  ym,
  year,
  month,
  daysleft,
  ymdslash,
  formatMonth,
  daytodate,
  expdate_left,
  dateValidator,
  datetoms,
};
