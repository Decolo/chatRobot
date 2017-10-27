import store from './store.js'

export default class Login {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.init()
    this.bindEvent()
  }
  init() {
    let template = `
      <h1>Welcome!!!ヽ(•̀ω•́ )ゝ</h1>
      <div class="avatar-container">
        <input type="file" class="avatar-upload" />
      </div>
      <div class="username-container">
        <input type="text" class="input-username" placeholder="Your name?"/>
      </div>
      <a href="#" class="login-btn">OK</a>
    `
    this.container.innerHTML = template
    this.avatarUpload = this.container.querySelector('.avatar-upload')
    this.avatarContainer = this.container.querySelector('.avatar-container')
    this.inputUsername = this.container.querySelector('.input-username')
    this.loginBtn = this.container.querySelector('.login-btn')
    this.reader = new FileReader()
  }
  bindEvent() {
    this.avatarUpload.addEventListener('change', event => {
      this.reader.readAsDataURL(event.target.files[0])
    })
    this.reader.addEventListener('load', event => {
      let img = new Image()
      this.imgSrc = img.src = event.target.result
      img.classList.add('avatar-img')
      this.avatarContainer.appendChild(img)
    })
    this.loginBtn.addEventListener('click', event => {
      event.preventDefault()
      if (this.verifyInput()) {
        store.setUsername(this.inputUsername.value)
        store.setImgSrc(this.imgSrc)
        this.container.parentNode.style.display = 'none'
      }
    })
  }
  verifyInput() {
    if (!this.container.querySelector('.avatar-img')) {
      alert('Please submit avatar~')
    } else if (!this.inputUsername.value) {
      alert('Please input you name~')
    } else {
      return true
    }
  }
}