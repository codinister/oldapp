const fetchAll = async (controller, task, callback) => {
  try {
    const fech = await fetch(
      `router.php?controller=${controller}&task=${task}`
    );
    const data = await fech.json();
    if (data) {
      callback(data);
    } else {
      callback([]);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default fetchAll;
