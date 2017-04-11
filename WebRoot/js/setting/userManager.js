$(document).ready(function () {	
	initPage();
	function initPage(){
		
	}
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title: function(title) {
			var $title = this.options.title || '&nbsp;'
			if( ("title_html" in this.options) && this.options.title_html == true )
				title.html($title);
			else title.text($title);
		}
	}));
	$("#btnAdd").on('click', function(e) {	
		e.preventDefault();
		$("#dialog-confirm").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加新用户</h4></div>',
			title_html: true,
			width:'500px',
			modal: true
		});
	});
	$("#btn_ok").on('click', function(e) {
		if($("#new_username").val()===""){
			alert("用户姓名不能为空！");
			$("#new_username").focus();
			return false;
		}
		if($("#new_staff_number").val()===""){
			alert("用户工号不能为空！");
			$("#new_staff_number").focus();
			return false;
		}

		$.ajax({
		    url: "addUser",
		    dataType: "json",
			type: "get",
		    data: {
		    	"staff_number" : $("#new_staff_number").val(),
		    	"username" : $("#new_username").val(),
		    	"email" : $("#new_email").val(),
		    	"telephone" : $("#new_telephone").val(),
		    	"cellphone" : $("#new_cellphone").val(),
		    	"password" : $("#new_staff_number").val(),
		    	"display_name" : $("#new_username").val(),
		    	"factory_id" : $("#new_factory_id").val(),
		    	"department_id" : $("#new_department_id").val(),
		    	"admin" : $("#new_admin").val()
		    },
		    success:function(response){
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>增加用户成功！</h5>',
					class_name: 'gritter-info'
				});
		    	$("#new_staff_number").val("");
		    	$("#new_username").val("");
		    	$("#new_email").val("");
		    	$("#new_telephone").val("");
		    	$("#new_cellphone").val("");
		    	$("#new_username").focus();
		    }
		});
		
	});
	$("#btn_cancel").on('click', function(e) {
		$("#dialog-confirm").dialog("close");
	});
});