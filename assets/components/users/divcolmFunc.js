import Lists from "../utils/Lists.js";

const divcolmFunc = (v) => {
  return Lists({
    editclass: 'edituser',
    deltclass: 'deltuser',
    fnameclass: 'ufname',
    name: v.firstname + ' ' + v.lastname,
    id: v.user_id,
    role_id: v.role_id
  });
}

export default divcolmFunc