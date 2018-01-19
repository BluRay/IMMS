var extArray = new Array(".xls");
var json_tpl_list=null;
$(document).ready(function(){
	
	getWorkshopStandardSelect("","#search_workshop","全部","name");
	
	$("#search_workshop").change(function(e){
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupStandardSelect(workshop,"","#search_workgroup","全部","name")
	})
	
	//查询
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
	//展示导入页面
	$("#btnImport").click(function(){
		$("#uploadForm").show();
		drawTplDetailTable("#uploadTable");
		
		var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
			width:900,
			height:550,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>供应商导入</h4></div>",
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
						ajaxSave(); 
					} 
				}
			]
		});
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
	
	//删除
	$("#btnDelete").click(function(){
		var cbx_checked=$("#tableResult tbody").find("input:checkbox:checked");
		if(cbx_checked.length==0){
			alert("请选择需要删除的供应商报价信息！");
			return false;
		}
		var del_ids="";
		$.each(cbx_checked,function(i,cbx){
			del_ids+=$(cbx).attr("dataid")+",";
		})
		//alert(del_ids)
		$.ajax({
			url:"deleteSupplierPriceData",
			type:"post",
			dataType:"json",
			data:{
				ids:del_ids,
			},
			success:function(response){
				$(".divLoading").hide();
				alert(response.message);
				ajaxQuery();
			}
		})
		
	})
	
	
})


	function drawTplDetailTable(tableId,data){
		var startIndex= 0;
	
		var tb=$(tableId).dataTable({
			paiging:false,
			ordering:false,
			searching: false,
			autoWidth:false,
			destroy: true,
			paginate:false,
			/*//sScrollY: $(window).height()-250,
			scrollX: true,*/
			scrollCollapse: false,
			lengthChange:false,
			orderMulti:false,
			info:false,
			language: {
				emptyTable:"",					     
				infoEmpty:"",
				zeroRecords:"请导入供应商报价明细！"
			},
			data:data||{},
			columns: [
			          	{"title":"序号","class":"center","width":"5%","data":"item_no","defaultContent": ""},
			            {"title":"供应商名称","class":"center","width":"30%","data":"supplier","defaultContent": "","render":function(data,type,row){
			            	var html=data;
			            	if(row.exist_flag=='Y'){
			            		html="<span class='exist' style='color:red'>"+data+"</span>";
			            	}
			            	
			            	return html
			            }},
			            {"title":"供应商负责人","class":"center","width":"12%","data":"dutyman","defaultContent": "","render":function(data,type,row){
			            	var html=data;
			            	if(row.exist_flag=='Y'){
			            		html="<span class='exist' style='color:red'>"+data+"</span>";
			            	}
			            	
			            	return html
			            }},		
			            {"title":"车间","class":"center","width":"10%","data":"workshop","defaultContent": "","render":function(data,type,row){
			            	var html=data;
			            	if(row.exist_flag=='Y'){
			            		html="<span class='exist' style='color:red'>"+data+"</span>";
			            	}
			            	
			            	return html
			            }},
			            {"title":"班组","class":"center","width":"15%","data":"workgroup","defaultContent": "","render":function(data,type,row){
			            	var html=data;
			            	if(row.exist_flag=='Y'){
			            		html="<span class='exist' style='color:red'>"+data+"</span>";
			            	}
			            	
			            	return html
			            }},
			            {"title":"小班组","class":"center","width":"17%","data":"team","defaultContent": "","render":function(data,type,row){
			            	var html=data;
			            	if(row.exist_flag=='Y'){
			            		html="<span class='exist' style='color:red'>"+data+"</span>";
			            	}
			            	
			            	return html
			            }},
			            {"title":"报价","class":"center","width":"11%","data":"price","defaultContent": ""}
			          ]	
		});
		
		var api = tb.api();
		var startIndex= api.context[0]._iDisplayStart;//获取到本页开始的条数
		var j=0;
		api.column(0).nodes().each(function(cell, i) {
			//alert($(cell).css("display"))
			if($(cell).css("display")!="none"){
				j++;
			}
			cell.innerHTML = startIndex + j;
		}); 
	}

	function ajaxQuery(){
		$(".divLoading").addClass("fade in").show();
		//先destroy datatable，隐藏form
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		
		var columns=[
					{"title":"<input id=\"checkall\" type=\"checkbox\" />","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<input type=\"checkbox\" dataid='"+row.id+"'/>";
		            }},
					{"title":"供应商名称","class":"center","data":"supplier","defaultContent": ""},
					{"title":"供应商负责人","class":"center","data":"dutyman","defaultContent": ""},
					{"title":"联系电话","class":"center","data":"telephone","defaultContent": ""},
					{"title":"车间","class":"center","data":"workshop","defaultContent": ""},
					{"title":"班组","class":"center","data":"workgroup","defaultContent": ""},
					{"title":"小班组","class":"center","data":"team","defaultContent": ""},
					{"title":"报价","class":"center","data":"price","defaultContent": ""},
					{"title":"编辑人","class":"center","data":"editor","defaultContent":""},
					{"title":"编辑时间","class":"center","data":"edit_date","defaultContent":""},
					/*{"title":"","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-pencil bigger-130\" title=\"修改\" del_flag='del_single' style=\"cursor: pointer;color: blue;\" row='"+JSON.stringify(row)+"' swh_id='"+row.id+"'></i>";
		            }}*/
		            ];
        
    	var tb=$("#tableResult").DataTable({
    		serverSide: true,
    		/*fixedColumns:   {
                leftColumns: 0,
                rightColumns:3
            },*/
    		dom: 'Bfrtip',
    		lengthMenu: [
    		             [ 20, 50,100, -1 ],
    		             [ '显示20行', '显示50行', '显示100行', '全部' ]
    		         ],
    	    buttons: [
    	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
    	        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},
    	        {extend:'pageLength',text:'显示20行'}
    	       
    	    ],
            //rowsGroup:[0,1,2,3,4],
    		paiging:true,
    		ordering:false,
    		searching: false,
    		bAutoWidth:false,
    		destroy: true,
    		sScrollY: $(window).height()-250,
    		scrollX: true,
    		/*scrollCollapse: true,*/
    		pageLength: 20,
    		pagingType:"full_numbers",
    		lengthChange:true,
    		orderMulti:false,
    		language: {
    			emptyTable:"抱歉，未查询到数据！",
    			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
    			lengthMenu:"显示 _MENU_ 行",
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
    				"supplier":$("#search_supplier").val(),
    				"workshop":$("#search_workshop :selected").text()=="全部"?"":$("#search_workshop :selected").text(),
    				"workgroup":$("#search_workgroup :selected").text()=="全部"?"":$("#search_workgroup :selected").text()		
    			};
                param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                param.start = data.start;//开始的记录序号
                param.page = (data.start / data.length)+1;//当前页码

                $.ajax({
                    type: "post",
                    url: "getSupplierPriceList",
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
                        
                        $(".divLoading").hide();
                    }
                });
    		
    		},
    		columns: columns,
    	});
    	$("#tableResult_info").addClass('col-xs-6');
    	$("#tableResult_paginate").addClass('col-xs-6');
    	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
    	
    	$(".divLoading").hide();
    	
	}
	
	/**
	 * 上传导入
	 */
	function upload(form,file){
		if (file == "") {
			alert("请选择文件！");
			return false;
		}
		allowSubmit = false;
		if (!file)
			return;
		while (file.indexOf("\\") != -1)
			file = file.slice(file.indexOf("\\") + 1);
			ext = file.slice(file.indexOf(".")).toLowerCase();
		for (var i = 0; i < extArray.length; i++) {
			if (extArray[i] == ext) {
				allowSubmit = true;
				break;
			}
		}
		if (allowSubmit) {
			$("#uploadForm").ajaxSubmit({
				dataType : "json",
				type : 'post', // 提交方式 get/post
				url : 'uploadSupplierPriceFile', // 需要提交的 url
				data : {
					
				},
				success : function(response) {
					//alert(response.data);
					json_tpl_list=response.data;
					if(response.success){
						drawTplDetailTable("#uploadTable",response.data);
					}else{
						alert(response.message)
					}
					$("#uploadForm").resetForm();
				}
			})	
		}
	}

	function ajaxSave(){
		var exist_span=$("#uploadTable").find(".exist");
		var save_flag=true;
		if(exist_span.length>0){
			save_flag=confirm("标红的供应商报价信息已经存在，是否更新？");
		}
		
		$(".divLoading").addClass("fade in").show();
		if(save_flag){
			$.ajax({
				url:"saveSupplierPriceData",
				type:"post",
				dataType:"json",
				data:{
					supplier_price_list:JSON.stringify(json_tpl_list),
				},
				success:function(response){
					$(".divLoading").hide();
					alert(response.message);
					ajaxQuery();
				}
			})
		}
		$( "#dialog-config" ).dialog("close");
	}
	