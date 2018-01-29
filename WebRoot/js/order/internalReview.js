var pageSize=1;
var table;
var select_str = "";
var select_str1 = "";
var select_str2 = "";
var cur_year="";
var dt;

$(document).ready(function(){
	getBusNumberSelect('#nav-search-input');
	cur_year = new Date().getFullYear();
	$("#search_productive_year").val(cur_year)
	//getFactorySelect();
	getFactorySelect("order/internalReview",'',"#search_factory","全部",'id');
	getOrderNoSelect("#search_order_no","#orderId");
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	//评审页面进入到评审查询页面，设置查询条件
	var message = getParamValue("message");
	if(message=="success"){
    	$.gritter.add({
			title: '系统提示：',
			text: '<h5>评审提交成功！</h5>',
			class_name: 'gritter-info'
		});
    }
	ajaxQuery();

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
});


function ajaxQuery(){
	dt=$("#tableOrder").DataTable({
		serverSide: true,
//		fixedColumns:   {
//            leftColumns: 3,
//            rightColumns:3
//        },
        rowsGroup:[0,1,2,3,4,5],
		paiging:true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		scrollY: $(window).height()-140,
		scrollX: $(window).width(),
		/*scrollCollapse: true,*/
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"orderNo":$("#search_order_no").val(),
				"orderId":$("#search_order_id").val(),
				"reviewStatus":$("#search_review_status").val(),
				"actYear":$("#search_productive_year").val(),
				"factory":getAllFromOptions("#search_factory","val"),
				"orderColumn":"order_no"
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "/BMS/order/review/showOrderReviewList",
                cache: true,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                 // settings.rowsGroup=[0,1,2,3,4,5];
                   //alert("分页调用");
                    callback(returnData);
                }
            });
		
		},
		columns: [
		            {"title":"订单编号",width:'100',"class":"center","data":"order_no",/*"render": function ( data, type, row ) {
	                    return "<input style='border:0;width:100%;height:100%;background-color:transparent;text-align:center;' value='"+data+"' />";
	                },*/"defaultContent": ""},
		            {"title":"订单描述",width:'180',"class":"center","data":"order_name_str","defaultContent": ""},
		            //{"title":"客户","class":"center","data":"customer","defaultContent": ""},
		            {"title":"生产工厂",width:'100',"class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"生产数量",width:'80',"class":"center","data": "production_qty","defaultContent": ""},
		            {"title":"生产年份",width:'80',"class":"center","data":"productive_year","defaultContent": ""},
		            {"title":"订单交期",width:'100',"class":"center","data": "delivery_date","defaultContent": ""},
		            //{"title":"订单数量","class":"center","data":"order_qty","defaultContent": ""},		            
		            {"title":"订单状态","class":"center","data":"status","render":function(data,type,row){
		            	return data=="0"?"未开始":(data=="1"?"生产中":"已完成")},"defaultContent":""
		            },
		            {"title":"评审状态",width:'120',"class":"center","data":"review_status","render":function(data,type,row){
		            	var result="";
		            	var flag="初评";
		            	if(row.flag=='1')flag="复评";
		            	if(data=="2"){
		            		result="已评审("+flag+")";
		            	}else if(data=="1"){
		            		result="<a onclick ='ajaxReview(\""+ row.factory_order_id+"\",\""+row.factory_id+"\",\""+row.flag+"\");' style='cursor:pointer'>评审中("+flag+")</a>"
		            	}else{
		            		result="未评审("+flag+")";
		            	}
		            	return result},"defaultContent":""
		            },
		            {"title":"评审结果",width:'80',"class":"center","data":"review_status","render":function(data,type,row){
		            	return data=="2"? "<i class=\"glyphicon glyphicon-search bigger-110 editorder\" onclick = 'ajaxSearch(" + row.reviewId+ ");' style='color:green;cursor: pointer;'></i>": ""},
		            	"defaultContent": ""
		            },
		            {"title":"评审",width:'60',"class":"center","data":"review_status","render":function(data,type,row){
		            	var result="";
		            	var flag=0;
		            	var title="初评";
		            	if(row.flag=='1'){
		            		flag=1;title="复评";
		            	}else if(row.review_status=='2' && row.flag=='0'){
		            		flag=1;title="复评";
		            	}
		            	if(row.permission==true){

		            		if(row.count==0 || row.count==1 ||(row.count>1 && row.review_status!='2')){
			            		result= "<i title='"+title+"' class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick ='ajaxReview(\""+ row.factory_order_id+"\",\""+row.factory_id+"\",\""+flag+"\");' style='color:green;cursor: pointer;'></i>";			
				            }
//			            	if(row.count==1){
//			            		result= "<i title='"+title+"' class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick ='ajaxReview(\""+ row.factory_order_id+"\",\""+row.factory_id+"\",\""+flag+"\");' style='color:green;cursor: pointer;'></i>";			
//				            }
//			            	if(row.count>1 && row.review_status!='2'){
//			            		 result= "<i title='"+title+"' class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick ='ajaxReview(\""+ row.factory_order_id+"\",\""+row.factory_id+"\",\""+flag+"\");' style='color:green;cursor: pointer;'></i>";			
//			            	}
		            	}
		            	return result},
		            	"defaultContent": ""},
//		            	{"title":"复评",width:'60',"class":"center","data":"review_status","render":function(data,type,row){
//			            	return row.permission==true ? 
//			            			(data=="2"? "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick ='ajaxReview(\""+ row.factory_order_id+"\",\""+row.factory_id+"\",\"1\");' style='color:green;cursor: pointer;'></i>"
//			            					: "") : ""},
//			            	"defaultContent": ""}
		            ],
		
	});
}
function ajaxSearch(id){
	$.ajax({
		url:"/BMS/order/review/getOrderReviewById",
		type: "post",
		data:{
			"id":id
		},
		dataType:"json",
		success:function(response){
			$('#tableData tr').unbind("mouseover mouseout");
			var data=response.data;
			$('#partsonlineDate').text(data.partsonline_date);
			$('#weldingonlineDate').text(data.weldingonline_date);
			$('#paintonlineDate').text(data.paintonline_date);
			$('#chassisonlineDate').text(data.chassisonline_date);
			$('#assemblyonlineDate').text(data.assemblyonline_date);
			$("#warehousingDate").text(data.warehousing_date);
			$('#modelexportDate').text(data.modelexport_date);
			$('#detaildemandNode').text(data.detaildemand_node);
			$('#bomdemandNode').text(data.bomdemand_node);
			$('#drawingexportDate').text(data.drawingexport_date);
			$('#sopdemandNode').text(data.sopdemand_node);
			$("#sipdemandNode").text(data.sipdemand_node);
			$("#applyInfo").text(data.apply_info);
			$('#configTable').text(data.config_table);
			$('#proximatematter').text(data.proximatematter);
			$('#modeljudging').text(data.modeljudging);
			$('#drawingearlierjudging').text(data.drawingearlierjudging);
			$('#purchasedetail').text(data.purchasedetail);
			$("#mintechInfo").text(data.mintech_info);
			$("#technical_operator").text(data.technical_operator);
			$("#technical_create_time").text(data.technical_create_time);
			$("#technicaldatanode").text(data.technicaldatanode);
			$('#technicsNode').text(data.technics_node);
			$('#technicsInfo').text(data.technics_info);
			$("#technology_operator").text(data.technology_operator);
			$("#technology_create_time").text(data.technology_create_time);
			$('#qualityNode').text(data.quality_node);
			$('#qualityInfo').text(data.quality_info);
			$("#quality_operator").text(data.quality_operator);
			$("#quality_create_time").text(data.quality_create_time);
			$('#factoryNode').text(data.factory_node);
			$("#factoryInfo").text(data.factory_info);
			$("#factory_operator").text(data.factory_operator);
			$("#factory_create_time").text(data.factory_create_time);
			$('#materialcontrolNode').text(data.materialcontrol_node);
			$('#materialcontrolInfo').text(data.materialcontrol_info);
			$("#planning_operator").text(data.planning_operator);
			$("#planning_create_time").text(data.planning_create_time);
			$('#plandepNode').text(data.plandep_node);
			$('#plandepInfo').text(data.plandep_info);
			$("#plandep_operator").text(data.plandep_operator);
			$("#plandep_create_time").text(data.plandep_create_time);
			$('#revisionpartsonlineDate').text(data.revisionpartsonline_date);
			$("#revisionweldingonlineDate").text(data.revisionweldingonline_date);
			$('#revisionpaintonlineDate').text(data.revisionpaintonline_date);
			$('#revisionchassisonlineDate').text(data.revisionchassisonline_date);
			$('#revisionassemblyonlineDate').text(data.revisionassemblyonline_date);
			$('#revisionwarehousingDate').text(data.revisionwarehousing_date);
			$('#revisiondetailNode').text(data.revisiondetail_node);
			$("#revisionbomNode").text(data.revisionbom_node);
			$('#revisionsopNode').text(data.revisionsop_node);
			$("#revisionsipNode").text(data.revisionsip_node);
			$('#busType').text(data.bus_type_code);
			$("#productionQty").text(data.production_qty);
			$('#factoryName').text(data.factory_name);
			$("#order_type").text(data.order_type);
			$("#delveryDate").text(data.delivery_date);
			$("#capacity").text(data.capacity);
			$("#customer").text(data.customer);
			
			var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
				width:950,
				height:500,
				modal: true,
				title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 评审结果</h4></div>',
				title_html: true,
				buttons: [ 
					{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					},
					{
						text: "导出",
						"class" : "btn btn-primary btn-minier",
						click: function() { 
							var imgs=new Array();			
							imgs.push({ width: 80,height: 30,image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAAA+CAYAAAA/K6W8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAJWElEQVR42uyce5RVVR3HP/fBGAwzMAMUIjoIoukESoWB1coQWhgukLBYllgIrhIto5dZK2tZK8kMbHwtH7kkG+0BYbQkpJaUWGmBFRiCLiTkMeTwCJRhHO/M7Y/f7y72HM5j33PO5Z47znetu+6955679z77t/dvf3+PvVN7qCeByACnAScDDcBI4O1APTAA6A/UAv2ALFAFdAA5oA04DLwOHAIOAK3Ay8AOoAXYCbyZtIfOJqANJwHjgbHAO4GzgEbglBLW2QJsBrbqayOwXgVYNqTKMDMywPuAicBkYBzwjgQMigPAP4EngT8DfweO9ERhVAEXATOBqcCpJB+twBPASmCNqryKFsZE4Epghur/SsX/gN8CjwCrK0kYGeAq4NPA++l52KhCuV9VWyKF0R+4DvgsMCJiWfuAl5T17FGVcUBH6CGDMR1VBpXTQdBHCUGNMq0B+qoHhigjGw6cqe9RcAi4D7hD25kIYaSB64Gv68MWi03AC8C/ldFsA17Rji4V0rpujQDeDYwBzlYWV1NkWR3AEuA2HURlE8YsYBFwRhH/2QqsBZ4C/qLcPymoAyYAFyjTe4/ONtuZchPQdKKFMRy4UxdmGzytrORx5feVgmHAJH3O6coKg7AeuBb424kQxlUq/WqLGfBTFcLzPWDhPhn4iLLDSRb33wx8u5TCeBCYG3DPSuAhYAU9F+8F5ujA7O9z31rgk8DeOIUxDPiNNsILvwR+FGZ6VjCGAAuVQdb7WPbT1aoPZBVBaFRu7SWIJ9S3NPstJoiClf4NJTCLPe6p1zVzZlRhjFd/zSCX33YCH1P3xnre2jgIfBlxcq7yuOfXut6EEsbZOrXcPLt3acUr6IWJF4FpwGfU/nBiKXBZsWtGHeL/H+i4nlPpPtrb74EYCfzCQ71PAJ61nRlrXQTxilqqvYKww8uq5n/m8tuTbizMTRhNwLmOaxtUEFt6+7hozFEvhYl+iFveV01d4ELBCkzKGaachoRGOyM0NI34oJY62wV8SkdPl+N6J9BMsO+qBrhc/5N31NmiVB3gCpd6ikEG8a39MeC+RcANjmsLgdu9hLFDO7iAvar7jnpY2GfGNHqWAF9yPGAuwO5pCSjzLJ+ZvItjAa58TM8wEXgm4J4HgHmOawPRwJWppuY5BAFwoc8I3BXjVF4IzHdc8+rsnOVs9Es42GVRT7F4imC3/HzVNCbucK4ZabWeTXxeR78X8sSL+4GPGt+91EZXDHV1xVweiHd3napFP1zk6Ls5BSEWhDELCcKY68SdZVjsbtP3TioTI3Rh9su62Qd8xXHtC6YwFjh+/FyZHuYIlY/JBHu0F9M9EDUflWCtrg0FbAL+GrIhbTrL2nyma16nZbPLbx0WdeSBdov7okYKb0d8bW7P8S0kx8sNr1mqvluMpaEOOD8LfNjF1REWb2KXPZHxEIYtHbYRWi6iMB5BcqfcsEaZ2qAI5d8LfB+J2QPMyAIfMm7ojOhvSgN9LUZllLypPupmmAGcg6R/5h0zJwt8NaIwTvURxj5V5b+KqJKf1gUdYFwWON24YTPwaoQK8pbqodXjerVlPdP1/TvAx8u0NuyOoYwNhjBOy6oBVcC2iIUXzPwgFVEdoOdT+CcCHNT3wyHbWRVDRw6IoYxNxufBWYfeOxix8CwwJeR/VwLXGOquzuI/nREGTRJg5ltVpx1WeK6MDduOJKwVOvnqAKFHwQKDSJQTZn+ns0rFCqiJoYJtBO99SAOjHbTxelVN1+r3pUiK/jKX/9eEtJ4PIxkezyZkZgw2PrdnEWfg2BhYTgEXEuy3qtN6nbr7Ysf35YjrfoTBmFIGtR0Y4AfaY8z8FPCPmBbeuHCO8flA1tFxY1QFRFFXtjuC3FSNm9Puebzzrvr6lP+TCrDWxxmf96QdU7ZWzfkoqLW45w3sMlOiLOAjI5YdlNbZGkP7TRtvaxZJtTFxDdH2ILyhtK/WQ6fnHbZNUvG6UvAGl+fIIwnTUXAJ3RPFV2eRgNI2YJRhUA0JKfm80rUliCfSa4FNVYAwtqiWeKxE5X/X0W+/K6iK+xw3/jiiFV6tHZ7xeKUrQBj5ElLfKcB5xvfHgKNpj8XucuD8kBWlCO8xbUiQMNIltLucMf9bMUbofozwn2JVGdRJEz0fS+m+v/E5NHZuqosb6O79HIR3qqIXWykIb1iRDXwB2f93a4wzqcpyFp/i8//aEJ1d46OGF3B8iudcN65/VK3fu41rU5GMhvkuBf8QCbB0Gg9WEGazGldBvqOMGn+LCBdTv0t1b6fLgLAhIF2I57fOIBspfb2qRmIT9j6wQuqRW/DrMo6PFTVjJCi4pXeuAz7guHYPx4dme2GP2cDPXVwzQwxvgut0moqETZ22x7LePg2FL7oIosCoOpzTyokjHAt4mJil03ZUb/9a40G1uZy4Dpe9LF4LzTO4p66fh0QDr+7tZ19MQPxpblvuFuGRZ+BnfC336PQqNRJXJMwuSAIywPeQ7JpGl9/vAW70W/398ACyQdANlyKnGNxMPGHMSscV2h/f9Pj9B0EkyHaD5WQka9srXLkTyUBswi6nqSfhE7pITwxYxANdTMVsPT5dWYGfm2S3zqaHgP/0YAH0Qw6qmYtsiPHCftUsa2wKDbMpfzGSNe6HTiS3qRlxx3f1ECFMUGIzh+BzUh5HMvv/a1t42OMqpqhastmfsUNV3HJlaR0VJoAxyLbhmXT3tHrhCOJaKjozM+pBLjchRzLYusRbgD8Bf1BL/8UEdv5Q4INILH8Kkjhhi4eBr2F5IkLcwiisJTeGtD02Kx/fiIR/X+LEnrIzVNs/HolHjwHexbH8V1usUUq7Lkpj4jz861xkg828iOVsR7y4O5Fkib2I02+fvrcqY2vH27l4EvA2xPM8WPX7YORgymHIDq3Rqmb7RGjraiT0sCqODizFsXijEF/WbKKfduaGNsQz2saxU9gKHuMM4onuq6/+Jai/XQ3eu5HE5dhQygMjs0jE8ErE11UJcW8//EvZ4cNh14RyCsNEg1rs0wifi1sOPKeqaBniJC0pynHIcANyyPAkJG7SmKDO36FE4vf6vulEVp5KwFnoo5XNNCKRw7FISLfUGSQtyuK2KKvboK+yIZXQg+mHI3m/I5XxDFU2NBCJS/dF0oEyiJMyrVZ+DkkvbdcF/jXk+NX9SBh1O7Kdere6a3JJeuj/DwBhCwaCLY0vLgAAAABJRU5ErkJggg=='});
							var dd = {
								content: [
									{
										style: 'tableExample',
										color: '#444',
										table: {
											widths: ['16%', '14%','14%', '14%','14%', '15%','13%'],
											headerRows: 1,
											// keepWithHeaderRows: 1,
											body: [
												[imgs,{text: '十九事业部订单评审评估表', style: 'tableHeader', colSpan: 6, alignment: 'center'},{},{},{},{},{}],
												['客户', '车型', '生产数量','生产工厂', '订单类型', '交付日期','产能/天'],
												[turnNullToStr(data.customer), turnNullToStr(data.bus_type_code), turnNullToStr(data.production_qty),
												 turnNullToStr(data.factory_name),turnNullToStr(data.order_type), turnNullToStr(data.delivery_date),turnNullToStr(data.capacity)],
												[{rowSpan: 2, text: '订单启动节点'},'部件上线','焊装上线','涂装上线','底盘上线','总装上线','全部入库'],
												['',turnNullToStr(data.partsonline_date),turnNullToStr(data.weldingonline_date),turnNullToStr(data.paintonline_date),
												turnNullToStr(data.chassisonline_date), turnNullToStr(data.assemblyonline_date),turnNullToStr(data.warehousing_date)],
												[{rowSpan: 3, text: '资料需求节点'},'数模输出时间','下料明细','BOM','图纸输出时间','SOP','SIP'],
												['', turnNullToStr(data.modelexport_date),turnNullToStr(data.detaildemand_node),turnNullToStr(data.bomdemand_node), 
												turnNullToStr(data.drawingexport_date), turnNullToStr(data.sopdemand_node),turnNullToStr(data.sipdemand_node)],
												['', '其他', {colSpan: 5, text: turnNullToStr(data.apply_info)},'', '', '',''],
												[{rowSpan: 4, text: '技术部'},{rowSpan: 4, text: '技术资料完善及可行性'},'配置表','型材清单','数模评审','图纸受控前评审','采购明细'],
												['','', turnNullToStr(data.config_table),turnNullToStr(data.proximatematter),turnNullToStr(data.modeljudging), 
														turnNullToStr(data.drawingearlierjudging),turnNullToStr(data.purchasedetail)],
												['', '','其他', {colSpan: 4, text: data.mintech_info},'', '',''],
												['', '','签字',turnNullToStr(data.technical_operator),'日期', {colSpan: 2, text: turnNullToStr(data.technical_create_time)},''],
												[{rowSpan: 2, text: '工艺部'},{rowSpan: 2, text: '是否有新增工装、模具、工艺等'},'资料需求节点',turnNullToStr(data.technics_node),'其他',{colSpan: 2, text: turnNullToStr(data.technics_info)},''],
												['', '','签字',turnNullToStr(data.technology_operator),'日期', {colSpan: 2, text: turnNullToStr(data.technology_create_time)},''],
												[{rowSpan: 2, text: '品质部'},{rowSpan: 2, text: '首车生产是否有指导文件'},'资料需求节点',turnNullToStr(data.quality_nod),'其他',{colSpan: 2, text: turnNullToStr(data.quality_info)},''],
												['', '','签字',turnNullToStr(data.quality_operator),'日期', {colSpan: 2, text: turnNullToStr(data.quality_create_time)},''],
												[{rowSpan: 2, text: '工厂内部'},{rowSpan: 2, text: '人员、场地、设备等'},'资料需求节点',turnNullToStr(data.factory_node),'其他',{colSpan: 2, text: turnNullToStr(data.factory_info)},''],
												['', '','签字',turnNullToStr(data.factory_operator),'日期', {colSpan: 2, text: turnNullToStr(data.factory_create_time)},''],
												[{rowSpan: 2, text: '综合计划部物控'},{rowSpan: 2, text: '物料风险'},'资料需求节点',turnNullToStr(data.materialcontrol_node),'其他',{colSpan: 2, text: turnNullToStr(data.materialcontrol_info)},''],
												['', '','签字',turnNullToStr(data.planning_operator),'日期', {colSpan: 2, text: turnNullToStr(data.planning_create_time)},''],
												[{rowSpan: 2, text: '综合计划部计划'},{rowSpan: 2, text: '计划风险'},'资料需求节点',turnNullToStr(data.plandep_node),'其他',{colSpan: 2, text: turnNullToStr(data.plandep_info)},''],
												['', '','签字',turnNullToStr(data.plandep_operator),'日期', {colSpan: 2, text: turnNullToStr(data.plandep_create_time)},''],
												[{rowSpan: 4, text: '评审结果修正'},{rowSpan: 2, text: '订单启动节点'},'部件上线','焊装上线','涂装上线','底盘上线','总装上线'],
												['', '', turnNullToStr(data.revisionpartsonline_date),turnNullToStr(data.revisionweldingonline_date),
												turnNullToStr(data.revisionpaintonline_date),turnNullToStr(data.revisionchassisonline_date),turnNullToStr(data.revisionassemblyonline_date)],
												['',{rowSpan: 2, text: '修正资料需求节点'},'全部入库','下料明细', 'BOM','SOP','SIP'],
												['', '', turnNullToStr(data.revisionwarehousing_date),turnNullToStr(data.revisiondetail_node),
														turnNullToStr(data.revisionbom_node),turnNullToStr(data.revisionsop_node),turnNullToStr(data.revisionsip_node)]
											]
										}
									},
									{text:'保存年限:3年                  表单编码：FM-WI-17-D19-0042-01A           保存单位：综合计划部',fontSize: 6,color: 'black'}
								],
								styles: {
									tableExample: {
										fontSize: 10,
										alignment: 'center',
										//valignment:'middle',
										margin: [0, 5, 0, 5]
										
									},
									tableHeader: {
										bold: true,
										fontSize: 16,
										color: 'black',
										height:10
									}
								},
								defaultStyle: {
									font: 'Roboto'
								}
							};
					 
						    pdfMake.fonts = {           	
						   		Roboto: { normal: 'msyh.ttf',           	
						   			bold: 'msyh.ttf',          	
						   			italics: 'msyh.ttf',          	
						   			bolditalics: 'msyh.ttf'    	   
						   		}  	
						    };	 
						    pdfMake.createPdf(dd).download();  
							//$('#tableData').tableExport({type:'pdf',pdfFontSize:'8',escape:'false',pdfmake:{enabled:true}});
						} 
					}
				]
			});
		}
	})
	
}
function ajaxReview(factoryOrderId,factoryId,flag){
	/*
	 * orderId:工厂订单ID;factoryId:工厂ID;flag[0:初评,1：复评]
	 */
	$.ajax({
		url: "/BMS/order/review/getReviewResult",
		dataType: "json",
		data: {
			"factoryOrderId" : factoryOrderId,
			"factoryId":factoryId,
			"flag":flag
			},
		error: function () {},
		success: function (response) {
			if(response.bmsOrderReviewResults==null){ // 评审未发起
				// 查看是否有发起评审权限
				var isPermission=isApplyPermission(factoryId,"start");
				var url="";
				var processId=getProcessByName("orderReview");
				if(isPermission==false){ // 暂未发起，其他评审节点不能进入页面
					$.gritter.add({
						title: '系统提示：',
						text: '<h5></h5><br>'+"暂未发起评审,请等待",
						class_name: 'gritter-info'
					});
				}else{  // 已发起，其他评审节点进入页面url
					url="/BMS/snaker/flow/all?processId="+processId+"&processName=orderReview&reviewOrderId="+factoryOrderId+"&factoryId="+factoryId+"&flag="+flag; // +"&orderNo="+orderNo+""
					window.open(url,"_self");
				}
				
			}else{ // // 评审已发起
				var isPermission=isApplyPermission(factoryId);
				if(isPermission==false){
					$.gritter.add({
						title: '系统提示：',
						text: '<h5></h5><br>'+"您没有操作评审权限",
						class_name: 'gritter-info'
					});
				}else{
					var id=response.bmsOrderReviewResults.id;
					var wfOrderId=response.bmsOrderReviewResults.wfOrderId;
					var processId=response.bmsOrderReviewResults.wfProcessId;
					var taskId=getTaskByOrderId(wfOrderId);
					var url="/BMS/snaker/flow/all?processId="+processId+"&orderId="+wfOrderId+"&factoryId="+factoryId+"&reviewOrderId="+factoryOrderId+"&flag="+flag+"";
					
					if(taskId!=null && taskId!="" && taskId!=undefined){
						var taskActor=getTaskActorId(taskId);
						if(taskActor!=""){
							url+="&taskId="+taskId+"&reviewResultId="+id;
						}
					}
					window.open(url,"_self");
				}
			}
		}
	})
}
function getProcessByName(processName){
	var processId="";
	$.ajax({
		url: "/BMS/order/review/getProcessByName",
		dataType: "json",
		async: false,
		data: {
			"processName" : processName,
			},
		error: function () {},
		success: function (response) {
			
			if(response.processId!=null){
				processId=response.processId;
			}
		}
	})
	return processId;
}
function getTaskByOrderId(orderId){
	var taskId="";
	$.ajax({
		url: "/BMS/order/review/getTaskByOrderId",
		dataType: "json",
		async: false,
		data: {
			"orderId" : orderId,
			},
		error: function () {},
		success: function (response) {
			
			if(response.taskId!=null){
				taskId=response.taskId;
			}
		}
	})
	return taskId;
}
function getTaskActorId(taskId){
	var taskActor="";
	$.ajax({
		url: "/BMS/order/review/getTaskActorId",
		dataType: "json",
		async: false,
		data: {
			"taskId" : taskId,
			},
		error: function () {},
		success: function (response) {
			
			if(response.taskActor!=null){
				taskActor=response.taskActor;
			}
		}
	})
	return taskActor;
}
function isApplyPermission(factoryId,type){
	var isPermission="";
	$.ajax({
		url: "/BMS/order/review/isApplyPermission",
		dataType: "json",
		async: false,
		data: {
			"factoryId" : factoryId,
			"type":type
			},
		error: function () {},
		success: function (response) {
			
			if(response.isPermission!=null){
				isPermission=response.isPermission;
			}
		}
	})
	return isPermission;
}
function turnNullToStr(str){
	var result="";
	if(str!=null && str!=undefined) result=str;
	return result;
}
function pdfForElement(id) {
	  function ParseContainer(cnt, e, p, styles) {
	    var elements = [];
	    var children = e.childNodes;
	    if (children.length != 0) {
	      for (var i = 0; i < children.length; i++) p = ParseElement(elements, children[i], p, styles);
	    }
	    if (elements.length != 0) {
	      for (var i = 0; i < elements.length; i++) cnt.push(elements[i]);
	    }
	    return p;
	  }

	  function ComputeStyle(o, styles) {
	    for (var i = 0; i < styles.length; i++) {
	      var st = styles[i].trim().toLowerCase().split(":");
	      if (st.length == 2) {
	        switch (st[0]) {
	          case "font-size":
	            {
	              o.fontSize = parseInt(st[1]);
	              break;
	            }
	          case "text-align":
	            {
	              switch (st[1]) {
	                case "right":
	                  o.alignment = 'right';
	                  break;
	                case "center":
	                  o.alignment = 'center';
	                  break;
	              }
	              break;
	            }
	          case "font-weight":
	            {
	              switch (st[1]) {
	                case "bold":
	                  o.bold = true;
	                  break;
	              }
	              break;
	            }
	          case "text-decoration":
	            {
	              switch (st[1]) {
	                case "underline":
	                  o.decoration = "underline";
	                  break;
	              }
	              break;
	            }
	          case "font-style":
	            {
	              switch (st[1]) {
	                case "italic":
	                  o.italics = true;
	                  break;
	              }
	              break;
	            }
	        }
	      }
	    }
	  }

	  function ParseElement(cnt, e, p, styles) {
	    if (!styles) styles = [];
	    if (e.getAttribute) {
	      var nodeStyle = e.getAttribute("style");
	      if (nodeStyle) {
	        var ns = nodeStyle.split(";");
	        for (var k = 0; k < ns.length; k++) styles.push(ns[k]);
	      }
	    }

	    switch (e.nodeName.toLowerCase()) {
	      case "#text":
	        {
	          var t = {
	            text: e.textContent.replace(/\n/g, "")
	          };
	          if (styles) ComputeStyle(t, styles);
	          p.text.push(t);
	          break;
	        }
	      case "b":
	      case "strong":
	        {
	          //styles.push("font-weight:bold");
	          ParseContainer(cnt, e, p, styles.concat(["font-weight:bold"]));
	          break;
	        }
	      case "u":
	        {
	          //styles.push("text-decoration:underline");
	          ParseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]));
	          break;
	        }
	      case "i":
	        {
	          //styles.push("font-style:italic");
	          ParseContainer(cnt, e, p, styles.concat(["font-style:italic"]));
	          //styles.pop();
	          break;
	          //cnt.push({ text: e.innerText, bold: false });
	        }
	      case "span":
	        {
	          ParseContainer(cnt, e, p, styles);
	          break;
	        }
	      case "br":
	        {
	          p = CreateParagraph();
	          cnt.push(p);
	          break;
	        }
	      case "table":
	        {
	          var t = {
	            table: {
	              widths: [],
	              body: []
	            }
	          }
	          var border = e.getAttribute("border");
	          var isBorder = false;
	          if (border)
	            if (parseInt(border) == 1) isBorder = true;
	          if (!isBorder) t.layout = 'noBorders';
	          ParseContainer(t.table.body, e, p, styles);

	          var widths = e.getAttribute("widths");
	          if (!widths) {
	            if (t.table.body.length != 0) {
	              if (t.table.body[0].length != 0)
	                for (var k = 0; k < t.table.body[0].length; k++) t.table.widths.push("*");
	            }
	          } else {
	            var w = widths.split(",");
	            for (var k = 0; k < w.length; k++) t.table.widths.push(w[k]);
	          }
	          cnt.push(t);
	          break;
	        }
	      case "tbody":
	        {
	          ParseContainer(cnt, e, p, styles);
	          //p = CreateParagraph();
	          break;
	        }
	      case "tr":
	        {
	          var row = [];
	          ParseContainer(row, e, p, styles);
	          cnt.push(row);
	          break;
	        }
	      case "td":
	        {
	          p = CreateParagraph();
	          var st = {
	            stack: []
	          }
	          st.stack.push(p);

	          var rspan = e.getAttribute("rowspan");
	          if (rspan) st.rowSpan = parseInt(rspan);
	          var cspan = e.getAttribute("colspan");
	          if (cspan) st.colSpan = parseInt(cspan);

	          ParseContainer(st.stack, e, p, styles);
	          cnt.push(st);
	          break;
	        }
	      case "div":
	      case "p":
	        {
	          p = CreateParagraph();
	          var st = {
	            stack: []
	          }
	          st.stack.push(p);
	          ComputeStyle(st, styles);
	          ParseContainer(st.stack, e, p);

	          cnt.push(st);
	          break;
	        }
	      default:
	        {
	          console.log("Parsing for node " + e.nodeName + " not found");
	          break;
	        }
	    }
	    return p;
	  }

	  function ParseHtml(cnt, htmlText) {
	    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
	    var p = CreateParagraph();
	    for (var i = 0; i < html.length; i++) ParseElement(cnt, html.get(i), p);
	  }

	  function CreateParagraph() {
	    var p = {
	      text: []
	    };
	    return p;
	  }
	  content = [];
	  ParseHtml(content, document.getElementById(id).outerHTML);
	  return pdfMake.createPdf({
	    content: content
	  });
	}
