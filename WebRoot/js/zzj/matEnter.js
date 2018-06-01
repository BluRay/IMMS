var url='zzj/matEnter';
var mat_list_add=[];
var t;
$(document).ready(function(){
	initPage();
	
	t=$("#tableAdd").DataTable({
		paiging:false,
		paginate:false,
		ordering:false,
        fixedColumns:   {
            leftColumns: 4,
            rightColumns:0
        },
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-140,
		scrollX: true,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:""
		},
		lengthChange:false,
		orderMulti:false,
		fnDrawCallback: function(){
			this.api().column(1).nodes().each(
					function(cell, i) {
						cell.innerHTML =  i + 1;
					});
		},
/*		data:data,*/
		columns: [					
					{"title":"","class":"center","width":"50","data":"","defaultContent": "","render":function(data, type, row, meta){
						var html="<i class=\"fa fa-times bigger-110 detlmat\" style=\"cursor: pointer;color: red;\" rowindex='"+meta.row+"'></i>";
						return html;
					}},
					{"title":"序号","class":"center","width":"50","data":"","defaultContent": "",/*"render":function(data, type, row, meta){
						return meta.row+1;
					}*/},
		            {"title":"物料描述","class":"center","width":"200","data":"mat_description","defaultContent": ""},
		            {"title":"订单","class":"center","width":"180","data":"","defaultContent": "","render":function(data,type,row){
		            	return row.order_no+" "+row.order_desc;
		            }},
		            {"title":"自制件类别","class":"center","width":"90","data":"zzj_type","defaultContent": "","render":function(data,type,row){
		            	var options="";
		            	if(data !=undefined){
		            		options=creatOptions(data.split(","))
		            	}
		            	var html="<select class='zzj_type' style='width:80px;border:0px;height:25px;text-align:center;'>"+options+"</select>"
		            	return html;
		            }},
		            {"title":"生产数量","class":"center","width":"70","data":"quantity","defaultContent": "","render":function(data,type,row){
		            	var html="<input type='text' class='output'  style='width:50px;height:25px;border:0;text-align:center;'/>";
		            	return html;
		            }},	
		            {"title":"线别","class":"center","width":"80","data":"","defaultContent": "","render":function(data,type,row){
		            	var html="<select class='line' style='width:70px;border:0px;height:25px;text-align:center;'>"+
		            	$("#add_line").html()+"</select>";
		            	return html;
		            }},
		            {"title":"班组","class":"center","width":"80","data":"team","defaultContent": "","render":function(data,type,row){
		            	var html="<select class='team' style='width:80px;border:0px;height:25px;text-align:center;'>"+
		            	$("#add_team").html()+"</select>";
		            	return html;
		            }},
		            {"title":"生产工序","class":"center","width":"90","data": "process","defaultContent": "","render":function(data,type,row){
		            	var html="<select class='process' style='width:78px;border:0px;height:25px;text-align:center;'>"+
		            	$("#add_process").html()+"</select>";
		            	return html;
		            }},
		            {"title":"生产批次","class":"center","width":"80","data": "batch","defaultContent": "","render":function(data,type,row){
		            	var options="";
		            	if(data !=undefined){
		            		options=creatOptions(data.split(","))
		            	}
		            	
		            	var html="<select class='batch' style='width:80px;border:0px;height:25px;text-align:center;'>"+options+"</select>"
		            	return html;
		            }},	            
		            {"title":"生产日期","class":"center","width":"90","data":"product_date","defaultContent": "","render":function(data,type,row){
		            	var html="<input type='text' class='prod_date' value='"+$("#add_prod_date").val()+"' style='width:90px;height:25px;border:0;text-align:center;' onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd'});\"/>";
		            	
		            	
		            	return html;
		            }},	
		            {"title":"材料规格","class":"center","width":"90","data":"specification","defaultContent": "","render":function(data,type,row){
		            	var options="";
		            	if(data !=undefined){
		            		options=creatOptions(data.split(","))
		            	}
		            	var html="<select class='spec' style='width:80px;border:0px;height:25px;text-align:center;'>"+options+"</select>"
		            	return html;
		            }},
		            {"title":"下料尺寸","class":"center","width":"90","data":"filling_size","defaultContent": "","render":function(data,type,row){
		            	var options="";
		            	if(data !=undefined){
		            		options=creatOptions(data.split(","))
		            	}
		            	var html="<select class='size' style='width:80px;border:0px;height:25px;text-align:center;'>"+options+"</select>"
		            	return html;
		            }},
		          ],	
	});
	
/*	t.on('draw.dt', function () {
		alert("re draw")
	      //给第一列编号
	      t.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
	          cell.innerHTML = i + 1;
	      });
	  });
	*/
	//删除新增的产量录入行数据
	$(document).on("click",".detlmat",function(e){
		var rowindex=Number($(this).attr("rowindex"));
		 t.row($(e.target).parent("td").parent('tr')).remove().draw(true); 
		 mat_list_add.splice(rowindex,1)
	})
	
	$("#search_factory,#add_factory").change(function(e){
		var ele_type=$(e.target).attr("id").split("_")[0];
		if($("#"+ele_type+"_order").val().trim().length>0 && $("#"+ele_type+"_factory").val()!=''){
			getZzjTypes(null,ele_type);
			getBatchSelects(null,ele_type);
		}		
		$("#"+ele_type+"_workshop").empty();
		if($("#"+ele_type+"_factory").val() !=''){
			//getAllWorkshopSelect();
			var factory=$("#"+ele_type+"_factory"+" :selected").text();
			getWorkshopSelect(url,factory,"","#"+ele_type+"_workshop",null,"name")
			var workshop=$("#"+ele_type+"_workshop"+" :selected").text();
			var default_option="全部";
			if(ele_type=='add'){
				default_option="请选择";
			}
			//getAllLineSelect();
			getLineSelect(factory,workshop,"","#"+ele_type+"_line",default_option,"name")
			getTeamSelect(factory,workshop,"","","#"+ele_type+"_team",default_option,"name");
			getAllProcessSelect(null,null,ele_type);
		}
	});
	
	$("#search_workshop,#add_workshop").change(function(e){
		var ele_type=$(e.target).attr("id").split("_")[0];
		$("#"+ele_type+"_line").empty();
		if($("#"+ele_type+"_workshop").val() !=''){
			//getAllLineSelect();
			var factory=$("#"+ele_type+"_factory"+" :selected").text();
			var workshop=$("#"+ele_type+"_workshop"+" :selected").text();
			var default_option="全部";
			if(ele_type=='add'){
				default_option="请选择";
			}
			getLineSelect(factory,workshop,"","#"+ele_type+"_line",default_option,"name")
			getTeamSelect(factory,workshop,"","","#"+ele_type+"_team",default_option,"name");
			getAllProcessSelect(null,null,ele_type);
		}
	});
	
	$("#search_line,#add_line").change(function(e){
		var ele_type=$(e.target).attr("id").split("_")[0];
		$("#"+ele_type+"_process").empty();
		if($("#"+ele_type+"_line").val() !=''){
			getAllProcessSelect(null,null,ele_type);
		}
		if(ele_type='add'){
			$(".line").val($(this).val());
			$(".process").html($("#add_process").html())
		}
	});
	
	$("#add_team").change(function(e){
		$(".team").val($(this).val());
	});
	
	$("#add_process").change(function(e){
		$(".process").val($(this).val());
	});
	
	$("#add_batch").change(function(e){
		$(".batch").val($(this).val());
	});
	
	
	$(document).on("change","#search_order,#add_order",function(e){
		var ele_type=$(e.target).attr("id").split("_")[0];
	/*	if($(this).val().trim().length>0&&$("#"+ele_type+"_factory").val()!=''){
			getZzjTypes(null,ele_type);
			getBatchSelects(null,ele_type);
		}*/
		
		if(ele_type=='add'&&$("#add_mat_desc").val().trim().length>0){
			var mat=getMatInfo($(this).val(),$("#add_mat_desc").val());
    		if(mat !=null){
    			mat.mat_description=$("#add_mat_desc").val();    		
        		mat_list_add.push(mat)
        		addMat(mat);
        		$("#add_mat_desc").val("").focus();
    		}  
		}
	})
	
	//扫描后截取订单信息
    $('#add_mat_desc').bind('keydown', function(event) {
    	var mat_str=$(this).val();
    	saveflag=true;
        if($(this).attr("disabled") == "disabled")
            return false;      
        if (event.keyCode == "13"){	
            if(jQuery.trim(mat_str) != ""){
            	var order_desc=mat_str.split("|")[0] || "";
            	var mat_desc=mat_str.split("|")[1] || mat_str;
            	//$(this).val(mat_desc);
            	var order_no=$("#add_order").val();
            	if(order_desc.split(" ").length>1){
            		order_no=order_desc.split(" ")[0];
            		/*$("#order").val(order_desc)*/
            	}
            	//查询物料明细
            	if(order_no!=""){
            		var mat=getMatInfo(order_no,mat_desc);
            		if(mat !=null){
            			mat.mat_description=mat_desc;
                		
                		mat_list_add.push(mat)
                		addMat(mat);
                		$(this).val("").focus();
            		}            		
            	}else{
            		saveflag=false;
            		alert("请扫描物料二维码或输入订单！")
            		return false;
            	}
                
            }
            return false;
        }  
    });
	
	$("#btnQuery").click(function(){
		if($("#search_order").val().trim().length==0){
			alert("请输入订单！");
			return false;
		}
		ajaxQuery();
	})
	
	//新增页面显示
	$("#btnAdd").click(function(){
		$("#search_form").hide();
		$("#div_result").hide();		
		$("#add_form").show();
		$("#div_add").show();
		
		getOrderNoSelect("#add_order","#orderId",function(){		
			getBatchSelects(null,"add");
		});
		
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		//
		getFactorySelect("add");
		
	})
	
	//新增页面返回查询页面
	$("#btnCancel").click(function(){
		$("#search_form").show();
		$("#div_result").show();		
		$("#add_form").hide();
		$("#div_add").hide();

		ajaxQuery();
	})
	
	//批量录入
	$("#btnSave").click(function(){
		saveOutput();
	})
	
}) 

