import restrictAccess from './app/utils/restrictAccess.js';
import loginEvent from './login/event/loginEvent.js';

const Login = () => {


  loginEvent();

  return `
  <div class="bg-linear-to-r from-[#895073] to-[#3a1d94] h-screen p-6 flex flex-col sm:flex-row">

    <div class="flex-2  items-center flex">

    <div class="sm:w-[55%] mx-auto p-6  sm:p-20">
    <h6 class=" font-bold text-white">KWIKRECEIPT</h6>
    <p class="text-[#a78ed0] mt-4 mb-6">Create invoices and receipts with ease</p>

    <div class="mb-4 relative">
      <input type="text" class="username
      rounded-4xl py-2 pr-2 pl-11 bg-[#684ea7]
      border border-[#684ea7] w-full 
      focus:bg-transparent focus:border-[#99e5fc]
       outline-0 text-[#99e5fc]" placeholder="Username" />

      <span class=" flex items-center justify-center h-8 w-8 bg-[#9187bb] rounded-full text-[#99e5fc] absolute left-1 top-1">
      <i class="fa fa-user"></i>
      </span>
    </div>

    <div class="mb-4 relative">
      <input type="password" class="password
      rounded-4xl pl-11 p-2 bg-[#684ea7]
      border border-[#684ea7] w-full 
      focus:bg-transparent focus:border-[#99e5fc]
       outline-0 text-[#99e5fc]" placeholder="Password" />

       <i class="reveal-pass block cursor-pointer absolute right-3 top-3 fa fa-eye text-[#99e5fc]"></i>

      <span class=" flex items-center justify-center h-8 w-8 bg-[#9187bb] rounded-full text-[#99e5fc] absolute left-1 top-1">
      <i class="fa fa-lock"></i>
      </span>
    </div>


    <button class="disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent 
    disabled:border-[#99e5fc] disabled:text-[#99e5fc]  login-btn cursor-pointer my-6 text-[#533492] rounded-4xl p-2 text-center w-full bg-[#99e5fc] border hover:border-[#99e5fc] hover:bg-transparent hover:text-[#000202]">Sign in</button>

    <p><span class="text-[#a78ed0]">Forgot password?</span> <a href="" class="text-[#99e5fc]">Reset Password</a></p>


    </div>

    </div>


      <div
      style="
        background-image: url('assets/images/pos-bg.jpg');
        background-size: cover;
        background-position: top;
      "
      class="h-full rounded-2xl flex-1 hidden  relative sm:block"
    >
    <div class="bg-linear-to-b  from-[#684390]  inset-0 absolute"></div>
    </div>

  </div>
  
  `;
};

export default Login;
