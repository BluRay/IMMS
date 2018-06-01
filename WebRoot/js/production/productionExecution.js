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
var order_area;
var bus_type_code;
var order_qty;
var orderType;
var status;
var line_selects_data;
var parts_list=[];
var parts_update_list=new Array();//非车间上下线工序提交该零部件信息
var batch_validate=[];
var enterflag=true;
var bus={};
var parts_val_list=[];

$(document).ready(function () {	
	initPage();
	
	function initPage(){
		enterflag = true;
		validateflag=false;
		//getBusNumberSelect('#nav-search-input');
		//alert(location.href.substr(location.href.indexOf("action?")+7,location.href.length));
		$('#rightlink').attr('href','production!exception.action?' + location.href.substr(location.href.indexOf("action?")+7,location.href.length)); 
		if($("#exec_type").children('option:selected').val() == "正常"){
			$("#exec_onoff").hide();
		}else{
			$("#exec_onoff").show();
		}		
		getFactorySelect();
		$('#vinText').focus();
		//alert(getQueryString("factory_name"));
		if($("#exec_processname").val()=="检测线下线"){//
			$("#td_matno").hide();
			$("#td_batchval").show();
		}else{
			$("#td_matno").show();
			$("#td_batchval").hide();
		}
	};

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	function resetPage () {
		if($("#exec_processname").val()=="检测线下线"){//
			$("#td_matno").hide();
			$("#td_batchval").show();
		}else{
			$("#td_matno").show();
			$("#td_batchval").hide();
		}
        $("#vinText").removeAttr("disabled");
        $("#vinText").val("");
       	$('#vinText').data("vin","");
    	$('#vinText').data("order_id","");
    	$('#vinText').data("order_config_id","");
    	$('#vinText').data("bus_type_id","");
        $("#vinText").focus();
        toggleVinHint(true);
        $("#btnSubmit").attr("disabled","disabled");
        $("#partsListTable tbody").html("");
        $("#configListTable tbody").html("");
        batch_validate=[];
        $("#exec_color").html("<option value='暂无'>暂无</option>").css('display',"none");
        $("#bus_color_td").css("display","none");
        enterflag = true;
    }
	
	function ajaxEnter(){
		console.log("ajaxEnter");
		cur_key_name=$("#exec_processname").val();
		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
		var field_name=$('#exec_process').find("option:selected").attr("field_name");
		
		if($('#exec_workshop :selected').text()=='底盘'||$('#exec_workshop :selected').text()=='检测线'){
			$.each(parts_list,function(i,parts){
				if(parts.process==$("#exec_processname").val()&&(parts.parts_name=='VIN编码'||parts.parts_name=='VIN码'||parts.parts_name=='左电机号'||parts.parts_name=='右电机号')){
					if(parts.batch==undefined||parts.batch.trim().length==0){
						enterflag=false;
						alert(plan_node+"扫描前，请将零部件信息录入完整！");
						return false;
					}
				}
				
				if((parts.parts_name=='VIN编码'||parts.parts_name=='VIN码')&&parts.batch!=vin&&parts.process==$("#exec_processname").val()){
					alert("VIN编码校验失败，请核对该车的VIN编码！");
					enterflag=false;
					return false;
				}
				if(parts.parts_name=='左电机号'&&parts.batch!=left_motor_number&&parts.process==$("#exec_processname").val()){
					alert("左电机号校验失败，请核对该车的左电机号！");
					enterflag=false;
					return false;
				}
				if(parts.parts_name=='右电机号'&&parts.batch!=right_motor_number&&parts.process==$("#exec_processname").val()){
					alert("右电机号校验失败，请核对该车的右电机号！");
					enterflag=false;
					return false;
				}
			});
			console.log("enterflag " + enterflag);
			if(!enterflag){
				//alert(cur_key_name+"扫描前，请将零部件信息录入完整！");
				$("#btnSubmit").attr("disabled",false);
				 return false;
			 }
		}
		
		console.log($("#exec_processname").val());
		if($("#exec_processname").val() == "检测线下线"){
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
							 $("#btnSubmit").attr("disabled",false);
							 return false;
						 }else{
							 //只能是字母（不区分大小）、数字、-（减号）^[A-Za-z0-9\-]+$
							 var batchTest = "^[A-Za-z0-9\-]+$";
							 var re  =   new   RegExp(batchTest); 
						     if(value.batch.match(re)==null) {
							 //if(!batchTest.test(value.batch)){
								 enterflag=false;
								 alert("底盘关键零部件【" +value.parts_name+"】没有正确录入批次信息，不允许下线！");
								 $("#btnSubmit").attr("disabled",false);
								 return false;
							 }
						 }
					 })
					 
				 }
			 });
			 console.log("batch finish!");
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
			 
			 if(!enterflag){
				$("#btnSubmit").attr("disabled",false);
				return false;
			 }
			 console.log("batch finish!!");	
			 
		}
		 
		
		/**
		 * 增加校验逻辑：检测线上线校验VIN与车载终端是否绑定成功
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
				 $("#btnSubmit").attr("disabled",false);
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
				$("#btnSubmit").attr("disabled",false);
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
		////enterflag=false;
		console.log("enterflag = " + enterflag);
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
		                "process_name":$('#exec_processname').val(),
		                "scanner_id":$('#exec_user').val(),
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
                "exec_process_name":$("#exec_processname").val(),
                "workshop_name":$('#exec_workshop').find("option:selected").text()
            },
            success: function(response){
                    $("#vinText").attr("disabled","disabled");
                    //show car infomation
                    if(response.businfo == ""||response.businfo==null){
                    	fadeMessageAlert(null,'没有对应车号的车辆信息！','gritter-error');
                    	return false;
                    }else if(response.businfo.factory_id !=$("#exec_factory").val()){
                    	fadeMessageAlert(null,response.businfo.bus_number+'不属于'+$("#exec_factory :selected").text()+'！','gritter-error');
                    	return false;
                    }else{                	
                    	bus = response.businfo;
                    	$('#vinText').data("vin",bus.vin);
                    	$('#vinText').data("order_id",bus.order_id);
                    	$('#vinText').data("order_config_id",bus.order_config_id);
                    	$('#vinText').data("bus_type_id",bus.bus_type_id);
                    	
                    	var configList=response.configList;
                    	if(configList.length>0){
                    		$.each(configList,function(index,config){
                    			var tr=$("<tr />");
                    			$("<td />").html(config.parts_type).appendTo(tr);
                    			$("<td />").html(config.vendor).appendTo(tr);
                    			$("#configListTable tbody").append(tr);
                    		});
                    	}           	
                    	
                    	bus_production_status=bus.production_status;
                    	orderType=bus.order_type;
                    	order_area=bus.order_area;
                    	vin=bus.vin;
                		left_motor_number=bus.left_motor_number;
                		right_motor_number=bus.right_motor_number;
                		
                		toggleVinHint(false);
                		$("#infoVIN").html(vin);
                		$("#infoColor").html(bus.bus_color);
                		$("#infoSeats").html(bus.bus_seats);
                		$("#infoWorkShop").html(bus.workshop);
                		$("#infoLine").html(bus.line);
                		$("#infoProcess").html(bus.process_name);
                		$("#infoOrder").html(bus.order_desc);
                		$("#infoStatus").html(bus.status=='0'?'正常':'冻结');
                		$("#btnSubmit").removeAttr("disabled");
                    	
                		//added 2018-02-03 涂装下线工序车辆颜色从订单颜色中选择
                		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
                		if('涂装下线'==plan_node){
                			$("#bus_color_td").css("display","")
                			$("#exec_color").css("display","")
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
                		
                    	/*if('检测线上线'==plan_node&&(bus.testline_online_date.trim().length==0||!bus.testline_online_date)){
                    		var dialog = $("#dialog-config" ).removeClass('hide').dialog({
                				width:400,
                				height:300,
                				modal: true,
                				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 校验</h4></div>",
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
                						text: "确定",
                						"class" : "btn btn-primary btn-minier",
                						click: function() {
                							checkVinMotor(); 
                						} 
                					}
                				]
                			});
                    	}else{*/
       
                    		var cur_line=$("#exec_line option:selected").text();
                    		if(bus.order_type!='标准订单'){
                    			getAllProcessSelect(bus.order_type);
                    		}
                    		//alert(cur_line);
                    		if(bus.old_line !=$("#exec_line option:selected").text()
                    				&&bus.old_workshop==$("#exec_workshop option:selected").text()
                    				&& bus.old_line !=undefined){
                    			fadeMessageAlert(null,'该车辆已在'+bus.line+'扫描，不能跨线扫描！','gritter-error');
                    			//added by xjw 20160513 根据车号查出当前线别锁定线别，不允许跨线扫描,带出相应工序
                        		getSelects(line_selects_data, bus.line, "#exec_line",null,"name"); 
                        		getAllProcessSelect(bus.order_type);
                    		}   
                    		//added by xjw 20160513 根据车号查出当前线别锁定线别，不允许跨线扫描                    		
                    		$("#exec_line").attr("disabled",true);
                    		
                    	/*}*/
                    }
            },
            error:function(){alertError();}
       });
	}
	
	function ajaxGetPartsList(){
		parts_update_list=[];
		$.ajax({
            type: "get",
            dataType: "json",
            url : "getKeyParts",
            async:false,
            data: {
            	"factory_id":$("#exec_factory").val(),
                "bus_number": $('#vinText').val(),
                "process_name":$("#exec_processname").val(),
                "workshop":$('#exec_workshop').find("option:selected").text(),
                "order_id":$('#vinText').data("order_id")||0,
                "order_config_id":$('#vinText').data("order_config_id")||0,
                "bus_type_id":$('#vinText').data("bus_type_id")||0
            },
            success: function(response){
            	$("#partsListTable tbody").html("");
            	parts_list=response.partsList;
            	$.each(parts_list,function(index,parts){
            		var tr=$("<tr />");
            		$("<td />").html(parts.sap_mat).appendTo(tr);
            		$("<td />").html(parts.parts_no).appendTo(tr);
            		$("<td />").html(parts.parts_name).appendTo(tr);
            		$("<td />").html(parts.size).appendTo(tr);
            		$("<td />").html(parts.vendor).appendTo(tr);
            	
            		if(parts['batch']!=undefined && parts['batch'].trim().length>0){
            			$("<td />").html(parts['batch']).appendTo(tr);
            		}
            		else if(parts['3C_no']!=undefined && parts['3C_no'].trim().length>0){
            			$("<td />").html(parts['3C_no']).appendTo(tr);
            		}
            		else{
            			$("<td />").html("<input class='batch' type='text' placeholder='请输入批次号' style='border:1;background:transparent;text-align:center;width:100%;height:100%;' >").appendTo(tr);
            		}
            		$(tr).data("parts_index",index);
            		$("#partsListTable tbody").append(tr);
            	});
            }
		}) 
	}
	
	/**
	 * 关键零部件批次信息校验
	 */
	$(document).on("change",".batch",function(e){
		enterflag=true;
		$(this).focus();
		var tr=$(e.target).parent("td").parent("tr");
		var batchInput=$(tr).find(".batch");
		var parts_index=$(tr).data("parts_index");
		var parts=parts_list[parts_index];
		var batch=$(batchInput).val().trim();
		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
		/**
		 * added by xjw 18/1/17  增加动力电池包零部件批次不能重复的判断逻辑
		 */
		if(parts.parts_name.indexOf('动力电池包')>=0&&(batch!='无'&&batch!='\\'&&batch!='\/')&&"检测线下线"!=plan_node){
			if(batch_validate.indexOf(batch)>=0){
				alert("批次信息不能重复！");
				$(batchInput).val("")
				enterflag=false;
				return false;
			}
			//数据库判断包含动力电池包的零部件批次是否与该批次信息重复
			var exist_flag=checkPartsBatch(batch);
		
			if(exist_flag=="no"){
				alert("该批次信息已存在，不能重复录入！");
				$(batchInput).val("")
				enterflag=false;
				return false;
			}
			
			batch_validate.push($(batchInput).val().trim());
		}
		
		parts_list[parts_index].batch=$(batchInput).val().trim();	
		parts_update_list.push(parts_list[parts_index]);
		//alert(JSON.stringify(parts_list))
		
		
	});
	
	$('body').on('focus', ".batchval",function(event){
		var tds=$(this).parent("td").siblings();
		var className=$(this).attr("class");
		var classHide="."+className+"Hide";
		//alert(classHide);
		var placeHolder="请扫描批次"
		
		$(this).parent("td").find(classHide).val("");
		if(!$(this).attr("readonly")){
			$(this).val("");
			$(this).css("border","1px solid").attr("placeHolder",placeHolder);
		}
		$(this).blur();
		$(this).parent("td").find(classHide).focus();
		
	});
	
	$('body').on('keydown', ".batchvalHide",function(event){
		var tr=$(this).parent("td").parent("tr");
		if (event.keyCode == "13") {
			$(this).parent("td").find(".batchval").css("border","0px").val($(this).val());	
			$(this).parent("td").find(".batchval").trigger("change");
			$("#batchval_"+($(tr).data("parts_index")+1)).trigger("focus");
		}
		
	});
	
	/**
	 * 检测线下线关键零部件批次信息二次校验
	 */
	$(document).on("change",".batchval",function(e){
		enterflag=true;
		var parts_name=$(this).parent("td").parent("tr").children().eq(1).html();
		console.log("批次确认");
		 /**
		  * 检测线下线时需对车载终端、ICCID、电池包编号、可充电储能系统编号进行二次校验
		  * added by XJW 20180425
		  */
		var tr = $(this).parent("td").parent("tr");
		var batch=$(tr).children("td").eq(4).html();
		if(batch==null||batch==""){
			$(this).val("")
			alert("”"+parts_name+"“批次信息未录入，请联系前车间人员录入！")
			enterflag = false;
			return false;
		}
		if(batch !=$(this).val()){
			$(this).val("")
			alert("”"+parts_name+"“批次信息与安装工序扫描录入的批次信息不一致！")
			enterflag = false;
			return false;
		}
		
	})	
	
	
	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#vinText').bind('keydown', function(event) {
        //if vinText disable,stop propogation
        if($(this).attr("disabled") == "disabled")
            return false;
        if($("#exec_processname").val().trim().length==0){
        	$("#btnSubmit").attr("disabled","disabled");
        	  return false;
        }
        if (event.keyCode == "13"){	
            if(jQuery.trim($('#vinText').val()) != ""){
            	enterflag = true;
                ajaxValidate();
                if($("#exec_processname").val()=="检测线下线"){
                	ajaxGetPartsVal();
                }else
                	ajaxGetPartsList();
            }
            return false;
        }
      
    });
    //输入车号后，切换监控点，当选择的为J01时弹出vin校验
    $("#exec_process").on("change",function(){
    	enterflag = true;
    	$("#bus_color_td").css("display","none")
		$("#exec_color").css("display","none")
		
    	$("#exec_processname").val('');
		var process_code=$("#exec_process :selected").text();
		var process_name=$(this).find("option:contains('"+process_code+"')").attr("process");
		$("#exec_processname").val(process_name);
		
	  	if($("#exec_processname").val()=="检测线下线"){
			$("#td_matno").hide();
			$("#td_batchval").show();
		}else{
			$("#td_matno").show();
			$("#td_batchval").hide();
		}
	  	
		if($("#exec_line").val() !=''&&$("#vinText").data("order_id")!=0){		
			if($("#exec_processname").val()=="检测线下线"){
				ajaxGetPartsVal();
			}else
				ajaxGetPartsList();
		}
		
    	var bus_number=$('#vinText').attr("value");
    	if(bus_number&&bus_number!=''&&$("#exec_process :selected").text()=='J01'){
    		$("#btnSubmit").attr("disabled","disabled");
    		ajaxValidate();	
    	}/*else{
    		$("#btnSubmit").removeAttr("disabled");
    	}*/

    	//added 2018-02-03 涂装下线工序车辆颜色从订单颜色中选择
		var plan_node=$('#exec_process').find("option:selected").attr("plan_node");
		if('涂装下线'==plan_node){
			$("#bus_color_td").css("display","")
			$("#exec_color").css("display","")
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
    
    $("#btnSubmit").click(function() {
        if(!($("#btnSubmit").hasClass("disabled"))){
            $("#btnSubmit").attr("disabled","disabled");
            ajaxEnter();          
        }
        return false;
    });
    
    $("#clientValidate").click(function(){
    	ajaxEnter();
    });
    
    $("#reset").click(function() {
        resetPage();
        return false;
    });
	
	$("#exec_type").change(function(){
		if($(this).children('option:selected').val() == "正常"){
			$("#exec_onoff").hide();
		}else{
			$("#exec_onoff").show();
		}
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
			getAllLineSelect();
		}
	});
	
	$("#exec_line").change(function(){
		$("#exec_process").empty();
		if($("#exec_line").val() !=''){
			getAllProcessSelect();
		}
	});
	
/*	$("#exec_process").change(function(){
		$("#exec_processname").val('');
		var process_code=$("#exec_process :selected").text();
		var process_name=$(this).find("option:contains('"+process_code+"')").attr("process");
		$("#exec_processname").val(process_name);
		if($("#exec_line").val() !=''&&$("#vinText").data("order_id")!=0){		
			ajaxGetPartsList();
		}
	});*/
	
	function getFactorySelect() {
		$.ajax({
			url : "/BMS/common/getFactorySelectAuth",
			dataType : "json",
			data : {"function_url":"/BMS/production/execution"},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				getSelects_noall(response.data, "", "#exec_factory");
				$("#exec_factory").val(getQueryString("factory_id"));
				//$("#exec_factory option:contains('武汉工厂')").attr("selected", true);
				getAllWorkshopSelect();
				$("#exec_workshop").val(getQueryString("workshop_id"));
				getAllLineSelect();
				$("#exec_line").val(getQueryString("line"));		
				getAllProcessSelect();
				//$("#exec_process").val(getQueryString("process_id"));
				//getProcessInfo($("#exec_process").val());
			}
		});
	}

})


