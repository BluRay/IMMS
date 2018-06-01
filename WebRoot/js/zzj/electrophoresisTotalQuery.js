
$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	});
	$('#search_factory').change(function(){ 
		getWorkshopSelect("zzj/electrophoresisTotalQuery",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_line",null,"name");
	});
	$('#search_workshop').change(function(){ 
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_line",null,"name");
	});
	
	$(document).on("change","#search_order_no",function(){
		
		$("#search_order_desc").val("");

		if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}	
	})
	
	$(document).on("change","#search_factory",function(){
		if($("#search_order_no").val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}
	});
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	});
});

function ajaxQuery(){
	if($("#search_order_no").val()==''){
		alert("请输入订单编号");
		return false;
	}
	if($("#search_factory").val()==''){
		alert("请选择生产工厂");
		return false;
	}
	var order_id=$("#search_order_no").attr("order_id");
	var order_no=$("#search_order_no").val();
	var order_desc=$("#search_order_desc").val();
	var factory_id=$("#search_factory").val();
	var workshop_name=$("#search_workshop :selected").text();
	var line_name=$("#search_line :selected").text();
	var param='?order_id='+order_id+'&factory_id='+factory_id+'&order_no='+order_no+'&order_desc='+order_desc;
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	var dt=$("#tableResult").DataTable({
		paiging:false,
		ordering:false,
		searching: false,
		autoWidth:false,
		paginate:false,
		sScrollY: $(window).height()-165,
		scrollX: true,
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		rowsGroup:[0,1],
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"没查找到符合条件的记录"
		},
		ajax:function (data, callback, settings) {
			var param ={
				"order_id":$("#search_order_no").attr("order_id"),
	        	"factory_id":$("#search_factory").val(),
	        	"workshop_name":$("#search_workshop :selected").text(),
	        	"line_name":$("#search_line").val(),
	        	"use_workshop":$("#search_use_workshop :selected").text(),
	        	"zzj_type":$("#search_zzj_type").val(),
			};

            $.ajax({
                type: "post",
                url: "getEelectrophoresisTotal",
                cache: true,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //封装返回数据
                    var returnData = {};
                    returnData.data = result.data;//返回的数据列表
                    callback(returnData);
                }
            });
		},
		columns: [
			{"title":"序号","class":"center","data":"","defaultContent": "","render" : function(data, type, full, meta){
				return meta.row + 1 + meta.settings._iDisplayStart;
			}},
            {"title":"自制件类型","class":"center","data": "zzj_type"},
            {"title":"使用车间","class":"center","data":"use_workshop","defaultContent": ""},		
            {"title":"订单需求种类","class":"center","data":"demand_count","defaultContent": ""},		            
            {"title":"自制入库种类","class":"center","data":"zzj_input_count","render": function(data,type,row){
            	var str= '<a href=\'javascript:addTabs({id:"电泳件外发进仓明细",title:"电泳件外发进仓明细",'+
            	'close: "true",url: "\\BMS\\zzj\\electrophoresisQuery",'+
            	'param: "'+param+'&zzj_type='+row.zzj_type+'&total_kind=zzj_input"});\' >'+data+'</a>';				
            	return data==0 ? 0 : str;
            }},		            
            {"title":"未外发种类","class":"center","data":"","render":function(data,type,row){
            	var un_output_count=row.demand_count-row.output_count;
            	var str= '<a href=\'javascript:addTabs({id:"电泳件外发进仓明细",title:"电泳件外发进仓明细",'+
            	'close: "true",url: "\\BMS\\zzj\\electrophoresisQuery",'+
            	'param: "'+param+'&zzj_type='+row.zzj_type+'&workshop_name='+workshop_name+'&line_name='+line_name+'&use_workshop='+row.use_workshop+'&total_kind=un_output"});\' >'+un_output_count+'</a>';				
                 return un_output_count==0 ? 0 : str;
            }},		            
            {"title":"已外发种类","class":"center","data":"output_count","render": function(data,type,row){
            	var str= '<a href=\'javascript:addTabs({id:"电泳件外发进仓明细",title:"电泳件外发进仓明细",'+
            	'close: "true",url: "\\BMS\\zzj\\electrophoresisQuery",'+
            	'param: "'+param+'&zzj_type='+row.zzj_type+'&total_kind=output"});\' >'+data+'</a>';				
                 return data==0 ? 0 : str;
            }},		            
            {"title":"已进仓种类","class":"center","data":"input_count","render": function(data,type,row){
            	var str='<a href=\'javascript:addTabs({id:"电泳件外发进仓明细",title:"电泳件外发进仓明细",'+
            	'close: "true",url: "\\BMS\\zzj\\electrophoresisQuery",'+
            	'param: "'+param+'&zzj_type='+row.zzj_type+'&total_kind=input"});\' >'+data+'</a>';				
            	return data==0 ? 0 : str;
            }},		            		            
            {"title":"已外发未进仓种类","class":"center","data":"","render":function(data,type,row){
            	var output_un_input_count=row.output_count-row.input_count;
            	var str= '<a href=\'javascript:addTabs({id:"电泳件外发进仓明细",title:"电泳件外发进仓明细",'+
            	'close: "true",url: "\\BMS\\zzj\\electrophoresisQuery",'+
            	'param: "'+param+'&zzj_type='+row.zzj_type+'&total_kind=output_un_input"});\' >'+output_un_input_count+'</a>';				
                 return output_un_input_count==0 ? 0 : str;
            }}          		           
          ],
	});
}

