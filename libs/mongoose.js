
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
    age:Number,
    sex:String
})


var User = mongoose.model('user',userSchema)


module.exports={User}

