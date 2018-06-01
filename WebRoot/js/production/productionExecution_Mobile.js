var cur_key_name = "";
var vin="";
var left_motor_number="";
var right_motor_number="";
var bus_production_status="0";
var bus_color;
var bus_seats;
var workshop_name;
var process_name;
var order_name;
var bus_type_code;
var order_qty;
var order_area;
var orderType;
var status;
var line_selects_data;
var parts_list=[];
var parts_update_list=new Array();//非车间上下线工序提交该零部件信息
var batch_validate=[];
var bus;
var qr_ele="";
var enterflag=true;
var parts_val_list=[];

function setQRData(str){
	$("#"+qr_ele).val(str);
	if(qr_ele=="vinText"){
		enterflag=true;
		ajaxValidate();
		if($("#exec_processname").html()=="检测线下线"){//获取检测线需要二次校验的零部件信息
			ajaxGetPartsVal();
		}else
			ajaxGetPartsList();
	}else{
		$("#"+qr_ele).trigger("change");
	}
	
}

$(document).ready(function () {	
	initPage();
	
	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#vinText').bind('keydown', function(event) {

        if($(this).attr("disabled") == "disabled")
            return false;      
        if (event.keyCode == "13"){	
            if(jQuery.trim($('#vinText').val()) != ""){
                ajaxValidate();

                if($("#exec_processname").html()=="检测线下线"){//获取检测线需要二次校验的零部件信息
                	$("#div_batchval").show();
    				ajaxGetPartsVal();
    			}else{
    				$("#div_batchval").hide();
    				ajaxGetPartsList();
    			}
    				
            }
            return false;
        }  
    });
    
    $(".btn_scan").click(function(e){
    	var el = e.srcElement || e.target;
    	var input_el=$(el).parent("span").find("input").eq(0);
    	qr_ele=$(input_el).attr("id")
    	//alert(qr_ele)
    	yspCheckIn.qrCode();
    })
    
    $("#btn_clear").click(function(){
    	resetPage();
    })

    $("#btn_save").click(function(){
    	ajaxEnter();
    });
    
	$(document).on("change","#batch",function(e){
		enterflag = true;
		$(this).focus();		
		var parts_index=$(this).attr("parts_index")||"0";
		var parts=parts_list[parts_index];
		var batch=$(this).val().trim();
		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
		//alert(parts_index)
		
		/**
		 * added by xjw 18/1/17  增加动力电池包零部件批次不能重复的判断逻辑
		 */
		if(parts.parts_name.indexOf('动力电池包')>=0&&(batch!='无'&&batch!='\\'&&batch!='\/')&&"检测线下线"!=plan_node){
			if(batch_validate.indexOf(batch)>=0){
				alert("批次信息不能重复！");
				$(this).val("")
				enterflag=false;
				return false;
			}
			//数据库判断包含动力电池包的零部件批次是否与该批次信息重复
			var exist_flag=checkPartsBatch(batch);
		
			if(exist_flag=="no"){
				alert("该批次信息已存在，不能重复录入！");
				$(this).val("")
				enterflag=false;
				return false;
			}
			
			batch_validate.push($(this).val().trim());
		}
		
		 /**
		  * 检测线下线时需对车载终端、ICCID、电池包编号、可充电储能系统编号进行二次校验
		  * added by XJW 20180425
		  */
		/*if("检测线下线"==plan_node){
			var check_list=getKeyPartsEntered(parts.parts_name);
			if(check_list==undefined || check_list.length==0){
				alert("”"+parts.parts_name+"“批次信息未录入，请联系前车间人员录入！")
				enterflag = false;
				$(this).val("")
				return false;
			}else {
				var cp=check_list[0];
				if(cp.batch==null||cp.batch==""){
					alert("”"+parts.parts_name+"“批次信息未录入，请联系前车间人员录入！")
					enterflag = false;
					$(this).val("")
					return false;
				}
				if(cp.batch !=batch){
					alert("”"+parts.parts_name+"“批次信息与安装工序扫描录入的批次信息不一致！")
					enterflag = false;
					$(this).val("")
					return false;
				}
			}
		}
		*/
		
		parts_list[parts_index].batch=$(this).val();	
		parts_update_list.push(parts_list[parts_index])
		//alert(JSON.stringify(parts_list))
		//批次信息录入后，变更零部件选项颜色background-color: #1ccb68;
		if($(this).val().trim().length>0){
			$("#key_parts").find("option:selected").css("background-color","#1ccb68");
		}else{
			$("#key_parts").find("option:selected").css("background-color","");
		}
	});
    
	
	/**
	 * 检测线下线关键零部件批次信息二次校验
	 */
	$(document).on("change","#batch_val",function(e){
		enterflag=true;
		var parts_name=$("#key_parts :selected").text();
		var parts_index=$("#key_parts").find("option:selected").attr("parts_index");
		parts_val_list[parts_index]['val_flag']=true;
		console.log("批次确认");
		 /**
		  * 检测线下线时需对车载终端、ICCID、电池包编号、可充电储能系统编号进行二次校验
		  * added by XJW 20180504
		  */
		var batch=$("#batch").val();
		if(batch==null||batch.trim().length==0){
			$(this).val("")
			alert("”"+parts_name+"“批次信息未录入，请联系前车间人员录入！")
			enterflag = false;
			parts_val_list[parts_index]['val_flag']=false;
			return false;
		}
		if(batch !=$(this).val()){
			$(this).val("")
			alert("”"+parts_name+"“批次信息与安装工序扫描录入的批次信息不一致！")
			enterflag = false;
			parts_val_list[parts_index]['val_flag']=false;
			return false;
		}
		
	})	
	
    
    $("#clientValidate").click(function(){
    	ajaxEnter();
    });
	
	$("#exec_factory").change(function(){
		$("#exec_workshop").empty();
		if($("#exec_factory").val() !=''){
			getAllWorkshopSelect();
		}
	});
	
	$("#exec_workshop").change(function(){
		$("#exec_line").empty();
		if($("#exec_workshop").val() !=''){
			getAllLineSelect(bus.line);
			$("#exec_processname").val('');
			getAllProcessSelect(bus.order_type);

			if($("#exec_processname").html()=="检测线下线"){//获取检测线需要二次校验的零部件信息
				ajaxGetPartsVal();
			}else
				ajaxGetPartsList();
		}
	});
	
	$("#exec_line").change(function(){
		$("#exec_process").empty();		
		$("#exec_processname").val('');
		if($("#exec_line").val() !=''){
			getAllProcessSelect(bus.order_type);
			
			if($("#exec_processname").html()=="检测线下线"){//获取检测线需要二次校验的零部件信息
				ajaxGetPartsVal();
			}else
				ajaxGetPartsList();
		}
	});
	
	$("#exec_process").change(function(){
		enterflag = true;
		$("#color_div").css("display","none")
		$("#exec_processname").val('');
		var process_code=$("#exec_process :selected").text();
		var process_name=$(this).find("option:contains('"+process_code+"')").attr("process");
		$("#exec_processname").html(process_name);
		
	 	if($("#exec_processname").html()=="检测线下线"){//
			$("#div_batchval").show();
		}else{
			$("#div_batchval").hide();
		}
		
		if($("#exec_line").val() !=''&&$("#vinText").data("order_id")!=0){		
			
			if($("#exec_processname").html()=="检测线下线"){//获取检测线需要二次校验的零部件信息
				ajaxGetPartsVal();
			}else
				ajaxGetPartsList();
		}
		
		//added 2018-02-03 涂装下线工序车辆颜色从订单颜色中选择
		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
		if('涂装下线'==plan_node){
			$("#color_div").css("display","")
			var order_color=bus.order_color;
			if(order_color.trim().length>0){     				
				color_list=order_color.split(",");
				if(color_list.length>1){
					$("#exec_color").html("<option value=''>请选择</option>");	
				}else{
					$("#exec_color").html("");
				}
				
				$.each(color_list,function(i,color){
					var option="<option value='"+color+"'>"+color+"</option>";
					if (bus.bus_color==color){
						option="<option value='"+color+"' selected='selected'>"+color+"</option>";
					}
					
					$("#exec_color").append(option)
				})
			}else{
				$("#exec_color").html("<option value='暂无'>暂无</option>");
			}
		}
	});
	
	$("#key_parts").change(function(){
		if($("#exec_processname").html()=="检测线下线"){//获取检测线需要二次校验的零部件信息
			var parts_index=$(this).find("option:selected").attr("parts_index");
			$("#parts_no").val(parts_val_list[parts_index].parts_no);
			$("#sap_mat").val(parts_val_list[parts_index].sap_mat);
			$("#vendor").val(parts_val_list[parts_index].vendor);
			var batch_flag=parts_val_list[parts_index].batch_flag;
			var batch="";
			if(parts_val_list[parts_index]['3C_no']!=undefined && parts_val_list[parts_index]['3C_no'].trim().length>0){
				batch=parts_val_list[parts_index]['3C_no'];
			}
			if(parts_val_list[parts_index]['batch']!=undefined && parts_val_list[parts_index]['batch'].trim().length>0){
				batch=parts_val_list[parts_index]['batch'];
			}
			$("#batch_val").val("");
			$("#batch").val(batch);
			$("#batch").attr("parts_index",parts_index);
		}else{
			var parts_index=$(this).find("option:selected").attr("parts_index");
			$("#parts_no").val(parts_list[parts_index].parts_no);
			$("#sap_mat").val(parts_list[parts_index].sap_mat);
			$("#vendor").val(parts_list[parts_index].vendor);
			var batch_flag=parts_list[parts_index].batch_flag;
			var batch="";
			if(parts_list[parts_index]['3C_no']!=undefined && parts_list[parts_index]['3C_no'].trim().length>0){
				batch=parts_list[parts_index]['3C_no'];
			}
			if(parts_list[parts_index]['batch']!=undefined && parts_list[parts_index]['batch'].trim().length>0){
				batch=parts_list[parts_index]['batch'];
			}
			
			$("#batch").val(batch);
			$("#batch").attr("parts_index",parts_index);
			
			if(batch_flag=="recorded"){
				$("#batch").attr("disabled",true);
			}else{
				$("#batch").attr("disabled",false);
			}
		}
	})

})

