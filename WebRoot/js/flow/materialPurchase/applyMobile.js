
$(document).ready(function(){
	initPage();
	$("#breadcrumbs").resize(function() {
		//ajaxQuery();
	});
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getKeysSelect("MATERIAL_PURCHASE_APPLY_TYPE", "物料采购申请类别", "#apply_type","请选择","keyName");
		getKeysSelect("MATERIAL_PURCHASE_TYPE", "物料采购项目类别", "#apply_kind","请选择","keyName");
		var d = new Date(); 
	    var s = d.getFullYear().toString() + '-'+addzero(d.getMonth() + 1)+"-"+addzero(d.getDate());
	    $("#apply_date").val(s);
	    getGroupListByGroupName("采购项目负责人",$("#purchase_leader"));
	    getOperator("科长审批组",$("#departmentId").val(),$("#apply_leader"),"select");// 测试时用
	    getOperator("经理/厂长审批组",$("#divisionId").val(),$("#departmentManager"),"text");
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$("#btnQuery").click (function () {
		ajaxQuery();
	});
	$("#apply_type").change (function () {
		$("#accountant").html("");
		var type=$(this).val();
		if(type!='' && type=="费用性采购"){
			$("#accountant").removeAttr("disabled");
			getGroupListByGroupName("成本会计审核组",$("#accountant"));
		}
	});
	$("#btnSave").click(function(){
		if($("#technical_operator").val()==""){
			
		}
		$("#form").ajaxSubmit({
			type: "post",
			url: "applySave",
			dataType: "json",
			data: {
				"applier" : $("#applier").val(),
				"department" : $("#department").val(),
				"apply_date" : $("#apply_date").val(),
				"apply_type" : $("#apply_type").val(),
				"cost_center" : $("#cost_center").val(),
				"apply_kind" : $("#apply_kind").val(),
				"accountant" : $("#accountant").val(),
				"purchase_leader" : $("#purchase_leader").val(),
				"material_name" : $("#material_name").val(),
				"material_code" : $("#material_code").val(),
				"specification" : $("#specification").val(),
				"useage_place" : $("#useage_place").val(),
				"quantity" : $("#quantity").val(),
				"require_date" :$("#require_date").val(),
				"apply.operator" : $("#applier").val(),
				"accountant.operator" : $("#accountant").val(),
				"purchaseBoss.operator" : $("#purchase_leader").val(),
				"applyLeader.operator" : $("#apply_leader").val(),
				"departmentManager.operator" : $("#departmentManager").val(),
				"techcical_require" : $("#techcical_require").val(),
				"apply_reason" : $("#apply_reason").val(),
				"remark" : $("#remark").val(),
				"processId":$("#processId").val(),
				"orderId":$("#orderId").val(),
				"taskId":$("#taskId").val()
			},
			error: function () {},
			success: function (response) {
					if(response.success){
						alert("提交成功");
    					var url="/BMS/task/active";
    					window.open(url,"_parent");
    				}else{
    					alert("提交失败");
    				}
				}
//			}
		})
	});
	$('#simple-colorpicker-1').ace_colorpicker({pull_right:true}).on('change', function(){
		var color_class = $(this).find('option:selected').data('class');
		var new_class = 'widget-box';
		if(color_class != 'default')  new_class += ' widget-color-'+color_class;
		$(this).closest('.widget-box').attr('class', new_class);
	});


	// scrollables
	$('.scrollable').each(function () {
		var $this = $(this);
		$(this).ace_scroll({
			size: $this.data('size') || 100,
			//styleClass: 'scroll-left scroll-margin scroll-thin scroll-dark scroll-light no-track scroll-visible'
		});
	});
	$('.scrollable-horizontal').each(function () {

		var $this = $(this);
		$(this).ace_scroll(
		  {
			horizontal: true,
			styleClass: 'scroll-top',//show the scrollbars on top(default is bottom)
			size: $this.data('size') || 100,
			mouseWheelLock: true
		  }
		).css({'padding-top': 12});
	});
	
	$(window).on('resize.scroll_reset', function() {
		$('.scrollable-horizontal').ace_scroll('reset');
	});
});
function addzero(v) {
	if (v < 10) return '0' + v;return v.toString();
}
function getGroupListByGroupName(group_name,element){
	$.ajax({
        type: "post",
        url: "getGroupListByGroupName",
        cache: false,  //禁用缓存
        data: {
        	"group_name":group_name,
        	"process_name":"materialPurchase"
        },  //传入组装的参数
        dataType: "json",
        success: function (result) {
        	var optStr="<option value=''>请选择</option>";
            $.each(result.data,function(index,value){
        	   optStr+="<option value='"+value.user_id+"'>"+value.username+"</option>"
            });
            $(element).html(optStr);
        }
    });
}
function getOperator(group_name,org_id,obj,element){
	$.ajax({
        type: "post",
        url: "getGroupListByGroupName",
        data: {
        	"group_name":group_name,
        	"org_id":org_id,
        	"process_name":"materialPurchase"
        },  //传入组装的参数
        dataType: "json",
        success: function (result) {
        	var str="";
        	if(element=="select"){
        		$.each(result.data,function(index,value){
             	   str+="<option value='"+value.user_id+"'>"+value.username+"</option>"
                 });
                 $(obj).html(str);
        	}
        	if(element=="text"){
        		$.each(result.data,function(index,value){
             	   str+=value.user_id+",";
                 });
                 $(obj).val(str.substring(0,str.length-1));
        	}
        }
    });
}
function addNew(url) {
	window.location.href=url;
}