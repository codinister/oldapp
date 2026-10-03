import { classSelector } from '../Selectors.js';
import innerHTML from './innerHTML.js';

export const showModal = () => {
  classSelector('modal-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
};

export const closeModal = () => {
  classSelector('modal-overlay').classList.remove('show');
  document.body.style.overflow = 'scroll';
};

export const successMessage = ({ ...options }) => {

  const { title, sub_title } = options;

  showModal();

  innerHTML({
    data: `
        <div class="bg-white shadow-xl p-6 w-140 h-100 rounded-sm">

        <div class="flex justify-end">
        <button class="text-black/40 cursor-pointer text-2xl"><i class="close-modal fa fa-close "></i></button>
        </div>

        <div class="flex flex-col items-center gap-6">
        <div class="rounded-full h-20 w-20 bg-green-400 text-white flex justify-center items-center mt-6 text-xl"> <i class="fa fa-check fa-lg"></i> </div>
        <h6 class="text-black/60">${title}</h6>
        <p class="text-black/60">${sub_title}</p>
        <button class="mt-10 close-modal bg-gray-300 text-black cursor-pointer rounded-sm py-2 px-6">Close</button>
        </div>

        </div>
        `,
    outputClass: 'modal-box',
  });
};


export const warningMessage = ({ ...options }) => {

  const { title, sub_title } = options;

  showModal();

  innerHTML({
    data: `
        <div class="bg-white shadow-xl p-6 w-140 h-100 rounded-sm">

        <div class="flex justify-end">
        <button class="text-black/40 cursor-pointer text-2xl"><i class="close-modal fa fa-close "></i></button>
        </div>

        <div class="flex flex-col items-center gap-6">
        <div class="rounded-full h-20 w-20 bg-red-400 text-white flex justify-center items-center mt-6 text-xl"> <i class="fa fa-warning fa-lg"></i> </div>
        <h6 class="text-black/60">${title}</h6>
        <p class="text-black/60">${sub_title}</p>
        <button class="mt-10 close-modal bg-gray-300 text-black cursor-pointer rounded-sm py-2 px-6">Close</button>
        </div>

        </div>
        `,
    outputClass: 'modal-box',
  });
};