function initPage(){
	$("#search_form").show();
	$("#div_result").show();		
	$("#add_form").hide();
	$("#div_add").hide();
	getFactorySelect("search");
	getOrderNoSelect("#search_order","#orderId",function(){
		getZzjTypes(null,"search");
		getBatchSelects(null,"search");
	});
	var d = new Date(); 
    var s = d.getFullYear().toString() + '-'+addzero(d.getMonth() + 1)+"-"+addzero(d.getDate());
	$("#add_prod_date").val(s);
}

function addzero(v) {
	if (v < 10) return '0' + v;return v.toString();
}

function getFactorySelect(ele_type) {
	$.ajax({
		url : "/BMS/common/getFactorySelectAuth",
		dataType : "json",
		data : {
			function_url:'zzj/matEnter'
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response.data, "", "#"+ele_type+"_factory");
			var factory=$("#"+ele_type+"_factory"+" :selected").text();
			getWorkshopSelect(url,factory,"","#"+ele_type+"_workshop",null,"name")
			//getAllWorkshopSelect();
			//getAllLineSelect();
			var workshop=$("#"+ele_type+"_workshop"+" :selected").text();
			var default_option="全部";
			if(ele_type=='add'){
				default_option="请选择";
			}
			getLineSelect(factory,workshop,"","#"+ele_type+"_line",default_option,"name")
			getAllProcessSelect();
			getTeamSelect(factory,workshop,"","","#"+ele_type+"_team",default_option,"name");
		}
	});
}

