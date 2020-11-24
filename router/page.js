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
//社区
router.get('/community', (req, res) => {
    res.render('community')
})
//鲜花养护
router.get('/maintenance', (req, res) => {
  res.render('maintenance')
})
//我的花束
router.get('/myflower', (req, res) => {
  res.render('myflower')
})
router.get('/flower_detail', (req, res) => {
  fs.readFile('./www/flower_detail.json',(err,data)=>{
      if(!err){
        var data = JSON.parse(data)
        res.render('flower_detail',data[req.query.id-1])
      }else{
        console.log(err)
      }
    })
})
//鲜花养护-单品花束
router.get('/single_bouquet', (req, res) => {
  res.render('single_bouquet')
})
//鲜花养护-混合
router.get('/mix', (req, res) => {
  res.render('mix')
})
//鲜花养护-迷你
router.get('/mini', (req, res) => {
  res.render('mini')
})

//鲜花养护-主题
router.get('/gift_bouquet', (req, res) => {
  res.render('gift_bouquet')
})

//鲜花养护-绿植
router.get('/green_planting', (req, res) => {
  res.render('gift_bouquet')
})

//搜索
router.get('/search', (req, res) => {
    res.render('search')
})

//社区部分-发布信息
router.get('/community/talk', (req, res) => {
        res.render('community-talk')
    })
    //社区部分-我
router.get('/community/me', (req, res) => {
        res.render('community-me')
    })
    //社区部分-消息
router.get('/community/message', (req, res) => {
    res.render('community-message')
})

module.exports = router