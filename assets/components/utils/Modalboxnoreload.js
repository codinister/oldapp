window.addEventListener('click', (e) => {
  if (e.target.matches('.noreload')) {
    e.target.classList.remove('show');
    document.body.style.overflow = 'scroll';
  }
});

const Modalboxnoreload = (title = '', body = 'BODY AREA') => {

  document.addEventListener('click', (e) => {
    if (e.target.matches('.close-noreload')) {
      const par = e.target.parentElement.parentElement.parentElement;
      par.classList.remove('show');
      document.body.style.overflow = 'scroll';
    }
  });

  return `
    <div class="noreload">
    
        <div class="modal-inner">
            <div class="modal-top">
                <h1 class="modal-heading">${title}</h1> 
                <a href="javascript:void(0);" class="close-noreload modalcloseicon">&times;</a>
            </div>
            <div class="modal-body">
                ${body}
            </div>
        </div>
    </div>
    `;
};

export default Modalboxnoreload;
