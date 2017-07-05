var test_item_list=[];
var test_standard_list={};
$(document).ready(function(){
	initPage();
	
	$('#fuelux-wizard-container').ace_wizard({
		//step: 2 //optional argument. wizard will jump to step "2" at first
		//buttons: '.wizard-actions:eq(0)'
	})	.on('change' , function(e, info){
		//alert(info.direction)
		if(info.step == 1&&info.direction=='next') {//第二步获取检验项目
			$("#save").attr("disabled","disabled");
			
			var bus_number=$("#bus_number").val();
			var check_node=$("#check_node :selected").text();
			if(bus_number.trim().length==0){
				fadeMessageAlert(null,'请输入有效车号！','gritter-warning');
				return false;
			}
			if(check_node.trim()=='请选择'){
				fadeMessageAlert(null,'请选择检验节点！','gritter-warning');
				return false;
			}
			if($("#test_date").val().trim().length==0){
				fadeMessageAlert(null,'请输入检验日期！','gritter-warning');
				return false;
			}
				return ajaxGetStandard();
				
		}
		if(info.step == 2&&info.direction=='next') {
			//$(".btn-next").css("visibility","hidden");
			//$("#save").css("visibility","visible");
			$(".btn-next").attr("disabled","disabled");
			$("#save").removeAttr("disabled","");
		}else if(info.step == 2&&info.direction=='previous'){
			//$(".btn-next").css("visibility","visible");
			//$("#save").css("visibility","visible");
			$(".btn-next").removeAttr("disabled","");
			$("#save").removeAttr("disabled","");
		}else{
			//$("#save").css("visibility","hidden");
			//$(".btn-next").css("visibility","visible");
			$("#save").attr("disabled","disabled");
			$(".btn-next").removeAttr("disabled","");
		}
	})
	.on('finished', function(e) {
		
	}).on('stepclick', function(e){
	});	
	
	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#bus_number').bind('keydown', function(event) {
       if($(this).attr("disabled") == "disabled")
            return false;      
        if (event.keyCode == "13"){	
            if(jQuery.trim($('#bus_number').val()) != ""){
                ajaxValidate();
            }
            return false;
        }  
    });
	
    $("#test_item").on("change",function(){
    	var test_item=$(this).val();
    	var standard_list=test_standard_list[test_item];
		var strd_html="";
		$.each(standard_list,function(i,standard){
			strd_html+="<div class=\"col-xs-12\"><label class=\"col-xs-3 control-label no-padding-right\"></label>"+
			 "<div class=\"col-xs-9\" style=\"margin-bottom: 0;padding-top: 3px;color: #657ba0;\">"+
			 "<input type=\"radio\" name=\"check_strd\" tpl_detail_id="+standard.id+
			 " tpl_head_id="+standard.test_card_template_id+"></input>";
			strd_html+=standard.test_standard;
			strd_html+="</div></div>";
		})
    	
    	$("#test_standard_list").html(strd_html);
    })
    
})

function initPage(){
	$("#bus_number").val("");
	getFactorySelect("quality/prdRcdIn","","#factory","请选择","id")
	$(".btn-next").show();
/*	getBusNumberSelect("#bus_number", "",function(obj){
		var factory_id=obj.factory_id+"";
		var all_factory_ids=getAllFromOptions("#factory","id");
		if(all_factory_ids.indexOf(factory_id)<0){
			alert('抱歉，您没有该车辆的操作权限！');		
			$("#bus_number").val("");
		}else{
			$("#factory").val(factory_id)
			getFactorySelect("quality/prdRcdIn",factory_id,"#factory","","id");
		}
	});*/
	getKeysSelect("CHECK_NODE", "", "#check_node","请选择","id");
}

/**
 * 查询成品记录表模板明细
 */
function ajaxGetStandard(){
	var detail=null;
	var flag=true;
	$.ajax({
		url:"getPrdRcdOrderTpl",
		async:false,
		type:"post",
		dataType:"json",
		data:{
			"bus_number":$("#bus_number").val(),
			"test_node":$("#check_node :selected").text()
		},
		success:function(response){
			$("#test_item").html("");
			$("#test_standard_list").html("");
			if(response.success){
				detail=response.data;
				var item_html="";
				var test_item="";
				var strd_list=[];
				test_item_list=[];
				test_standard_list={};
				$.each(detail,function(i,value){
					var obj={};
					obj.test_standard=value.test_standard;
					obj.test_card_template_id=value.test_card_template_id;
					obj.id=value.id;
					
					if(test_item!=value.test_item){
						test_item_list.push(value.test_item);
						strd_list=[];
						strd_list.push(obj);
						test_standard_list[value.test_item]=strd_list;
					}else{
						test_standard_list[value.test_item].push(obj);
					}

					test_item=value.test_item;
				})
				
				$.each(test_item_list,function(i,item){
					item_html += "<option value='" + item + "'>" + item+ "</option>";
				})
				$("#test_item").html(item_html);
				var standard_list=test_standard_list[test_item_list[0]];
				var strd_html="";
				$.each(standard_list,function(i,standard){
					strd_html+="<div class=\"col-xs-12\"><label class=\"col-xs-3 control-label no-padding-right\"></label>"+
					 "<div class=\"col-xs-9\" style=\"margin-bottom: 0;padding-top: 3px;color: #657ba0;\">"+
					 "<input type=\"radio\" name=\"check_strd\" tpl_detail_id="+standard.id+
					 " tpl_head_id="+standard.test_card_template_id+"></input>";
					strd_html+=standard.test_standard;
					strd_html+="</div></div>";
				})
				
				$("#test_standard_list").html(strd_html);
			}else{
				fadeMessageAlert(null,response.message,'gritter-error');
				flag= false;
			}

		}
	})
	return flag;
}

function ajaxValidate (){
	$.ajax({
        type: "post",
        dataType: "json",
        url : "/IMMS/production/getBusInfo",
        async:false,
        data: {
        	"bus_number": $('#bus_number').val(),
        },
        success: function(response){               
                var bus=response.businfo;
                if(bus == ""||bus==null){
                	fadeMessageAlert(null,'该车号不存在！','gritter-error');
                	$("#bus_number").val("");
                	return false;
                }else if(bus.factory_name.indexOf(getAllFromOptions("#factotry","name"))<0){
                	fadeMessageAlert(null,'抱歉，该车辆属于'+bus.factory_name+'，您没有操作权限！','gritter-error');
                	$("#bus_number").val("");
                	return false;
                }else{           		
            		//选中工厂、车间、线别、工序
            		$("#factory").val(bus.factory_id).attr("disabled",true);
            		$("#order").html(bus.order_desc);
                }
        },
        error:function(){alertError();}
   });
}