function initPage(){
		getFactorySelect();
		getBusNumberSelect('#vinText');
		$('#vinText').focus();
		//alert(getQueryString("factory_name"));
		//$(".page-content").css("height",document.body.clientHeight-10);
		//$(".page-content").css("overflow","auto");
		enterflag = true;
		
		if($("#exec_processname").html()=="检测线下线"){//
			$("#div_batchval").show();
		}else{
			$("#div_batchval").hide();
		}
		
	};
	
	function resetPage () {
		$("#scan_form").resetForm();
        $("#vinText").removeAttr("disabled");
        $("#vinText").val("");
       	$('#vinText').data("vin","");
    	$('#vinText').data("order_id","");
    	$('#vinText').data("order_config_id","");
    	$('#vinText').data("bus_type_id","");
        $("#vinText").focus();
        toggleVinHint(true);
        $("#exec_workshop").html("");
        $("#exec_line").html("");
        $("#exec_process").html("");
        $("#exec_processname").html("");
        $("#key_parts").html("");
        $("#btn_save").hide();
        $("#btn_clear").hide();
        $("#exec_color").html("<option value='暂无'>暂无</option>");
        $("#color_div").css("display","none");
        enterflag = true;
        
    	if($("#exec_processname").html()=="检测线下线"){//
			$("#div_batchval").show();
		}else{
			$("#div_batchval").hide();
		}
    }
	
	function ajaxEnter(){
		cur_key_name=$("#exec_processname").html();
		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
		var field_name=$('#exec_process').find("option:selected").attr("field_name");
		
		if($('#exec_workshop :selected').text()=='底盘'||$('#exec_workshop :selected').text()=='检测线'){

			$.each(parts_list,function(i,parts){
				if(parts.parts_id !=undefined&&parts.process==$("#exec_processname").html()&&(parts.parts_name=='VIN编码'||parts.parts_name=='VIN码'||parts.parts_name=='左电机号'||parts.parts_name=='右电机号')){
					if(parts.batch==undefined||parts.batch.trim().length==0){
						enterflag=false;
						alert(plan_node+"扫描前，请将VIN编码和左右点击号信息录入完整！");
						return false;
					}
				}
				if((parts.parts_name=='VIN编码'||parts.parts_name=='VIN码') && parts.batch!=vin&&parts.process==$("#exec_processname").html()){
					alert("VIN编码校验失败，请核对该车的VIN编码！");
					enterflag=false;
					return false;
				}
				if(parts.parts_name=='左电机号'&&parts.batch!=left_motor_number&&parts.process==$("#exec_processname").html()){
					alert("左电机号校验失败，请核对该车的左电机号！");
					enterflag=false;
					return false;
				}
				if(parts.parts_name=='右电机号'&&parts.batch!=right_motor_number&&parts.process==$("#exec_processname").html()){
					alert("右电机号校验失败，请核对该车的右电机号！");
					enterflag=false;
					return false;
				}
			});
			if(!enterflag){
				//alert(cur_key_name+"扫描前，请将零部件信息录入完整！");
				//$("#btn-save").hide();
				 return false;
			 }
		}
		/**
		 * 切换车间，线别判断是否跨线扫描
		 */
		getBusInfo();
		if(bus.old_line !=$("#exec_line option:selected").text()
				&&bus.old_workshop==$("#exec_workshop option:selected").text()
				&& bus.old_line !=undefined){
			fadeMessageAlert(null,'该车辆已在'+bus.line+'扫描，不能跨线扫描！','gritter-error');
			//added by xjw 20160513 根据车号查出当前线别锁定线别，不允许跨线扫描,带出相应工序
    		getSelects(line_selects_data, bus.line, "#exec_line",null,"name"); 
    		getAllProcessSelect(bus.order_type);
		}   
		
		
		if($("#exec_processname").html() == "检测线下线"){
			//AddBy:Yangke180319 增加检测线下线校验 关键零部件“动力电池”的批次信息需录入完整才能下线（不能为空，“/”,"无"）
			$.ajax({
				 type:"get",
				 dataType:"json",
				 async:false,
				 url:"getKeyPartBatchInfo",
				 data:{
					 "bus_number":$('#vinText').val(),
				 },
				 success: function(response){
					 $.each(response.data,function (index,value) {
						 console.log("batch = " + value.batch);  // \，[，]，-，=，！，@，#，%
						 if((value.batch == null)||(value.batch == "-")){
							 console.log("batch null!");
							 enterflag=false;
							 alert("底盘关键零部件【" +value.parts_name+"】没有正确录入批次信息，不允许下线！");
							// $("#btnSubmit").attr("disabled",false);
							 return false;
						 }else{
							 //只能是字母（不区分大小）、数字、-（减号）^[A-Za-z0-9\-]+$
							 var batchTest = "^[A-Za-z0-9\-]+$";
							 var re  =   new   RegExp(batchTest); 
						     if(value.batch.match(re)==null) {
							 //if(!batchTest.test(value.batch)){
								 enterflag=false;
								 alert("底盘关键零部件【" +value.parts_name+"】没有正确录入批次信息，不允许下线！");
								// $("#btnSubmit").attr("disabled",false);
								 return false;
							 }
						 }
					 })
					 
				 }
			 });
			 console.log("batch finish!");
			 if(!enterflag){
				//$("#btnSubmit").attr("disabled",false);
				return false;
			 }
			 console.log("batch finish!!");
		}
		 
		
		/**
		 * 增加校验逻辑：总装下线校验VIN与车载终端是否绑定成功
		 */
		if(plan_node.indexOf("上线")>=0&&$('#exec_workshop :selected').text()=='检测线'&&order_area=='中国'&&orderType=='标准订单'){
			//alert(cur_key_name);
			var conditions={};
			conditions.vin=$('#vinText').data("vin");
			//conditions.flag=Number($('#clientFlag').val());
			/*$("#gpsModal").modal("hide");*/
			 $.ajax({
				 type:"post",
				 dataType:"json",
				 async:false,
				 url:"gpsValidate",
				 data:{
					 "conditions":JSON.stringify(conditions)
				 },
				 success: function(response){
					 //alert(JSON.parse(response.data).rebackResut);
					 if(response.data=="error"){
						 alert("车载终端监控系统接口返回异常！");
						 enterflag=false;
						 return false;
					 }
					 var reback_data=JSON.parse(response.data);
					 var reabck_msg="";
					 reabck_msg+="企标绑定结果："+reback_data.rebackDesc+"\n";
					 reabck_msg+="国标绑定结果："+reback_data.rebackDesc_gb+"\n";
					 if(!reback_data.rebackResut){
						 enterflag=false;
						// reabck_msg+=reback_data.rebackDesc+"\n";
						 //alert(reback_data.rebackDesc);
					 }
					 if(!reback_data.rebackResut_gb){
						 enterflag=false;						 
						 //alert(reback_data.rebackDesc);
						 //reabck_msg+=reback_data.rebackDesc_gb+"\n";
					 }
				/*	 if(enterflag){
						 reabck_msg="成功！";
					 }*/
					 alert(reabck_msg);
					 
				 },
				 error:function(){
					 enterflag=false;
				 }
			 });
			 if(!enterflag){
				// $("#btnSubmit").attr("disabled",false);
				 return false;
			 }
		}	
		
		
		if(plan_node.indexOf("下线")>=0&&$('#exec_workshop :selected').text()=='检测线'){
			//alert(cur_key_name);
			$.each(parts_list,function(i,parts){
				//if(parts.parts_id !=undefined&&parts.parts_id!=0){
					if(parts.batch==undefined||parts.batch.trim().length==0){
						enterflag=false;
						return false;
					}
				//}
			});
			if(!enterflag){
				alert(cur_key_name+"扫描前，请将零部件信息录入完整！");
				//$("#btn-save").hide();
				 return false;
			 }
		}
		
		/**
		 * 涂装下线必须选择车辆颜色
		 */
		if($("#exec_color").val()==""&&plan_node=="涂装下线"){
			enterflag=false;
			alert("请选择车辆颜色!")
		}
		
		 //判断是否二次校验通过
		 $.each(parts_val_list,function(i,p){
			 var tr=$("#partsListTable tbody").find("tr").eq(i);
			 var batch_val=$(tr).children("td").eq(5).find("input").val();
			 if(p.batch==undefined||p.batch==""||p.batch!=batch_val){
				 alert("抱歉！批次信息确认没有通过，请再次确认批次信息。");
				 enterflag=false;
				 return false;
			 }
		 })
		
		if(enterflag){
			 $.ajax({
		            type: "post",
		            dataType: "json",
		            url : "enterExecution",
		            data: {
		            	"factory_id" : $('#exec_factory').val(),
		                "bus_number":$('#vinText').val(),
		                "order_id":$('#vinText').data("order_id"),
		                "process_id":$('#exec_process').val(),
		                "factory_name":$('#exec_factory').find("option:selected").text(),
		                "workshop_name":$('#exec_workshop').find("option:selected").text(),
		                "line_name":$('#exec_line').find("option:selected").text(),
		                "process_id":$('#exec_process').val(),
		                "process_number":$('#exec_process :selected').text(),
		                "process_name":$('#exec_processname').html(),
		                "field_name":field_name,
		                "order_type":orderType,
		                "plan_node_name":plan_node,
		                "parts_list":JSON.stringify(parts_list),
		                "bus_color":$("#exec_color").val()
		            },
		            success: function(response){
		                resetPage();
		                if(response.success){ 
		                	fadeMessageAlert(null,response.message,'gritter-success');
		                }
		                else{
		                	fadeMessageAlert(null,response.message,'gritter-error');
		                }

		                setTimeout(function() {
		                    $("#vinHint").hide().html("未输入车号");
		                    toggleVinHint(true);
		                },60000);
		            },
		            error:function(){alertError(); resetPage();}
		        });
		}
       
    }
	
	function ajaxValidate (){

		$.ajax({
            type: "post",
            dataType: "json",
            url : "getBusInfo",
            async:false,
            data: {
            	"bus_number": $('#vinText').val(),
                "factory_id":$("#exec_factory").val(),
                "exec_process_name":$("#exec_processname").html(),
                "workshop_name":$('#exec_workshop').find("option:selected").text()
            },
            success: function(response){               
                    //show car infomation
            	//alert(response.businfo.factory.indexOf(getAllFromOptions("#exec_factotry","name")));
                    if(response.businfo == ""||response.businfo==null){
                    	fadeMessageAlert(null,'没有对应车号的车辆信息！','gritter-error');
                    	$("#vinText").val("");
                    	return false;
                    }else if(response.businfo.factory_name.indexOf(getAllFromOptions("#exec_factotry","name"))<0){
                    	fadeMessageAlert(null,'抱歉，该车辆属于'+response.businfo.factory_name+'，您没有扫描权限！','gritter-error');
                    	$("#vinText").val("");
                    	return false;
                    }else{        
                    	var nextProcess=response.nextProcess;
                        $("#vinText").attr("disabled","disabled");
                        $("#btn_save").show();
                        $("#btn_clear").show();
                    	bus = response.businfo;
                    	$('#vinText').data("vin",bus.vin);
                    	$('#vinText').data("order_id",bus.order_id);
                    	$('#vinText').data("order_config_id",bus.order_config_id);
                    	$('#vinText').data("bus_type_id",bus.bus_type_id);
                    	
                    	var configList=response.configList;  	
                    	
                    	bus_production_status=bus.production_status;
                    	orderType=bus.order_type;
                    	vin=bus.vin;
                		left_motor_number=bus.left_motor_number;
                		right_motor_number=bus.right_motor_number;
                		order_area=bus.order_area;
                		
                		toggleVinHint(false);
                		     		
                		//选中工厂、车间、线别、工序
                		$("#exec_factory").val(bus.factory_id).attr("disabled",true);
                		getAllWorkshopSelect(nextProcess==null?bus.workshop:nextProcess.workshop);
                		getAllLineSelect(bus.line)
                		
                		var cur_line=$("#exec_line option:selected").text();
                		getAllProcessSelect(bus.order_type,nextProcess==null?bus.process_name:nextProcess.process_name);

                		//added 2018-02-03 涂装下线工序车辆颜色从订单颜色中选择
                		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
                		if('涂装下线'==plan_node){
                			$("#color_div").css("display","")
    
                			var order_color=bus.order_color;
                			if(order_color.trim().length>0){     				
                				color_list=order_color.split(",");
                				if(color_list.length>1){
                					$("#exec_color").html("<option value=''>请选择</option>");	
                				}else{
                					$("#exec_color").html("");
                				}
                				
                				$.each(color_list,function(i,color){
                					var option="<option value='"+color+"'>"+color+"</option>";
                					if (bus.bus_color==color){
                						option="<option value='"+color+"' selected='selected'>"+color+"</option>";
                					}
                					
                					$("#exec_color").append(option)
                				})
                			}else{
                				$("#exec_color").html("<option value='暂无'>暂无</option>");
                			}
                			
                			//$("#exec_color").val(bus.bus_color)
                		}
                    }
            },
            error:function(){alertError();}
       });
	}
	
	function ajaxGetPartsList(){
		parts_update_list=[];
		$("#key_parts").html("");
		$.ajax({
            type: "get",
            dataType: "json",
            url : "getKeyParts",
            async:false,
            data: {
            	"factory_id":$("#exec_factory").val(),
                "bus_number": $('#vinText').val(),
                "process_name":$("#exec_processname").html(),
                "workshop":$('#exec_workshop').find("option:selected").text(),
                "order_id":$('#vinText').data("order_id")||0,
                "order_config_id":$('#vinText').data("order_config_id")||0,
                "bus_type_id":$('#vinText').data("bus_type_id")||0
            },
            success: function(response){
            	parts_list=response.partsList;
            	strs = "";
            	var parts_no_default="";
            	var sap_mat_default="";
            	var vendor_default="";
            	var batch_default="";
            	
            	$.each(parts_list, function(index, value) {
            		
            		if(value['batch']!=undefined && value['batch'].trim().length>0){
        				parts_list[index].batch_flag="recorded";
        			}
        			if(value['3C_no'] !=undefined && value['3C_no'].trim().length>0){
        				parts_list[index].batch_flag="recorded";
        			}    
        			
            		if(index==0){
            			strs += "<option value=" + value.id   + " selected='selected'"+" parts_index="+index + ">" + value.parts_name + "</option>";
            			parts_no_default=value.parts_no;
            			sap_mat_default=value.spa_mat;
            			vendor_default=value.vendor;
            			$("#batch").attr("disabled",false);
            			if(value['batch']!=undefined && value['batch'].trim().length>0){
            				batch_default=value['batch'];
            				parts_list[index].batch=batch_default;
            				$("#batch").attr("disabled",true);
            			}
            			if(value['3C_no'] !=undefined && value['3C_no'].trim().length>0){
            				batch_default=value['3C_no'];
            				$("#batch").attr("disabled",true);
            			}          			
            		}else
            		 strs += "<option value=" + value.id  +" parts_index="+index  + "> "+ value.parts_name + "</option>";
            	})
            	$("#key_parts").append(strs);
            	$("#parts_no").val(parts_no_default);
            	$("#sap_mat").val(sap_mat_default);
            	$("#vendor").val(vendor_default);
            	$("#batch").val(batch_default);
            	$("#batch").attr("parts_index","0");
            }
		}) 
	}
	
	function getFactorySelect() {
		$.ajax({
			url : "/BMS/common/getFactorySelectAuth",
			dataType : "json",
			data : {function_url:'/BMS/production/execution'},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				getSelects_noall(response.data, "", "#exec_factory",null);
				//getAllWorkshopSelect();
				//getAllLineSelect();
				//getAllProcessSelect();
			}
		});
	}

