
$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery('');
	});
	$('#search_factory').change(function(){ 
		getWorkshopSelect("zzj/zzjPMDQuery",$("#search_factory :selected").text(),"","#search_workshop","全部","id");
	});
	$(document).on("change","#search_order_no",function(){
		$("#search_order_desc").val("");
        if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}	
	})
	
	$(document).on("change","#search_factory",function(){
		if($("#search_order_no").val().trim().length>0 && $("#search_factory").val()!=''){
			getZzjTypes();
		}
	});
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	});
});

function ajaxQuery(zzj_type){
	if($("#search_order_no").val()==''){
		alert("请输入订单编号");
		return false;
	}
	if($("#search_factory").val()==''){
		alert("请选择生产工厂");
		return false;
	}
	if(zzj_type==''){
		zzj_type=$("#search_zzj_type").val();
	}
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	var dt=$("#tableResult").DataTable({
		paiging:false,
		ordering:false,
		searching: false,
		autoWidth:false,
		paginate:false,
		sScrollY: $(window).height()-165,
		scrollX: true,
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		rowsGroup:[0,1],
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"没查找到符合条件的记录"
		},
		ajax:function (data, callback, settings) {
			var param ={
				"order_id":$("#search_order_no").attr("order_id"),
	        	"factory_id":$("#search_factory").val(),
	        	"zzj_type":zzj_type,
			};

            $.ajax({
                type: "post",
                url: "getPmdByMap",
                cache: true,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //封装返回数据
                    var returnData = {};
                    returnData.data = result.data;//返回的数据列表
                    callback(returnData);
                }
            });
		},
		columns: [
			{"title":"订单编号","class":"center","data":"order_no","defaultContent": ""},		            
			{"title":"订单描述","class":"center","data":"order_desc","defaultContent": ""},
            {"title":"自制件类型","class":"center","data": "zzj_type"},
            {"title":"导入人","class":"center","data":"username","defaultContent": ""},		            
            {"title":"导入日期","class":"center","data":"create_date","defaultContent": ""},
            {"title":"操作","class":"center","data":"","render":function(data,type,row){
            	return "<i class=\"glyphicon glyphicon-search bigger-110\" onclick ='search("+JSON.stringify(row)+");' style='color:green;cursor: pointer;'></i>";
            }}          		           
          ],
	});
}

function initPage(){
	getFactorySelect("zzj/zzjPMDQuery",$("#default_factory").val(),"#search_factory","全部","id")
	getOrderNoSelect("#search_order_no","#orderId");
	getZzjTypes($("#default_zzj_type").val());
	if($("#search_factory").val()!='' && 
			$("#search_order_no").attr("order_id")!=''){
		ajaxQuery($("#default_zzj_type").val());
	}
}
function search(row){
	var order_id=row.order_id;
	var zzj_type=row.zzj_type;
	var order_no=row.order_no;
	var order_desc=row.order_desc;
	var factory_id=row.factory_id;
	var factory_name=row.factory_name;
	var default_zzj_type=$("#search_zzj_type").val();
	var url="/BMS/zzj/zzjPMDDetailQuery?order_id="+order_id+"&order_no="+order_no;
	url+="&zzj_type="+zzj_type+"&order_desc="+order_desc+"&default_zzj_type="+default_zzj_type;
	url+="&factory_id="+factory_id+"&factory_name="+factory_name;
	window.location.href=url;
}
/**
 * 自制件模块获取自制件类别下拉选项
 */
function getZzjTypes(selectval){
	selectval=selectval||"";
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getZzjTypeList",
		data : {
			"factory" : $("#search_factory").val(),
			"order_no":$("#search_order_no").val()
		},
		success:function(response){
			getSelects(response.data,selectval,"#search_zzj_type","全部", "name");	
		}	
	});
}