document.addEventListener('click', (e) => {
  if (e.target.matches('[data-tab-target]')) {
    const id = e.target.dataset.tabTarget;

    Array.from(document.querySelectorAll('.active')).forEach((v) =>
      v.classList.remove('active')
    );

    Array.from(document.querySelectorAll('[data-tab-target]')).forEach((v) =>
      v.classList.remove('active')
    );
    e.target.parentElement.classList.add('active');
    document.querySelector(id).classList.add('active');
  }
});

export const tabMenu = (obj) => {
  const output = obj
    .map(
      (v) => `
            <li class="${v.active}">
                <a href="javascript:void(0);" data-tab-target="#${v.tabTarget}">
                    ${v.name}
                </a>
            </li>     
        `
    )
    .join('');
  return `
            <ul>
                ${output}
            </ul>
        `;
};

export const tabContent = (obj) => obj.map((v) => v.tab).join('');

export const Tabs = (tabMenu, tabContent) => {
  return `<div class="tabs">
            <div class="tabs-top">
                <!-- BEGIN TABS -->
                <div class="tabs-top-inner">
                ${tabMenu}
                    <!--<ul>
                    <li class="active">
                    <a href="javascript:void(0);" data-tab-target="#tab1">BOX ONE</a>
                    </li>
                    </ul>-->
                </div>
                <!-- END TABS -->
            </div>

            <div class="tabs-content">
                ${tabContent}
            </div>
        </div>
        `;
};