function getAllWorkshopSelect(workshop) {
	$("#exec_workshop").empty();
	$.ajax({
		url : "/BMS/common/getWorkshopSelectAuth",
		dataType : "json",
		data : {
			factory:$("#exec_factory :selected").text(),
			org_kind:'1',
			function_url:'/BMS/production/execution'
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data, workshop, "#exec_workshop",null,"id");
		}
	});
}

function getAllLineSelect(line) {
	$("#exec_line").empty();
	$.ajax({
		url : "/BMS/common/getLineSelectAuth",
		dataType : "json",
		data : {
				factory:$("#exec_factory :selected").text(),
				workshop:$("#exec_workshop :selected").text()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			line_selects_data=response.data;
			getSelects(response.data, line, "#exec_line",null,"name"); 
		}
	});
}

function getAllProcessSelect(order_type,process_default) {
	order_type=order_type||'标准订单';
	$("#exec_process").empty();
	$.ajax({
		url : "getProcessMonitorSelect",
		dataType : "json",
		data : {
			factory:$("#exec_factory :selected").text(),
			workshop:$("#exec_workshop :selected").text(),
			line:$("#exec_line").val(),
			order_type:order_type
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_noall(response.data, "", "#exec_process"); 
			var strs = "";
		    $("#exec_process").html("");
		    var process_id_default="";
		    var process_name_default="";
		    if(response.data==null){
		    	fadeMessageAlert(null,"未配置扫描逻辑！","agritter-error");
		    	return false;
		    }	 
		    $.each(response.data, function(index, value) {
		    	if (process_default == value.process_name) {
		    		process_id_default=value.id;
			    	process_name_default=value.process_name;
		    	}		
		    	strs += "<option value=" + value.id + " process='"+value.process_name+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_code + "</option>";
		    });
		  //  alert(process_id_default);
		    $("#exec_process").append(strs);
		    $("#exec_process").val(process_id_default+"");
		    $("#exec_processname").html(process_name_default);
		}
	});
}

