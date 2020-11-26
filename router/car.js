
// 处理学生信息的操作
var exp = require('express')
var router = exp.Router()
var bodyparser = require('body-parser')
var cookie = require('cookie-parser')
router.use(bodyparser.urlencoded({ extends: false }))

router.use(cookie())

var { User, Car } = require('../libs/mongoose')


// 进行用户信息查询
router.get('/findCar', (req, res) => {

    Car.findOne({ username: req.query.username }, (err, data) => {
        if (!err) {

        } else {
            console.log(err);
            res.send('登录失败')
        }
    })

})

//   添加购物车信息
router.get('/addCar', (req, res) => {
    Car.findOne({ username: req.query.thisShopMsg.username,name:req.query.thisShopMsg.name }, (err, data) => {
        if (!err) {
            if (data == null) {
                Car(req.query.thisShopMsg).save((err) => {
                    if (!err) {
                        res.send('成功')
                    } else {
                        console.log(err);
                        res.send('添加失败')
                    }
                })
            } else {
                var newquantity = req.query.thisShopMsg.quantity * 1 + data.quantity * 1
                Car.update({ username: req.query.thisShopMsg.username }, { quantity: newquantity }, (err) => {
                    if (!err) {
                        res.send('成功')
                    } else {
                        console.log(err);
                        res.send('更改失败')
                    }
                })
            }
        } else {
            console.log(err);
            res.send('添加失败')
        }
    })
})

// 更改数量
router.get('/newQuantity', (req, res) => {
    
    Car.update({ _id: req.query.id }, { quantity: req.query.quantity }, (err) => {
        if (!err) {
            res.send('成功')
        } else {
            console.log(err);
            res.send('更改失败')
        }
    })
})
router.get('/removeShop', (req, res) => {
    Car.remove({ _id: req.query.id }, (err) => {
        if (!err) {
            res.send('成功')
        } else {
            console.log(err);
            res.send('删除失败')
        }
    })
})

module.exports = router