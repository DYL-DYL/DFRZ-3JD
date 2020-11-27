// 所有的页面跳转
// 引入模板配置
var exp = require('express')
var app = exp()
var router = exp.Router()

var { User, Fleshiness, Car, Flower, Snsinfo } = require('../libs/mongoose')
var fs = require('fs')
const { JSONCookie } = require('cookie-parser')
const cookie = require('cookie-parser')
const { render } = require('art-template')
router.use(cookie())


// 首页
router.get('/', (req, res) => {
  let thisData = {
    flash: '',
    New: '',
    hot: '',
    find: ''
  }
  Flower.find({ page: 'index/list1' }, (err, data) => {
    if (!err) {
      thisData.flash = data
      Flower.find({ page: 'index/list2' }, (err, data) => {
        if (!err) {
          thisData.New = data
          Flower.find({ page: 'index/list3' }, (err, data) => {
            if (!err) {
              thisData.hot = data
              Flower.find({ page: 'index/list4' }, (err, data) => {
                if (!err) {
                  thisData.find = data
                  res.render('index', thisData)
                }
              })
            }
          })
        }
      })
    }
  })
})

// 首页-包月鲜花
router.get('/monthly', (req, res) => {

  let thisData = {
    list1: '',
    list2: '',
    list3: ''
  }

  Flower.find({ page: 'monthly/list1' }, (err, data) => {
    if (!err) {
      thisData.list1 = data
      Flower.find({ page: 'monthly/list2' }, (err, data2) => {
        if (!err) {
          thisData.list2 = data2
          Flower.find({ page: 'monthly/list3' }, (err, data3) => {
            if (!err) {
              thisData.list3 = data3
              res.render('monthly', thisData)
            }
          })
        }

      })
    }
  })
})
// 首页-礼品花束

router.get('/gift', (req, res) => {
  res.render('gift')
})
// 绿植多肉
router.get('/fleshiness', (req, res) => {
  let thisData = {
    news: '',
    hot: ''
  }
  Flower.find({ page: 'search/list1' }, (err, data) => {
    if (!err) {
      var result = []
      for (var i = 0; i < data.length; i += 3) {
        result.push(data.slice(i, i + 3))
      }
      thisData.news = result
      Flower.find({ page: 'search/list2' }, (err, data2) => {
        if (!err) {
          thisData.hot = data2
          res.render('fleshiness', thisData)
        }
      })
    }
  })
})

// F+制物所
router.get('/moreF', (req, res) => {
  let thisData = {
    flash: '',
    new: '',
    hot: '',
    find: ''
  }
  Flower.find({ page: 'moreF' }, (err, data) => {
    if (!err) {
      thisData.flash = data
      res.render('moreF', thisData)
    }
  })
})
// 家居生活
router.get('/home', (req, res) => {
  let thisData = {
    flash: '',
    news: '',
    hot: '',
    find: ''
  }
  Flower.find({ page: 'home/new' }, (err, data) => {
    if (!err) {
      var result = []
      for (var i = 0; i < data.length; i += 3) {
        result.push(data.slice(i, i + 3))
      }
      thisData.news = result
      Flower.find({ page: 'home/list' }, (err, data) => {
        thisData.list = data
        res.render('home', thisData)
      })

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

  fs.readFile('./www/flower_detail.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('flower_detail', data[req.query.id - 1])
    } else {
      console.log(err)
    }
  })
})
//鲜花养护-单品花束
router.get('/single_bouquet', (req, res) => {
  fs.readFile('./www/flower.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('single_bouquet', data)
    } else {
      console.log(err)
    }
  })

})
//鲜花养护-混合
router.get('/flower_detail', (req, res) => {
  fs.readFile('./www/flower_detail.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('flower_detail', data[req.query.id - 1])
    } else {
      console.log(err)
    }
  })
})
//鲜花养护-单品花束
router.get('/single_bouquet', (req, res) => {
  fs.readFile('./www/flower.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('single_bouquet', data)
    } else {
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

  fs.readFile('./www/flower.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('gift_bouquet', data)
    } else {
      console.log(err)
    }
  })

  fs.readFile('./www/flower.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('gift_bouquet', data)
    } else {
      console.log(err)
    }
  })

})

