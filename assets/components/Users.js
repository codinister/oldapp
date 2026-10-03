import { classSelector } from './utils/Selectors.js';
import DetailsBox from './utils/DetailsBox.js';
import Buttons from './utils/Buttons.js';
import Modalboxone from './utils/Modalboxone.js';
import { Tabs, tabContent, tabMenu } from './utils/Tabs.js';
import rerender from './utils/rerender.js';
import getCode from './utils/getCode.js';
import Layout from './Layout.js';
import userForm from './users/userForm.js';
import userNote from './users/userNote.js';
import userReducer from './data/clientside/reducers/userReducer.js';
import Sidebar from './utils/Sidebar.js';
import searchBox from './utils/searchBox.js';
import divcolmFunc from './users/divcolmFunc.js';


import divcolmFuncMobile from './users/divcolmFuncMobile.js';


import usersprofile from './data/serverside/fetch/usersprofile.js';
import onclickDisplayAsingleUser from './users/onclickDisplayAsingleUser.js';
import setUsersLocalstorage from './data/clientside/localstorage/SET/setUsersLocalstorage.js';
import getUsersLocalstorage from './data/clientside/localstorage/GET/getUsersLocalstorage.js';
import noteTabs from './users/noteTabs.js';
import { ymd } from './utils/DateFormats.js';
import { textInput } from './utils/InputFields.js';
import dataListDropdown from './utils/dataListDropdown.js';