function getAllWorkshopSelect() {
	$("#search_workshop").empty();
	$.ajax({
		url : "/BMS/common/getWorkshopSelectAuth",
		dataType : "json",
		data : {
				factory:$("#search_factory :selected").text(),
				org_kind:'1',
				function_url:'zzj/matEnter'
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs ="";
			
			$("#search_workshop").html("");
			$.each(response.data, function(index, value) {
				strs += "<option value=" + value.id+(value.org_id?(" org_id="+value.org_id):"") +
				" customer_no_flag='"+value.customer_no_flag+"' "+
				">" + value.name
				+ "</option>";
			});
			$("#search_workshop").append(strs);
		}
	});
}

function getAllLineSelect() {
	$("#search_line").empty();
	$.ajax({
		url : "/BMS/common/getLineSelectAuth",
		dataType : "json",
		data : {
				factory:$("#search_factory :selected").text(),
				workshop:$("#search_workshop :selected").text()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			line_selects_data=response.data;
			getSelects(response.data, "", "#search_line","全部","name"); 
		}
	});
}

function getAllProcessSelect(order_type,process_default,ele_type,factory_name,workshop_name,line_name) {
	order_type=order_type||'标准订单';
	$("#"+ele_type+"_process").empty();		
	$.ajax({
		url : "/BMS/common/getProcessMonitorSelect",
		dataType : "json",
		data : {
			factory:$("#"+ele_type+"_factory :selected").text()||factory_name,
			workshop:$("#"+ele_type+"_workshop :selected").text()||workshop_name,
			line:$("#"+ele_type+"_line").val()||line_name,
			order_type:order_type
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs = "";
			var default_option="请选择";
			if(ele_type=='search'){
				default_option="全部";
			}
		    $("#"+ele_type+"_process").html("<option value=''>"+default_option+"</option>");
		    var process_id_default="";
		    var process_name_default="";
		    if(response.data.length==0){
		    	saveflag=false;
		    	fadeMessageAlert(null,"未配置生产工序！","gritter-error");
		    	return false;
		    }	 
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.process_name + " process='"+value.process_name+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_name + "</option>";
		    });
		  //  alert(process_id_default);
		    $("#"+ele_type+"_process").append(strs);
		    $("#"+ele_type+"_process").val(process_default)
		}
	});
}

