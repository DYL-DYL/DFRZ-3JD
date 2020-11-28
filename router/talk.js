var exp = require('express')
var router = exp.Router()
var multer = require('multer')
var moment = require('moment')
var fs = require('fs')
var bodyparser = require('body-parser')
var cookie = require('cookie-parser')
router.use(bodyparser.urlencoded({ extends: false }))

router.use(cookie())

var { User, Fleshiness, Car, Flower, Snsinfo } = require('../libs/mongoose')


var storage = multer.diskStorage({
    destination: 'www/imges/talkPic',
    filename: function(req, file, callback) {
        var index = file.originalname.lastIndexOf('.')
        var filename = Date.now() + file.originalname.substring(index)
        req.body.pic = 'imges/talkPic/' + filename

        callback(null, filename)
    }
})

var upload = multer({ storage })

router.post('/addTalk', upload.single('photo'), (req, res) => {
    // console.log(req.body)
    req.body.time = Date.now()
    req.body.like = 0
    req.body.star = 0
    req.body.attention = ''
    req.body.username = req.cookies.username
    req.body.showTime = moment(req.query.time).format('YYYY-MM-DD hh:mm:ss')
    req.body.userPic = '/imges/社区-首页/list-user14.jpg'
    var data = JSON.stringify(req.body)
    data = JSON.parse(data)
    console.log(data)
    var sns = new Snsinfo(req.body)
    sns.save((err => {
        if (!err) {
            res.send('发布成功')
        } else {
            res.send('发布失败')
        }
    }))

})

module.exports = router