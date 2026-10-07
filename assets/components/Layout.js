import Navmenu from './navbar/Navmenu.js';
import innerHTML from './utils/v2/innerHTML.js';
const Layout = (page) => {
  innerHTML({
    data: `
    <div class="nav-menu">${Navmenu()}</div>
    <div class="pt-21"></div>
    <div>
      ${page}
    </div>
    <footer class="bg-white w-full">
    <small>&copy; copyright 2023 <span id="appname"></span> by <a href="https://www.codenesta.com">Codenesta</a></small>
    </footer>	
    `,
    outputClass: 'root',
  });
};

export default Layout;