/**
 * 自制件模块获取自制件类别下拉选项
 */
function getZzjTypes(selectval,ele_type){
	selectval=selectval||"";
	
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "/BMS/zzj/getZzjTypeList",
		data : {
			"factory" : $("#"+ele_type+"_factory").val(),
			"order_no":$("#"+ele_type+"_order").val()
		},
		success:function(response){
			getSelects(response.data,selectval,"#"+ele_type+"_zzj_type","全部", "name");	
		}	
	});
}

/**
 * 自制件模块获取批次下拉选项
 */
function getBatchSelects(selectval,ele_type){
	selectval=selectval||"";
	var default_option="全部";
	if(ele_type=='add'){
		default_option="请选择";
	}
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "/BMS/zzj/getBatchList",
		data : {
			"factory" : $("#"+ele_type+"_factory").val(),
			"order_id":$("#"+ele_type+"_order").attr("order_id")
		},
		success:function(response){
			getSelects(response.data,selectval,"#"+ele_type+"_batch",default_option, "name");	
		}	
	});
}

function ajaxQuery(){
	$("#tableResult").DataTable({
		columnDefs: [{
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        fixedColumns:   {
            leftColumns: 3,
            rightColumns:1
        },
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-170,
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
					"order_no":$("#search_order").val(),
					"factory":$("#search_factory").val(),
					"zzj_type":$("#search_zzj_type").val(),
					"mat_desc":$("#search_mat_desc").val(),
					"workshop":$("#search_workshop :selected").text(),
					"line":$("#search_line").val(),
					"team":$("#search_team").val(),
					"process":$("#search_process :selected").attr("process"),
					"start_date":$("#wdate_start").val(),
					"end_date":$("#wdate_end").val(),
				};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getOutputDetailList",
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
		            {"title":"物料描述","class":"center","width":"220","data":"mat_description","defaultContent": ""},
		            {"title":"自制件类别","class":"center","width":"100","data":"zzj_type","defaultContent": ""},
		            {"title":"订单","class":"center","width":"180","data":"order_desc","defaultContent": ""},
		            {"title":"生产工厂","class":"center","width":"100","data":"factory_name","defaultContent": ""},
		            {"title":"车间","class":"center","width":"90","data":"workshop_name","defaultContent": ""},
		            {"title":"线别","class":"center","width":"90","data":"line_name","defaultContent": ""},
		            {"title":"班组","class":"center","width":"100","data":"team","defaultContent": ""},
		            {"title":"生产批次","class":"center","width":"90","data": "batch","defaultContent": ""},
		            {"title":"生产数量","class":"center","width":"80","data":"quantity","defaultContent": ""},		            
		            {"title":"生产日期","class":"center","width":"100","data":"product_date","defaultContent": ""},		            
		            {"title":"生产工序","class":"center","width":"120","data": "process","defaultContent": ""},
		            {"title":"操作人","class":"center","width":"80","data":"editor","defaultContent": ""},		            
		            {"title":"操作时间","class":"center","width":"150","data":"edit_date","defaultContent": ""},	
		            {"title":"操作","class":"center","width":"80","data":"","defaultContent":"","render":function(data,type,row){
		            	var html="<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='showEdit("+JSON.stringify(row)+")' style=\"color:blue;cursor: pointer;\"></i>&nbsp;"+
		            	"<i class=\"glyphicon glyphicon-trash bigger-130 showbus\" title=\"删除\" onclick='deleteOutput("+JSON.stringify(row)+")' style=\"color:red;cursor: pointer;\"></i>";
		            	return html;
		            }}
		          ],

		
	});
}