function toggleVinHint (showVinHint) {
    if(showVinHint){
        $("#carInfo").hide();
        $("#vinHint").fadeIn(1000);

    }else{
        $("#vinHint").hide();
        $("#carInfo").fadeIn(1000);
    }
}

function initEditModel() {
    $('#vin').val('');
    $('#left_motor_number').val('');
    $('#right_motor_number').val('');
}

function checkVinMotor(){
	if(vin===$("#vin").val() && left_motor_number===$("#left_motor_number").val() && right_motor_number===$("#right_motor_number").val()){
		toggleVinHint(false);
		$("#btnSubmit").removeAttr("disabled");
		
		$( "#dialog-config" ).dialog("close");
	}else{
		
		alert("校验失败！");
	}
	return false;
}

function getBusInfo(){
	$.ajax({
        type: "post",
        dataType: "json",
        url : "getBusInfo",
        async:false,
        data: {
        	"bus_number": $('#vinText').val(),
            "factory_id":$("#exec_factory").val(),
            "exec_process_name":$("#exec_processname").html(),
            "workshop_name":$('#exec_workshop').find("option:selected").text()
        },
        success: function(response){ 
        	bus = response.businfo;
        }
	}) 
}

function getKeyPartsEntered(parts_name){
	var datalist=[];
	$.ajax({
		url:'getKeyPartsByBus',
		dataType : "json",
		async:false,
		data:{
			bus_number:$("#vinText").val(),
			parts_name:parts_name
		},
		success:function(response){
			datalist=response.data;
		}
	})
	return datalist;
}

