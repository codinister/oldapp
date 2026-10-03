window.addEventListener('click', (e) => {
  if (e.target.matches('.noreload3')) {
    e.target.classList.remove('show');
    document.body.style.overflow = 'scroll';
  }
});

const Modalboxnoreload3 = (title = '', body = 'BODY AREA') => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.close-noreload3')) {
      const par = e.target.parentElement.parentElement.parentElement;
      par.classList.remove('show');
      document.body.style.overflow = 'scroll';
    }
  });

  return `
    <div class="noreload3">
    
        <div class="modal-inner">
            <div class="modal-top">
                <h1 class="modal-heading">${title}</h1> 
                <a href="javascript:void(0);" class="close-noreload3 modalcloseicon">&times;</a>
            </div>
            <div class="modal-body">
                ${body}
            </div>
        </div>
    </div>
    `;
};

export default Modalboxnoreload3;
