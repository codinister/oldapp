const Sidebar = (top, bottom, sidbarclass) =>
  `
        <div class="scroll-wrapper">
        ${top}
        <div class="scroll-inner ${sidbarclass}">
            ${bottom}
        </div>
        </div>
        `;

export default Sidebar;
