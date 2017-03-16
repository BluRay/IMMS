jQuery(function($) {
	
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
	
	var role_str = '{';
	$.ajax({
	    url: "getRoleList",
	    dataType: "json",
		type: "get",
	    data: {},
	    success:function(response){
	    	$.each(response.data, function(index, value) {
	    		role_str += '"role_'+value.id+'" : {"name": "<i class=\'fa fa-users blue\'></i> '+value.role_name+'","id":"'+value.id+'","type": "item"},'
	    	});
	    	role_str = role_str.substring(0,role_str.length-1) + '}';
	    	var role_data = eval('(' + role_str + ')');
	    	var treeDataSource = new DataSourceTree({data: role_data});
	    	$('#tree1').ace_tree({
	    		dataSource: treeDataSource,
	    		multiSelect : false,
	    		cacheItems: true,
	    		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
	    		'open-icon' : 'ace-icon tree-minus','close-icon' : 'ace-icon tree-plus',
	    		'selectable' : true,
	    		'selected-icon' : 'ace-icon fa fa-check',
	    		'unselected-icon' : 'ace-icon fa fa-times'
	    	});
	    }
	});

	$('#tree1')
	.on('updated', function(e, result) {
		// result.info >> an array containing selected items
		// result.item
		// result.eventType >> (selected or unselected)
	})
	.on('selected', function(e,data) {
		$("#tree2").removeData();
		$("#tree2").unbind();
		//var items = $('#this').tree('selectedItems');
		//alert(data.info[0].id);
		showtree2(data.info[0].id);
	})
	.on('click', function(e) {
	})
	.on('opened', function(e) {
	})
	.on('closed', function(e) {
	});
	
	function showtree2(role_id){
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
		    	var roles_arr = new Array();
		    	$.each(roles, function(index, value) {
		    		roles_arr.push(value.function_id);
		    	})

		    	$.each(funs, function(index, value) {
		    		if(value.parent_function_id === '0'){
		    			if(value.sub_count === '0'){
		    				fun_str += '"'+value.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+value.function_name+'","id":"'+value.id+'", "type": "item" ' + ((jQuery.inArray(value.id+'', roles_arr) >= 0)?',"additionalParameters" : {"item-selected": true}':'') +'},';
		    			}else{
		    				fun_str += '"'+value.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+value.function_name+'","id":"'+value.id+'", "type": "folder"},';   				
		    				var subFun_str = '{"children" : {';
		    				var cur_id = value.id + '';
		    				$.each(funs, function(i, v) {
		    					//console.log('---->parent_function_id = ' + v.parent_function_id + " id=" + v.id + " cur_id = " + cur_id);
		    					if(v.parent_function_id === cur_id){
		    						if(v.sub_count === '0'){
		    							subFun_str += '"'+v.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+v.function_name+'","id":"'+value.id+'", "type": "item" ' + ((jQuery.inArray(v.id+'', roles_arr) >= 0)?',"additionalParameters" : {"item-selected": true}':'') +'},';
		    						}else{
		    							subFun_str += '"'+v.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+v.function_name+'","id":"'+value.id+'", "type": "folder"},';
		    							var subFun_str2 = '{"children" : {';
		    							var cur_id2 = v.id + '';
		    							$.each(funs, function(i2, v2) {
		    								if(v2.parent_function_id === cur_id2)subFun_str2 += '"'+v2.id+'" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> '+v2.function_name+'","id":"'+value.id+'", "type": "item" ' + ((jQuery.inArray(v2.id+'', roles_arr) >= 0)?',"additionalParameters" : {"item-selected": true}':'') +'},';
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
		    	$('#tree2').ace_tree({
					dataSource: treeDataFun,
					multiSelect : true,
					cacheItems: true,
					loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
					'open-icon' : 'ace-icon tree-minus',
					'close-icon' : 'ace-icon tree-plus',
					'selectable' : true,
					'selected-icon' : 'ace-icon fa fa-check',
					'unselected-icon' : 'ace-icon fa fa-check'
				});
		    	$("#tree2").find(".tree-folder-header").each(function(){  
				    if($(this).parent().css("display")=="block"){   
				        $(this).trigger("click");  
				    }  
				}); 
		    }
		});
		
	}
	
	///$('#tree2').on('selected', function (evt, data) {alert(data.info[0].name)});

	/**
	 * $('#tree1').on('loaded', function (evt, data) { });
	 * 
	 * $('#tree1').on('opened', function (evt, data) { });
	 * 
	 * $('#tree1').on('closed', function (evt, data) { });
	 * 
	 * $('#tree1').on('selected', function (evt, data) { });
	 */
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title: function(title) {
			var $title = this.options.title || '&nbsp;'
			if( ("title_html" in this.options) && this.options.title_html == true )
				title.html($title);
			else title.text($title);
		}
	}));
	$("#btn_addRole").on('click', function(e) {
		///var items = $('#tree2').tree('selectedItems');
		///alert(items.length);
		e.preventDefault();
		$("#dialog-confirm").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 创建新角色</h4></div>',
			title_html: true,
			width:'500px',
			modal: true
		});
	});
	
	$("#btn_cancel").on('click', function(e) {
		$("#dialog-confirm").dialog("close");
	});
	if($(window).height() * 0.6 > 350){
		$("#div_tree1").height($(window).height() * 0.6);
		$("#div_tree2").height($(window).height() * 0.6);
	}

});