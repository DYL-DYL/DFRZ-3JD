var exp = require('express')
var router = exp.Router()
var multer = require('multer')
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
// 查询是否点赞
router.get('/findLike',  (req, res) => {
    Snsinfo.find((err,data)=>{
        if(!err){
            data.forEach(function(item){
                if(item.like.indexOf(req.query.nowUser)==-1){
                    item.istrue=false
                }else{
                    item.istrue=true
                }
            })
        }
    })
    
})
module.exports = router