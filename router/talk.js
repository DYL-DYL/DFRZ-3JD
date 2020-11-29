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
    req.body.like = []
    req.body.star = []
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
// 添加或删除点赞
router.get('/addLike',  (req, res) => {
    Snsinfo.findOne({_id:req.query.id},(err,data)=>{
        if(!err){
            let likeArr=data.like
            if(likeArr.indexOf(req.query.addName)!=-1){
                likeArr.splice(likeArr.indexOf(req.query.addName),1)
                updateThis(likeArr,'删除')               
            }else{
                likeArr.push(req.query.addName)
                updateThis(likeArr,'添加')       
            }
        }
    })
    function updateThis(likeArr,str){
        Snsinfo.update({_id:req.query.id},{like:likeArr},(err)=>{
            if(!err){
                res.send(str+'成功')
            }else{
                res.send(str+'失败')
            }
        })
    }
})

// 添加或删除收藏
router.get('/addStar',  (req, res) => {
    Snsinfo.findOne({_id:req.query.id},(err,data)=>{
        if(!err){
            let starArr=data.star
            if(starArr.indexOf(req.query.addName)!=-1){
                starArr.splice(starArr.indexOf(req.query.addName),1)
                updateThis(starArr,'删除')               
            }else{
                starArr.push(req.query.addName)
                updateThis(starArr,'添加')       
            }
        }
    })
    function updateThis(starArr,str){
        Snsinfo.update({_id:req.query.id},{star:starArr},(err)=>{
            if(!err){
                res.send(str+'成功')
            }else{
                res.send(str+'失败')
            }
        })
    }
})
// 添加或删除关注
router.get('/addPeople',  (req, res) => {
    User.findOne({username:req.query.User},(err,data)=>{
        if(!err){
            let userArr=data.attention
            if(userArr.indexOf(req.query.addName)!=-1){
                userArr.splice(userArr.indexOf(req.query.addName),1)
                updateThis(userArr,'删除')               
            }else{
                userArr.push(req.query.addName)
                updateThis(userArr,'添加')       
            }
        }
    })
    function updateThis(starArr,str){
        User.update({username:req.query.User},{attention:starArr},(err)=>{
            if(!err){
                res.send(str+'成功')
            }else{
                res.send(str+'失败')
            }
        })
    }
})
// 查看是否关注
router.get('/isAttention',(req,res)=>{
    User.findOne({username:req.query.User},(err,data)=>{
        if(!err){
            if(data.attention.indexOf(req.query.addName)==-1){
                res.send('关注')
            }else{
                res.send('已关注')
            }
        }
    })
})
// 获取数量
router.get('/allNum',(req,res)=>{
    var allNum={
        meStar:0,
        starMe:0,
        likeMe:0
    }
    Snsinfo.find({username:req.query.username},(err,data)=>{
        if(!err){
            data.forEach(function(item){
                allNum.likeMe=allNum.likeMe+item.like.length+item.star.length
            })
            User.findOne({username:req.query.username},(err,data)=>{
                if(!err){
                    allNum.starMe=data.attention.length
                    User.find((err,data)=>{
                        if(!err){
                            data.forEach(function(item){
                                if(item.attention.indexOf(req.query.username)!=-1){
                                    allNum.meStar++
                                }
                            })
                            res.send(allNum)
                        }
                    })
                }
            })
        }
    })
    
})
module.exports = router