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
    req.query.banner=[req.query.banner]
    req.query.img=[req.query.img]
    Flower(req.query).save((err)=>{
        if(!err){
            res.send('保存成功')
        }else{
            res.send('保存失败')
        }
    })
})

// 进行查询商品信息
router.get('/findShop', (req, res) => {
    console.log(req.query.id);
    Flower.findOne({_id:req.query.id},(err,data)=>{
        if(!err){
            console.log(data);
            res.render('')
        }
    })
})
// 进行修改商品信息
router.get('/updateShop', (req, res) => {
    console.log(req.query.id);
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


module.exports = router