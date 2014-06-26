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
	//当点击id为“regist”的按钮，即“注册”按钮
	  $("#regist").click(function(){
		   //获取注册用户名
		   var username=$("#zcusername").val();
		   //获取注册密码
		   var password=$("#zcpassword").val();
		   //获取注册确认密码
		   var password2=$("#zcpassword2").val();
		   //获取注册选择类型
		   var user=$('input:radio[name="radio-choice-w"]:checked').val();
		   //判断用户名或密码是否为空  
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
			  //判断注册选择的类型为企业用户
			  if(user=="1"){
		      //发送注册的用户名和密码到后台保存到数据库
			 $.post("/register1", { 'username':username, 'password': password},
                     function(data){
						 //返回的值为node，则提示"用户已存在"
                         if(data=="none")
						{
							alert("用户已存在!");
						}
						else{
						  //把返回的字符串转为json对象 
						  var result=JSON.parse(data);
						  //判断获取的返回值是否为“1”，
						  if(result.affectedRows=='1')
						  {
							  alert("保存成功!");
							 //跳转到登陆页面
							  location.href = "login.html";
						  }
						  else
						  {
							  alert("保存失败!"); 
						  }
						  }
                     });
					 
			   }
			   //判断注册选择的类型为个人用户
			   else if(user=="2"){
				    $.post("/register2", { 'username':username, 'password': password},
                     function(data){
						 //返回的值为node，则提示"用户已存在"
                         if(data=="none")
						{
							alert("用户已存在!");
						}
						else{
						  //把返回的字符串转为json对象 
						  var result=JSON.parse(data);
						  //判断获取的返回值是否为“1”，
						  if(result.affectedRows=='1')
						  {
							  alert("保存成功!");
							  //跳转到登陆页面
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
	  //当点击id为“login”的按钮，即“双击登陆”按钮
      $("#login").click(function(){
		  //获取登陆的用户名
          var username=$("#username").val();
		  //获取登陆的密码
          var password=$("#password").val();
		  //获取登陆选择的类型
          var user=$('input:radio[name="radio-choice-w-6"]:checked').val();
          //alert(username+""+password+""+user); 
		  //判断登陆时输入的用户名或者密码是否为空
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
				//把用户名传送到后台
                $.get("/login1", { 'username':username},
                       function(data){
                            //alert("Data Loaded: " + data);
							//判断该用户是否存在若返回“none”则提示用户不存在
                             if(data=="none"){
                                alert("用户不存在!");
								$("#login").attr({ href :"#page"}) 
                                }
						    //否则，获取返回值
                             else {
								//把返回的字符串转为json对象 
							    var result=JSON.parse(data);
								//判断返回相对应企业用户名的密码是否与输入的密码相符合
								if(result.password!=password){
								 //alert(result.password);
								 //密码不相符合，提示密码不正确
								 alert("密码不正确!");
								 //并返回重新登陆
								 location.href = "login.html";   
								}
                               else{
								//密码相符合，则获取登陆的企业用户名
								biguser=result.bsname;
								//alert(biguser);
								//把登陆成功的企业用户名赋值给id为“name”的地方
								$("#name").html(biguser);
								//在id为“login”的地方添加链接，链接为”bspage1“，即企业用户的主页
								$("#login").attr({ href :"#bspage1"});
                                
							   }
                            }
                           
                       });
                 }
               //个人用户登陆    
                 else if(user=="2"){
					  //把用户名传送到后台
                       $.get("/login2", { 'username':username},
                       function(data){
                            //alert("Data Loaded: " + data);
							//判断该用户是否存在若返回“none”则提示用户不存在
                           if(data=="none"){
                                alert("用户不存在!"); 
                                }
                               else { 
							    //把返回的字符串转为json对象 
							    var result=JSON.parse(data);
								//判断返回相对应个人用户名的密码是否与输入的密码相符合
								if(result.password!=password){
								 //alert(result.password);
								 alert("密码不正确!");
								    
								}
							   //否则，获取返回值
                               else{
                                //alert("欢迎!"+result.ususer);
								//密码相符合，则获取登陆的个人用户名
								biguser=result.ususer;
								//把登陆成功的个人用户名赋值给id为“name”的地方
								$("#usname").html(biguser);
								//在id为“login”的地方添加链接，链接为”uspage1“即个人用户的主页
                                $("#login").attr({ href : "#uspage1"});
                                
							   }
                            }
                           
                       });
                 }
              }
              });
      
    //业务定制
	//当点击id为“run”的按钮，即”业务定制“按钮
	  $("#run").click(function(){
		   //获取当前登陆的企业用户名
		   var username=biguser;
		   //获取当前定制可预约的总数
		   var allnum=$("#allnum").val();
		   //获取当前定制的大堂可预约数
		   var hallnum=$("#hallnum").val();
		   //获取当前定制的房间可预约数
		   var roomnum=$("#roomnum").val();
		   //把当前执行定制的企业用户名、可预约的总数、可预约的大堂数、可预约的房间数传送到后台
		   $.post("/run",{username:username,allnum:allnum,hallnum:hallnum,roomnum:roomnum},function(date){
			    var result=JSON.parse(data);
			   //返回值不为空则提示“设置成功”
			    alert("设置成功！");
				//跳转到“login.html#bspage1”，即企业的主页面
				location.href = "login.html#bspage1";
			   });
		  });
     
	//主业务功能
	//当点击id为“main2”的按钮，即”主业务功能“按钮
        $("#main2").click(function(){
	     //把当前登陆的企业用户名传送到后台
		 $.get("/main",{biguser:biguser},function(data){
			 //把返回的字符串转为json对象 
			  var result=JSON.parse(data);
			  //把返回的值赋给id为“mainno”的地方
			  $("#mainno").html(result.num);
			});
		});
	//叫号------------------------------------          
	 $("#btn_send").click(function(){
		 console.log("clicked!!");
		 socket.emit('username',$("#username").val());
		 });
	 //当点击id为“btn_pre”的按钮，即企业用户主业务功能页面的”上一位“按钮	
	 $("#btn_pre").click(function(){
		    //如果当前的globalCounter值大于0则减1
		    if(globalCounter>0)
			{
		      globalCounter=globalCounter-1;
			}
			$("#currentNo").html(globalCounter);
		   });
     //当点击id为“btn_next”的按钮，即企业用户主业务功能页面的”下一位“按钮
	 $("#btn_next").click(function(){
		      //globalCounter值加1
		      globalCounter=globalCounter+1;
			  $("#currentNo").html(globalCounter);
		   });
	 //当点击id为“btn_set”的按钮，即企业用户主业务功能页面的”设置“按钮
     $("#btn_set").click(function(){
		    //把设置的值赋给globalCounter
		    globalCounter=Number($("#number").val());
			$("#currentNo").html(globalCounter);
		   });
     //当点击id为“btn_broadcast”的按钮，即企业用户主业务功能页面的”广播叫号“按钮 
	 $("#btn_broadcast").click(function(){
		    //把当前的号码和企业名传送给后台
			socket.emit('message',{no:globalCounter,company:biguser});
			//同上
			socket.emit('clientBroadcast',{no:globalCounter,company:biguser});

		 });
	//统计查询
	//当点击id为“query”的按钮，即”统计查询“按钮
	  $("#query").click(function(){
		  //获取当前登陆的企业用户名
		  var campany=biguser;
		  //把当前登陆的企业用户名传送到后台
		  $.get("/query",{campany:campany},function(data){
			  //查询该企业是否有人预约，若返回值为“none”,则提示“目前还没有人预约”
			  if(data=="none"){
				  alert("目前还没有人预约！");
			  }
			  //否则获取返回值
			  else{
			  //把返回的字符串转为json对象
			  var json=JSON.parse(data);
			  //把返回的数组数据一条条输出
			   for(var i=0;i<json.length;i++){
				   //把json对象转为字符串，获取预约的用户
				   var ususer=JSON.stringify(json[i].ususer);
				   //把json对象转为字符串，获取预约的时间
				   var date=JSON.stringify(json[i].date);
				   //把json对象转为字符串，获取预约的号码
				   var renum=JSON.stringify(json[i].num);
				   //去掉字符串上的双引号
				   ususer = ususer.replace(/(^\"*)|(\"*$)/g, "");
				   date = date.replace(/(^\"*)|(\"*$)/g, "");
				   renum = renum.replace(/(^\"*)|(\"*$)/g, "");
				    var id=i+1;
					$("#a"+id).html(id+"."+ususer);
					$("#b"+id).html(renum);
					$("#c"+id).html(date);
					//跳转到“login.html#demo-page”，即统计查询页面
					location.href = "login.html#demo-page";
				   }
			  }
		 });
		  });
     //删除所有预约用户
     $("#delete").click(function(){
		  //alert(biguser)
		var campany=biguser;
		 $.get("/delete2",{campany:campany},function(data){
			 alert("删除成功！");
		 });
		});
	//人员定制
	//当点击id为“ok”的按钮，即人员定制页面的”确定“按钮
	  $("#ok").click(function(){
		  alert("设定成功");
		  });
	//显示可预约的所有企业--------------------------------------------------
	//当点击id为“order”的按钮，即个人用户主页面的”预约“按钮
	  $("#order").click(function(){
		  //获取当前登陆的个人用户名
		  var username=biguser;
		  //把个人用户名赋值给id为”zyesname“的地方
		   $("#zyusname").html(biguser);
		  //把当前登陆的个人用户名传送到后台
		   $.post("/order",{'username':username},
                       function(data){
						   //把返回的字符串转为json值
						  　 var json=JSON.parse(data);
						    //获取所有可预约的企业
						     for(var i=0;i<json.length;i++){
								 //把json转化为字符串
								 campany=JSON.stringify(json[i].bsname);
								 //去掉获取到值的双引号
								 campany = campany.replace(/(^\"*)|(\"*$)/g, "");
								  var id=i+1;
								  //alert(campany);
								  //在赋值给指定的id值的地方
								  $("#"+id).html(campany);
                                 }
					   });
		  });  
	//返回时清空campany的值
	//当点击id为“return1”的按钮，即个人用户指定企业的预约信息填写页面的”返回“按钮
	$("#return1").click(function(){
		//id为font的地方值为空
		$("#font").html("");
		//id为room的地方值为空
		$("#room").html("");
		//返回后，指定的企业名为空
		campay="";
		clickbs="";
		//id为yynum的地方值”请耐心等待“
		$("#yynum").html("请耐心等待...");
		});
    //预约信息---------------------------------------
	//当点击id为“button”的按钮，即个人用户显示所有可预约企业页面的select组
		$("button").click(function(){
		//获取select选中的值
		var idno=$(this).attr("id");
		//alert(idno);
		//判断选择的值是什么，然后执行相对应的事件
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
		//获取广播值
		socket.on('user message',function(data){
		no=data.no;
		var cam=data.company;
	   // alert(no);
		if(campany==cam){
		//alert(cam);
		$("#yynum").html(no);
		//$("#yynum2").html(no);
		 }
	   });
		//把当前选中的企业名传送到后台，进行预约信息的查询
	   $.get("/usclick",{campany:campany},function(data){
		        //把返回的字符串值转为json
				var result=JSON.parse(data);
				//若返回可预约的数为空，则提示为”null“
				if(result.room==""){
					alert("null")
				}
				//否则，获取相对应的值
				else{
					//获取当前指定企业可预约总数
					room=result.room;
					//获取当前选定企业的可预约房间数
					roomnum=result.roomnum;
					//获取当前选定企业可预约大堂数
					hallnum=result.hallnum;
					//获取当前选定企业已被预约数
					num=result.num;
					//把可预约的总数赋值给id为”room“的地方
					$("#room").html(room);
					//把可预约的房间数赋值给id为”roomnum“的地方
					$("#yyroomnum").html(roomnum);
					//把可预约的大堂数赋值给id为hallnum“的地方
					$("#yyhallnum").html(hallnum);
					//把已预约的总数赋值给id为num“的地方
					$("#num").html(num);
					$("#infousname2").html(campany+"的预约信息");
				}
				});
	  });
     //用户预约
	 //当点击id为“queding”的按钮，即个人用户指定企业的信息填写页面”确定“预约按钮
	 $("#queding").click(function(){
		 var username=biguser;
		 //Date 对象自动使用当前的日期和时间作为其初始值
		 var mydate = new Date();
		 //获取当前年月日和时间
		 mydate=mydate.toLocaleDateString()+mydate.toLocaleTimeString();
		 //获取radio的值
		 clickbs=$('input:radio[name="radio-choice"]:checked').val();
		 //如果企业可预约的值等于已预约的值，则提示”预约已满“
		 if(room==num){
			 alert("餐厅预约已满,请选择其他餐厅！");
			 location.href = "login.html#uspage2";   
		 }
		 //否则，预约继续
		 else{
		//可已预约数加1
		 num=num+1
		 //提示预约成功
         alert("预约成功！您的预约号码是："+num);
		 //alert(biguser); 
		 $("#num").html(num);
		 //$("#myyuyue").html(campany);
		 $("#myyuyue").html("在"+campany+"预约号："+num);
		 //$("#mynum").html(num);	
		 $("#mydate").html(mydate);		
		 //alert(biguser);
		 //把预约的企业名、选择的预约类型、预约到的号码、指定企业当前剩余的房间数、指定企业当前剩余的大堂数、当前预约的用户名和当前预约的时间传送到后台
         $.get("/queding",{campany:campany,clickbs:clickbs,num:num,roomnum:roomnum,hallnum:hallnum,username:username,mydate:mydate},function(data){
			  var result=JSON.parse(data);
			 });
			 }
		 });
    		  
    //查询我的预约
	//当点击id为“usindex”的按钮，即个人主页”我的预约“按钮
    $("#usindex").click(function(){
		var username=biguser
		//把当前登陆的个人用户名传送到后台，进行我的预约查询
		 $.get("/usindex",{username:username},function(data){
			 //把获取的字符串值转为json值
			  var result=JSON.parse(data);
			  mynum=result.usnum;
			  var cam2=result.uscampany;
			  $("#myyuyue").html("在"+cam2+"预约号："+mynum);
			  $("#mydate").html(result.usdate);
              //获取广播的值
			   socket.on('serverBroadcast',function(data){
	           no=data.no;
			   //获取当前选定的企业名
	           var cam1=data.company;
	           //alert(no);
			   //判断广播的企业是否与选定的企业名相同
	           if(cam2==cam1){
	           //alert(cam1);
			   //$("#yynum").html(no);
	           $("#yynum2").html(no);
	           }
	 });
		 });
		});

  //查询详细信息
  //当点击id为“chakan”的按钮，即个人用户指定企业的信息填写页面”查看详细信息“按钮
  $("#chakan").click(function(){
	      //alert(campany);
		  //alert(biguser);
		  $("#campany1").html(campany);
		  $("#campany2").html(campany);
		 $.post("/chakan",{campany:campany},function(data){
				   //alert(data);
				   //判断返回值是否为”none，若是，评论列表则为空
				   if(data=="none"){
					for(var i=0;i<5;i++){
					var id=i+1;
					//alert(campany);
					var com="";
					alert($("#d"+id).html(com));
					$("#e"+id).html(com);
					$("#f"+id).html(com);
					$("#g"+id).html(com);
									   }
				   }
				   //否则，获取值并赋给评论列表
				   else{
				   var json=JSON.parse(data);
				   for(var i=0;i<json.length;i++){
				   //把获取的json值转化为字符串
				   var coname=JSON.stringify(json[i].coname);
				   var comment=JSON.stringify(json[i].comment);
				   var date=JSON.stringify(json[i].date);
				   var assess=JSON.stringify(json[i].assess);
				   //去掉字符串中的双引号
				   coname = coname.replace(/(^\"*)|(\"*$)/g, "");
				   comment = comment.replace(/(^\"*)|(\"*$)/g, "");
				   date = date.replace(/(^\"*)|(\"*$)/g, "");
				   assess = assess.replace(/(^\"*)|(\"*$)/g, "");
					var id=i+1;
					//alert(campany);
					$("#d"+id).html(coname);
					$("#e"+id).html("评价："+assess);
					$("#f"+id).html(comment);
					$("#g"+id).html(date);
				   }
				   }
		 });
		});
  //刷新
   //当点击id为“chakan”的按钮，即个人用户指定企业的详细信息页面的”刷新“按钮，重新查询指定的企业详细信息
    $("#refresh").click(function(){
	      //alert(campany);
		  //alert(biguser);
		  $("#campany1").html(campany);
		  $("#campany2").html(campany);
		 $.post("/chakan",{campany:campany},function(data){
              var json=JSON.parse(data);
						   //aa=eval(data)
						  // alert(data);
				   for(var i=0;i<json.length;i++){
				   var coname=JSON.stringify(json[i].coname);
				   var comment=JSON.stringify(json[i].comment);
				   var date=JSON.stringify(json[i].date);
				   var assess=JSON.stringify(json[i].assess);
				   coname = coname.replace(/(^\"*)|(\"*$)/g, "");
				   comment = comment.replace(/(^\"*)|(\"*$)/g, "");
				   date = date.replace(/(^\"*)|(\"*$)/g, "");
				   assess = assess.replace(/(^\"*)|(\"*$)/g, "");
					var id=i+1;
					//alert(campany);
					$("#d"+id).html(coname);
					$("#e"+id).html("评价："+assess);
					$("#f"+id).html(comment);
					$("#g"+id).html(date);
				   }
		 });
		});
  //添加评论
       //当点击id为“chakan”的按钮，即个人用户指定企业的详细信息页面的”评论“按钮，
       $("#submit").click(function(){
		  //获取当前选中评价值
		  var text1=$('#note_utilisateur option:selected').text();
		  //获取当前评论的内容
		  var text2=$("#textarea-1").val();
		  //获取当前评论的时间
		  var mydate2 = new Date();
		  mydate2=mydate2.toLocaleDateString()+mydate2.toLocaleTimeString();
		  //alert(mydate2);
		  //把指定的企业名、评论的用户名、评价值、评论内容和评论时间传到后台
		  $.get("/cosubmit",{campany:campany,biguser:biguser,text1:text1,text2:text2,mydate2:mydate2},function(data){
			  var result=JSON.parse(data);
			 });
		  });
		  	
  });

 