function addMat(datalist){
	var data=datalist||{};
	if ( $.fn.dataTable.isDataTable("#tableAdd") ) {
	/*	$("#tableAdd").dataTable().fnClearTable();
	    $("#tableAdd").dataTable().fnDestroy();*/
		t.row.add(data).draw( true );  
	}	
	$(".line").val($("#add_line").val());
	$(".team").val($("#add_team").val());
	$(".process").val($("#add_process").val());
	$(".batch").val($("#add_batch").val());
		
}

function getMatInfo(order_no,mat_desc){
	var mat;
	if($("#add_line :selected").text()=='请选择'){
		$("#add_mat_desc").val("")
		alert("请选择线别！")
	}else
	$.ajax({
		url : "getMatInfo",
		dataType : "json",
		data : {
				factory:$("#add_factory :selected").text(),
				workshop:$("#add_workshop :selected").text(),
				line:$("#add_line :selected").text(),
				order_no:order_no,
				mat_desc:mat_desc
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var matlist=response.data;
			if(matlist.length==0){
				saveflag=false;
				$("#add_mat_desc").val("")
				alert("未查询到物料信息，请扫描有效的物料二维码！")
				return false;
			}else{//更新录入页面对应的数据
				if(matlist.length>1){
					saveflag=false;
					$("#add_mat_desc").val("")
					alert("该物料明细存在重复记录，请核实数据后再录入产量！");
					return false;
				}
				mat=matlist[0];				
			}
		}
	});
	return mat;
}

function creatOptions(data_list){
	var options="<option value=''>请选择</option>";
	if(data_list.length==1){
		options="";
	}
	$.each(data_list,function(i,data){
		options+="<option value='"+data+"'>"+data+"</option>";
	})
	return options;
	
}

