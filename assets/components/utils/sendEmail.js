const sendEmail = async (email, subject, message, url) => {
  const fd = new FormData();
  fd.append('message', message);
  fd.append('to', email);
  fd.append('subject', subject);
  const sendEmail = await fetch(url, {
    method: 'Post',
    body: fd,
  });

  const emailResp = await sendEmail.text();
  if (emailResp.indexOf('not') != -1) {
    displayToast('bgdanger', emailResp);
  } else {
    displayToast('lightgreen', emailResp);
  }
};

export default sendEmail;


