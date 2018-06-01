var business_type="";
var url="";
var curElement=null;
$(document).ready(function(){
	initPage();
	
	$(document).on("keydown","#search_mat_desc",function(event) {
		if (event.keyCode == "13"){
			if(jQuery.trim($('#search_mat_desc').val()) != ""){
	        	var order_desc=$('#search_mat_desc').val().split("|")[0] || "";
	        	var mat_desc=$('#search_mat_desc').val().split("|")[1] || "";
	        	$(this).val(mat_desc);
	        	var order_no="";
	        	if(order_desc.split(" ").length>1){
	        		order_no=order_desc.split(" ")[0];
	        		$("#search_order_desc").val(order_desc);
	        		$("#search_order_no").val(order_no);
	        	}
	        	//查询物料明细
	        	if(order_no!=""){
	        		getMatInfo(order_no,mat_desc);
	        		addData();
	        	}else{
	        		alert("请扫描物料二维码！");
	        		return false;
	        	}
	        }
		}
//		if (event.keyCode == "13") {
//			addData();
//		}
	});
	
	$(document).on("click",".fa-times",function(e) {
		$(e.target).closest("tr").remove();
        $("#tableResult tbody tr").each(function(index,val){
			$(this).children().eq(1).text(index+1);
		});
	});
	$("#btnConfirm").click(function(){
		addData();
    });
	$("#btnBack").click(function(){
		var url="";
		if(business_type=='1'){
			url="/BMS/zzj/electrophoresisOuter";
		}
		if(business_type=='2'){
			url="/BMS/zzj/electrophoresisEnter";
		}
		window.location.href=url;
    });
	//工厂切换
	$("#search_factory").on("change",function(){
		getWorkshopSelect(url,$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	}); 
	//车间切换
	$("#search_workshop").change(function(){
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	});
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	});
	$("#business_date").change(function(){
		var business_date=$(this).val();
		if(business_date==''){
			return false;
		}
		$(".business_date").val(business_date);
	});
	$(document).on("blur",".quantity",function(event) {
		curElement=$(this);
		$(this).css("border-color",'');
		var quantity=$(this).val();
		if(quantity==''){
			return false;
		}
		if(!const_float_validate.test(quantity) && quantity!=""){
			alert("只能录入数字类型！");
			$(this).val("");
			$(this).focus();
			$(this).css("border-color",'red');
			return false;
		}
		if(business_type=='2'){
			var tr=$(this).parents("tr");
			var mat_description=$(tr).children().eq(2).text();
			var batch=$(tr).find(".batch").val();
			var zzj_type=$(tr).find(".zzj_type").val();
			var trs=$("#tableResult tbody").find("tr");
			var total=0;
			$.each(trs,function(i,obj){
				var mat_description_1=$(obj).children().eq(2).text();
				var batch_1=$(obj).find(".batch").val();
				var zzj_type_1=$(obj).find(".zzj_type").val();
				var quantity_1=$(obj).find(".quantity").val()
				if(mat_description==mat_description_1 &&
						batch==batch_1 && zzj_type==zzj_type_1){
					total+=parseInt(quantity_1!='' ? quantity_1 : 0);
				}
			});
			$.ajax({
		        type: "post",
		        url: "checkEelectroEnterQuantity",
		        cache: false,  //禁用缓存
		        data: {
		        	"order_id":$("#search_order_no").attr("order_id"),
		        	"factory_name":$(tr).children().eq(10).text(),
		        	"workshop_name":$(tr).children().eq(11).text(),
		        	"line_name":$(tr).children().eq(12).text(),
		        	"zzj_type":zzj_type,
		        	"batch":batch,
		        	"mat_description":mat_description,
		        	"quantity":total
		        	},  //传入组装的参数
		        dataType: "json",
		        success: function (response) {
		        	if(!response.success){
		        		if(parseInt(response.maxQuantity)==0){
		        			alert("此物料"+batch+"还没有外发,无法进仓");
		        		}else{
		        			alert("录入数据不能大于已外发未进仓数量:"+(parseInt(response.maxQuantity)+parseInt(quantity)-parseInt(total)));
		        		}
		        		
		    			$(curElement).val("");
		    			$(curElement).css("border-color",'red');
		    			$(curElement).focus();
					}
		        }
			});
		}
	});
	$("#btnSave").click(function(){
		 save();
    });
});
function addData(){
	if($("#search_order_no").val()==''){
		$.gritter.add({
			title: '提示：',
			text: "<h5>请输入订单编号</h5>",
			class_name: 'gritter-info'
		});
		return false;
	}
	if($("#search_factory").val()==''){
		$.gritter.add({
			title: '提示：',
			text: "<h5>请选择生产工厂</h5>",
			class_name: 'gritter-info'
		});
		return false;
	}
	
	if($("#search_mat_desc").val()==''){
		$.gritter.add({
			title: '提示：',
			text: "<h5>请输入物料描述</h5>",
			class_name: 'gritter-info'
		});
		return false;
	}
	
	var business_date=$("#business_date").val();
	$.ajax({
		type: "post",
        url: "getMatListMatDesc",
        cache: true,  //禁用缓存
        data: {
        	"order_id":$("#search_order_no").attr("order_id"),
        	"factory_id":$("#search_factory").val(),
        	"workshop_name":$("#search_workshop :selected").text(),
        	"line_name":$("#search_line :selected").text(),
        	"mat_desc":$("#search_mat_desc").val()
        },  
        dataType: "json",
        success: function (result) {
        	if(result.data.length==0){
        		alert("查找不到符合条件的数据");
        		return false;
        	}
        	var length=$("#tableResult tbody").find("tr").length;
        	$.each(result.data,function(index,val){
        		var batchSelectStr=getZzjBatchs(val.factory_id,val.order_id);
        		var zzjTypesSelect=getZzjTypes(val.factory_id,val.order_no,val.zzj_type);
        		var tr=$("<tr />");
        		
        		$("<td class='center'/>").html("<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>").appendTo(tr);
        		$("<td class='center no'/>").html(length+index+1).appendTo(tr);
        		$("<td class='center mat_description'/>").html(val.mat_description).appendTo(tr);
        		$("<td class='center'/>").html(zzjTypesSelect).appendTo(tr);
        		$("<td class='center'/>").html(val.order_desc).appendTo(tr);
        		$("<td class='center'/>").html(batchSelectStr).appendTo(tr);
        		$("<td class='center' style='width:70px'/>").html("<input class='quantity' style='width:100%;height:28px;' type='text'>").appendTo(tr);
        		$("<td class='center' style='width:100px'/>").html("<input class='business_date' id='business_date_"+length+index+1+"' style='width:100%;height:28px;' type='text' value='"+business_date+"' onclick='WdatePicker({dateFmt:\"yyyy-MM-dd\"})'/>").appendTo(tr);
        		$("<td class='center'/>").html("<input class='vendor' style='width:100%;height:28px;' type='text'>").appendTo(tr);
        		$("<td class='center'/>").html("<input class='memo' style='width:100%;height:28px;' type='text'>").appendTo(tr);
        		$("<td class='center factory_name'/>").html(val.factory_name).appendTo(tr);
        		$("<td class='center workshop_name'/>").html(val.workshop_name).appendTo(tr);
        		$("<td class='center line_name'/>").html(val.line_name).appendTo(tr);
        		$("<td class='center order_id' style='display:none'/>").html(val.order_id).appendTo(tr);
        		$("<td class='center factory_id' style='display:none'/>").html(val.factory_id).appendTo(tr);
        		$("#tableResult tbody").append(tr);
        	});
        	$("#search_mat_desc").val("");
        }
	});
}

