import { classSelector } from '../utils/Selectors.js';
import Table from '../utils/Table.js';
import { formatDate } from '../utils/DateFormats.js';

const noteTabs = (details) => {
  const data = details ? details : [];

  const getDetailsOfUserNote = data
    .map(
      (v) => `
        <tr class="note-table-top">

            <td>${v.title}</td>

            <td class="view-note" data-note_id="${v.note_id}" data-user_id="${
              v.user_id
            }">
            ${v.message.substring(0, 50)}......
            </td>



            <td class="col-100 flex gap-2">
              <table>
              <tbody>
              <tr>
              <td>
                <i class="fa fa-edit edit-note cursor" title="EDIT" data-user_id="${
                  v.user_id
                }" data-note_id="${v.note_id}"></i>
               </td>
                <td>
                <i class="fa fa-trash delete-note cursor" title="DELETE" data-note_id="${
                  v.note_id
                }"></i>
                </td>
                </tr>
                </tbody>
                </table>


            </td>
        </tr>
    `
    )
    .join('');

  const tablehead = `
    <tr class="note-table-bottom">
    <td>Subject</td>
    <td>Message</td>
    <td>Action</td>
    </tr>
    `;

  const tablebody = getDetailsOfUserNote;

  classSelector('tabs-content').innerHTML = `
    <div id="tab1" class="active hide-tab">
    ${Table('note-tabs-tbl','4435',tablehead, tablebody)}
    </div>
    `;
  //END NOTE
};

export default noteTabs;
