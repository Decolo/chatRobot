import io from 'socket.io-client'
import store from './store.js'

export default class ChatSocket {
  constructor(selector){
    this.container = document.querySelector(selector)
    this.init()
    this.socket = io()
    this.bindEvent()
  }
  init() {
    let template = `
      <ul class="messages"></ul>
      <form>
        <input type="text" class="input-box" autocomplete="off" /><button class="sendButton">Send</button>
      </form>
    `
    this.container.innerHTML = template
    this.msgBox = this.container.querySelector('.messages')
    this.inputBox = this.container.querySelector('.input-box')
    this.sendButton = this.container.querySelector('.sendButton')
    this.form = this.container.querySelector('form')
    this.formHeight = this.form.clientHeight
    this.msgBox.style.height = `${window.innerHeight - this.formHeight}px`
    this.msgBox.style.overflow = 'auto'
    this.clock
    // console.log(msgBox.height)
  }
  bindEvent() {
    window.addEventListener('resize', () => {
      if (this.clock) clearTimeout(this.clock)
      this.clock = setTimeout(() => {
        this.msgBox.style.height = `${window.innerHeight - this.formHeight}px`    
        this.msgBox.scrollTop = this.msgBox.scrollHeight    
      }, 300)
    })
    // 接收信息
    this.socket.on('chat', (user, content) => {
      this.noticeAndShow(user, content)
    })
    this.sendButton.addEventListener('click', event => {
      event.preventDefault()
      let inputValue = this.inputBox.value
      if (inputValue === '') {
        alert('The message cannot be empty.')
      } else {
        // 发送信息
        this.socket.emit('chat', 'Me', inputValue)
        this.showMessage('Me', inputValue)
      }
      this.inputBox.value = ''
    })
  }
  noticeAndShow(user, content) {
    this.notice(user, content)
    this.showMessage(user, content)
  }
  showMessage(user, content) {
    let li = document.createElement('li')
    li.innerHTML = `<div class="avatar"></div>
       <div class="reply-message">${content}</div>`
    if (user === 'Me') {
      this.loadUserAvatar(li)  
    } 
    li.classList.add(String(user))
    li.classList.add('clearfix')
    this.msgBox.appendChild(li)
    this.msgBox.scrollTop = this.msgBox.scrollHeight
  }
  loadUserAvatar(li) {
    let img = new Image()
    img.src = store.getImgSrc()
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.borderRadius = '4px'
    li.querySelector('.avatar').appendChild(img)
  }

  notice(user, content) {
    if (Notification.permission === 'granted') {
      new Notification(content)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          new Notification(content)
        }
      })
    }
  }
}