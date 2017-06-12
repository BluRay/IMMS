<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>标准故障库</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<jsp:include page="../top.jsp" flush="true"/>
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 左边菜单 -->
			<jsp:include page="../left.jsp" flush="true"/>
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
			<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="<%=request.getContextPath()%>/index">首页</a></li>
						<li><a href="#">制程品质</a></li>
						<li class="active">标准故障库</li>
					</ul><!-- /.breadcrumb -->

					<!-- #section:basics/content.searchbox -->
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div><!-- /.nav-search -->
				</div>
				
			<div class="page-content">
					<div class="page-content-area">
					
					<div class="well">
						<table>
							<tr>
								<td>零部件名称：</td>
								<td><input id="input_parts" placeholder="零部件名称..." style="width:100px" type="text"></td>
								<td>&nbsp;缺陷类别：</td>
								<td><input id="input_bug_type" placeholder="缺陷类别..." style="width:100px" type="text"></td>
								<td>&nbsp;严重等级：</td>
								<td width="180px">
									<label class="checkbox" style="width:35px;display:-webkit-inline-box;margin-left:20px">
									<input type="checkbox" name="faultlevel" value="S" />S
									</label>
									<label class="checkbox" style="width:35px;display:-webkit-inline-box;vertical-align:bottom">
									<input type="checkbox" name="faultlevel" value="A" />A
									</label>
									<label class="checkbox" style="width:35px;display:-webkit-inline-box;vertical-align:bottom">
									<input type="checkbox" name="faultlevel" value="B" />B
									</label>
									<label class="checkbox" style="width:35px;display:-webkit-inline-box;vertical-align:bottom">
									<input type="checkbox" name="faultlevel" value="C" />C								
									</label>
								</td>
								<td>缺陷分类：</td>
								<td>
									<label class="checkbox" style="width:55px;display:-webkit-inline-box;margin-left:20px">
									<input type="checkbox" name="faulttype" value="1" />尺寸
									</label>
									<label class="checkbox" style="width:55px;display:-webkit-inline-box;vertical-align:bottom">
									<input type="checkbox" name="faulttype" value="0" />非尺寸
									</label>
								</td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-primary" value="查询" style="margin-left: 2px;"></input><input id="btnAdd" type="button" class="btn btn-sm btn-success" value="新增" style="margin-left: 2px;"></input></td>
							</tr>
						</table>
					</div>	
					
					</div>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
</html>
