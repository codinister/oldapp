const sendReceiptSms = async (to, message, newpayment) => {
  try {
    const sett = JSON.parse(localStorage.getItem('sinpt'));

    if (Number(sett?.activate_receipt_sms) === 1) {
      if (Number(newpayment) > 0) {
        const admins = sett?.sms_cc + ',' + to;
        const contacts = admins.split(',');

        const smsfetch = await fetch(
          sett?.sms_api_url + '?key=' + sett?.sms_api_key,
          {
            method: 'POST',
            body: JSON.stringify({
              recipient: contacts.filter(Boolean),
              sender: sett?.sms_sender_id,
              message: message,
              is_schedule: false,
              schedule_date: '',
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export default sendReceiptSms;
