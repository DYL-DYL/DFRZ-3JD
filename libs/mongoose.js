
var mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/Flower')

var db = mongoose.connection

db.on('error',(err)=>{
  console.log('数据库连接失败')
})

db.on('open',()=>{
  console.log('数据库连接成功')
})


var userSchema=new mongoose.Schema({
    username:String,
    psw:String,
    phone:Number,
    sex:String,
    birthday:String,
    school:String,
    work:String,
    love:String,
    money:String,
    haveChild:String,
    buyfor:String,
    usefor:String
})
var User = mongoose.model('user',userSchema)


var userCar = new mongoose.Schema({
    username:String,
    name:String,
    quantity:Number,
    money:Number,
    price:Number,
    oldPrice:Number,
    img:String
})
var Car = mongoose.model('car',userCar)



module.exports={User,Car}

