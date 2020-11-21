// 只处理模板的功能
var template = require('art-template');
var exp = require('express')
var app = exp()


app.engine('.html', require('express-art-template'));
app.set('view engine', 'html')

app.set('views', './views');

template.defaults.cache = false;
template.defaults.extname = '.html';


module.exports = template;