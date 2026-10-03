const smsStatusCodes = (code) => {
  const smsStatusCode = {
    [1000]: 'Message submited successful',
    [1002]: 'SMS sending failed',
    [1003]: 'insufficient balance',
    [1004]: 'invalid API key',
    [1005]: 'invalid Phone Number',
    [1006]:
      'invalid Sender ID. Sender ID must not be more than 11 Characters. Characters',
    [1007]: 'Message scheduled for later delivery',
    [1008]: 'Empty Message',
    [1009]: 'Empty from date and to date',
    [1010]:
      'No mesages has been sent on the specified dates using the specified api key',
    [1011]: 'Numeric Sender IDs are not allowed',
    [1012]:
      'Sender ID is not registered. Please contact our support team via senderids@mnotify.com or call 0200896265 for assistance',
  };

  return smsStatusCode[code] || 'Message submitted successful!';
};

export default smsStatusCodes;
