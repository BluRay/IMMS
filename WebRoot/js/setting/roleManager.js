jQuery(function($) {
	
	function initiateDemoData() {
        var tree_data = { '刑侦': { 'text': '刑侦', 'type': 'folder', 'additionalParameters': { 'id': '1', 'children': { '痕迹检验': { 'text': '痕迹检验', 'type': 'item', 'additionalParameters': { 'id': '10' } }, '声像技术': { 'text': '声像技术', 'type': 'item', 'additionalParameters': { 'id': '9', 'item-selected': true } } } } }, '交警': { 'text': '交警', 'type': 'folder', 'additionalParameters': { 'id': '32', 'children': { '交通事故': { 'text': '交通事故', 'type': 'item', 'additionalParameters': { 'id': '33' } }, '交通道理管理': { 'text': '交通道理管理', 'type': 'item', 'additionalParameters': { 'id': '34' } } } } } }
        var dataSource1 = function (options, callback) {
            var $data = null
            if (!("text" in options) && !("type" in options)) {
                $data = tree_data;//the root tree
                callback({ data: $data });
                return;
            }
            else if ("type" in options && options.type == "folder") {
                if ("additionalParameters" in options && "children" in options.additionalParameters)
                    $data = options.additionalParameters.children || {};
                else $data = {}//no data
            }

            if ($data != null)//this setTimeout is only for mimicking some random delay
                setTimeout(function () { callback({ data: $data }); }, parseInt(Math.random() * 500) + 200);
        }
        return { 'dataSource1': dataSource1 }
    }
	var sampleData = initiateDemoData();
	

	$('#tree1').ace_tree({
		dataSource: sampleData['dataSource1'],
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
	}).on('unselected', function(e) {
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