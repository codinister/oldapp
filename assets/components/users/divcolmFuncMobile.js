import userMobileLists from "./userMobileLists.js";

const divcolmFuncMobile = (v) => {
  return userMobileLists({
    editclass: 'edituser',
    deltclass: 'deltuser',
    fnameclass: 'ufname',
    name: v.firstname + ' ' + v.lastname,
    id: v.user_id,
    role_id: v.role_id
  });
}

export default divcolmFuncMobile