//鲜花养护-绿植
router.get('/green_planting', (req, res) => {

  fs.readFile('./www/flower.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('green_planting', data)
    } else {
      console.log(err)
    }
  })

  fs.readFile('./www/flower.json', (err, data) => {
    if (!err) {
      var data = JSON.parse(data)
      res.render('green_planting', data)
    } else {
      console.log(err)
    }
  })

})
//社区花朵最里面的详情

router.get('/single_detail', (req, res) => {
  res.render('single_detail')
})
//搜索
router.get('/search', (req, res) => {
  res.render('search')
})
router.get('/searchinfo', (req, res) => {
  Fleshiness.find({}, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
    }
  })
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
router.get('/detailPage', (req, res) => {

  Flower.findOne({ _id: req.query.id }, (err, data) => {
    if (!err) {
      res.render('detailPage', { data })
    }
  })
})

// 用户编辑页面
router.get('/mineCompile', (req, res) => {
  res.render('mine/mineCompile')
})

// 用户常用地址
router.get('/site', (req, res) => {
  res.render('mine/site')
})

// 完善用户信息
router.get('/mineInformation', (req, res) => {
  res.render('mine/mineInformation')
})
// 发票
router.get('/mineInvoice', (req, res) => {
  res.render('mine/mineInvoice')
})

// 购物车-待付款

router.get('/userCar', (req, res) => {
  Car.find({ username: req.cookies.username }, (err, data) => {
    if (!err) {
      res.render('mine/userCar/payment', { data })
    }
  })

})
// 购物车-全部
router.get('/all', (req, res) => {
  res.render('mine/userCar/all')
})
// 购物车-服务中
router.get('/buying', (req, res) => {
  res.render('mine/userCar/buying')
})
// 购物车-待评价
router.get('/buyafter', (req, res) => {
  res.render('mine/userCar/buyafter')
})
// 购物车-已完成
router.get('/buyend', (req, res) => {

  res.render('mine/userCar/buyend')
})

// 管理员登录页面
router.get('/admin', (req, res) => {

  res.render('Administrator/admin')
})
// 管理鲜花
router.get('/listFlower', (req, res) => {
  Flower.find((err, data) => {
    if (!err) {
      res.render('Administrator/FlowerAdmin/listFlower', { data })
    }
  })

})
// 添加鲜花
router.get('/addFlower', (req, res) => {
  res.render('Administrator/FlowerAdmin/addFlower')
})
// 管理用户
router.get('/listUser', (req, res) => {
  res.render('Administrator/UserAdmin/listUser')
})
// 修改商品
router.get('/findShop', (req, res) => {
  Flower.findOne({ _id: req.query.id }, (err, data) => {
    if (!err) {
      res.render('Administrator/FlowerAdmin/updateFlower', { data })
    }
  })
})
router.get('/snsContent', (req, res) => {
  // console.log(req.query)
  Snsinfo.find({ name: req.query.name }, (err, data) => {
    if (!err) {
      res.render('snsContent', { data: data[0] })
    }
  })
})
//我的小工具
//赠品
router.get('/active_99', (req, res) => {
  res.render('mine/tools/active')
})
//花艺课
router.get('/teacher', (req, res) => {
  res.render('mine/tools/teacher')
})
//随花购

router.get('/come_buy', (req, res) => {
  res.render('mine/tools/come_buy')

})
//兑换
router.get('/dh', (req, res) => {
  res.render('mine/tools/dh')
})
//优惠
router.get('/upgradelist', (req, res) => {
  res.render('mine/tools/upgradelist')
})
//换购 
router.get('/coupon', (req, res) => {
  res.render('mine/tools/coupon')
})
//当日达订单
router.get('/order_list', (req, res) => {
  res.render('mine/tools/order_list')
})
//花卡
router.get('/block', (req, res) => {
  res.render('mine/tools/block')
})
module.exports = router