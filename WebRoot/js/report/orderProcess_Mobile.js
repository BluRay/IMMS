var height=300;
$(document).ready(function () {	
	initPage();
	var bread_height=$("#breadcrumbs").height();
	var form_height=$(".page-content-area").eq(0).height();
	height=window.innerHeight-bread_height-form_height-38;
	//alert(height)
	$("#order_process").css("height",height);
	
	
	$(document).on("change","#factory",function(e){
		drawFactoryOrderChart();
	})
	
	$(document).on("change","#status",function(e){
		if($("#status").val()=="0"){
			$("#span_0").html(" (焊装未上线)");
		}else if($("#status").val()=="1"){
			$("#span_0").html(" (焊装已上线)");
		}else if($("#status").val()=="2"){
			$("#span_0").html(" (总装下线)");
		}
		
		drawFactoryOrderChart();
	})
	
})

function initPage(){
	$("#prod_year").val(new Date().getFullYear());
	getFactorySelect("report/orderProcessReport",null,"#factory","全部","id")
	
	drawFactoryOrderChart();
}



function drawFactoryOrderChart(){
		if($("#prod_year").val().trim().length==0){
			$("#prod_year").val(new Date().getFullYear());
		}
		var prod_year=$("#prod_year").val();
		var factory_id=$("#factory").val()==""?"all":$("#factory").val();
		var status=$("#status").val();
		
		$("#order_process").html("");
		$.ajax({
			url:'getOrderProcessData',
			type:'get',
			dataType:'json',
			cache:false,
			//async:false,
			data:{
				factory_id:factory_id,
				status:status,
				prod_year:prod_year
			},
			success:function(response){
				var data=response.data;
				$.each(data,function(i,forder){
					var div_factory_order=$("<div class=\"factory_act_order\" />");
					var div_order_desc=$("<div class=\"row\"/>").html("<label class=\"col-xs-12 \" style=\"text-align:center;font-weight:bold\">"+forder.order_desc+"</label>");
					$(div_factory_order).append(div_order_desc);
					var rate_order=forder.order_rate;
					var factory_rate_list=[];
					if(forder.factory_rate_list){
						factory_rate_list=JSON.parse("["+forder.factory_rate_list+"]");
					}
									
					
					var div_rate_f=$("<div class=\"row\">");
					var div_left=$("<div class=\"col-xs-12 \" >");
					$.each(factory_rate_list,function(i,obj){
					/*	var obj=JSON.parse(rate_f);*/
						var production_qty=parseInt(obj.production_qty);
						var inporcess_num=parseInt(obj.inprocess_num);				
						var finished_num=parseInt(obj.finished_num);
						var unstart_num=production_qty-inporcess_num-finished_num;
						
						var inprocess_rate=parseInt((parseInt(obj.inprocess_num)/parseInt(obj.production_qty)*100).toFixed(0))
						var finished_rate=parseInt((parseInt(obj.finished_num)/parseInt(obj.production_qty)*100).toFixed(0))
						var unstart_rate=100-inprocess_rate-finished_rate;
						var rate_arr=[unstart_rate,inprocess_rate,finished_rate]						
						var max_rate=Math.max.apply(null, rate_arr)
						var max_index=rate_arr.indexOf(max_rate);
						
						$.each(rate_arr,function(i,rate){
							if(rate>0&&rate<10){
								//alert(rate)
								rate_arr[max_index]=rate_arr[max_index]-10+rate;
								rate_arr[i]=10;
							}
						})
						if(unstart_rate<0){
							rate_arr[max_index]+=unstart_rate;
						}
						
						var rate_f_html="<div class='row' style='height:30px;margin-right: 5px;'><label class='col-xs-3 control-label no-padding-right'>"+obj.factory_name+"：</label>"+
						"<div class='progress'><div class='progress-bar progress-bar-grey' style='width:"+rate_arr[0]+"%;'>"+unstart_num+"</div>"+
						"<div class='progress-bar progress-bar-warning' style='width:"+rate_arr[1]+"%;'>"+inporcess_num+"</div>"+
						"<div class='progress-bar progress-bar-success' style='width:"+rate_arr[2]+"%;'>"+finished_num+"</div></div>";
					
						$(div_left).append($(rate_f_html));								
					})
					
					$(div_rate_f).append(div_left);
					/*var rate_o_html="<div class='col-xs-4  center'><div class='easy-pie-chart percentage' data-percent='"+rate_order+
					"' data-color='#D15B47' style='top:20%'>"+"<span class='percent'>"+rate_order+"</span>% </div> </div>";
					
					$(div_rate_f).append(rate_o_html);	*/
					$(div_factory_order).append(div_rate_f);
					$("#order_process").append(div_factory_order);
				})
				/*$('.easy-pie-chart.percentage').each(function(){
					$(this).easyPieChart({
						barColor: $(this).data('color'),
						trackColor: '#EEEEEE',
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: 6,
						animate: ace.vars['old_ie'] ? false : 1000,
						size:70
					}).css('color', $(this).data('color'));
				});*/
			}
			});
	}