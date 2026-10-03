const searchBox2 = (inputClass, ulclass, labelText, liclass) => {
  document.addEventListener('keyup', (e) => {
    if (e.target.matches(`.${inputClass}`)) {
      const inpt = e.target.value.toLowerCase();
      const ul = document.querySelectorAll(`.${ulclass}`);

      for (let i = 0; i < ul.length; i++) {
        const li = ul[i].querySelector(`.${liclass}`);

        if (li.textContent.toLowerCase().indexOf(inpt) != -1) {
          ul[i].style.display = '';
        } else {
          ul[i].style.display = 'none';
        }
      }
    }
  });

  return `
    <div class="form-group  pt-0 input-animate">	
    <input type="text"   placeholder=" " class="fminpt form-control ${inputClass}" required="true" readonly>
    <label>${labelText}</label>
    </div>
    `;
};

export default searchBox2;
