window.addEventListener('click', (e) => {
  if (e.target.matches('.modalboxfive')) {
    e.target.classList.remove('show');
    document.body.style.overflow = 'scroll';
    //window.location.reload()
  }
});

const Modalboxfive = (title = '', body = 'BODY AREA') => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.close-modalboxfive')) {
      const par = e.target.parentElement.parentElement.parentElement;
      par.classList.remove('show');
      document.body.style.overflow = 'scroll';
      //window.location.reload()
    }
  });

  return `
    <div class="modalboxfive">
    
        <div class="modal-inner">
            <div class="modal-top">
                <h1 class="modal-heading">${title}</h1> 
                <a href="javascript:void(0);" class="close-modalboxfive modalcloseicon">&times;</a>
            </div>
            <div class="modal-body">
                ${body}
            </div>
        </div>
    </div>
    `;
};

export default Modalboxfive;
