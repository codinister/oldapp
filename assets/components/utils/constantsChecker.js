import Installer from '../Installer.js';

const constantsChecker = async () => {
  const fch = await fetch('router.php?controller=user&task=constants_check');
  const data = await fch.text();

  if (data !== 'Yes') {
    document.querySelector('.root').innerHTML = Installer();
  }
};

export default constantsChecker;
