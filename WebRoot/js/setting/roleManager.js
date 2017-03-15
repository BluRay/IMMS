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
	var ace_icon = ace.vars['icon'];
	var tree_data2 = '{"role01" : {"name": "<i class=\'fa fa-pencil-square-o blue\'></i> 首页", "type": "item"},' + 
	'"role02" : {"name": "<i class=\'fa fa-pencil-square-o  blue\'></i> 计划", "type": "item","additionalParameters" : {"item-selected": true} }}';
	var tree_data = eval('(' + tree_data2 + ')');
	var treeDataSource2 = new DataSourceTree({data: tree_data});
	
	var role_str = '{';
	$.ajax({
	    url: "getRoleList",
	    dataType: "json",
		type: "get",
	    data: {},
	    success:function(response){
	    	$.each(response.data, function(index, value) {
	    		role_str += '"role_'+value.id+'" : {"name": "<i class=\'fa fa-users blue\'></i>'+value.role_name+'", "type": "item"},'
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
	.on('selected', function(e) {
		$("#tree2").removeData();
		$("#tree2").unbind();
		showtree2();
	})
	.on('click', function(e) {
	})
	.on('opened', function(e) {
	})
	.on('closed', function(e) {
	});
	
	function showtree2(){
		
		
		$('#tree2').ace_tree({
			dataSource: treeDataSource2,
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
	
	alert($("#div_row").height());
	$("#div_tree1").height(500);
});