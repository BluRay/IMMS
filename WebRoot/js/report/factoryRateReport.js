
var factory_str = "";
var factory_ids = "0";
$(document).ready(function(){
	initPage();
	ajaxQuery();
	
	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	});
	
	function initPage(){
		$("#search_factory").val("全部");
	}
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
	
		
	
	$("#btn_factory").click(function(){
		select_factory();
	});
	
	//导出功能
	$(document).on("click",".buttons-excel",function(){
		htmlToExcel("tableResult", "", "","工厂计划达成率","工厂计划达成率");
		return false;
	});
	
	var DataSourceTree = function(options) {
		this._data 	= options.data;
		this._delay = options.delay;
	}
	DataSourceTree.prototype.data = function(options, callback) {
		var self = this;
		var $data = null;
		if (!("name" in options) && !("type" in options)) {
			$data = this._data;
			callback({data : $data});
			return;
		} else if ("type" in options && options.type == "folder") {
			if ("additionalParameters" in options && "children" in options.additionalParameters)
				$data = options.additionalParameters.children;
			else
				$data = {}
		}
		if ($data != null)
			setTimeout(function() {
				callback({data : $data});
			}, parseInt(Math.random() * 500) + 200);
	};
	
	showtree2();
	
	function showtree2(){
		$("#tree2").removeData();
		$("#tree2").unbind();
		$.ajax({
		    url: "../common/getFactorySelect",
		    dataType: "json",
			type: "get",async:false,
		    data: {},
		    success:function(response){
		    	var role_str = '{';
		    	$.each(response.data, function(index, value) {
		    		role_str += '"role_'+value.id+'" : {"name": "<i class=\'fa fa-users blue\'></i> '+value.name+'","id":"'+value.id+'","factory":"'+value.name+'","type": "item"},'
		    	});
		    	role_str = role_str.substring(0,role_str.length-1) + '}';
		    	var role_data = eval('(' + role_str + ')');
		    	var treeDataSource = new DataSourceTree({data: role_data});
		    	$('#tree2').ace_tree({
		    		dataSource: treeDataSource,
		    		multiSelect : true,
		    		cacheItems: true,
		    		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		    		'open-icon' : 'ace-icon tree-minus',
		    		'close-icon' : 'ace-icon tree-plus',
		    		'selectable' : true,
		    		'selected-icon' : 'ace-icon fa fa-check',
		    		'unselected-icon' : 'ace-icon fa fa-check'
		    	});

		    } 
		});
		$('#tree2')
		.on('updated', function(e, result) {
		})
		.on('selected', function(e,data) {
			console.log('selected:' + data.info[data.info.length-1].factory);
			this_role = data.info[data.info.length-1].factory;

		})
		.on('click', function(e,data) {
			//console.log(e);
		})
		.on('opened', function(e) {
		})
		.on('closed', function(e) {
		});
	}
})

function select_factory(){
		$("#dialog-factory").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 选择工厂</h4></div>',
			title_html: true,
			width:'600px',
			height:450,
			modal: true,
			buttons: [{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {$( this ).dialog( "close" );} 
					},
					{
						text: "确定",
						id:"btn_ok",
						"class" : "btn btn-success btn-minier",
						click: function() {
							btnConfirm();
						} 
					}
				]
		});
	}
	
	function btnConfirm(){
		var tree2_items = $('#tree2').tree('selectedItems'); 
		if(tree2_items.length === 0){
			$("#search_factory").val("全部");
			factory_ids = "0";
		}else{
			factory_ids = "";factory_str="";
			$.each(tree2_items, function(index, value) {
				factory_str += value.factory + ',';
				factory_ids += value.id + ',';
			});
			$("#search_factory").val(factory_str.substring(0,factory_str.length-1));
			factory_ids = "(" + factory_ids.substring(0,factory_ids.length-1) + ")";
		}
		
		console.log("---->factory_ids = "+ factory_ids )
		$("#dialog-factory" ).dialog( "close" ); 
	}

