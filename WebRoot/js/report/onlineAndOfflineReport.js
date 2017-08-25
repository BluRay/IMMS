$(document).ready(function(){
	
	initPage();

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	$("#btnQuery").click(function(){
		if($("#search_date").val()==''){
			alert("请选择日期");
			return false;
		}
		
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		$("#tableResult").DataTable({
			paiging:false,
			ordering:false,
			searching: false,
			autoWidth:false,
			paginate:false,
			sScrollY: $(window).height()-230,
			scrollX: true,
			scrollCollapse: true,
			dom: 'Bfrtip',
		    buttons: [
		        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},		       
		    ],
			lengthChange:false,
			orderMulti:false,
			info:false,
			showFooter:true,
			language: {
				emptyTable:"",					     
				infoEmpty:"",
				zeroRecords:"没查找到符合条件的记录"
			},
			aoColumnDefs : [
                {
                    "aTargets" :[3,6],
                    "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) { 
                    	if(parseFloat($(nTd).text())>0){
                    		$(nTd).css('color', '#ff0000');
                    	}
    	             }   
                }
            ],
            
			ajax:function (data, callback, settings) {
				var param ={
						"reportDate":$("#search_date").val()
						};

	            $.ajax({
	                type: "post",
	                url: "getOnlineAndOfflineData",
	                cache: false,  //禁用缓存
	                data: param,  //传入组装的参数
	                dataType: "json",
	                success: function (result) {
	                	//封装返回数据
	                	var welding_onlinetotal=0;
	            	    var welding_offlinetotal=0;
	            		var chassis_onlinetotal=0;
	            		var chassis_offlinetotal=0;
	                    var returnData = {};
	                    returnData.data = result.data;//返回的数据列表
	                    var addTotalJson={};
	                    var addFinishRaioJson={};
	            		$.each(result.data,function(index,value){
	            			welding_onlinetotal+=parseFloat(value.welding_online);
	            			welding_offlinetotal+=parseFloat(value.welding_offline);
	            			chassis_onlinetotal+=parseFloat(value.chassis_online);
	            			chassis_offlinetotal+=parseFloat(value.chassis_offline);
	            		});
	            		var weldingFinishRadio=Math.round(welding_offlinetotal / (welding_onlinetotal!=0 ? welding_onlinetotal : 1) * 10000) / 100.00 + "%";// 小数点后两位百分比
	            		var chassisFinishRadio=Math.round(chassis_offlinetotal / (chassis_onlinetotal!=0 ? chassis_onlinetotal : 1 ) * 10000) / 100.00 + "%";// 小数点后两位百分比
	            		addTotalJson={"factory_name":"合计",
	            				"welding_online":welding_onlinetotal,"welding_offline":welding_offlinetotal,
	            				"chassis_online":chassis_onlinetotal,"chassis_offline":chassis_offlinetotal};
	            		addFinishRaioJson={"factory_name":"达成率",
	            				"welding_online":'',"welding_offline":weldingFinishRadio,
	            				"chassis_online":'',"chassis_offline":chassisFinishRadio};
	            		returnData.data.push(addTotalJson);
	            		returnData.data.push(addFinishRaioJson);
	                    callback(returnData);
	                }
	            });
			
			},
			columns: [
			            {"title":"工厂","class":"center","data":"factory_name","defaultContent": ""},
			            {"title":"焊装上线累计计划","class":"center welding_online","data":"welding_online","render":function(data,type,row){
			            	return data!='0' ? data : ''
			            },"defaultContent": ""},
			            {"title":"焊装累计完成","class":"center welding_offline","data":"welding_offline","render":function(data,type,row){
			            	return data!='0' ? data : ''
			            },"defaultContent": ""},
			            {"title":"欠产","class":"center","data": "","render":function(data,type,row){
			            	return (row.factory_name!='达成率' && (row.welding_online!='0' || row.welding_offline!='0'))  ? row.welding_online-row.welding_offline :''
			            },"defaultContent": ""},
			            {"title":"底盘上线累计计划","class":"center chassis_online","data":"chassis_online","render":function(data,type,row){
			            	return data!='0' ? data : ''
			            },"defaultContent": ""},	            
			            {"title":"底盘累计完成","class":"center chassis_offline","data": "chassis_offline","render":function(data,type,row){
			            	return data!='0' ? data : ''
			            },"defaultContent": ""},
			            {"title":"欠产","class":"center","data": "","render":function(data,type,row){
			            	return (row.factory_name!='达成率' && (row.chassis_online!='0' || row.chassis_offline!='0'))  ? row.chassis_online-row.chassis_offline : ''
			            },"defaultContent": ""},
			          ]
		});
		$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
	});
})

function initPage(){
	getBusNumberSelect('#nav-search-input');
	$("#search_date").val(formatDate());
}
//格局化日期：yyyy-MM-dd 
function formatDate() { 
	var date=new Date();
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate();

	if(mymonth < 10){ 
		mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
		myweekday = "0" + myweekday; 
	} 
	return (myyear+"-"+mymonth + "-" + myweekday); 
}