function initPage(){
	var now = new Date(); //当前日期
	
	var startDate=new Date(now.getTime()-6*24*3600*1000);
	$("#business_date").val(formatDate(now));
    business_type=Request("business_type");	
    if(business_type=='1'){
    	$("#quantity").text("发货数量");
    	$(".business_date_title").text("发货日期");
    	$(".business_date_search").text(" 发货日期：");
    	url="zzj/electrophoresisOuter";
    }else if(business_type=='2'){
    	$("#quantity").text("进仓数量");
    	$(".business_date_title").text("进仓日期");
    	$(".business_date_search").text(" 进仓日期：");
    	url="zzj/electrophoresisEnter";
    }
    getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect(url,"","#search_factory",null,'id');
	getWorkshopSelect(url,$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'name');
}
function Request(strName){  
	var strHref = location.href; 
	var intPos = strHref.indexOf("?");  
	var strRight = strHref.substr(intPos + 1);  
	var arrTmp = strRight.split("&");  
	for(var i = 0; i < arrTmp.length; i++) {  
		var arrTemp = arrTmp[i].split("=");  
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];  
	}  
	return "";  
} 
function save(){
	var length=$("#tableResult tbody").find("tr").length;
	if(length==0){
		alert("没有可保存的数据");
		return false;
	}
	var datalist = [];
	var saveflag=true;
	var message="";
	$("#tableResult tbody").find("tr").each(function(index,val) {
		var tr = $(this);
		var mat_description=tr.find(".mat_description").text();
		var zzj_type=tr.find(".zzj_type").val();
		var no=tr.find(".no").text();
		var batch=tr.find(".batch").val();
		if(batch=='' || batch==undefined){
			saveflag=false;
			message+="第"+no+"行请选择批次;";
		}
		var quantity=tr.find(".quantity").val();
		if(quantity==''){
			saveflag=false;
			$("#quantity").text()
			message+="第"+no+"行请录入"+$("#quantity").text()+";";
		}
		var business_date=tr.find(".business_date").val();
		var vendor=tr.find(".vendor").val();
		var memo=tr.find(".memo").val();
		var factory_name=tr.find(".factory_name").text();
		var workshop_name=tr.find(".workshop_name").text();
		var line_name=tr.find(".line_name").text();
		var order_id=tr.find(".order_id").text();
		var factory_id=tr.find(".factory_id").text();
		var data = {};
		data.mat_description=mat_description;
		data.zzj_type=zzj_type,
		data.batch=batch;
		data.quantity=quantity;
		data.business_date=business_date;
		data.vendor=vendor;
		data.memo=memo,
		data.factory_name=factory_name;
		data.workshop_name=workshop_name;
		data.line_name=line_name;
		data.order_id=order_id;
		data.factory_id=factory_id;
		data.business_type=business_type;
		data.type='电泳件';
		datalist.push(data);
	});
	if(datalist.length==0){
		$.gritter.add({
			title: '提示：',
			text: "<h5>没有可保存的数据</h5>",
			class_name: 'gritter-info'
		});
		return false;
	}
	if(saveflag==false){
		$.gritter.add({
			title: '提示：',
			text: "<h5>"+message+"</h5>",
			class_name: 'gritter-info'
		});
		return false;
	}

	$.ajax({
		type: "post",
        url: "saveElectrophoresis",
        cache: true,  //禁用缓存
        data: {
        	"business_type":business_type,
        	"datalist" : JSON.stringify(datalist)
        },  
        dataType: "json",
        success: function (result) {
        	if(result.success){
        		$("#tableResult tbody").html("");
        		$.gritter.add({
        			title: '提示：',
        			text: "<h5>保存成功</h5>",
        			class_name: 'gritter-info'
        		});
        	}else{
        		$.gritter.add({
        			title: '提示：',
        			text: "<h5>保存失败</h5>",
        			class_name: 'gritter-info'
        		});
        	}
        }
	});
}
function getZzjBatchs(factory_id,order_id){
	var str='';
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getZzjBatchList",
		data : {
			"factory_id" : factory_id,
			"order_id":order_id
		},
		async : false,
		success:function(response){
			var data=response.data;
			str="<select class='batch' style='width:60px'>";
			if(data.length==0){
				str+="<option value=''></option>"
			}
			$.each(data,function(index,val){
				str+="<option value='"+val.name+"'>"+val.name+"</option>";
			});
			str+="</select>";
		}	
	});
	return str;
}
function getZzjTypes(factory_id,order_no,selectval){
	var str='';
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getZzjTypeList",
		async : false,
		data : {
			"factory" : factory_id,
			"order_no":order_no
		},
		success:function(response){
			var data=response.data;
			str="<select class='zzj_type'>";
			if(data.length==0){
				str+="<option value=''></option>"
			}
			$.each(data,function(index,val){
				if(val.name==selectval){
					str+="<option value='"+val.name+"' selected='selected'>"+val.name+"</option>";
				}else{
					str+="<option value='"+val.name+"'>"+val.name+"</option>";
				}
			});
			str+="</select>";
		}	
	});
	return str;
}
function setQRData(str){
	if(jQuery.trim(str) != ""){
    	var order_desc=str.split("|")[0] || "";
    	var mat_desc=str.split("|")[1] || "";
    	$("#search_mat_desc").val(mat_desc);
    	var order_no="";
    	if(order_desc.split(" ").length>1){
    		order_no=order_desc.split(" ")[0];
    		$("#search_order_no").val(order_no);
    		$("#search_order_desc").val(order_desc);
    	}
    	//查询物料明细
    	if(order_no!=""){
    		getMatInfo(order_no,mat_desc);
    		addData();
    	}else{
    		alert("请扫描物料二维码！");
    		return false;
    	}
        
    }
}
function getMatInfo(order_no,mat_desc){
	
	$.ajax({
		url : "getMatInfo",
		dataType : "json",
		data : {
				factory:$("#search_factory :selected").text(),
				workshop:$("#search_workshop :selected").text(),
				line:$("#search_line :selected").text(),
				order_no:order_no,
				mat_desc:mat_desc
			},
		async : false,
		error : function(response) {
			alert(response.message);
		},
		success : function(response) {
			var matlist=response.data;
			if(matlist.length==0){
				alert("未查询到物料信息，请扫描有效的物料二维码！")
				$("#search_order_no").val("");
				$("#search_order_desc").val("");
				$("#search_mat_desc").val("");
				return false;
			}else{//更新录入页面对应的数据
				if(matlist.length>1){
					$("#search_order_no").val("")
					alert("该物料明细存在重复记录，请核实数据后再录入产量！");
					return false;
				}
				var mat=matlist[0];
				$("#search_order_no").attr("order_id",mat.order_id);
			}
		}
	});
}