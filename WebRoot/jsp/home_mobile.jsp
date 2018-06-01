<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>BMS</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<jsp:include page="common.jsp"></jsp:include>

		<script type="text/javascript">
	
		$(document).ready(function() {
		//alert("top")
		if(window.location.href.indexOf("10.23.1.18:8080")>=0){
			//alert("域名访问");
			$("#a_logout").attr("href","http://websso.byd.com.cn/oam/server/logout?end_url=http://10.23.1.18:8080");
		}
		if(window.location.href.indexOf("10.23.1.77:8080")>=0){
			//alert("域名访问");
			$("#a_logout").attr("href","http://websso.byd.com.cn/oam/server/logout?end_url=http://10.23.1.77:8080");
		}
		
	})
	</script>	
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<%-- <jsp:include page="top.jsp" flush="true"/> --%>
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 左边菜单 -->
		<%-- 	<jsp:include page="left.jsp" flush="true"/> --%>
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
			<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs" >
					<ul class="breadcrumb" style="font-size:14px;">
						<li><a href="/BMS/index_mobile"><i class="ace-icon fa fa-home home-icon bigger-160"></i>BMS</a></li>
						<li><a href="/BMS/quality/processFault_mobile">processFault</a></li>
					</ul><!-- /.breadcrumb -->

					<!-- #section:basics/content.searchbox -->
				 	<div class="nav-search" id="nav-search" style="top: 10px;font-size:14px;">
						<a id="a_logout" href="/BMS/logout">
								<i class="ace-icon fa fa-power-off bigger-160" ></i>登出
						</a>
					</div>
				</div>
				
			<div class="page-content">
					<!-- 设置小部件 -->
					<%-- <jsp:include page="settings.jsp" flush="true"/> --%>
					<!-- /section:settings.box -->
					<div class="page-content-area">
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/scan.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('execution');">							
									</div>
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/prdRcd.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('prdRcd');">
									</div>
									<!-- <div class="col-xs-4">
										<img id="scan" class="img " src="images/keyparts.png" style="width:100%;height:100%;" onclick="javascript: return pageForward('tech_follow');">	
									</div> -->
								</div>
							</div>			
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-6" style="text-align:center">
										<label style='font-size:12px;'>
										生产扫描
										</label>
									</div>
									<div class="col-xs-6" style="text-align:center">
										<label style='font-size:12px;'>
										成品记录表
										</label>
									</div>
									<!-- <div class="col-xs-4" style="text-align:center">
										<label style='font-size:12px;'>
										技改跟进
										</label>
									</div> -->
								</div>
							</div>		
							
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/ecn-mobile.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('tech_follow');">							
									</div>
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/exception.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('exception');">
									</div>
								</div>
							</div>			
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-6" style="text-align:center">
										<label>
										技改跟进
										</label>
									</div>
									<div class="col-xs-6" style="text-align:center">
										<label>
										生产异常
										</label>
									</div>
								</div>
							</div>		
							
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/report-mobile.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('report');">							
									</div>
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/flow-mobile.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('zzj');">
									</div>
								</div>
							</div>			
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-6" style="text-align:center">
										<label>
										报表
										</label>
									</div>
									<div class="col-xs-6" style="text-align:center">
										<label>
										自制件
										</label>
									</div>
								</div>
							</div>	
					</div>
					
					<div class="zzj-apps" style="display:none">
						<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-4">
										<img id="scan" class="img " src="images/mreport_1.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('mat_enter');">							
									</div>
									<div class="col-xs-4">
										<img id="scan" class="img " src="images/mreport_2.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('mat_query');">
									</div>
 									<div class="col-xs-4"> 
 										<img id="scan" class="img " src="images/mreport_3.png" style="width:90%;height:90%;" onclick="javascript: return pageForward('workshopsupply');">
 									</div>
								</div>
							</div>			
							<div class="row" style="margin-top:5px;">
								<div class="col-xs-12">
									<div class="col-xs-4" style="text-align:center;margin-left: -7px;">
										<label style='font-size:12px;'>
										产量录入
										</label>
									</div>
									<div class="col-xs-4" style="text-align:center;margin-left: 3px;">
										<label style='font-size:12px;'>
										产量查询
										</label>
									</div>
								    <div class="col-xs-4" style="text-align:center;margin-left: 1px;">
										<label style='font-size:12px;'>
										车间供应
										</label>
									</div>
								</div>
							</div>		
					</div>
			
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script type="text/javascript">
		
		function pageForward(flag){
			var url="#";
			if(flag=='execution'){
				url="/BMS/production/execution_mobile"
			}
			if(flag=='exception'){
				url="/BMS/production/exception_mobile"
			}
			if(flag=='prdRcd'){
				url="/BMS/quality/prdRcdMobile"
			}
			if(flag=='tech_follow'){
				url="/BMS/tech/techFollowMobile"
			}
			if(flag=='report'){
				url="/BMS/report/reportIndexMobile"
			}			
			if(flag=='zzj'){
				//url="/BMS/flow/flowHomeMobile"
				$(".page-content-area").hide();
				$(".zzj-apps").show();
			}
			if(flag=='mat_enter'){
				url="/BMS/zzj/matEnter_Mobile"
			}
			if(flag=='mat_query'){
				url="/BMS/zzj/matQuery_Mobile"
			}
			if(flag=='workshopsupply'){
				url="/BMS/zzj/zzjWorkshopSupplyQuery_Mobile"
			}	
			window.location=url
		}
	</script>
</html>
