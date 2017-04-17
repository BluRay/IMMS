var pageSize=1;
var table;
var table_height = $(window).height()-240;
$(document).ready(function () {	
	initPage();
	function initPage(){
		ajaxQuery();
	}
	
	function ajaxQuery(){
		$("#tableData").dataTable({
			serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
			destroy: true,sScrollY: table_height,scrollX: "100%",orderMulti:false,
			pageLength: 25,pagingType:"full_numbers",lengthChange:false,
			language: {
				emptyTable:"抱歉，未查询到数据！",
				info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
				infoEmpty:"",
				paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
			},
			ajax:function (data, callback, settings) {
				var param ={
					"draw":1,
					"search_key":$("#search_key").val(),
					"orderColumn":"id"
				};
	            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
	            param.start = data.start;					//开始的记录序号
	            param.page = (data.start / data.length)+1;	//当前页码

	            $.ajax({
	                type: "post",
	                url: "getUserList",
	                cache: false,  //禁用缓存
	                data: param,  //传入组装的参数
	                dataType: "json",
	                success: function (result) {
	                    //console.log(result);
	                	//封装返回数据
	                    var returnData = {};
	                    returnData.draw = data.draw;						//这里直接自行返回了draw计数器,应该由后台返回
	                    returnData.recordsTotal = result.recordsTotal;		//返回数据全部记录
	                    returnData.recordsFiltered = result.recordsTotal;	//后台不实现过滤功能，每次查询均视作全部结果
	                    returnData.data = result.data;						//返回的数据列表
	                    //console.log(returnData);
	                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
	                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
	                    callback(returnData);
	                }
	            });
			},
			columns: [
			            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			            {"title":"姓名","class":"center","data":"display_name","defaultContent": ""},
			            {"title":"电子邮件","class":"center","data":"email","defaultContent": ""},
			            {"title":"手机号码","class":"center","data": "cellphone","defaultContent": ""},
			            {"title":"办公电话","class":"center","data":"telephone","defaultContent": ""},		            
			            {"title":"所属工厂","class":"center","data":"factory_name","defaultContent": ""},		            
			            {"title":"所属部门","class":"center","data": "department","defaultContent": ""},         
			            {"title":"是否管理员","class":"center","data": "admin","defaultContent": ""}, 
			            {"title":"访问次数","class":"center","data": "login_count","defaultContent": ""}, 
			            {"title":"最后登录","class":"center","data": "last_login_time","defaultContent": ""},
			            {"title":"操作","class":"center","data": null,"id":"staff_number",
			            	"render": function ( data, type, row ) {
			                    return "<i class=\"glyphicon glyphicon-remove bigger-130 showbus\" title=\"删除\" onclick='delUser(" + row['staff_number'] + 
			                    ")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;" + 
			                    "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"修改\" onclick='editUser(" + row['staff_number'] + 
			                    ")' style='color:blue;cursor: pointer;'></i>";
			                },
			            }
			          ],
		});
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
			modal: true,
			buttons: [{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {$( this ).dialog( "close" );} 
					},
					{
						text: "增加",
						id:"btn_ok",
						"class" : "btn btn-success btn-minier",
						click: function() {
							//$( this ).dialog( "close" ); 
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
							    	ajaxQuery();
							    }
							});
						} 
					}
				]
		});
	});
	


});
function delUser(user){
	console.info(user);
	//alert($("#tableOrder").row( this ).data()['staff_number']);
}