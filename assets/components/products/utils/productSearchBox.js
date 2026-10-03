
const productSearchBox = (label,inputClass)=>{
 return `<div class="input-animate prod-search-box-wrapper">	
  <input type="text"  placeholder=" " class=" ${inputClass}" required="true" >
  <label>${label}</label>
  </div>`
}

export default productSearchBox