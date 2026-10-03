import { classSelector } from './Selectors.js';

const populateDatalists = (data, iteratorFunc, wrapperclass) => {
  classSelector(wrapperclass).innerHTML = data
    .map((v) => iteratorFunc(v))
    .join('');
};

export default populateDatalists;
