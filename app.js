var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var axios = require('axios')

// 获取静态资源
app.use(express.static('./public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
// 监听socketIO连接
io.on('connection', socket => {
  // 监听事件，获取消息
  socket.on('chat', (user, content) => {
    var data = {
      key: 'cc0a54ada0c447318eb31a450530b6b2',
      info: content,
      userid: user
    }
    
    // 异步请求数据
    axios.post('http://www.tuling123.com/openapi/api', data)
      .then(res => {
        if (res.data.code === 100000) {
          io.sockets.emit('chat', 'Robot', res.data.text)
        }
      })
      // io.sockets.emit('chat', user, content)
    //广播
    // socket.broadcast.emit('chat', user, content)
  })
})

server.listen(3888, () => {
  console.log('Listening on port 3888')
})


