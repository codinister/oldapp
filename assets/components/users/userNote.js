import { ymd } from '../utils/DateFormats.js';
import displayToast from '../utils/displayToast.js';
import { textInput } from '../utils/InputFields.js';
import noteSavebtn from './noteSavebtn.js';

const userNote = () => {
  const note = JSON.parse(localStorage.getItem('usernote'));

  const message = note ? note?.message : '';

  document.addEventListener('click', (e) => {
    if (e.target.matches('.savenotebtn')) {
      e.stopImmediatePropagation();

      const date = new Date()

      const data = JSON.parse(localStorage.getItem('usernote'));
      delete data['fullname']
      data['createdAt'] = ymd(date)


      const fd = new FormData()
      fd.append('data', JSON.stringify(data))
      fetch(`router.php?controller=note&task=save_note`, {
        method: 'Post', 
        body: fd
      })
      .then(resp => resp.text())
      .then( result => {
        if(result.indexOf('errors') != -1){
          displayToast('bgdanger', result);
        }
        else{
          displayToast('lightgreen', result);
          localStorage.setItem('rend', 1);
        }
      })

      
    }
  });

  return `
  <div class="note-form">
  <div class="note-header">${note ? note?.fullname : ''}</div>
          ${textInput({
            type: 'text',
            classname: 'nte',
            name: 'title',
            required: true,
            label: 'Title',
            value: note ? note?.title : '',
          })}

          <textarea name="message" placeholder="Message" class="nte">${message}</textarea>
  
          <div class="savenote-wrapper"> ${noteSavebtn()}</div>

          </div>
  
  `;
};

export default userNote;
