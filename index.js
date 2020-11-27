var exp = require('express')
var bodyparser = require('body-parser')
var cookie = require('cookie-parser')

var app = exp()

app.use(exp.static('www'))

app.use(bodyparser.urlencoded({ extends: false }))

app.use(cookie())

var temp = require('art-template')
app.engine('.html', require('express-art-template'))
app.set('view engine', 'html')
app.set('views', './views')
temp.defaults.extname = '.html'


// 页面跳转的路由
app.use(require('./router/page'))

// 用户注册接口
app.use('/user', require('./router/user'))

// 购物车接口
app.use('/car', require('./router/car'))


// 管理员接口
app.use('/admin', require('./router/admin'))

//发帖接口
app.use(require('./router/talk'))

app.listen(3000, () => {
    console.log('running.....')
})