function chageProdDate(){
	var prod_date=$("#add_prod_date").val();
	$(".prod_date").val(prod_date)
}


function saveOutput(){
	$(".divLoading").addClass("fade in").show();
	var tr_list=$("#tableAdd tbody").children("tr");
	var save_mat_list=[];
	var save_flag=true;
	$.each(tr_list,function(index,tr){
		
		var mat_description=$(tr).children("td").eq(2).html();
		var zzj_type=$(tr).find(".zzj_type").eq(0).val();
		var quantity=$(tr).find(".output").eq(0).val()||0;
		var line_name=$(tr).find(".line").eq(0).val();
		var team=$(tr).find(".team").eq(0).val();
		var process=$(tr).find(".process").eq(0).find("option:selected").attr("process");
		var batch=$(tr).find(".batch").eq(0).val();
		var prod_date=$(tr).find(".prod_date").eq(0).val();
		if(zzj_type==undefined || zzj_type.trim().length==0){
			alert("第"+(index+1)+"行数据有误："+"请选择自制件类别！");
			save_flag=false;
			return false;
		}
		if(!const_int_validate.test(quantity)){
			alert("第"+(index+1)+"行数据有误："+"生产数量必须为整数！");
			save_flag=false;
			return false;
		}
		if(line_name==undefined || line_name.trim().length==0){
			alert("第"+(index+1)+"行数据有误："+"请选择线别！");
			save_flag=false;
			return false;
		}
		if(team==undefined || team.trim().length==0){
			alert("第"+(index+1)+"行数据有误："+"请选择班组！");
			save_flag=false;
			return false;
		}
		if(process==undefined || process.trim().length==0){
			alert("第"+(index+1)+"行数据有误："+"请选择生产工序！");
			save_flag=false;
			return false;
		}
		if(batch==undefined || batch.trim().length==0){
			alert("第"+(index+1)+"行数据有误："+"请选择批次！");
			save_flag=false;
			return false;
		}
		if(prod_date==undefined || prod_date.trim().length==0){
			alert("第"+(index+1)+"行数据有误："+"请填写生产日期！");
			save_flag=false;
			return false;
		}
		if(quantity==undefined || quantity==0){
			alert("第"+(index+1)+"行数据有误："+"请填写生产数量！");
			save_flag=false;
			return false;
		}
		
		if(quantity>0){
			mat_list_add[index].factory_id=$("#add_factory").val();
			mat_list_add[index].factory_name=$("#add_factory :selected").text();
			mat_list_add[index].workshop_name=$("#add_workshop :selected").text();
			mat_list_add[index].line_name=line_name;
			mat_list_add[index].team=team;
			mat_list_add[index].mat_description=mat_description;
			mat_list_add[index].zzj_type=zzj_type;
			mat_list_add[index].quantity=quantity;
			mat_list_add[index].batch=batch;
			mat_list_add[index].process=process;
			mat_list_add[index].product_date=prod_date;
			save_mat_list.push(mat_list_add[index]);
		}
		
	})
	if(save_flag&&save_mat_list.length>0)
	$.ajax({
		url:'enterMatOutputBatch',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			"addList":JSON.stringify(mat_list_add)
		},
		success:function(response){
			$("#btnSave").removeAttr("disabled"); 
			$(".divLoading").hide();
            if(response.success){
            	$('#tableAdd tbody').html("");
            	mat_list_add=[];//表格数据对象
            	if ( $.fn.dataTable.isDataTable("#tableAdd") ) {
            		$("#tableAdd").dataTable().fnClearTable();
            	    //$("#tableAdd").dataTable().fnDestroy();
            	}
            	alert(response.message);
            }else{
            	alert(response.message);
            }
		}
	});
}