//CREATE USERS PAGE
const Users = () => {
  const code = getCode();

  usersprofile((users) => {
    function userdata() {
      return users;
    }

    document.addEventListener('keyup', (e) => {
      if (e.target.matches('.userwrapperinpt')) {
        const val = e.target.value;
        if (users) {
          const usersdata = users
            .filter((v) =>
              Object.values(v)
                .join('')
                .toLowerCase()
                .includes(val.toLowerCase())
            )
            .map((v) => divcolmFuncMobile(v))
            .join('');
          classSelector('userwrapper').innerHTML = usersdata;
        }
      }

      if (e.target.matches('.searchuser')) {
        const { value } = e.target;

        classSelector('usersidebarclass').innerHTML = `
        
<table cellspacing="0">
<tbody>`+
        
        Object.values(users)
          .filter((v) =>
            Object.values(v)
              .join(' ')
              .toLowerCase()
              .includes(value.toLowerCase())
          )
          .map((v) => {
            return divcolmFunc(v);
          })
          .join('')+`
          </tbody>
          </table>
          `
      }
    });

    document.addEventListener('input', (e) => {
      userReducer(e);
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('.userwrapperinpt')) {
        if (users) {
          const usersdata = users
            .slice(0, 10)
            .map((v) => divcolmFuncMobile(v))
            .join('');
          classSelector('userwrapper').innerHTML = usersdata;
        }
      }

      if (e.target.matches('.delete-note')) {
        e.stopImmediatePropagation();
        const { note_id } = e.target.dataset;

        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.remove();

          fetch(
            `router.php?controller=note&task=delete_note&note_id=${note_id}`
          )
            .then((resp) => resp.text())
            .then((data) => localStorage.setItem('rend', 1))
            .catch((err) => console.log(err));
        }
      }

      if (e.target.matches('.edit-note')) {
        const { note_id, user_id } = e.target.dataset;

        if (users) {
          const user = users.find((v) => v.user_id === user_id);
          if (user) {
            const { firstname, lastname, note } = user;

            const nts = userdata();

            if (note) {
              const notes = note.find((v) => v.note_id === note_id);

              if (notes) {
                const { title, message } = notes;

                localStorage.setItem(
                  'usernote',
                  JSON.stringify({
                    note_id: note_id,
                    title,
                    message,
                    user_id: user_id,
                    fullname: firstname + ' ' + lastname,
                  })
                );

                classSelector('user-form-title').innerHTML = `EDIT NOTE`;
                classSelector('user-form-body').innerHTML = userNote();

                document.body.style.overflow = 'hidden';
                classSelector('modalboxone').classList.add('show');
              }
            }
          }
        }
      }

      if (e.target.matches('.view-note')) {
        const { note_id, user_id } = e.target.dataset;

        if (users) {
          const user = users.find((v) => v.user_id === user_id);

          if (user) {
            const { note, firstname, lastname } = user;

            if (note) {
              const { title, message } = note.find(
                (v) => v.note_id === note_id
              );
              classSelector('user-form-title').innerHTML =
                firstname + ' ' + lastname;
              classSelector('user-form-body').innerHTML = `
          <div class="display-note">
          <h5>${title}</h5>
          <div>${message}</div>
          </div>
          `;

              document.body.style.overflow = 'hidden';
              classSelector('modalboxone').classList.add('show');
            }
          }
        }
      }

      if (e.target.matches('.deltuser')) {
        e.stopImmediatePropagation();
        const { id } = e.target.dataset;

        if (confirm('Are you sure you want to delete!')) {
          fetch(`router.php?controller=user&task=delete_user&user_id=${id}`);

          e.target.parentElement.parentElement.remove();

          localStorage.setItem('rend', 1);
        } else {
        }
      }

      if (e.target.matches('.edituser')) {
        e.stopImmediatePropagation();

        const obj = getUsersLocalstorage();

        const { id } = e.target.dataset;

        let us;
        if (obj?.user_id === id) {
          us = obj;
        } else {
          us = users.find((v) => v.user_id === id);
          if (us) {
            setUsersLocalstorage(us);
          }
        }

        classSelector('user-form-title').innerHTML = `EDIT USER`;
        classSelector('user-form-body').innerHTML = userForm();

        document.body.style.overflow = 'hidden';
        classSelector('modalboxone').classList.add('show');
      }

      if (e.target.matches('.ufname')) {
        e.preventDefault();
        const { id } = e.target.dataset;

        if (users) {
          const filteruser = Object.values(users).find((v) => v.user_id === id);

          if (filteruser) {
            classSelector('singleuserdetailsbx1').innerHTML =
              onclickDisplayAsingleUser(filteruser);

            localStorage.setItem(
              'usernote',
              JSON.stringify({
                note_id: '',
                title: '',
                message: '',
                user_id: id,
                fullname: filteruser.firstname + ' ' + filteruser.lastname,
              })
            );

            noteTabs(filteruser.note);

            classSelector('addNote').classList.add('show');

            if (classSelector('userwrapper')) {
              classSelector('userwrapper').classList.remove('showmodal');
            }
          }
        }
      }

      if (e.target.matches('.addNote')) {
        e.stopImmediatePropagation();
        classSelector('user-form-title').innerHTML = `ADD NOTE`;
        classSelector('user-form-body').innerHTML = userNote();
        document.body.style.overflow = 'hidden';
        classSelector('modalboxone').classList.add('show');
      }

      if (e.target.matches('.addUser')) {
        e.stopImmediatePropagation();

        const user = getUsersLocalstorage();

        if (user?.user_id > 0) {
          const date = new Date();
          localStorage.setItem(
            'userlocalstorage',
            JSON.stringify({
              user_id: '',
              firstname: '',
              lastname: '',
              phone: '',
              email: '',
              residence: '',
              photo: '',
              birthdate: '',
              role_id: '2',
              hire_date: '',
              username: '',
              password: '',
              createdAt: ymd(date),
              status: 'Unblock',
              signature: '',
              note: [],
              menus: {
                Dashboard: {
                  usermenu_id: '',
                  menu_name: 'Dashboard',
                  menu_parent: 'null',
                  menu_id: '1',
                },
                Sell: {
                  usermenu_id: '',
                  menu_name: 'Sell',
                  menu_parent: 'null',
                  menu_id: '2',
                },
              },
            })
          );
        }

        classSelector('user-form-title').innerHTML = `ADD USER`;
        classSelector('user-form-body').innerHTML = userForm();

        document.body.style.overflow = 'hidden';
        classSelector('modalboxone').classList.add('show');
      }
    });

    const listOfUsers = Object.values(users)
      .map((v) => {
        return divcolmFunc(v);
      })
      .join('');

    // BEGIN TABS
    const tabMenuObj = [{ name: 'Note', active: 'active', tabTarget: 'tab1' }];

    let tabContentObj = [
      { tab: `<div id="tab1" class="active hide-tab"></div>` },
      { tab: `<div id="tab2" class="hide-tab"></div>` },
    ];
    // END TABS

    setTimeout(() => {
      const usid1 = JSON.parse(localStorage.getItem('zsdf'));
      const usid2 = JSON.parse(localStorage.getItem('usernote'));

      const user_id = usid2 ? usid2?.user_id : usid1?.user_id;

      const filteruser = Object.values(users).find(
        (v) => v.user_id === user_id
      );

      classSelector('singleuserdetailsbx1').innerHTML =
        onclickDisplayAsingleUser(filteruser);
      noteTabs(filteruser.note);
      classSelector('addNote').classList.add('show');
    }, 0);

    const Page = `
        <div class="dash-container mb-2">
        <div class="dash-row gap-3">

            <div class="sidebar bgwhite usersidebar">

              <div class="hideonmobile">
                ${Sidebar(
                  searchBox('searchuser', 'Search Users'),

                  `
                  <table cellspacing="0">
                  <tbody>
                  ${listOfUsers}
                  </tbody>
                  </table>
                  `
                  
                  
                  ,
                  'usersidebarclass'
                )}
                </div>

            <div class="hideondesktop userdropdown">
            <br /><br />
                ${dataListDropdown(
                  textInput,
                  'userwrapperinpt',
                  'Select user',
                  '',
                  'userlink',
                  'userwrapper'
                )}

                </div>

            </div>

            <div class="cont user-note-tabs">

                ${Buttons([
                  {
                    btnclass: 'addUser',
                    btnname: 'Add User',
                  },
                  {
                    btnclass: 'addNote hidebtn',
                    btnname: 'Add Note',
                  },
                ])}

                ${DetailsBox('singleuserdetailsbx1', 'singleuserdetailsbx2')}

                <div class="usernotesarear">
                  ${Tabs(tabMenu(tabMenuObj), tabContent(tabContentObj))}
                </div>

            </div>

        </div>
        </div>

      ${Modalboxone('', '')}
    `;

    classSelector('root').innerHTML = Layout('users', Page);
  });
};

rerender(Users, 1);

export default Users;
