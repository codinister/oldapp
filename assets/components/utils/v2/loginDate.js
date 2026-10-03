import { ymd } from "../DateFormats.js"


const loginDate = () => {
 const date = JSON.parse(localStorage.getItem('zsdf'))
 if(!date) return console.error('user data not found!')

  return ymd(date?.login_date)
}

export default loginDate