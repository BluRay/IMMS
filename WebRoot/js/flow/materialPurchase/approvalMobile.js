
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		ajaxQuery();
	}
	$("#btnAgree").click(function(){
		save("0");
	});
	$("#btnDisagree").click(function(){
		save("1");
	});
	$("#developer").one("click",function(){
		// 加载资源开发工程师select表单
		$.ajax({
	        type: "post",
	        url: "getGroupListByGroupName",
	        cache: false,  //禁用缓存
	        data: {
	        	"group_name":"资源开发工程师审批组",
	        	"process_name":"materialPurchase"
	        },  
	        dataType: "json",
	        success: function (result) {
	        	var optStr="<option value=''>请选择</option>";
	            $.each(result.data,function(index,value){
	        	   optStr+="<option value='"+value.user_id+"'>"+value.username+"</option>"
	            });
	            $("#developer").html(optStr);
	        }
	    });
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
			size: $this.data('size') || 500,
			mouseWheelLock: true
		  }
		).css({'padding-top': 12});
	});
	
	$(window).on('resize.scroll_reset', function() {
		$('.scrollable-horizontal').ace_scroll('reset');
	});
});

function ajaxQuery(){
	$.ajax({
	    url: "../materialPurchase/getMaterialPurchaseByOrderId",
	    dataType: "json",
		type: "post",
	    data: {
	    	"orderId":$("#orderId").val()
	    },
	    success:function(response){
	    	var result=response.data[0];
	    	newDiv=$("<div class='panel panel-default' style='font-size:16px;height:30px;margin-bottom:5px;margin-top:5px;margin-left:-25px;margin-right:-10px'><div class='panel-heading'><a href='#' data-parent='#faq-list-1' data-toggle='collapse' class='accordion-toggle collapsed' style='color:#f00;font-weight:blod'>审批节点信息</div></div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;总金额： "+(result.amount!=undefined ? result.urgent_item : '')+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;单价： "+(result.price!=undefined ? result.urgent_item : '')+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;供应商名称： "+(result.vendor_name!=undefined ? result.urgent_item : '')+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;供应商类别： "+(result.vendor_type!=undefined ? result.urgent_item : '')+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;紧急/特采项目： "+(result.urgent_item!=undefined ? result.urgent_item : '')+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div class='panel panel-default' style='font-size:16px;height:30px;margin-left:-25px;margin-right:-10px'><div class='panel-heading'><a href='#' data-parent='#faq-list-1' data-toggle='collapse' class='accordion-toggle collapsed' style='color:#f00'>资源开发工程师</div></div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;备注： "+result.remark+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;附件： </div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;到位时间： "+result.require_date+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;申请理由： "+result.apply_reason+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;技术要求： "+result.techcical_require+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;采购数量： "+result.quantity+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;使用地区： "+result.useage_place+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;成本中心： "+result.cost_center+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;规格/型号： "+result.specification+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;物料名称: "+result.material_name+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;物料编号： "+result.material_code+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;项目类型: "+result.apply_kind+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;采购类型： "+result.apply_type+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;申请日期: "+result.apply_date+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;申请部门: "+result.department+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div style='margin-left:20px;margin-top:10px;margin-top:10px'>&nbsp;&nbsp;申请人: "+result.applier+"</div>");
	    	$("#faq-list-1").prepend(newDiv);
	    	newDiv=$("<div class='panel panel-default' style='font-size:16px;height:30px;margin-top:-25px;margin-left:-25px;margin-right:-10px'><div class='panel-heading'><a href='#' data-parent='#faq-list-1' data-toggle='collapse' class='accordion-toggle collapsed' style='color:#f00'>基本信息</div></div>");
	    	$("#faq-list-1").prepend(newDiv);

	    }
	});
}
function save(result){
	$.ajax({
		type:"post",
		url: "/BMS/materialPurchase/doApproval",
		dataType: "json",
		data: {
			"result" : result,
			"description" : $("#description").val(),
			"orderId" : $("#orderId").val(),
			"taskId" : $("#taskId").val(),
			"taskName" : $("#taskName").val(),
			"displayName" : $("#displayName").val(),
			"developer" : $("#developer").val(),
		},
		error: function () {},
		success: function (response) {
			if(response.success){
				alert("审批成功"); 
				var url="BMS/flow/flowHomeMobile";
				window.open(url,"_parent");
			}else{
				alert("审批失败");
			}
		}
	})
}