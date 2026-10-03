import Navmenu from './navbar/Navmenu.js';
const Layout = (page, html) => {
  return `
    <style>
    .${page}{  
        background-color: #425c59;
        color: white!important;
        padding-block: .8rem;
        padding-inline: 1.2rem;
        border-radius: 2.4rem;
      }
    </style>
    <div class="nav-menu">${Navmenu()}</div>
    <div class="pt-21"></div>
    ${html}
    <footer class="bg-white">
    <small>&copy; copyright 2023 <span id="appname"></span> by <a href="https://www.codenesta.com">Codenesta</a></small>
    </footer>	
    <br><br><br>
    `;
};

export default Layout;
