// JavaScript Document

$(function(){

var socket=io.connect();
	  var biguser="";
	  var globalCounter=0;
      var campany="";
	  var clickbs="";
	  var room=0;
	  var num=0;
	  var hallnum=0;
	  var roomnum=0;
	  var no=0;
	  var mynum=0;
	  
//注册--------------------------------------------
	  $("#regist").click(function(){
		   
		   var username=$("#zcusername").val();
		   //alert(userName);
		   console.log(username);
		   var password=$("#zcpassword").val();
		   console.log(password);
		   //alert(password);
		   var password2=$("#zcpassword2").val();
		   console.log(password2);
		   var user=$('input:radio[name="radio-choice-w"]:checked').val();   
		   console.log(user);
		   //var rel=$("#register").attr("rel");
		   //alert(rel);
		   //alert(user);

		   if(username==""&&password==""){
			   alert("用户名和密码不能为空");
		   }
		   else if(username==""){
			   alert("用户名不能为空");
		   }
		    else if(password==""){
			   alert("密码不能为空");
		   }
		   else{
		   if(password!=password2){
			    alert("输入密码不一致，请重新输入！");
		   }
		   else{
			  if(user=="1"){
			 $.post("/register1", { 'username':username, 'password': password},
                     function(data){
                         if(data=="none")
						{
							alert("用户已存在!");
						}
						else{
						  var result=JSON.parse(data);
						 
						  
						  if(result.affectedRows=='1')
						  {
							  alert("保存成功!");
							  location.href = "login.html";
						  }
						  else
						  {
							  alert("保存失败!"); 
						  }
						  }
                     });
					 
			   }
			   
			   else if(user=="2"){
				    $.post("/register2", { 'username':username, 'password': password},
                     function(data){
                         if(data=="none")
						{
							alert("用户已存在!");
						}
						else{
						  var result=JSON.parse(data);
						  if(result.affectedRows=='1')
						  {
							  alert("保存成功!");
                              location.href = "login.html";
						  }
						  else
						  {
							  alert("保存失败!"); 
						  }
						  }
                     });
			   }
			
			}
			}
			});
	//登陆--------------------------------------------
	  //var use="";
      $("#login").click(function(){
          var username=$("#username").val();
          var password=$("#password").val();
          var user=$('input:radio[name="radio-choice-w-6"]:checked').val();
          //alert(username+""+password+""+user); 
          if(username==""&&password==""){
                 alert("用户名和密码不能为空");
				 
             }
             else if(username==""){
                 alert("用户名不能为空");
				 
             }
             else if(password==""){
                 alert("密码不能为空");
				 
             }
             else{
				 //企业用户登陆
                if(user=="1"){
				
                $.get("/login1", { 'username':username},
                       function(data){
                            //alert("Data Loaded: " + data);
                             if(data=="none"){
                                alert("用户不存在!");
								$("#login").attr({ href :"#page"}) 
                                }
						    
                             else { 
							    var result=JSON.parse(data);
								
								if(result.password!=password){
								 //alert(result.password);
								 alert("密码不正确!");
								 location.href = "login.html";   
								}
                               else{
								
                                //alert("欢迎!"+result.bsname);
								biguser=result.bsname;
								//alert(biguser);
								$("#name").html(biguser);
								$("#login").attr({ href :"#bspage1"});
                                
							   }
                            }
                           
                       });
                 }
               //一般用户登陆    
                 else if(user=="2"){
					  
                       $.get("/login2", { 'username':username},
                       function(data){
                            //alert("Data Loaded: " + data);
                           if(data=="none"){
                                alert("用户不存在!"); 
                                  
                                }
								
                               else { 
							    var result=JSON.parse(data);
								if(result.password!=password){
								 //alert(result.password);
								 alert("密码不正确!");
								    
								}
                               else{
                                //alert("欢迎!"+result.ususer);
								biguser=result.ususer;
								$("#usname").html(biguser);
                                 $("#login").attr({ href : "#uspage1"});
                                
							   }
                            }
                           
                       });
                 }
              
              }
              });
      	  
    //业务定制
	  $("#run").click(function(){
		   var username=biguser;
		   var allnum=$("#allnum").val();
		   var hallnum=$("#hallnum").val();
		   var roomnum=$("#roomnum").val();
		   //alert(num);
		   //alert(username);
		   $.post("/run",{username:username,allnum:allnum,hallnum:hallnum,roomnum:roomnum,num:num},function(date){
			    alert("设置成功！");
				location.href = "login.html#bspage1";
			    var result=JSON.parse(data);
				
			   });
		   
		  });
	//主业务功能
        $("#main2").click(function(){
			      //alert(biguser);
		 $.get("/main",{biguser:biguser},function(data){
			  //alert(data);
			  var result=JSON.parse(data);
			  $("#mainno").html(result.num);
			});
		});
//统计查询
	  $("#query").click(function(){
		  var campany=biguser;
		  //alert(campany);
		  $.get("/query",{campany:campany},function(data){
			  if(data=="none"){
				  alert("目前还没有人预约！");
			  }else{
			  var json=JSON.parse(data);
			   //alert(data);
			   for(var i=0;i<json.length;i++){
				   var ususer=JSON.stringify(json[i].ususer);
				   var date=JSON.stringify(json[i].date);
				   var renum=JSON.stringify(json[i].num);
				   ususer = ususer.replace(/(^\"*)|(\"*$)/g, "");
				   date = date.replace(/(^\"*)|(\"*$)/g, "");
				   renum = renum.replace(/(^\"*)|(\"*$)/g, "");
					var id=i+1;
					//alert(campany);
					$("#a"+id).html(id+"."+ususer);
					$("#b"+id).html(renum);
					$("#c"+id).html(date);
					location.href = "login.html#demo-page";
				   }
			  }
		 });
		  
		  });
	  $("#ok").click(function(){
		  alert("设定成功");
		  });
	//显示可预约的所有企业--------------------------------------------------
	  $("#order").click(function(){
		  var username=biguser;
		   //alert(username);
		   $("#zyusname").html(biguser);
		   $.post("/order",{'username':username},
                       function(data){
						  　  var json=JSON.parse(data);
						   //aa=eval(data)
						  // alert(data);
						     for(var i=0;i<json.length;i++){
								 campany=JSON.stringify(json[i].bsname);
								 campany = campany.replace(/(^\"*)|(\"*$)/g, "");
								  var id=i+1;
								  //alert(campany);
								  $("#"+id).html(campany);
                                 }
					   });
		  });  
	//返回时清空campany的值
	$("#return1").click(function(){
		$("#font").html("");
		$("#room").html("");
		campay="";
		clickbs="";
		$("#yynum").html("请耐心等待...");
		});
    //用户预约功能
		$("button").click(function(){
		var idno=$(this).attr("id");
		
		//alert(idno);
		switch(idno){
			case "1":
			campany=$("#1").html();
			 $("#font").html(campany);
			 break; 
			case "2":
			campany=$("#2").html();
			 $("#font").html(campany);
			 break; 
			case "3":
			campany=$("#3").html();
			 $("#font").html(campany);
			 break; 
			case "4":
			campany=$("#4").html();
			 $("#font").html(campany);
			 break;  
			default :
			campany=$("#5").html();
			 $("#font").html(campany);
			 break; 
		}
	  socket.on('user message',function(data){
	  no=data.no;
	  var cam=data.company;
	  //alert(no);
	  if(campany==cam){
	  //alert(cam);
	  $("#yynum").html(no);
	  $("#yynum2").html(no);
	   }else{
		   $("#yynum").html("请耐心等待...");
	   }
	 });
		
		 $.get("/usclick",{campany:campany},function(data){
				  var result=JSON.parse(data);
				  //alert(result.room);
				  if(result.room==""){
					  alert("null")
					  //$("#room").html(预约已满);
				  }
				  else{
					  room=result.room;
					  roomnum=result.roomnum;
					  hallnum=result.hallnum;
					  num=result.num;
				      $("#room").html(room);
					  $("#yyroomnum").html(roomnum);
					  $("#yyhallnum").html(hallnum);
					  $("#num").html(num);
					  $("#infousname2").html(campany+"的预约信息");
				  }
				  });
		});

    //叫号------------------------------------
               
	 $("#btn_send").click(function(){
		 console.log("clicked!!");
		 socket.emit('username',$("#username").val());
		 });
$("#btn_next").click(function(){
		      globalCounter=globalCounter+1;
			$("#currentNo").html(globalCounter);
		   });
		 
 $("#btn_pre").click(function(){
		    if(globalCounter>0)
			{
		      globalCounter=globalCounter-1;
			}
			$("#currentNo").html(globalCounter);
		   });
 $("#btn_broadcast").click(function(){
		    
			socket.emit('message',{no:globalCounter,company:biguser});
			
			socket.emit('clientBroadcast',{no:globalCounter,company:biguser});

		 });	
		 
		 
 });