var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Flower')

var db = mongoose.connection

db.on('error', (err) => {
    console.log('数据库连接失败')
})

db.on('open', () => {
    console.log('数据库连接成功')
})


var userSchema = new mongoose.Schema({
    username: String,
    psw: String,
    phone: Number,
    sex: String,
    birthday: String,
    school: String,
    work: String,
    love: String,
    money: String,
    haveChild: String,
    buyfor: String,
    usefor: String
})
var User = mongoose.model('user', userSchema)


var userCar = new mongoose.Schema({
    username: String,
    name: String,
    quantity: Number,
    money: Number,
    price: Number,
    oldPrice: Number,
    img: String
})
var Car = mongoose.model('car', userCar)


var fleshinessSchema = new mongoose.Schema({
    img: String,
    name: String,
    price: String,
    oldPrice: String
})
var Fleshiness = mongoose.model('tab', fleshinessSchema)


var flower = new mongoose.Schema({
    page:String,
    h:String,
    title:String,
    price:String,
    oldPrice:String,
    banner:Array,
    img:Array,
    top:String
})
var Flower = mongoose.model('flower', flower)

var snsInfoSchema = new mongoose.Schema({
    img: String,
    msg: String,
    userPic: String,
    name: String,
    time: String
})
var Snsinfo = mongoose.model('snsinfo', snsInfoSchema)




module.exports = { User, Fleshiness, Car,Flower, Snsinfo }
