import SettingsFileUpload from './SettingsFileUpload.js'


const SettingsHeader = (sett) => {
  if (!sett) return console.error('Setting data not available!');

  return `
           <div class="bg-white shadow-md rounded px-15 py-6 mb-4">

          <div class="flex justify-between gap-3">
            <div class="flex flex-row gap-3 items-center">
            <div>
              <img src="assets/uploads/${
                sett?.comp_logo
              }"  
              class="logoimg" alt="Logo" />
              </div>
         
              <div>
              <h6 class="compname">
              ${sett?.comp_name.toUpperCase()}
              </h6>
              <p class="text-black/60">
              ${sett?.comp_email}
              </p>
              </div>
            </div>

            <div class="flex items-center">
              ${SettingsFileUpload()}
            </div>

          </div>
        </div>

  `;
};

export default SettingsHeader;
