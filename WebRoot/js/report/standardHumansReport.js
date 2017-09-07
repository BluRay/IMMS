$(document).ready(function(){
	
	initPage();

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	});
	
	$("#btnQuery").click(function(){
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}

        $.ajax({
            type: "post",
            url: "getStandardHumansReportData",
            cache: false,  //禁用缓存
            data: {
            	"factory":$("#search_factory :selected").text(),
				//"date":$("#start_date").val()
            },  //传入组装的参数
            dataType: "json",
            success: function (result) {
                var headerlist=result.headerlist;
                var rowlist=result.rowlist;
                $("#tableResult thead").html("");
                $("#tableResult tbody").html("");
                if(headerlist.length>0){
                	var tr = $("<tr/>");
                    $("<th style='text-align:center;'/>").html("车间").appendTo(tr);
                    $.each(headerlist,function(i,data){
                    	var header=data.headerStr.split("-");
                    	$("<th style='text-align:center;'/>").html(header[0]+'-建议标准人力-'+header[1]+"台").appendTo(tr);
                    });
                    $("#tableResult thead").append(tr);
                    
                	$.each(rowlist,function(i,row){
                		var tr = $("<tr/>");
                    	$("<td style='text-align:center;'/>").html(row.workshop).appendTo(tr);
                    	$.each(headerlist,function(i,header){
                		    var th=header.headerStr;
                		    $("<td style='text-align:center;'/>").html(row[th]).appendTo(tr);
                		});
                		$("#tableResult tbody").append(tr);
                    });    
                	//合计行
                	var sum=0;
                	var tr = $("<tr/>");
                	$("<td style='text-align:center;'/>").html("合计").appendTo(tr);
                	$.each(headerlist,function(i,header){
                    	$.each(rowlist,function(i,row){
                		    sum+=parseInt(row[header.headerStr]);
                		});
                    	$("<td style='text-align:center;'/>").html(sum).appendTo(tr);
            		    sum=0;                    		
                	});    
                	$("#tableResult tbody").append(tr);
                }else{
                	alert("未查询到数据");
                }
            }
        });
    });
	$("#btnExport").click(function() {
		$('#tableResult').tableExport({type:'excel',escape:'false'});
	});
})

function initPage(){
	getBusNumberSelect('#nav-search-input');
	getFactorySelect("report/standardHumansReport",'',"#search_factory",null,'id');
	var now = new Date(); //当前日期
	$("#start_date").val(formatDate(now));
}