function showEdit(mat){
	//alert(JSON.stringify(mat))
	$("#edit_factory").val(mat.factory_name).attr("factory_id",mat.factory_id)
	$("#edit_workshop").val(mat.workshop_name)
	$("#edit_line").val(mat.line_name)
	$("#edit_mat_desc").val(mat.mat_description).data("output_id",mat.id);
	$("#edit_zzj_type").val(mat.zzj_type);
	$("#edit_order").val(mat.order_desc).attr("order_id",mat.order_id);
	$("#edit_batch").html($("#search_batch").html().replace("全部","请选择"))
	$("#edit_batch").val(mat.batch).attr("batch_old",mat.batch);
	$("#edit_output").val(mat.quantity);
	$("#edit_product_date").val(mat.product_date);
	getAllProcessSelect("标准订单",mat.process,"edit",mat.factory_name,mat.workshop_name,mat.line_name)
	$("#edit_team").html($("#search_team").html().replace("全部","请选择"))
	$("#edit_team").val(mat.team);
	$("#edit_memo").val(mat.memo);
	
	$("#update_dialog").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 产量修改</h4></div>',
		title_html: true,
		width:'400',
		height:'500',
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				},
				{
					text: "保存",
					id:"btn_confirm",
					"class" : "btn btn-success btn-minier",
					click: function() {
						var val_flag=true;
				    	
				    	if($("#edit_batch").val().trim().length==0){
				    		val_flag=false
					   		alert("请选择生产批次!");
					   		return false;
				    	}
				    	if($("#edit_output").val().trim().length==0){
				    		val_flag=false
					   		alert("请填写生产数量!");
					   		return false;
				    	}
				    	if(!const_int_validate.test($("#edit_output").val())){
				    		val_flag=false
					   		alert("生产数量只能为整数!");
					   		return false;
				    	}
				    	if($("#edit_product_date").val().trim().length==0){
				    		val_flag=false
					   		alert("请填写生产日期!");
					   		return false;
				    	}
				    	if($("#edit_process").val().trim().length==0){
				    		val_flag=false
					   		alert("请选择生产工序!");
					   		return false;
				    	}
				    	if($("#edit_team").val().trim().length==0){
				    		val_flag=false
					   		alert("请选择生产班组!");
					   		return false;
				    	}
				    	
				    	if(val_flag){
				    		ajaxUpdate();
				    	}
					}
				}]
		
	})
	
}

function ajaxUpdate(){
	$.ajax({
		url : "enterMatOutput",
		dataType : "json",
		data : {
			output_id:$("#edit_mat_desc").data("output_id"),
			order_id:$("#edit_order").attr("order_id"),
			factory_id:$("#edit_factory").attr("factory_id"),
			factory:$("#edit_factory").val(),
			workshop:$("#edit_workshop").val(),
			line:$("#edit_line").val(),
			process:$("#edit_process :selected").attr("process"),
			zzj_type:$("#edit_zzj_type").val(),
			mat_desc:$("#edit_mat_desc").val(),
			batch:$("#edit_batch").val(),
			batch_old:$("#edit_batch").attr("batch_old"),
			team:$("#edit_team :selected").text(),
			quantity:$("#edit_output").val(),
			product_date:$("#edit_product_date").val(),
			memo:$("#edit_memo").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success:function(response){
			if(response.success){
				ajaxQuery();
				$( "#update_dialog" ).dialog( "close" );
			}
			alert(response.message);
		}
	})
}

function deleteOutput(mat){
	if(confirm("是否删除该产量记录？"))
	$.ajax({
		url : "matDelete",
		dataType : "json",
		method:"post",
		data : {
			output_id:mat.id,
			order_id:mat.order_id,
			factory_id:mat.factory_id,
			workshop:mat.workshop_name,
			line:mat.line_name,
			batch:mat.batch
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			if(response.success){
				ajaxQuery();
			}
			alert(response.message);
		}
	});
}