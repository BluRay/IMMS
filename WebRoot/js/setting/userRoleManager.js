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

	function showtree1(){
		$("#tree1").removeData();
		$("#tree1").unbind();
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
			showtree2(data.info[0].id);
		})
		.on('click', function(e) {
		})
		.on('opened', function(e) {
		})
		.on('closed', function(e) {
		});
	}

});