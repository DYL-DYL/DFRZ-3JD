// 处理学生信息的操作
var exp = require('express')
var router = exp.Router()
var bodyparser = require('body-parser')
var cookie = require('cookie-parser')
router.use(bodyparser.urlencoded({ extends: false }))

router.use(cookie())

var { User, Fleshiness, Car, Flower } = require('../libs/mongoose')


// 进行添加商品
router.get('/addShop', (req, res) => {
    req.query.banner=req.query.banner.split(',')
    req.query.img=req.query.img.split(',')
    console.log(req.query);
    Flower(req.query).save((err)=>{
        if(!err){
            res.send('保存成功')
        }else{
            res.send('保存失败')
        }
    })
})


// 进行修改商品信息
router.get('/updateShop', (req, res) => {
    req.query.banner=req.query.banner.split(',')
    req.query.img=req.query.img.split(',')
    Flower.update({_id:req.query.id},req.query,(err)=>{
        if(!err){
            res.send('修改成功')
        }else{
            res.send('修改失败')
        }
    })
})
// 进行删除商品信息
router.get('/removeShop', (req, res) => {
    Flower.remove({ _id: req.query.id }, (err) => {
        if (!err) {
            res.send('删除成功')
        } else {
            console.log(err);
            res.send('删除失败')
        }
    })
})

// 进行删除用户信息
router.get('/removeUser', (req, res) => {
    res.clearCookie('username')
    User.remove({ _id: req.query.id }, (err) => {
        if (!err) {
            res.send('删除成功')
        } else {
            console.log(err);
            res.send('删除失败')
        }
    })
})


module.exports = router