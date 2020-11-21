var exp = require('express')
var bodyparser = require('body-parser')
var cookie = require('cookie-parser')

var app = exp()

app.use(exp.static('www'))

app.use(bodyparser.urlencoded({extends:false}))

app.use(cookie())

var temp = require('art-template')
app.engine('.html', require('express-art-template'))
app.set('view engine', 'html')
app.set('views', './views')
temp.defaults.extname = '.html'


// 页面跳转的路由
app.use(require('./router/page'))

app.listen(3000,()=>{
  console.log('running.....')
})