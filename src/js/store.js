let store = (function(){
  let username = ''
  let imgSrc = ''

  function setUsername(str) {
    username = str
  }
  function getUsername() {
    return username
  }
  function setImgSrc(str) {
    imgSrc = str
  }
  function getImgSrc() {
    return imgSrc
  }
  return {
    setUsername,
    getUsername,
    setImgSrc,
    getImgSrc
  }
})()

export default store