function ajaxQuery(){
	$(".divLoading").addClass("fade in").show();
	$("#tableResult").html("");
	
	var wd=$("#search_wd").val();
	var c_date=new Date();
	var y=c_date.getFullYear();
	var m=c_date.getMonth();
	var d=c_date.getDate();
	var start_date="";
	var end_date="";
	
	if(wd=='当日'){
		start_date=formatDate(c_date);
		end_date=formatDate(c_date);
	}
	if(wd=='上周'){
		var day=c_date.getDay();
		if(day==0){
			day=7
		}
		start_date=formatDate(new Date(c_date-(day+6)*1000*60*60*24));
		//alert(start_date)
		end_date=formatDate(new Date(c_date-day*1000*60*60*24));
	}
	if(wd=='上月'){
		start_date=formatDate(new Date(y,m-1,1));
		end_date=getLastDayOfMonth(y+"-"+(m));
		
	}
	if(wd=='本月'){
		start_date=formatDate(new Date(y,m,1));
		end_date=formatDate(c_date);
	}
	
	
	var data=[];
	var rowsGroup=[];
	
	$.ajax({
		 type: "post",
         url: "getFactoryRateData",
         cache: false,  //禁用缓存
         async:false,
         data: {
        	 start_date:start_date,
        	 end_date:end_date,
        	 factoryIds : factory_ids
         },  //传入组装的参数
         dataType: "json",
         success: function (response) {
        	 data=response.data;
        	 if(data.length>0){
        		 showTable(data);
        	 }else{
        		 alert("抱歉，未查询到数据！");
        	 }
        	 
        	$(".divLoading").hide();
         }
   
	})
	
}

