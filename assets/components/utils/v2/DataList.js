import { textInput } from '../InputFields.js';
import { classSelector } from '../Selectors.js';
import innerHTML from './innerHTML.js';

/**
 * To use this utility it requires two data sources one for the datalist and the other for the target data that datalist will be searching through. Always ensure that bot the datalist data source and the target data data source contains listId and listName without these specific id and name the datalist wouldnt work 
 * DataList({
    dataListDataSource = [],
    datalistWrapperClass = 'data-list-wrapper',
    datalistInputClass = 'data-list-inpt',
    datalistItemClass = 'data-list-item',
    targetOutputClass = '',
    targetData = [],
    targetSearchBy = 'listId',
  }, (data)=>{
    return ''
  }) 
*/

const DataList = ({ ...options }, callback) => {
  const {
    dataListDataSource = [],
    datalistWrapperClass = 'data-list-wrapper',
    datalistInputClass = 'data-list-inpt',
    datalistItemClass = 'data-list-item',
    datalistInputLabel = 'Search List',
    targetOutputClass = '',
    targetData = [],
    targetSearchBy = 'listId',
  } = options;

  /* dATA */
  const dataFn = (data) => {
    return Object.values(
      [...data].reduce((a, b) => {
        a[b.listName] = b;
        return a;
      }, {}),
    )

      .map(
        (v) => `
        <li
          class="${datalistItemClass}"
          data-name="${v.listName}"
          data-id="${v.listId}"
        >
          ${v.listName}
        </li>`,
      )
      .slice(0, 5)
      .join(' ');
  };

  /*Events*/
  document.addEventListener('click', (e) => {
    if (e.target.matches(`.${datalistInputClass}`)) {
      classSelector(datalistWrapperClass).classList.add('show');
      innerHTML({
        outputClass: datalistWrapperClass,
        data: dataFn(dataListDataSource),
      });
    }
    if (e.target.matches(`.${datalistItemClass}`)) {
      const { name, id } = e.target.dataset;

      let dataArr;

      if (targetSearchBy === 'listId') {
        dataArr = [...targetData].filter((v) => v.listId === id);
      } else {
        dataArr = [...targetData].filter((v) => v.listName === name);
      }

      innerHTML({
        outputClass: targetOutputClass,
        data: callback(dataArr),
      });

      classSelector(datalistWrapperClass).classList.remove('show');

      classSelector(datalistInputClass).value = name;
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches(`.${datalistInputClass}`)) {
      const { value } = e.target;

      const dataArr = Object.values(
        [...dataListDataSource]
          .filter((v) => v.listName.toLowerCase().includes(value.toLowerCase()))
          .map((v) => ({
            ...v,
            name: v.listName.toLowerCase().split(' ').join(''),
          }))
          .reduce((a, b) => {
            a[b.name] = b;
            return a;
          }, {}),
      );

      if (dataArr.length > 0) {
        classSelector(datalistWrapperClass).classList.add('show');
      } else {
        classSelector(datalistWrapperClass).classList.remove('show');
      }

      innerHTML({ outputClass: datalistWrapperClass, data: dataFn(dataArr) });
    }
  });

  return `
  <div class="data-list-v2">

  ${textInput({
    type: 'text',
    classname: `dlinpt ${datalistInputClass}`,
    required: true,
    label: datalistInputLabel,
  })}

  <ul class="datalistwrapper ${datalistWrapperClass}">

  </ul>

  </div>
  `;
};

export default DataList;