function ajaxGetPartsVal(){
	parts_update_list=[];
	$("#key_parts").html("");
	$.ajax({
        type: "get",
        dataType: "json",
        url : "getKeyPartsVal",
        async:false,
        data: {
            "bus_number": $('#vinText').val(),
        },
        success: function(response){
        	parts_val_list=response.data;
        	strs = "";
        	var parts_no_default="";
        	var sap_mat_default="";
        	var vendor_default="";
        	var batch_default="";
			$("#batch").attr("disabled",true);
        	$.each(parts_val_list, function(index, value) { 		
        		parts_val_list[index]['val_flag']=false;
        		if(index==0){
        			strs += "<option value=" + value.id   + " selected='selected'"+" parts_index="+index + ">" + value.parts_name + "</option>";
        			parts_no_default=value.parts_no;
        			sap_mat_default=value.spa_mat;
        			vendor_default=value.vendor;
        			if(value['batch']!=undefined && value['batch'].trim().length>0){
        				batch_default=value['batch'];
        			}
        			if(value['3C_no'] !=undefined && value['3C_no'].trim().length>0){
        				batch_default=value['3C_no'];
        			}          			
        		}else
        		 strs += "<option value=" + value.id  +" parts_index="+index  + "> "+ value.parts_name + "</option>";
        	})
        	$("#key_parts").append(strs);
        	$("#parts_no").val(parts_no_default);
        	$("#sap_mat").val(sap_mat_default);
        	$("#vendor").val(vendor_default);
        	$("#batch").val(batch_default);
        	$("#batch").attr("parts_index","0");
        }
	}) 
}