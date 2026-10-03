const sendWhatsapp = (phone, message) => {
  const mess = encodeURIComponent(message);
  window.location.href = `https://wa.me/${phone}?text=${mess}`;
};

export default sendWhatsapp;
