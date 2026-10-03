const getCode = () => {
  if(localStorage.getItem('zsdf')){
    const { code } = JSON.parse(localStorage.getItem('zsdf'));
    return code;
  }
  else{
    return ''
  }

};
export default getCode;
