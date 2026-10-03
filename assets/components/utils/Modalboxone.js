window.addEventListener('click', (e) => {
  if (e.target.matches('.modalboxone')) {
    e.target.classList.remove('show');
    document.body.style.overflow = 'scroll';
    //window.location.reload()
  }
});

const Modalboxone = (title = '', body = 'BODY AREA') => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.close-modalboxone')) {
      const par = e.target.parentElement.parentElement.parentElement;
      par.classList.remove('show');
      document.body.style.overflow = 'scroll';
      //window.location.reload()
    }
  });

  return `
    <div class="modalboxone">
    
        <div class="modal-inner">
            <div class="modal-top">
                <h5 class="modal-heading prod-form-title user-form-title">${title}</h5> 
                <a href="javascript:void(0);" class="close-modalboxone  modalcloseicon">&times;</a>
            </div>
            <div class="modal-body form-body prod-form-body user-form-body">
                ${body}
            </div>
        </div>
    </div>
    `;
};




export default Modalboxone;
