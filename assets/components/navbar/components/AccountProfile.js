const AccountProfile = (user) => {


  return `
  <div  class="flex gap-6 items-center flex-row">
    <div class="bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center text-white">
    <i class="fa fa-user"></i>
    </div>
    <div>${user?.firstname} ${user?.lastname}</div>
    <div ><i class="fa fa-angle-down"></i></div>
  </div>
  `;
};

export default AccountProfile;
