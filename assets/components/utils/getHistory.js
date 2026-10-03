const getHistory = async (callback) => {
  const fch = await fetch('router.php?controller=widget&task=gethistory');

  const data = await fch.json();

  const user = Object.values(data)
    .map((v) => {
      return {
        activity: v.activity,
        fullname: v.firstname + ' ' + v.lastname,
        date: v.createdAt,
        link: v.link,
        user_id: v.user_id,
      };
    })
    .filter(Boolean);

  return callback(user);
};

export default getHistory;
