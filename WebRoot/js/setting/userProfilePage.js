
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		//getBusNumberSelect('#nav-search-input');
		getUserInfo();
	}

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	$("#btnEditInfo").on('click', function(e) {	
		$.ajax({
		    url: "editUserInfo",
		    dataType: "json",
			type: "get",
		    data: {
		    	"staff_number" : $("#staff_number").val(),
		    	"email" : $("#email").val(),
		    	"telephone" : $("#telephone").val(),
		    	"cellphone" : $("#cellphone").val()
		    },
		    success:function(response){
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>操作成功！</h5>',
					class_name: 'gritter-info'
				});
		    }
		});
	});
	
	$("#btnEditPassword").on('click', function(e) {	
		$("#dialog-edit").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 修改密码</h4></div>',
			title_html: true,
			width:'500px',
			modal: true,
			buttons: [{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {$( this ).dialog( "close" );} 
					},
					{
						text: "确认",
						id:"btn_ok",
						"class" : "btn btn-success btn-minier",
						click: function() {
							if($("#old_password").val()===""){
								alert("原密码不能为空！");
								$("#old_password").focus();
								return false;
							}
							if($("#new_password").val()===""){
								alert("新密码不能为空！");
								$("#new_password").focus();
								return false;
							}
							if($("#new_password").val()!==$("#new_password2").val()){
								alert("两次输入的新密码不一致！");
								$("#new_password").focus();
								return false;
							}
							$.ajax({
							    url: "editUserPassword",
							    dataType: "json",
								type: "get",
							    data: {
							    	"old_password" : $("#old_password").val(),
							    	"new_password" : $("#new_password").val()
							    },
							    success:function(response){
							    	if(response.message == "-1"){
							    		$.gritter.add({
											title: '系统提示：',
											text: '<h5>原密码错误！</h5>',
											class_name: 'gritter-warning'
										});
							    	}else{
							    		$.gritter.add({
											title: '系统提示：',
											text: '<h5>操作成功！</h5>',
											class_name: 'gritter-info'
										});
							    		$("#dialog-edit").dialog( "close" );
							    	}
							    	getUserInfo();
							    }
							});
						} 
					}
				]
		});
	});
	
})

function getUserInfo(){
	$.ajax({
		url : "getUserInfo",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$("#username").val(response.data.username);
			$("#staff_number").val(response.data.staff_number);
			$("#card_8H10D").val(response.data.card_8H10D);
			$("#email").val(response.data.email);
			$("#telephone").val(response.data.telephone);
			$("#cellphone").val(response.data.cellphone);
			$("#factory_name").val(response.data.factory_name);
			$("#login_count").val(response.data.login_count);
			$("#last_login_time").val(response.data.last_login_time);
		}
	});
}