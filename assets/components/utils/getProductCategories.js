const getProductCategories = async (callback)=>{
   const categories = JSON.parse(localStorage.getItem('kwikcategories'))
   callback(categories)
}

export default getProductCategories