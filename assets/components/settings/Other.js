const Other = (duration) => {
  return `
    <div class="bg-white shadow-md rounded p-15 mb-4">
        <h6 class="mb-6">Other</h6>
        <div class="flex flex-col sm:flex-row gap-12">
            <div class="flex-1">

          <label for="currency" class="block mb-2.5 text-sm font-medium text-heading">Currency</label>

          <select id="currency" class="currency sinpt block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          name="currency"
          >
          <option hidden>Select currency</option>
          <option value="GHs">GHs</option>
          <option value="USD">USD</option>
          <option value="£">£</option>
          <option value="€">€</option>
          </select>
            </div>
            <div class="flex-1">
              ${duration}
            </div>
            </div>  
        </div>
  `;
};

export default Other;
