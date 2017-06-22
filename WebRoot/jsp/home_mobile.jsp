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
			<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="<%=request.getContextPath()%>/index_mobile">BMS</a></li>
					</ul><!-- /.breadcrumb -->

					<!-- #section:basics/content.searchbox -->
				<!-- 	<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>/.nav-search -->
				</div>
				
			<div class="page-content">
					<!-- 设置小部件 -->
					<%-- <jsp:include page="settings.jsp" flush="true"/> --%>
					<!-- /section:settings.box -->
					<div class="page-content-area">
							<div class="row" style="margin-top:20px;">
								<div class="col-xs-12">
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/scan.png" style="width:100%;height:100%;" onclick="javascript: return pageForward('execution');">							
									</div>
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/prdRcd.png" style="width:100%;height:100%;">
									</div>
								</div>
							</div>			
							<div class="row" style="margin-top:20px;">
								<div class="col-xs-12">
									<div class="col-xs-6" style="text-align:center">
										<label>
										生产扫描
										</label>
									</div>
									<div class="col-xs-6" style="text-align:center">
										<label>
										成品记录表
										</label>
									</div>
								</div>
							</div>		
							
							<div class="row" style="margin-top:20px;">
								<div class="col-xs-12">
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/keyparts.png" style="width:100%;height:100%;">							
									</div>
									<div class="col-xs-6">
										<img id="scan" class="img " src="images/exception.png" style="width:100%;height:100%;">
									</div>
								</div>
							</div>			
							<div class="row" style="margin-top:20px;">
								<div class="col-xs-12">
									<div class="col-xs-6" style="text-align:center">
										<label>
										关键零部件
										</label>
									</div>
									<div class="col-xs-6" style="text-align:center">
										<label>
										生产异常
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
			var url="";
			if(flag=='execution'){
				url="/IMMS/production/execution_mobile"
			}
			
			window.location=url
		}
	</script>
</html>