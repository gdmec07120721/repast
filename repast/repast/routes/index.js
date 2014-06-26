
/*
 * GET home page.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'repastinfo',
    port: 3306
});
//测试
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
//企业用户注册
exports.register1=function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	var sel="SELECT * from bsdb where bsname='"+username+"'";
	var ins="insert into bsdb(bsname,password) value('"+username+"','"+password+"')";
	conn.query(sel, function(err, rows, fields) {
    if (err) throw err;
     //console.log('The solution is: ', rows[0].solution);
	 //判断注册的企业用户是否存在
	if(rows[0]!=undefined)
	{
     res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 res.write("none");
	 res.end();
	}
	else
	{
	conn=mysql.createConnection(conn.config);  
    conn.connect();	
	conn.query(ins, function(err, result) {
		 if (err) throw err;
		 console.log(result);
		 res.writeHead(200, {'Content-Type': 'text/plain'}); 
		 //把变量转换为JSON字符串
		 res.write(JSON.stringify(result));
		 res.end();
	});
	}
   });
   conn.end(); 
}
//一般用户注册
exports.register2=function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	var sel="SELECT * from usdb where ususer='"+username+"'";
	var ins="insert into usdb(ususer,password) value('"+username+"','"+password+"')";
	conn.query(sel, function(err, rows, fields) {
    if (err) throw err;
     //console.log('The solution is: ', rows[0].solution);
	 //判断注册的企业用户是否存在
	if(rows[0]!=undefined)
	{
     res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 //如果不在，返回值为none
	 res.write("none");
	 res.end();
	}
	else
	{
	conn=mysql.createConnection(conn.config);  
    conn.connect();	
	conn.query(ins, function(err, result) {
		 if (err) throw err;
		 console.log(result);
		 res.writeHead(200, {'Content-Type': 'text/plain'}); 
		 //把变量转换为JSON字符串
		 res.write(JSON.stringify(result));
		 res.end();
	});
	}
   });
   conn.end(); 
}
//企业用户登陆
exports.login1=function(req,res)
{
	var username=req.query.username;
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT * from bsdb where bsname='"+username+"'", function(err, rows, fields) {
    if (err) throw err;
     //console.log('The solution is: ', rows[0].solution);
	if(rows[0]==undefined)
	{
     res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 res.write("none");
	 res.end();
	}
	else
	{
	 console.log(rows[0]);
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
	// res.write(rows[0].password);
	//把变量转换为JSON字符串
	 res.write(JSON.stringify(rows[0]));
	 //res.sendfile('public/bsuser.html')
	 res.end();
	}
   });
   conn.end(); 
}
//一般用户登陆
exports.login2=function(req,res)
{
	var username=req.query.username;
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	//var selectSQL = 'select * from bsdb limit 8';
	conn.query("SELECT * from usdb where ususer='"+username+"'", function(err, rows, fields) {
    if (err) throw err;
     //console.log('The solution is: ', rows[0].solution);
	if(rows[0]==undefined)
	{
     res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 res.write("none");
	 res.end();
	}
	else
	{
	 console.log(rows[0]);
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
	// res.write(rows[0].password);
	//把变量转换为JSON字符串
	 res.write(JSON.stringify(rows[0]));
	 res.end();
	}
   });
   conn.end(); 
}
//查询全部企业用户
exports.order=function(req,res)
{
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT * from bsdb limit 5" , function(err, rows, fields) {
    if (err) throw err;
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
   	 res.write(JSON.stringify(rows));
	 res.end();
	});
   conn.end(); 
}
//查询某餐厅可预约的房间数
exports.usclick=function(req,res){
	var campany=req.query.campany;
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT * from bsdb where bsname='"+campany+"'", function(err, rows, fields) {
    if (err) throw err;
	 console.log(rows[0]);
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
	//把变量转换为JSON字符串
	 res.write(JSON.stringify(rows[0]));
	 res.end();
	});
   conn.end(); 
	}
//定制某餐厅的业务
exports.run=function(req,res){
	var username=req.body.username;
	var allnum=req.body.allnum;
	var roomnum=req.body.roomnum;
	var hallnum=req.body.hallnum;
	var num=req.body.num;
	var sel="SELECT * from bsdb where bsname='"+username+"'";
	var updatesql="update bsdb set room='"+allnum+"',roomnum='"+roomnum+"',hallnum='"+hallnum+"', num='"+num+"' where bsname='"+username+"'";
	//修改一条定制数据
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query(updatesql, function(err, result) {
		 if (err) throw err;
		 console.log("haha"+result.affectedRows);
		 //如果插入一条数据成功，则查询该企业的所有数据
		 if(result.affectedRows>0){
		 conn=mysql.createConnection(conn.config);  
         conn.connect();
	     conn.query(sel, function(err2, rows, fields) {
	     //console.log(rows);
	     res.writeHead(200, {'Content-Type': 'text/plain'}); 
	     res.write(JSON.stringify(rows[0]));
		 res.end();
			 });
		 }
	});
   conn.end(); 
	}
//用户预约功能
exports.queding=function(req,res){
	var username=req.query.username;
	var campany=req.query.campany;
	var clickbs=req.query.clickbs;
	var num=req.query.num;
	var roomnum=req.query.roomnum;
	var hallnum=req.query.hallnum;
	var mydate=req.query.mydate;
	//选择预约类型为大堂，则修改房间的可预约数
	if(clickbs=="1"){
		roomnum=roomnum-1;
        var updata="update bsdb set num='"+num+"',roomnum='"+roomnum+"'where bsname='"+campany+"'";
	   	conn=mysql.createConnection(conn.config);  
        conn.connect();
        conn.query(updata, function(err, rows, fields) {
		 if (err) throw err;
		 console.log(rows);
		 res.end();
	});
	}
	//选择预约类型为大堂，则修改大堂的可预约数
	else if(clickbs=="2"){
		hallnum=hallnum-1;
        var updata="update bsdb set num='"+num+"',hallnum='"+hallnum+"' where bsname='"+campany+"'";
	   	conn=mysql.createConnection(conn.config);  
        conn.connect();
        conn.query(updata, function(err, rows, fields) {
		 if (err) throw err;
		 console.log(rows);
		 res.end();
	});
}
    //修改用户预约的号码和时间
    var upd="update usdb set usnum='"+num+"',uscampany='"+campany+"',usdate='"+mydate+"' where ususer='"+username+"'";
    	conn=mysql.createConnection(conn.config);  
        conn.connect();
       conn.query(upd, function(err2, rows, fields) {
		 if (err2) throw err;
		 console.log("hahaha");
		 res.end();
	});
	//插入一条新的数据在redb表里
	var ins="insert into redb(bsname,ususer,date,num) value('"+campany+"','"+username+"','"+mydate+"','"+num+"')";
       conn.query(ins, function(err2, rows, fields) {
		 if (err2) throw err;
		 console.log("hahaha2");
		 res.end();
	});
   conn.end(); 	
	}	
//查询我的预约
exports.usindex=function(req,res){
	var username=req.query.username;
	var sle="SELECT * from usdb where ususer='"+username+"'";
	//查询我的预约记录
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query(sle, function(err, rows, fields) {
    if (err) throw err;
	 console.log(rows[0]);
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 res.write(JSON.stringify(rows[0]));
	 res.end();
	});
   conn.end(); 
	}
//主业务功能
exports.main=function(req,res){
	var username=req.query.biguser;
	var sle="SELECT * from bsdb where bsname='"+username+"'";
	//查询当前企业用户的已预约总数
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query(sle, function(err, rows, fields) {
    if (err) throw err;
	 console.log(rows[0]);
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 res.write(JSON.stringify(rows[0]));
	 res.end();
	});
   conn.end(); 
	}
//企业查询所有预约的用户信息
exports.query=function(req,res){
	var campany=req.query.campany;
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT * from redb where bsname='"+campany+"'", function(err, rows, fields) {
    if (err) throw err;
	if(rows[0]==undefined)
	{
     res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 res.write("none");
	 res.end();
	}else {
	 console.log(rows);
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
   	 res.write(JSON.stringify(rows));
	 res.end();
	 }
	});
	
   conn.end(); 
}
//删除所有预约用户
exports.delete2=function(req,res){
	var campany=req.query.campany;
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("delete from redb where bsname='"+campany+"'", function(err, row) {
    if (err) throw err;
	 console.log(row);
	});
   conn.end(); 
}
//查看详细信息
exports.chakan=function(req,res){
    var campany=req.body.campany;
	//查询指定企业的详细信息
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT * from comment where cocampany='"+campany+"' order by id desc", function(err, rows, fields) {
    if (err) throw err;
	if(rows[0]==undefined)
	{
     res.writeHead(200, {'Content-Type': 'text/plain'}); 
	 res.write("none");
	 console.log("none");
	 res.end();
	}else {
	 console.log(rows);
	 res.writeHead(200, {'Content-Type': 'text/plain'}); 
   	 res.write(JSON.stringify(rows));
	 res.end();
	}
	});
   conn.end(); 
	
}
//发表评论
exports.cosubmit=function(req,res){
    var campany=req.query.campany;
	var biguser=req.query.biguser;
	var text1=req.query.text1;
	var text2=req.query.text2;
	var mydate2=req.query.mydate2;
	//插入一条评论数据
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	var inst="insert into comment(cocampany,coname,comment,date,assess) value('"+campany+"','"+biguser+"','"+text2+"','"+mydate2+"','"+text1+"')";
       conn.query(inst, function(err2, rows, fields) {
		 if (err2) throw err;
		 console.log("ok!");
		 res.end();
	});
   conn.end(); 
	
}

	
	
	
	
	
	
	
	
	
	
	