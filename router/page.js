// 所有的页面跳转
// 引入模板配置
var exp = require('express')
var app = exp()
var router = exp.Router()
var { User } = require('../libs/mongoose')
var fs = require('fs')
const { JSONCookie } = require('cookie-parser')

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

        res.render('mine/mine')
    })
    //社区
router.get('/community', (req, res) => {
        fs.readFile('www/data/news.json', (err, data) => {
            if (!err) {
                data = JSON.parse(data)
                res.render('community', { data })
            } else {
                console.log(err)
            }

        })

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
    fs.readFile('./www/flower.json',(err,data)=>{
        if(!err){
          var data = JSON.parse(data)
          res.render('single_bouquet',data)
        }else{
          console.log(err)
        }
      })

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
  fs.readFile('./www/flower.json',(err,data)=>{
    if(!err){
      var data = JSON.parse(data)
      res.render('gift_bouquet',data)
    }else{
      console.log(err)
    }
  })
})

//鲜花养护-绿植
router.get('/green_planting', (req, res) => {
  fs.readFile('./www/flower.json',(err,data)=>{
    if(!err){
      var data = JSON.parse(data)
      res.render('green_planting',data)
    }else{
      console.log(err)
    }
  })
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


router.get('/register', (req, res) => {
    res.render('register')
})

// 详情页
router.get('/detailPage',(req,res)=>{
    // console.log(req.query);
    fs.readFile('./www/data/detailPage.json',(err,data)=>{
        if(!err){
            var thisData=JSON.parse(data)
            res.render('detailPage',thisData[req.query.id])
        }else{
            console.log(err);
        }
    })
})

// 用户编辑页面
router.get('/mineCompile',(req,res)=>{
    res.render('mine/mineCompile')
})

// 用户常用地址
router.get('/site',(req,res)=>{
    res.render('mine/site')
})

// 完善用户信息
router.get('/mineInformation',(req,res)=>{
    res.render('mine/mineInformation')
})
// 发票
router.get('/mineInvoice',(req,res)=>{
    res.render('mine/mineInvoice')
})

// 购物车-待付款
router.get('/userCar',(req,res)=>{
    res.render('mine/userCar/payment')
})
// 购物车-全部
router.get('/all',(req,res)=>{
    res.render('mine/userCar/all')
})
// 购物车-服务中
router.get('/buying',(req,res)=>{
    res.render('mine/userCar/buying')
})
// 购物车-待评价
router.get('/buyafter',(req,res)=>{
    res.render('mine/userCar/buyafter')
})
// 购物车-已完成
router.get('/buyend',(req,res)=>{
    res.render('mine/userCar/buyend')
})
module.exports = router