const googlemap = (location) => {
  return `
    <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="100"  src="https://maps.google.com/maps?hl=en&q=${location}&ie=UTF8&t=roadmap&z=6&iwloc=B&output=embed&z=99"></iframe>
    `;
};

export default googlemap;
