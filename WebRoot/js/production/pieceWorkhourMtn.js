var factory="";
var workshop="";
var team="";
$(document).ready(function() {
	initPage();
})

function initPage() {
	getOrgAuthTree($("#workGroupTree"),'production/pieceWorkhourMtn',"1,2,3",'1');
	$('#workGroupTree').height($(window).height()-110)
	$('#workGroupTree').ace_scroll({
		size: $(window).height()-110
	});
}	

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	
	if(treeNode.org_type == '4'){
		workshop=treeNode.displayName;
	}
	if(treeNode.org_type == '5'){
		workshop=treeNode.getParentNode().displayName;
	}
	if(treeNode.org_type == '6'){
		factory=treeNode.getParentNode().getParentNode().getParentNode().getParentNode().displayName;
		workshop=treeNode.getParentNode().getParentNode().displayName;
		team=treeNode.displayName;
	}
	
};