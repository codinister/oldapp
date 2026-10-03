const displayToast = (classname, text) => {
  let result = '';
  let icon = '';
  if (classname === 'bgdanger') {
    icon = ` <i class="fa fa-times fa-lg ${classname}"></i> `;
    result = `
        <strong>Error</strong>
        <br />
        ${text}
        `;
  } else {
    icon = ` <i class="fa fa-check fa-lg ${classname}"></i> `;
    result = `
        <strong>Success</strong>
        <br />
        ${text}
        `;
  }

  document.querySelector('.toastnotification').classList.add('show');
  document.querySelector('.toastnotification').innerHTML = `
    <div class="toast-inner">
        <div class="${classname}"></div> 
        <div>${icon}</div>
        <div>${result}</div>
    </div>`;

  setTimeout(() => {
    document.querySelector('.toastnotification').classList.remove('show');
  }, 3000);
};

export default displayToast;
