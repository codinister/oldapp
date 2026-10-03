import { formatDate } from '../../../utils/DateFormats.js';

const usersprofile = (callback) => {
  const baseURL = 'router.php?controller=usersprofile&task';
  Promise.allSettled([
    fetch(`${baseURL}=userDetails`).then((resp) => resp.json()),
    fetch(`${baseURL}=usersNotes`).then((resp) => resp.json()),
    fetch(`${baseURL}=usersPrivilleges`).then((resp) => resp.json()),
  ])
    .then((value) => {
      const note = Object.values(value[1].value)
        .map((v) => ({
          note_id: v.note_id,
          title: v.title,
          message: v.message,
          user_id: v.user_id,
          createdAt: v.createdAt,
          arrs: [
            {
              note_id: v.note_id,
              title: v.title,
              message: v.message,
              user_id: v.user_id,
              createdAt: v.createdAt
            },
          ],
        }))
        .reduce((a, b) => {
          if (a[b.user_id]) {
            delete b.arrs;
            a[b.user_id].arrs.push({
              ...b,
            });
          } else {
            a[b.user_id] = b;
          }

          return a;
        }, {});



      const menu = Object.values(value[2].value)
        .map((v) => {
          return {
            user_id: v.user_id,
            usermenu_id: v.usermenu_id,
            menu_name: v.menu_name,
            menu_parent: v.menu_parent,
            menu_id: v.menu_id,

            menus: {
              [v.menu_name]: {
                usermenu_id: v.usermenu_id,
                menu_name: v.menu_name,
                menu_parent: v.menu_parent,
                menu_id: v.menu_id,
              },
            },
          };
        })
        .reduce((a, b) => {
          if (a[b.user_id]) {
            delete b.menus;
            a[b.user_id].menus[b.menu_name] = {
              usermenu_id: b.usermenu_id,
              menu_name: b.menu_name,
              menu_parent: b.menu_parent,
              menu_id: b.menu_id,
            };
          } else {
            a[b.user_id] = b;
          }
          return a;
        }, {});

      const users = Object.values(value[0].value).map((v) => {
        return {
          createdAt: v.createdAt,
          user_id: v.user_id,
          firstname: v.firstname,
          lastname: v.lastname,
          phone: v.phone,
          residence: v.residence,
          email: v.email,
          hire_date: v.hire_date,
          birthdate: v.birthdate,
          username: v.username,
          password: v.password,
          role_id: v.role_id,
          status: v.status,
          signature: v.signature,
          photo: v.photo,
          menus: menu ? menu[v.user_id]?.menus : '',
          note: note ? note[v.user_id]?.arrs : '',
        };
      });

      callback(users);
    })
    .catch((err) => console.log(err));
};

export default usersprofile;
