const durationConverter = (date, period) => {
  const { duration } = JSON.parse(localStorage.getItem('sinpt'));

  let day =
    duration === 'Month'
      ? Number(period) * 30
      : duration === 'Year'
      ? Number(period) * 365
      : duration === 'Day'
      ? Number(period) * 1
      : 0;

  const days = 1000 * 60 * 60 * 24;
  const calc = day * days;
  const calcdate = new Date(date).getTime() + calc;
  const newdate = new Date(calcdate);

  if (period) {
    return newdate;
  } else {
    return '0000-00-00';
  }
};

export default durationConverter;
