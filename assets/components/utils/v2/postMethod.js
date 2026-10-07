// postMethod({
// inputs,
// controller,
// task,
// callback })

import apiEndpoint from '../apiEndpoint.js';


const postMethod = async ({ ...options }) => {
  try {
    const { inputs, controller, task, callback } = options;

    if (!inputs || !controller || !task || !callback) {
      return console.error('unavailable values!');
    }

    const fd = new FormData();

    inputs.forEach((value) => {
      const [ky] = Object.keys(value);
      const [vl] = Object.values(value);
      fd.append(ky, vl);
    });

    const ftch = await fetch(apiEndpoint(controller, task), {
      method: 'Post',
      credentials: 'same-origin',
      body: fd,
    });

    const result = await ftch.text();

    callback(result);
  } catch (err) {
    console.error(err);
  }
};

export default postMethod;