function initPage(){
	getFactorySelect("zzj/electrophoresisTotalQuery","","#search_factory",null,"id");
	getWorkshopSelect("zzj/electrophoresisTotalQuery",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_line",null,"name");
	getOrderNoSelect("#search_order_no","#orderId");
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



var tabs = 1;
var addTabs = function (options) {
	 //var rand = Math.random().toString();
	 //var id = rand.substring(rand.indexOf('.') + 1);
	 var url = window.location.protocol + '//' + window.location.host;
	 
	 if(url.indexOf("http://") == -1){
		 options.url = url + options.url;
	 }
	 id = "tab_" + options.id;
	 //如果TAB不存在，创建一个新的TAB
	 //允许最多同时打开6个tab
	 var active=window.parent.document.getElementsByClassName("active");
	 var idobject=window.parent.document.getElementById(id);
	if (!$(idobject)[0]) {
		
		 if(tabs>=7){
			 alert("最多只能同时打开6个页面，请先关闭已打开的程序后，再打开新的程序！");
		 }else{
			 
			 $(active).removeClass("active");
			 //固定TAB中IFRAME高度
			 //mainHeight = $(document).outerHeight()-115 ;//125
			 mainHeight = $(window.parent.document).outerHeight()-115 ;//125
			 //创建新TAB的title
			 title = '<li class="myCloseTabClass" role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab"><i class="'+options.icon+'"></i>&nbsp;&nbsp;' + options.title;
			 //是否允许关闭
			 if (options.close) {
				 title += ' <i class="glyphicon glyphicon-remove-sign" tabclose="' + id + '"></i>';
			 }
			 title += '</a></li>';
			 //是否指定TAB内容
			 if (options.content) {
				 content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + options.content + '</div>';
			 } else {//没有内容，使用IFRAME打开链接
			  content = '<div role="tabpanel" class="tab-pane active" id="' + id + '"><iframe src="\\BMS\\zzj\\electrophoresisQuery'+options.param+'" width="100%" height="' + mainHeight +
			   '" frameborder="no" border="0" marginwidth="0" marginheight="0"  scrolling="yes" allowtransparency="yes"></iframe></div>';
			 }
			 tabs =tabs+1;
			 //加入TABS
			 var nav_tabs=window.parent.document.getElementsByClassName('nav-tabs');
			 var nav_content=window.parent.document.getElementsByClassName('tab-content');
			 $(nav_tabs).append(title);
			 $(nav_content).append(content);
		 }
	 }else{
		 $(active).removeClass("active");
	 }
	 //激活TAB
	var oldSrc = $(idobject).children('iframe ').attr('src');
	var newSrc ="\\BMS\\zzj\\electrophoresisQuery"+options.param; //options.url;
	//if(oldSrc !=newSrc){
		$(idobject).children('iframe ').attr('src',newSrc);
	//}
//	 $("#tab_" + id).addClass('active');
//	 $("#" + id).addClass("active");
	var tabid=window.parent.document.getElementById('tab_'+id);
	$(tabid).addClass("active");
	$(idobject).addClass("active");
    //激活左边菜单
    $('#li_tab_'+options.id).addClass('active');
    
	 $(".myCloseTabClass").on("click", function (e) {
		 var pid = $(".myCloseTabClass.active").attr('id');
		 pid = pid.substring(4);
		 var id = $(this).attr("id");
		 id = id.substring(4);
		
		 $('#li_'+pid).removeClass('active');
	     $('#li_'+id).addClass('active');
	     
	 });
};
var closeTab = function (id) {
	 //如果关闭的是当前激活的TAB，激活他的前一个TAB
	 if ($(".myCloseTabClass.active").attr('id') == "tab_" + id) {
		 $("#tab_" + id).prev().addClass('active');
		 $("#" + id).prev().addClass('active');
		 
		 $('#li_'+id).removeClass('active');
		 var pid = $("#" + id).prev().attr('id');
	    //激活左边菜单
	    $('#li_'+pid).addClass('active');
	    
	 }else{
		 var mpid = $(".myCloseTabClass.active").attr('id');
		 mpid = mpid.substring(4);
		 var mid = $(this).attr("id");
		 $('#li_'+mid).removeClass('active');
		 $("#li_" + mpid).addClass("active");
		 
	 }
	 //关闭TAB
	 tabs =tabs-1;
	 $("#tab_" + id).remove();
	 $("#" + id).remove();
};
$(function () {
	 mainHeight = $(document.body).height() - 45;
	 $('.main-left,.main-right').height(mainHeight);
	 $("[addtabs]").click(function () {
		 addTabs({ id: $(this).attr("id"), title: $(this).attr('title'), close: true });
	 });
 
	 $(".nav-tabs").on("click", "[tabclose]", function (e) {
		 id = $(this).attr("tabclose");
	 	 closeTab(id);
	 });
	 
});
