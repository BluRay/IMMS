<!-- <!DOCTYPE html> snaker js与html5冲突 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%String path = request.getContextPath();String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery.gritter.css" />
<%-- <link rel="stylesheet" href="<%=basePath%>/assets/css/ace.min.css" id="main-ace-style" /> --%>
<link rel="stylesheet" href="<%=basePath%>/snaker/css/style.css" type="text/css" media="all" />
<link rel="stylesheet" href="<%=basePath%>/snaker/css/snaker.css" type="text/css" media="all" />
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<jsp:include page="../top.jsp" flush="true" />
	<!-- 身 -->
	<div class="main-container" id="main-container">
		<!-- 左边菜单 -->
		<jsp:include page="../left.jsp" flush="true" />
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
				<div class="breadcrumbs ace-save-state  breadcrumbs-fixed" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">流程管理</a></li>
						<li class="active">流程申请</li>
					</ul>
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon"> <input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
				</div>
				<div class="page-content">
					
<!--                     <div id="snakerflow" style="border: 1px solid #d2dde2; margin-top:8px; margin-left:1px; margin-bottom:8px; width:100%;height:65px"> -->
<!-- 			        </div> -->
					<div class="row">
						<div class="col-xs-12">
						    <div class="controls">
								<div style="width: 100%">
									<ul class="nav nav-tabs" id="new_tab" role="tablist">
										<li id="div0"  class="active"><a href="#div_0" data-toggle="tab"
										style="font-size: 12px; color: #333;display:inline-block"><span>流程图</span></a></li>
									</ul>
								</div>
								<div class="tab-content" id="new_accordion">
	                                <div id="div_0" class="tab-pane fade in active" style="height:450px;overflow:auto">
	                                    <div id="snakerflow" style="border: 0px solid #d2dde2; margin-top:5px; margin-left:-50px; margin-bottom:8px; width:100%;height:450px">
			                            </div>
	                                </div>
								</div>
							</div>
						</div>
					</div>
                </div>
			</div>
		</div>
		<!-- /.main-container -->
	</div>
	<script src="../../assets/js/jquery-ui.min.js"></script>
	<script src="../../js/jsrender.min.js"></script>
	<script src="../../js/common.js"></script>
	<script src="../../js/browser.js"></script>
<!--     <script src="../../assets/js/ace-elements.min.js"></script> -->
    <script src="<%=basePath%>/snaker/raphael-min.js" type="text/javascript"></script>
	<script src="<%=basePath%>/snaker/snaker.designer.js" type="text/javascript"></script>
	<script src="<%=basePath%>/snaker/snaker.model.js" type="text/javascript"></script>
	<script type="text/javascript">
	//$(document).ready(function(){
		var tabs;
	    var taskName = "${task.taskName}";
	    $.ajax({
			type:'GET',
			url:"/BMS/snaker/process/json",
			data:"processId=${processId}&orderId=${orderId}",
			async: false,
			globle:false,
			error: function(){
				alert('数据处理错误！');
				return false;
			},
			success: function(data){
				data = eval("(" + data + ")");
				display(data.process, data.active);
			}
		});
	    
	    $.ajax({
			type:'GET',
			url:"/BMS/snaker/flow/node",
			data:{"processId":"${processId}"},
			async: false,
			globle:false,
			error: function(){
				alert('数据处理错误！');
				return false;
			},
			success: function(data) {
				data = eval(data);
				var curTab; 
				var iscurrent = false;
				for(var i = 0; i < data.length; i++) {
 					var node = data[i];
					var iframeUrl = '/BMS'+node.form + '?processId=${processId}&orderId=${orderId}&taskName=' + node.name+'&displayName='+node.displayName;
		
					if(taskName == node.name || (taskName == '' && i == 0)) {
						iscurrent = true;
						iframeUrl += '&taskId=${taskId}&readonly=1';
					} else {
						continue;
						iscurrent = false;
						iframeUrl += '&readonly=0';
					}
                    if(iscurrent) {
		            	curTab = "new_task"+i;
		            }
					$("#new_tab").find("li").removeClass("active");
					$("#new_accordion").find("div").removeClass("active");
					
					var tabli="<li class='new_task"+i+"'><a href='#new_task"+i+"' data-toggle='tab' style='font-size: 14px; color: #333;display:inline-block'><span>${process.displayName}</span>"
					+"</a></li>";
					
					$("#new_tab li:eq("+0+")").after(tabli);
					
					var tabContent="<div class=\"tab-pane\" role=\"tabpanel\" style=\"height:450px\" id=\"new_task"+i+"\">";
					tabContent+="<iframe src="+iframeUrl+" style=\"width:100%;height:100%;frameborder:no;border:0;scrolling:no\"></iframe>";
					tabContent+="</div>";
	
					$(tabContent).appendTo($("#new_accordion"));
					
				}
				$("#"+curTab).addClass("active");
				$("."+curTab).addClass("active");
			}
		});
	function display(process, active) {
		/** view*/
		$('#snakerflow').snakerflow($.extend(true,{
			basePath : "${ctx}/snaker/",
            ctxPath : "${ctx}",
            orderId : "${orderId}",
			restore : eval('(' + process + ')')
			,
			editable : false
			},eval("(" + active + ")")
		));
		$("svg").attr("width",720);
		$("svg").attr("height",1030);
	}
	</script>
</body>

</html>
