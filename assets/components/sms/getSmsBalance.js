import { classSelector } from '../utils/Selectors.js';

const getSmsBalance = async () => {
  try {
    const fch = await fetch(
      'router.php?controller=widget&task=get_sms_balance'
    );
    const resp = await fch.json();
    classSelector('smsrembalance').textContent = resp.sms_balance;
  } catch (err) {
    console.log(err.message);
  }
}

export default getSmsBalance