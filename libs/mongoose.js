
var mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/BookManager')

var db = mongoose.connection

db.on('error',(err)=>{
  console.log('连接失败')
})

db.on('open',()=>{
  console.log('连接成功')
})


var userSchema=new mongoose.Schema({
    name:String,
    psw:String,
    phone:Number
})


var User = mongoose.model('user',userSchema)


module.exports={User}

