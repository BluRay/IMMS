<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String factory_id = session.getAttribute("factory_id").toString();
%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
<link rel="stylesheet"
	href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css">
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../css/common.css">
<style type="text/css" media="screen">

label {
    font-weight: 400;
    font-size: 13px;
    text-align:right;
}
</style>
<jsp:include page="../common.jsp"></jsp:include>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<%-- <jsp:include page="../top.jsp" flush="true" /> --%>
	<!-- 身 -->
	<div class="main-container" id="main-container" style="height:100%">
		<!-- 左边菜单 -->
		<%-- <jsp:include page="../left.jsp" flush="true" /> --%>
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
				<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
					<ul class="breadcrumb" style="font-size:14px;">
					<li><a href="/BMS/index_mobile"><i class="ace-icon fa fa-home home-icon bigger-160"></i>BMS</a></li>
						<li><a href="#">报表</a></li>
					</ul>
					<!-- /.breadcrumb -->
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">
						<!-- <i id="btn_clear" class="ace-icon fa fa-refresh  red bigger-160" style="cursor:pointer;margin-right:20px;"></i> -->
						<!-- <i id="btn_save" class="ace-icon fa fa-floppy-o green bigger-160" style="cursor:pointer"></i> -->
					</div>
				</div>

			<div class="page-content">
					<!-- 设置小部件 -->
					<%-- <jsp:include page="settings.jsp" flush="true"/> --%>
					<!-- /section:settings.box -->
					<div class="page-content-area">
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-4">
										<img id="scan" class="img " src="../images/mreport_1.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('factoryYield');">							
									</div>
									<div class="col-xs-4">
										<img id="scan" class="img " src="../images/mreport_2.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('order_process');">
									</div>
									<div class="col-xs-4">
										<img id="scan" class="img " src="../images/mreport_3.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('staffUseRate');">
									</div>
								</div>
							</div>			
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-4" style="text-align:center;margin-left: -7px;">
										<label style='font-size:12px;'>
										工厂产量
										</label>
									</div>
									<div class="col-xs-4" style="text-align:center;margin-left: 3px;">
										<label style='font-size:12px;'>
										订单进度
										</label>
									</div>
									<div class="col-xs-4" style="text-align:center;margin-left: 1px;">
										<label style='font-size:12px;'>
										人员利用率
										</label>
									</div>
								</div>
							</div>			
							
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-4">
										<img id="scan" class="img " src="../images/mreport_7.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('weld_monitor');">							
									</div>
									<div class="col-xs-4">
										<img id="scan" class="img " src="../images/mreport_7.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('assb_monitor');">
									</div>
									<div class="col-xs-4">
									</div>
								</div>
							</div>	
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-4" style="text-align:center;margin-left: -7px;">
										<label style='font-size:12px;'>
										焊装监控
										</label>
									</div>
									<div class="col-xs-4" style="text-align:center;margin-left: 3px;">
										<label style='font-size:12px;'>
										总装监控
										</label>
									</div>
									<div class="col-xs-4" style="text-align:center;margin-left: 1px;">
									</div>
								</div>
							</div>
							
									

					</div>
			</div><!-- /.main-content -->
			<!-- /.main-container -->
		</div>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script type="text/javascript" src="../js/common.js"></script>
</div>
</body>
	<script type="text/javascript">
		function pageForward(flag){
			var url="";
			if(flag=='factoryYield'){
				url="/BMS/report/factoryYield_Mobile"
			}
			if(flag=='order_process'){
				url="/BMS/report/orderProcessReport"
			}
			if(flag=='staffUseRate'){
				url="/BMS/report/staffUseRate_Mobile"
			}
			if(flag=='tech_follow'){
				url="/BMS/tech/techFollowMobile"
			}
			if(flag=='report'){
				url="/BMS/report/reportIndexMobile"
			}			
			if(flag=='weld_monitor'){
				url="/BMS/production/monitorBoard?workshop=welding&factory="+<%=factory_id%>
			}
			if(flag=='assb_monitor'){
				url="/BMS/production/monitorBoard?workshop=assembly&factory="+<%=factory_id%>
			}
			window.location=url
		}
	</script>
</html>