
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser()); 
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//-----------------

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



//app.get('/users', user.list);
app.get('/', routes.index);
//------------

app.post('/register1',routes.register1);//企业用户注册
app.post('/register2',routes.register2);//一般用户注册
app.get('/login1',routes.login1);//企业用户登陆
app.get('/login2',routes.login2);//一般用户登陆
app.post('/order',routes.order);//显示所有可预约的企业
app.get('/usclick',routes.usclick);//预约信息填写
app.post('/run',routes.run);//定制某餐厅的业务
app.get('/queding',routes.queding);//用户预约功能
app.get('/usindex',routes.usindex);//查询我的预约
app.get('/main',routes.main);//主业务功能
app.get('/query',routes.query);//企业查询所有预约的用户信息
app.get('/delete2',routes.delete2);//删除所有预约用户
app.post('/chakan',routes.chakan);//查看详细信息
app.get('/cosubmit',routes.cosubmit);//发表评论

//---------------------------
var server=http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io=require('socket.io').listen(server,{log:'false'});
//socket.io
var MySocketManager=require("./routes/MySocketManager");
var SocketManager=new MySocketManager(io);
	
app.get('/testBroadcast', SocketManager.boradcast);










