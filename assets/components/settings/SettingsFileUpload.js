import logoUploadEvent from "./events/logoUploadEvent.js";

const SettingsFileUpload = () => {


logoUploadEvent()
    
    return `
        <div class="setting-file-uploads">
            <label disable class="disabled:cursor-not-allowed
            disabled:opacity-40 text-white cursor-pointer bg-blue-600 hover:bg-blue-800 px-6 py-2 logo-label">
            Upload Logo (100px x 80px)
            <input  type="file"    class="comp_logo hidden" />
            </label>
        </div>
    `;
};

export default SettingsFileUpload;