function getAllWorkshopSelect() {
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
			getSelects(response.data, "", "#exec_workshop",null,"id");
		}
	});
}

function getAllLineSelect() {
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
			getSelects(response.data, "", "#exec_line",null,"name"); 
		}
	});
}

function getAllProcessSelect(order_type) {
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
		    	if (index == 0) {
		    		process_id_default=value.id;
			    	process_name_default=value.process_name;
		    	}
		    	
		    	if(getQueryString("process_id")==value.id){
		    	 	process_id_default=value.id;
			    	process_name_default=value.process_name;
		    	}
/*		    	if (index == 0) {
		    		$("#exec_processname").val(value.process_name);
		    	}*/
		    	strs += "<option value=" + value.id + " process='"+value.process_name+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_code + "</option>";
		    });
		  //  alert(process_id_default);
		    $("#exec_process").append(strs);
		    $("#exec_process").val(process_id_default+"");
		    $("#exec_processname").val(process_name_default);
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

function checkPartsBatch(batch){
	var flag="yes";
	if(batch.trim().length>0)
	$.ajax({
		url:'checkPartsBatch',
		dataType : "json",
		async:false,
		data:{
			batch:batch
		},
		success:function(response){
			if(response.isExsit){
				flag="no";
			}
		}
	})
	
	return flag;
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

	$.ajax({
        type: "get",
        dataType: "json",
        url : "getKeyPartsVal",
        async:false,
        data: {        	
            "bus_number": $('#vinText').val()
        },
        success: function(response){
        	$("#partsListTable tbody").html("");
        	parts_val_list=response.data;
        	$.each(parts_val_list,function(index,parts){
        		var tr=$("<tr />");
        		//$("<td />").html(parts.sap_mat).appendTo(tr);
        		$("<td />").html(parts.parts_no).appendTo(tr);
        		$("<td />").html(parts.parts_name).appendTo(tr);
        		$("<td />").html(parts.size).appendTo(tr);
        		$("<td />").html(parts.vendor).appendTo(tr);
        	
        		if(parts['batch']!=undefined && parts['batch'].trim().length>0){
        			$("<td />").html(parts['batch']).appendTo(tr);
        		}
        		else if(parts['3C_no']!=undefined && parts['3C_no'].trim().length>0){
        			$("<td />").html(parts['3C_no']).appendTo(tr);
        		}
        		else{
        			$("<td />").html("").appendTo(tr);
        		}
        		var str= "<input id='batchval_"+index+"' class='batchval' style='border:0;width:98%;text-align:center;background-color:transparent;' placeholder='请扫描批次' />" +
        				"<input type='text' class='batchvalHide' style='width:0px;position:absolute;z-index: -1;margin-left: -10px;border: 0px;' />";
        		
        		$("<td />").html(str).appendTo(tr);
        		$(tr).data("parts_index",index);
        		$("#partsListTable tbody").append(tr);
        	});
        }
	}) 
}
