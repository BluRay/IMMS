$(document).ready(function () {	
	initPage();
	function initPage(){
		if($(window).height() * 0.6 > 350){
			$("#div_tree1").height($(window).height() * 0.6);
			$("#div_tree2").height($(window).height() * 0.6);
			$("#div_tree3").height($(window).height() * 0.6);
		}
	}

	var DataSourceTree = function(options) {
		this._data 	= options.data;
		this._delay = options.delay;
	}
	DataSourceTree.prototype.data = function(options, callback) {
		var self = this;
		var $data = null;
		if (!("name" in options) && !("type" in options)) {
			$data = this._data;
			callback({data : $data});
			return;
		} else if ("type" in options && options.type == "folder") {
			if ("additionalParameters" in options && "children" in options.additionalParameters)
				$data = options.additionalParameters.children;
			else
				$data = {}
		}
		if ($data != null)
			setTimeout(function() {
				callback({data : $data});
			}, parseInt(Math.random() * 500) + 200);
	};
	
	showtree1();
	showtree2();
	showtree4();

	function showtree1(){
		$("#tree1").removeData();
		$("#tree1").unbind();
		$("#tree2").removeData();
		$("#tree2").unbind();
		$.ajax({
		    url: "getUserList",
		    dataType: "json",
			type: "get",
		    data: {"key":$("#search_key").val()},
		    success:function(response){
		    	var users = response.data[0];
		    	var user_str = '{';
		    	$.each(users, function(index, value) {
		    		user_str += '"user_'+value.id+'" : {"name": "<i class=\'fa fa-user blue\'></i> '+value.display_name+'","id":"'+value.staff_number+'","type": "item"},'
		    	});
		    	user_str = user_str.substring(0,user_str.length-1) + '}';
		    	var user_data = eval('(' + user_str + ')');
		    	var treeDataSource = new DataSourceTree({data: user_data});
		    	$('#tree1').ace_tree({
		    		dataSource: treeDataSource,
		    		multiSelect : false,
		    		cacheItems: true,
		    		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		    		'open-icon' : 'ace-icon tree-minus',
		    		'close-icon' : 'ace-icon tree-plus',
		    		'selectable' : true,
		    		'selected-icon' : 'ace-icon fa fa-check',
		    		'unselected-icon' : 'ace-icon fa fa-times'
		    	});

		    }
		});
		$('#tree1')
		.on('updated', function(e, result) {
		})
		.on('selected', function(e,data) {
			updatetree2(data.info[0].id);
		})
		.on('click', function(e) {
		})
		.on('opened', function(e) {
		})
		.on('closed', function(e) {
		});
	}
	
	function updatetree2(staff_number){
		$("#tree2").removeData();
		$("#tree2").unbind();
		$.ajax({
		    url: "getUserRoleList",
		    dataType: "json",
			type: "get",
		    data: {"staff_number":staff_number},
		    success:function(response){
		    	var permissions = response.data[1];
		    	var role_arr = new Array();
		    	$.each(permissions, function(index, value) {
		    		role_arr.push(value.role_id);
		    	});
		    	
		    	var role_str = '{';
		    	$.each(response.data[0], function(index, value) {
		    		if(jQuery.inArray(value.id+'', role_arr) >= 0){
		    			role_str += '"role_'+value.id+'" : {"name": "<i class=\'fa fa-users blue\'></i> '+value.role_name+'","id":"'+value.id+'","type": "item"' + ',"additionalParameters" : {"item-selected": true}' + '},'
		    		}else{
		    			role_str += '"role_'+value.id+'" : {"name": "<i class=\'fa fa-users blue\'></i> '+value.role_name+'","id":"'+value.id+'","type": "item"},'
		    		}
		    	});
		    	role_str = role_str.substring(0,role_str.length-1) + '}';
		    	var role_data = eval('(' + role_str + ')');
		    	var treeDataSource = new DataSourceTree({data: role_data});
		    	$('#tree2').ace_tree({
		    		dataSource: treeDataSource,
		    		multiSelect : true,
		    		cacheItems: true,
		    		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		    		'open-icon' : 'ace-icon tree-minus',
		    		'close-icon' : 'ace-icon tree-plus',
		    		'selectable' : true,
		    		'selected-icon' : 'ace-icon fa fa-check',
		    		'unselected-icon' : 'ace-icon fa fa-check'
		    	});

		    }
		});
		$('#tree2')
		.on('updated', function(e, result) {
		})
		.on('selected', function(e,data) {
			
		})
		.on('click', function(e,data) {
		})
		.on('opened', function(e) {
		})
		.on('closed', function(e) {
		});
	}
	
	function showtree2(){
		$("#tree2").removeData();
		$("#tree2").unbind();
		$.ajax({
		    url: "getRoleList",
		    dataType: "json",
			type: "get",
		    data: {},
		    success:function(response){
		    	var role_str = '{';
		    	$.each(response.data, function(index, value) {
		    		role_str += '"role_'+value.id+'" : {"name": "<i class=\'fa fa-users blue\'></i> '+value.role_name+'","id":"'+value.id+'","type": "item"},'
		    	});
		    	role_str = role_str.substring(0,role_str.length-1) + '}';
		    	var role_data = eval('(' + role_str + ')');
		    	var treeDataSource = new DataSourceTree({data: role_data});
		    	$('#tree2').ace_tree({
		    		dataSource: treeDataSource,
		    		multiSelect : true,
		    		cacheItems: true,
		    		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		    		'open-icon' : 'ace-icon tree-minus',
		    		'close-icon' : 'ace-icon tree-plus',
		    		'selectable' : true,
		    		'selected-icon' : 'ace-icon fa fa-check',
		    		'unselected-icon' : 'ace-icon fa fa-check'
		    	});

		    } 
		});
		$('#tree2')
		.on('updated', function(e, result) {
		})
		.on('selected', function(e,data) {
			updatePermissionInput(data.info[data.info.length-1].id);
			console.log(data.info[data.info.length-1].id);
		})
		.on('click', function(e,data) {
		})
		.on('opened', function(e) {
		})
		.on('closed', function(e) {
		});
	}
	
	function updatePermissionInput(role_id){
		$.ajax({
		    url: "getFunctionList",
		    dataType: "json",
			type: "get",
		    data: {"role_id":role_id},
		    success:function(response){
		    	var contents = response.data[2];
		    	$("#permission_1").attr("disabled","disabled");
		    	$("#permission_2").attr("disabled","disabled");
		    	$("#permission_3").attr("disabled","disabled");
		    	$("#permission_1").val("");$("#permission_2").val("");$("#permission_3").val("");

		    	$.each(contents, function(index, value) {
		    		if(value.permission_id + '' ==='1')$("#permission_1").removeAttr("disabled");
		    		if(value.permission_id + '' ==='2')$("#permission_2").removeAttr("disabled");
		    		if(value.permission_id + '' ==='3')$("#permission_3").removeAttr("disabled");
		    	});
		    }
		});
	}
	
	function showtree3(role_id){
		$("#tree3").removeData();
		$("#tree3").unbind();
		var fun_str = '{';
		var subFun = [];
		var subFun2 = [];
		$.ajax({
		    url: "getFunctionList",
		    dataType: "json",
			type: "get",
		    data: {"role_id":role_id},
		    success:function(response){
		    	var funs = response.data[0];
		    	var roles = response.data[1];
		    	var contents = response.data[2];
		    	var roles_arr = new Array();
		    	$.each(roles, function(index, value) {
		    		roles_arr.push(value.function_id);
		    	});
		    	
		    	$.each(funs, function(index, value) {
		    		if(value.parent_function_id === '0'){
		    			if(value.sub_count === '0'){
		    				fun_str += '"'+value.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+value.function_name+'","id":"'+value.id+'", "type": "item" ' + ((jQuery.inArray(value.id+'', roles_arr) >= 0)?',"additionalParameters" : {"item-selected": true}':'') +'},';
		    			}else{
		    				fun_str += '"'+value.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+value.function_name+'","id":"'+value.id+'", "type": "folder"},';   				
		    				var subFun_str = '{"children" : {';
		    				var cur_id = value.id + '';
		    				$.each(funs, function(i, v) {
		    					if(v.parent_function_id === cur_id){
		    						if(v.sub_count === '0'){
		    							subFun_str += '"'+v.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+v.function_name+'","id":"'+v.id+'", "type": "item" ' + ((jQuery.inArray(v.id+'', roles_arr) >= 0)?',"additionalParameters" : {"item-selected": true}':'') +'},';
		    						}else{
		    							subFun_str += '"'+v.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+v.function_name+'","id":"'+v.id+'", "type": "folder"},';
		    							var subFun_str2 = '{"children" : {';
		    							var cur_id2 = v.id + '';
		    							$.each(funs, function(i2, v2) {
		    								if(v2.parent_function_id === cur_id2)subFun_str2 += '"'+v2.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+v2.function_name+'","id":"'+v2.id+'", "type": "item" ' + ((jQuery.inArray(v2.id+'', roles_arr) >= 0)?',"additionalParameters" : {"item-selected": true}':'') +'},';
		    							})
		    							subFun_str2 = subFun_str2.substring(0,subFun_str2.length-1) + '}}';
		    							subFun2[v.id] = eval('(' + subFun_str2 + ')');
		    						}
		    					}
		    				});
		    				subFun_str = subFun_str.substring(0,subFun_str.length-1) + '}}';
	    					//console.log('---->subFun_str = ' + subFun_str);
		    				subFun[value.id] = eval('(' + subFun_str + ')'); 				
		    			}
		    		}
		    	});
		    	fun_str = fun_str.substring(0,fun_str.length-1) + '}';
	    		var fun_data = eval('(' + fun_str + ')');
	    		
	    		$.each(funs, function(index, value) {
	    			if(value.parent_function_id === '0'){
	    				if(value.sub_count !== '0'){
	    					fun_data[value.id]['additionalParameters'] = subFun[value.id];
	    				}
	    			}else{
	    				if(value.sub_count !== '0'){
	    					fun_data[value.parent_function_id]['additionalParameters']['children'][value.id]['additionalParameters'] = subFun2[value.id];
	    				}
	    			}
	    		});

		    	var treeDataFun = new DataSourceTree({data: fun_data});
		    	$('#tree3').ace_tree({
					dataSource: treeDataFun,
					multiSelect : true,
					cacheItems: true,
					loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
					'open-icon' : 'ace-icon tree-minus',
					'close-icon' : 'ace-icon tree-plus',
					'selectable' : false,
					'selected-icon' : 'ace-icon fa fa-check',
					'unselected-icon' : 'ace-icon fa fa-check'
				});
		    	$("#tree3").find(".tree-folder-header").each(function(){  
				    if($(this).parent().css("display")=="block"){   
				        $(this).trigger("click");  
				    }
				}); 
		    }
		});		
	}
	
	function showtree4(){
		$("#tree4").removeData();
		$("#tree4").unbind();
		$.ajax({
		    url: "getRoleList",
		    dataType: "json",
			type: "get",
		    data: {},
		    success:function(response){
		    	var role_str = '{';
		    	$.each(response.data, function(index, value) {
		    		role_str += '"role_'+value.id+'" : {"name": "<i class=\'fa fa-users blue\'></i> '+value.role_name+'","id":"'+value.id+'","type": "item"},'
		    	});
		    	role_str = role_str.substring(0,role_str.length-1) + '}';
		    	var role_data = eval('(' + role_str + ')');
		    	var treeDataSource = new DataSourceTree({data: role_data});
		    	$('#tree4').ace_tree({
		    		dataSource: treeDataSource,
		    		multiSelect : false,
		    		cacheItems: true,
		    		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		    		'open-icon' : 'ace-icon tree-minus',
		    		'close-icon' : 'ace-icon tree-plus',
		    		'selectable' : true,
		    		'selected-icon' : 'ace-icon fa fa-check',
		    		'unselected-icon' : 'ace-icon fa fa-times'
		    	});

		    }
		});
		$('#tree4')
		.on('updated', function(e, result) {
		})
		.on('selected', function(e,data) {
			showtree3(data.info[0].id);
		})
		.on('click', function(e,data) {
		})
		.on('opened', function(e) {
		})
		.on('closed', function(e) {
		});
	}
	
	$("#btn_search_user").on('click', function(e) {	
		showtree1();
	});

});