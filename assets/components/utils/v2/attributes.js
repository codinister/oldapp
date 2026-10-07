import { classSelector } from '../Selectors.js';

export const setDisabledAttribute = (className) =>
  classSelector(className).setAttribute('disabled', true);

export const removeDisabledAttribute = (className) =>
  classSelector(className).removeAttribute('disabled');
