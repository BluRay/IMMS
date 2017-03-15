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
			callback({
				data : $data
			});
			return;
		} else if ("type" in options && options.type == "folder") {
			if ("additionalParameters" in options && "children" in options.additionalParameters)
				$data = options.additionalParameters.children;
			else
				$data = {}
		}
		if ($data != null)
			setTimeout(function() {
				callback({
					data : $data
				});
			}, parseInt(Math.random() * 500) + 200);
	};
	var ace_icon = ace.vars['icon'];
	var tree_data = {
		'role01' : {name: '<i class="'+ace_icon+' fa fa-users blue"></i>角色1', type: 'item'},
		'role02' : {name: '<i class="'+ace_icon+' fa fa-users blue"></i>角色2', type: 'item'},
		'role03' : {name: '<i class="'+ace_icon+' fa fa-users blue"></i>角色3', type: 'item'},
		'role04' : {name: '<i class="'+ace_icon+' fa fa-users blue"></i>角色4', type: 'item'},
		'role05' : {name: '<i class="'+ace_icon+' fa fa-users blue"></i>角色5', type: 'item'}
	}
	var treeDataSource = new DataSourceTree({data: tree_data});

	$('#tree1').ace_tree({
		dataSource: treeDataSource,
		multiSelect : false,
		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		'open-icon' : 'ace-icon tree-minus','close-icon' : 'ace-icon tree-plus',
		'selectable' : true,'selected-icon' : 'ace-icon fa fa-check','unselected-icon' : 'ace-icon fa fa-times'
	});
	
	

	$('#tree1').on('updated', function(e, result) {
		// result.info >> an array containing selected items
		// result.item
		// result.eventType >> (selected or unselected)
	}).on('selected', function(e) {
		
		$('#tree2').ace_tree({
			dataSource: treeDataSource,
			multiSelect : false,
			loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
			'open-icon' : 'ace-icon tree-minus','close-icon' : 'ace-icon tree-plus',
			'selectable' : true,'selected-icon' : 'ace-icon fa fa-check','unselected-icon' : 'ace-icon fa fa-times'
		});
	}).on('unselected', function(e) {
		$('#tree2').html("");
	}).on('opened', function(e) {
	}).on('closed', function(e) {
	});

	/**
	 * $('#tree1').on('loaded', function (evt, data) { });
	 * 
	 * $('#tree1').on('opened', function (evt, data) { });
	 * 
	 * $('#tree1').on('closed', function (evt, data) { });
	 * 
	 * $('#tree1').on('selected', function (evt, data) { });
	 */
});