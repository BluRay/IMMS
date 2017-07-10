var chart1;
var chart2;
$(document).ready(function() {				
			$('.widget-container-col').sortable({
				connectWith : '.widget-container-col',
				items : '> .widget-box',
				handle : ace.vars['touch'] ? '.widget-header' : false,
				cancel : '.fullscreen',
				opacity : 0.8,
				revert : true,
				forceHelperSize : true,
				placeholder : 'widget-placeholder',
				forcePlaceholderSize : true,
				tolerance : 'pointer',
				start : function(event, ui) {
					ui.item.parent().css({
						'min-height' : ui.item.height()
					})
				},
				update : function(event, ui) {
					ui.item.parent({
						'min-height' : ''
					})
				}
			});
			
			$('.page-content').ace_scroll({
				size: 560
		    });
			
			$(".ui-sortable").bind('sortstop', function(event, ui) { 
				//alert(ui.item.context.clientWidth);
				var widget=$(ui.item[0]).find(".widget-body");
				//alert(widget.attr("id"))
				chart_id=widget.attr("id");
				if(chart_id=='chart1'){
					chart1.setSize(ui.item.context.clientWidth-20,210)
				}
				if(chart_id=='chart2'){
					chart2.setSize(ui.item.context.clientWidth-20,210)
				}
				
			});
					
			$('.easy-pie-chart.percentage').each(function(){
				$(this).easyPieChart({
					barColor: $(this).data('color'),
					trackColor: '#EEEEEE',
					scaleColor: false,
					lineCap: 'butt',
					lineWidth: 6,
					animate: ace.vars['old_ie'] ? false : 1000,
					size:70
				}).css('color', $(this).data('color'));
			});
			
			ajaxGetOrderChartData();
			
			drawOutputChart();
	})
	
	function ajaxGetOrderChartData(){
		var bar_series=[];
		var pie_series=[];
		$.ajax({
			url:'/IMMS/common/getIndexOrderData',
			type:'get',
			dataType:'json',
			data:{},
			success:function(response){
				var data=response.data;
				var total=data.warehouse_qty+data.producting_qty+data.unstart_qty+data.dispatch_qty;
				bar_series=[data.unstart_qty,data.producting_qty,data.warehouse_qty,data.dispatch_qty];
				pie_series=[Number((data.unstart_qty/total*100).toFixed(2)),Number((data.producting_qty/total*100).toFixed(2)),
				            Number((data.warehouse_qty/total*100).toFixed(2)),Number((data.dispatch_qty/total*100).toFixed(2))]
			
				drawOrderChart(bar_series,pie_series);
			}
		})
	}
	
				
	function drawOrderChart(bar_series,pie_series){
	chart1=Highcharts.chart("container",
			{
				credits: 
				{
			            enabled: false
			    },
				title : null,
				chart : {
					type : 'bar',
					height : 210
				},
				legend : {
					enabled : false,
					title : {
						text : ""
					}
				},
				colors: [ '#24CBE5', '#64E572', '#FF9655', '#FFF263','#058DC7', '#50B432', '#ED561B', '#DDDF00', '#6AF9C4'],
				tooltip:{
					enabled:false
				},
				xAxis : {
					categories : [ '未开始', '在制', '已完成','交车' ]
				},
				yAxis : {
					title:{
						text:null
					},
					 visible: false
				},
				plotOptions: {
					series: {
			            colorByPoint: true
			        },
		            bar: {
		                dataLabels: {
		                    enabled: true,
		                    allowOverlap: true,
		                	inside:true
		                }
		            },
		            pie: {
		                dataLabels: {
		                    enabled: true,
		                    allowOverlap: true,
		                	inside:true,
		                	distance: -20
		                }
		            }
		        },
				labels : {
					/*items : [ {
						html : '水果消耗',
						style : {
							left : '350',
							top : '18',
							color : (Highcharts.theme && Highcharts.theme.textColor)
									|| 'black'
						}
					} ]*/
				},
				series : [ {
					type : 'bar',
					data : bar_series
				}, {
					type : 'pie',
					center:['85%','40%'],
					size:'80%',
					dataLabels: {
		                enabled: true,
		                format: '{y} %',
		                color:'black',
		               inside:true
		            },
					data : pie_series
				} ],
				 responsive: {
					 rules:[{
			                condition: {
			                    maxWidth: 1000,
			                    minWidth:200
			                }
					 }]
				 }
		
			});
}

function drawOutputChart(){
	chart2=Highcharts.chart("container2",
			{
				credits: 
				{
			            enabled: false
			    },
			    title:{
			    	text:null
			    },
			    subtitle : {
					text: '<b>一季度：</b><span style="color: green">20</sapn>'+'   <b>二季度：</b><span style="color: green">30  </span>'+
					'<b>三季度：</b><span style="color: green">50  </span><b>四季度：</b><span style="color: green">50  </span>'+
					'<b>年度：</b><span style="color: green">150</span>'
				},
				chart : {
					type : 'column',
					height : 210
				},
				colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
				legend : {
					enabled : false,
					title : {
						text : ""
					}
				},
				tooltip:{
					enabled:false
				},
				xAxis : {
					   categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
				},
				yAxis : {
					title:{
						text:null
					},
					 visible: false
				},
				plotOptions: {
		            column: {
		                dataLabels: {
		                    enabled: true,
		                    allowOverlap: true,
		                	inside:true
		                }
		            }
		        },
				labels : {

				},
				series : [{
		            name: '产量',
		            data: [434, 523, 345, 785, 565, 843, 726, 590, 665, 434, 312, 432]
		        }],
				 responsive: {
					 rules:[{
			                condition: {
			                    maxWidth: 1000,
			                    minWidth:200
			                }
					 }]
				 }
		
			});
	}
