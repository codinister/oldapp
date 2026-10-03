import { classSelector } from '../Selectors.js';
import textContent from '../v2/textContent.js';

// isPhone({
//   inputValue: value,
//   errorClass: 'comp_phone-error',
//   errorMessage : 'Valid phone required!'
//  })
export const isPhone = ({ ...options }) => {
  const { inputValue, errorClass, errorMessage } = options;

  const validate = /^(\d{10,20}\/?\,?)+$/;

  if (inputValue.length < 10) {
    if (classSelector(errorClass)) {
      textContent({
        outputClass: errorClass,
        data: errorMessage,
      });
    }
  } else if (inputValue.length >= 10) {
    const res = validate.test(inputValue);

    if (!res) {
      if (classSelector(errorClass)) {
        textContent({
          outputClass: errorClass,
          data: errorMessage,
        });
      }
    } else {
      if (classSelector(errorClass)) {
        textContent({
          outputClass: errorClass,
          data: '',
        });
      }
    }
  } else {
    if (classSelector(errorClass)) {
      textContent({
        outputClass: errorClass,
        data: '',
      });
    }
  }
};

export const isEmail = ({ ...options }) => {
  const { inputValue, errorClass, errorMessage } = options;

  const validate = /^.+@[a-z0-9]+\.[a-z]+$/;

  if (!validate.test(inputValue.trim())) {
    textContent({
      outputClass: errorClass,
      data: errorMessage,
    });
  } else {
    textContent({
      outputClass: errorClass,
      data: '',
    });
  }
};

export const isWebsite = ({ ...options }) => {
  const { inputValue, errorClass, errorMessage } = options;

  const validate = /^https:\/\/www\.[a-z0-9]+\.[a-z]+$/;


  if (!validate.test(inputValue)) {
    textContent({
      outputClass: errorClass,
      data: errorMessage,
    });
  } else {
    textContent({
      outputClass: errorClass,
      data: '',
    });
  }
};





export const isSenderId = ({ ...options }) => {
  const { inputValue, errorClass, errorMessage } = options;

  if (inputValue.length > 11) {
    textContent({
      outputClass: errorClass,
      data: errorMessage,
    });
  } else {
    textContent({
      outputClass: errorClass,
      data: '',
    });
  }
};
