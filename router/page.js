// 所有的页面跳转
// 引入模板配置
var exp = require('express')
var app = exp()
var router = exp.Router()
var { User } = require('../libs/mongoose')
var fs = require('fs')

// 首页
router.get('/', (req, res) => {
        res.render('index')
    })
    // 首页-包月鲜花
router.get('/monthly', (req, res) => {
        res.render('monthly')
    })
    // 首页-礼品花束
router.get('/gift', (req, res) => {
        res.render('gift')
    })
    // 绿植多肉
router.get('/fleshiness', (req, res) => {
        res.render('fleshiness')
    })
    // F+制物所
router.get('/moreF', (req, res) => {
        fs.readFile('./www/moreF.json', (err, data) => {
            if (!err) {
                var data = JSON.parse(data)
                res.render('moreF', { data })
            } else {
                console.log(err)
            }
        })
    })
    // 家居生活
router.get('/home', (req, res) => {
        fs.readFile('./www/home.json', (err, data) => {
            if (!err) {
                var data = JSON.parse(data)

                res.render('home', { data })
            } else {
                console.log(err)
            }
        })
    })
    // 发现
router.get('/find', (req, res) => {
    res.render('find')
})

// 我的
router.get('/mine', (req, res) => {

    res.render('mine')
})

router.get('/community', (req, res) => {
    res.render('community')
})
router.router.get('/search', (req, res) => {
    res.render('search')
})

module.exports = router