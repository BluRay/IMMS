var matToPrintList;
var matIds;
$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
	$(document).on("change","#search_order_no",function(){
		if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}	
	})
	
	$(document).on("change","#search_factory",function(){
		if($("#search_order_no").val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}
	})
	
	//全选反选
	$(document).on("click","#checkall",function(){
		//alert("aa");
		if ($('#checkall').is(":checked")) {
			//alert("选中")
			check_All_unAll("#tableResult",true);
		}
		if($('#checkall').is(":checked")==false){		
			check_All_unAll("#tableResult",false);
		}	
	})
	
	//打印
	$("#btnPrint").click(function(){
		matIds=[];
		$("#printarea").html("");
		var printFlag=true;
		matToPrintList="";//获取要打印的物料列表
		var count=0;
		var printhtml="";
		$("#tableResult tbody :checkbox").each(function(){
			
			if($(this).prop("checked")){
				var tr=$(this).parents("tr");
				matIds.push($(this).prop("id"))
				matToPrintList+=$(tr).children().eq(1).text()+'|'+$(tr).children().eq(4).text()+",";
				printhtml+="<div class=\"printConfigure printable toPrint\" style=\"page-break-after: always;font-size:16px;padding-top:10px;padding-bottom:10px;line-height:40px;\" >"
					+"<div style=\"text-align:center;\" >"+$(tr).children().eq(1).text()+"</div>"
					+"<div id=\"bcTarget"+count+"\" style=\"width:300px; height:110px;margin-top:10px;text-align:center;margin:0 auto\"></div>" 
					+"<div style=\"text-align:center;\" >"+$(tr).children().eq(4).text()+"</div></div>";
				count++;
			}
			
		});
		if(printhtml==""){
			alert("请选择一条记录");
			return false;
		}
		$("#printarea").append(printhtml);
		matToPrintList=matToPrintList.substring(0,matToPrintList.length-1);
		for(var i=0;i<count;i++){
			var arr=matToPrintList.split(",");
			//$("#bcTarget"+i).barcode('KB-5701421B-1', "code128",{barWidth:2, barHeight:90,showHRI:false});
			jQuery("#bcTarget"+i).qrcode({
			    render: "canvas", //也可以替换为table
			    size:110,
			    mode:0,
			    text: arr[i]
			});
		}
		
		if(matToPrintList.length==0){
			printFlag=false;
		}else
		 setTimeout(function (){
			 if(printFlag){
				 window.print();
			 }else{
				 alert("VIN为空，请先绑定车号和VIN!");
			 }
						       				
			},0);
	});
	
	//打印后更新打印人打印时间
	window.onafterprint=function(){
		//alert(matIds.join(","))
		 ajaxUpdatePrint(matIds);
	}
	
})

function initPage(){
	getFactorySelect("zzj/matPrint","","#search_factory","全部","id")
	getOrderNoSelect("#search_order_no","#orderId");
	$("#checkall").attr("checked",false);
}

function ajaxQuery(){
	$("#tableResult").DataTable({
		columnDefs: [{
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-140,
		scrollX: true,
		pageLength: pageSize,
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
					"order_no":$("#search_order_no").val(),
					"factory":$("#search_factory").val(),//getAllFromOptions("#search_factory","val"),
					"zzj_type":$("#search_zzj_type").val(),
					"mat_desc":$("#search_mat_desc").val()
				};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "showMatList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		
		},
		columns: [
		           {"title":"<input type='checkbox' id='checkall' name='check'></input>","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<input type='checkbox' name='check' id='"+row.id+"'></input>";		            		
			         }},
		            {"title":"订单","class":"center","data":"order_desc","defaultContent": ""},
		            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"自制件类别","class":"center","data":"zzj_type","defaultContent": ""},
		            {"title":"物料描述","class":"center","data": "mat_description","defaultContent": ""},
		            {"title":"打印状态","class":"center","data":"print_flag","defaultContent": ""},		            
		            {"title":"最近打印人","class":"center","data":"printer","defaultContent": ""},		            
		            {"title":"最近打印日期","class":"center","data": "print_date","defaultContent": ""},
		         /*   {"title":"操作","class":"center","data":"order_id","render":function(data,type,row){
		            	return "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" title='打印' onclick = 'showEditPage(" + JSON.stringify(row)+ ");' style='color:green;cursor: pointer;'></i>";		            		
		            	}
		            }*/
		          ],
	/*	rowsGroup:[0,1,2,3,8]*/
		
	});
}

function  ajaxUpdatePrint(matIds){
	$.ajax({
		type : "post",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "afterMatPrint",
		data : {
			"matIds" : matIds.join(",")
		},
		success:function(response){
			if(response.success){
				ajaxQuery();		
			}
		}	
	});
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

function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
	c = str.charCodeAt(i);
	if ((c >= 0x0001) && (c <= 0x007F)) {
	    out += str.charAt(i);
	} else if (c > 0x07FF) {
	    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	    out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
	    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	} else {
	    out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
	    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	}
    }
    return out;
}