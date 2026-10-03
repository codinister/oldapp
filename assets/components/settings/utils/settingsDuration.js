const settingsDuration = (industry) => {
  let duration = '';
  if (industry === 'service provider' || industry === 'rentals') {
    duration = `

<label for="currency" class="block mb-2.5 text-sm font-medium text-heading">Currency</label>

          <select id="duration" class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body duration sinpt"  name="duration"
          >
            <option selected>Select duration type</option>
            <option value="Month">Month(s)</option>
            <option value="Day">Day(s)</option>
            <option value="Year">Year(s)</option>
          </select>
    `;
  }

  return duration
};

export default settingsDuration;
