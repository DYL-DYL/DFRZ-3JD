// 处理学生信息的操作
var exp = require('express')
var router = exp.Router()
var bodyparser = require('body-parser')
var cookie = require('cookie-parser')
router.use(bodyparser.urlencoded({ extends: false }))

router.use(cookie())

var { User } = require('../libs/mongoose')

// 进行用户信息登录
router.post('/userPage', (req, res) => {

        User.findOne({ username: req.body.username }, (err, data) => {
            if (!err) {
                if (data == null) {
                    res.send('该用户还没有注册')
                } else {
                    if (data.psw == req.body.psw) {
                        var time = new Date()
                        time.setMonth(time.getMonth() + 1)
                        if(req.body.username=='admin'){
                            res.cookie('admin', req.body.username, { expires: time })
                        }else{
                            res.cookie('username', req.body.username, { expires: time })
                        }
                        res.send('登录成功')
                    } else {
                        res.send('密码不正确')
                    }
                }
            } else {
                console.log(err);
                res.send('登录失败')
            }
        })

    })
    // 进行用户信息查询
router.post('/findUser', (req, res) => {

    User.findOne({ username: req.body.username }, (err, data) => {
        if (!err) {
            if (data == null) {
                res.send({msg:'该用户名还没有注册'})
            } else {
                res.send({
                    msg:'该用户名已注册',
                    data
                })
            }
        } else {
            console.log(err);
            res.send('登录失败')
        }
    })

})
// 更改电话
router.get('/newPhone',(req,res)=>{
    User.update({username:req.query.username},{phone:req.query.phone},(err)=>{
        if(!err){
            res.send('更改成功')
        }else{
            res.send('更改失败')
        }
    })
})
//   添加用户信息
router.post('/addUser', (req, res) => {

    User(req.body).save((err) => {
        if (!err) {
            res.send('注册成功')
        } else {
            res.send('注册失败')
        }
    })
})

// 完善用户信息
router.get('/newUserMsg',(req,res)=>{
    User.update({username:req.query.username},req.query.thisMsg,(err)=>{
        if(!err){
            res.send('更改成功')
        }else{
            res.send('更改失败')
        }
    })
})
// 退出账号
router.get('/out',(req,res)=>{
    // 清除cookie
    res.clearCookie('username')
    res.send('清除成功')
  
  })
module.exports = router