function showTable(data_list){
	var html_th="<tr><th colspan=2 style='text-align:center'>工厂</th> <th style='text-align:center'>部件下线</th>"+
				"<th style='text-align:center'>焊装上线</th> <th style='text-align:center'>涂装上线</th>"+
				"<th style='text-align:center'>底盘上线</th> <th style='text-align:center'>总装下线</th>"+
				"<th style='text-align:center'>入库</th> <th colspan=2 style='text-align:center'>计划达成率</th></tr>";
	var thead= $("<thead />").html(html_th) 
	$("#tableResult").append(thead);
	
	var total_p_bj=0;
	var total_r_bj=0;
	var total_p_hz=0;
	var total_r_hz=0;
	var total_p_tz=0;
	var total_r_tz=0;
	var total_p_dp=0;
	var total_r_dp=0;
	var total_p_zz=0;
	var total_r_zz=0;
	var total_p_rk=0;
	var total_r_rk=0;
	var total_rate="-";
	
	var tbody= $("<tbody />");
	var detail=$("<tbody />");
	
	$.each(data_list,function(i,data){
		var list=data.result.split(",");
		var total_r=data.total_done_qty;
		var total_p=data.total_plan_qty;
		
		var rate=data.rate==undefined?"-":(data.rate*100).toFixed(2)+"%";
		var factory=data.factory||"";
		var p_bj=0,r_bj=0;
		var p_hz=0,r_hz=0;
		var p_tz=0,r_tz=0;
		var p_dp=0,r_dp=0;
		var p_zz=0,r_zz=0;
		var p_rk=0,r_rk=0;
		
		$.each(list,function(ii,d){
			var key=d.split(":")[0];
			var sj=d.split(":")[1];
			if(key=="部件下线"){
				r_bj=sj.split("|")[0];
				p_bj=sj.split("|")[1];
				total_p_bj+=Number(p_bj);
				total_r_bj+=Number(r_bj);
			}
			if(key=="焊装上线"){
				r_hz=sj.split("|")[0];
				p_hz=sj.split("|")[1];
				total_p_hz+=Number(p_hz);
				total_r_hz+=Number(r_hz);
			}
			if(key=="涂装上线"){
				r_tz=sj.split("|")[0];
				p_tz=sj.split("|")[1];
				total_p_tz+=Number(p_tz);
				total_r_tz+=Number(r_tz);
			}
			if(key=="底盘上线"){
				r_dp=sj.split("|")[0];
				p_dp=sj.split("|")[1];
				total_p_dp+=Number(p_dp);
				total_r_dp+=Number(r_dp);
			}
			if(key=="总装下线"){
				r_zz=sj.split("|")[0];
				p_zz=sj.split("|")[1];
				total_p_zz+=Number(p_zz);
				total_r_zz+=Number(r_zz);
			}
			if(key=="入库"){
				r_rk=sj.split("|")[0];
				p_rk=sj.split("|")[1];
				total_p_rk+=Number(p_rk);
				total_r_rk+=Number(r_rk);
			}
			
		})

		var tr=$("<tr />");
		$("<td rowspan=2 />").html(factory).appendTo(tr);
		$("<td />").html("计划").appendTo(tr);
		$("<td />").html(p_bj).appendTo(tr);
		$("<td />").html(p_hz).appendTo(tr);
		$("<td />").html(p_tz).appendTo(tr);
		$("<td />").html(p_dp).appendTo(tr);
		$("<td />").html(p_zz).appendTo(tr);
		$("<td />").html(p_rk).appendTo(tr);
		$("<td />").html(total_p).appendTo(tr);
		$("<td rowspan=2  />").html(rate).appendTo(tr);
		$(tr).appendTo(detail);
		
		var tr1=$("<tr />");
		$("<td />").html("实际").appendTo(tr1);
		$("<td />").html(r_bj).appendTo(tr1);
		$("<td />").html(r_hz).appendTo(tr1);
		$("<td />").html(r_tz).appendTo(tr1);
		$("<td />").html(r_dp).appendTo(tr1);
		$("<td />").html(r_zz).appendTo(tr1);
		$("<td />").html(r_rk).appendTo(tr1);
		$("<td />").html(total_r).appendTo(tr1);
			
		$(tr1).appendTo(detail);
	})
	
	var tr=$("<tr />");
	$("<td rowspan=2 />").html("合计").appendTo(tr);
	$("<td />").html("计划").appendTo(tr);
	$("<td />").html(total_p_bj).appendTo(tr);
	$("<td />").html(total_p_hz).appendTo(tr);
	$("<td />").html(total_p_tz).appendTo(tr);
	$("<td />").html(total_p_dp).appendTo(tr);
	$("<td />").html(total_p_zz).appendTo(tr);
	$("<td />").html(total_p_rk).appendTo(tr);
	var total_hj_p=(total_p_bj+total_p_hz+total_p_tz+total_p_dp+total_p_zz+total_p_rk)
	var total_hj_r=(total_r_bj+total_r_hz+total_r_tz+total_r_dp+total_r_zz+total_r_rk)
	if(total_hj_p>0){
		total_rate=(total_hj_r/total_hj_p*100).toFixed(2)+"%";
	}
	$("<td />").html(total_hj_p).appendTo(tr);	
	
	$("<td rowspan=2  />").html(total_rate).appendTo(tr);
	$(tbody).append(tr);
		
	var tr1=$("<tr />");
	$("<td />").html("实际").appendTo(tr1);
	$("<td />").html(total_r_bj).appendTo(tr1);
	$("<td />").html(total_r_hz).appendTo(tr1);
	$("<td />").html(total_r_tz).appendTo(tr1);
	$("<td />").html(total_r_dp).appendTo(tr1);
	$("<td />").html(total_r_zz).appendTo(tr1);
	$("<td />").html(total_r_rk).appendTo(tr1);
	$("<td />").html(total_hj_r).appendTo(tr1);	
	$(tbody).append(tr1);
		
	$(tbody).append(detail.html());	
	$("#tableResult").append(tbody);
	
	
	/*var tb=$("#tableResult").dataTable({
		  dom: 'Bfrtip',
		  buttons: [
			        {extend:'excelHtml5',enabled:false,title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
			        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},	       
			        ],
		  paginate:false,	 
		  paiging:false,
		  ordering:false,
		  rowsGroup:[9],
		  searching: false,
		  bAutoWidth:false,
		  destroy: true,
		  sScrollY: $(window).height()-250,
		  scrollX: true,
		  info:false,
		  orderMulti:false,
		  language: {
				emptyTable:"抱歉，未查询到数据！",
				loadingRecords:"正在查询，请稍后..." ,
				infoEmpty:"抱歉，未查询到数据！",
			},
			
	  });

	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
	var head_width=$(".dataTables_scroll").width();
	$(".dataTables_scrollBody").scrollTop(10);
	//alert($(".dataTables_scrollBody").scrollTop());

	if($(".dataTables_scrollBody").scrollTop()>0){
		$(".dataTables_scrollHead").css("width",head_width-20);
		$(".dataTables_scrollBody").scrollTop(0);
	}*/
}