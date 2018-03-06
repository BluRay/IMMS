<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>检测数据打印</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/font-awesome.min.css" />
<!-- text fonts -->
<link rel="stylesheet" href="<%=basePath%>/assets/css/ace-fonts.css" />
<!-- ace styles -->
<link rel="stylesheet" href="<%=basePath%>/assets/css/ace.min.css" id="main-ace-style" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/ace-skins.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/ace-rtl.min.css" />
<script src="<%=basePath%>/assets/js/jquery.min.js"></script>
<script src="<%=basePath%>/assets/js/jquery.mobile.custom.min.js"></script>
<script src="<%=basePath%>/assets/js/ace-extra.min.js"></script>
<script src="<%=basePath%>/assets/js/bootstrap.min.js"></script>
<script src="<%=basePath%>/assets/js/ace-elements.min.js"></script>
<script src="<%=basePath%>/assets/js/ace.min.js"></script>
<style type="text/css">
.print_tb {
	border-collapse: collapse;width:900px;
}
.print_tb, .my_td {
	border: 1px solid black;
	text-align:center;
}
.x {
border-top: 0px solid black;
border-left: 1px solid black;
border-right: 1px solid black;
border-bottom: 1px solid black; 
</style>
</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
			<div class="page-content">
				<input id="check_id"  type="text" style="display:none;width:410px;height:18px"></input>
			</div>
			<input id="btnPrint" type="button" class="btn btn-sm btn-primary" value="打印" style="margin-left: 5px;"></input>
			<div id="printarea" style="margin-left: 5px;width:900px;text-align:center;" class="printConfigure printable toPrint"><br/>
				<span style="font-size:18px">比亚迪汽车工业有限公司</span><br/><span style="font-size:18px">整车出厂检验单</span>
				<table style="width:900px;">
				<tr>
					<td style="width:33%;text-align:left;">检验日期：2018-01-01</td><td style="width:33%;text-align:center;">检验流水号：</td><td style="width:33%;text-align:right;">检验线号：</td>
				</tr>
				</table>
				
				<table class="print_tb">
				<tr>
					<td class="my_td" style="width:13%;">生产序号</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">检验类型</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">车辆类型</td><td class="my_td" style="width:20%;"></td>
				</tr>
				<tr>
					<td class="my_td" style="width:13%;">车型</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">VIN(出厂编号)</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">电机号(左/右)</td><td class="my_td" style="width:20%;"></td>
				</tr>
				<tr>
					<td class="my_td" style="width:13%;">燃料类别</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">驱动型式</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">前照灯制</td><td class="my_td" style="width:20%;"></td>
				</tr>
				</table><br/>
				
				<table class="print_tb">
				<tr>
					<td class="my_td">检测项目</td>
					<td class="my_td" colspan="7">生产序号</td><td class="my_td" style="width:80px;">引车员</td>
					<td class="my_td" colspan="2"></td>
				</tr>
				<tr>
					<td class="my_td">前制动</td>
					<td class="my_td" colspan="2">左右轮重(KG)</td>
					<td class="my_td" style="width:80px;">左Max(dan)</td><td class="my_td" style="width:80px;">右Max(dan)</td>
					<td class="my_td" style="width:80px;">和(%)</td><td class="my_td" style="width:80px;">左Max(dan)</td>
					<td class="my_td" style="width:80px;">右Max(dan)</td><td class="my_td" style="width:80px;">差(%)</td>
					<td class="my_td" style="width:80px;">左阻滞(%)</td><td class="my_td" style="width:80px;">右阻滞(%)</td>
				</tr>
				<tr>
					<td class="my_td">检测数据</td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
				</tr>
				<tr>
					<td class="my_td">标准</td>
					<td class="my_td" colspan="4"></td>
					<td class="my_td" style="width:80px;">≥60</td>
					<td class="my_td" colspan="2"></td>
					<td class="my_td" style="width:80px;">≤20</td>
					<td class="my_td" style="width:80px;">≤10</td><td class="my_td" style="width:80px;">≤10</td>
				</tr>
				<tr>
					<td class="my_td">评价</td>
					<td class="my_td" colspan="4"></td>
					<td class="my_td" style="width:80px;">⊙</td>
					<td class="my_td" colspan="2"></td>
					<td class="my_td" style="width:80px;">⊙</td>
					<td class="my_td" style="width:80px;">⊙</td><td class="my_td" style="width:80px;">⊙</td>
				</tr>
				<tr>
					<td class="my_td">后制动</td>
					<td class="my_td" colspan="2">左右轮重(KG)</td>
					<td class="my_td" style="width:80px;">左Max(dan)</td><td class="my_td" style="width:80px;">右Max(dan)</td>
					<td class="my_td" style="width:80px;">和(%)</td><td class="my_td" style="width:80px;">左Max(dan)</td>
					<td class="my_td" style="width:80px;">右Max(dan)</td><td class="my_td" style="width:80px;">差(%)</td>
					<td class="my_td" style="width:80px;">左阻滞(%)</td><td class="my_td" style="width:80px;">右阻滞(%)</td>
				</tr>
				<tr>
					<td class="my_td">检测数据</td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
				</tr>
				<tr>
					<td class="my_td">标准</td>
					<td class="my_td" colspan="4"></td>
					<td class="my_td" style="width:80px;">≥60</td>
					<td class="my_td" colspan="2"></td>
					<td class="my_td" style="width:80px;">≤20</td>
					<td class="my_td" style="width:80px;">≤10</td><td class="my_td" style="width:80px;">≤10</td>
				</tr>
				<tr>
					<td class="my_td">评价</td>
					<td class="my_td" colspan="4"></td>
					<td class="my_td" style="width:80px;">⊙</td>
					<td class="my_td" colspan="2"></td>
					<td class="my_td" style="width:80px;">⊙</td>
					<td class="my_td" style="width:80px;">⊙</td><td class="my_td" style="width:80px;">⊙</td>
				</tr>
				<tr>
					<td class="my_td">整车</td>
					<td class="my_td" colspan="3">总轮重</td>
					<td class="my_td" colspan="2">总制动力</td>
					<td class="my_td" style="width:80px;">和(%)</td>
					<td class="my_td" style="width:80px;">左驻车(dan)</td><td class="my_td" style="width:80px;">右驻车(dan)</td>
					<td class="my_td" colspan="2">和(%)</td>
				</tr>
				<tr>
					<td class="my_td">检测数据</td>
					<td class="my_td" colspan="3"></td>
					<td class="my_td" colspan="2"></td>
					<td class="my_td" style="width:80px;"></td>
					<td class="my_td" style="width:80px;"></td><td class="my_td" style="width:80px;"></td>
					<td class="my_td" colspan="2"></td>
				</tr>
				<tr>
					<td class="my_td">生产序号</td>
					<td class="my_td" style="width:80px;">生产序号</td><td class="my_td" style="width:80px;">生产序号</td>
					<td class="my_td" style="width:80px;">生产序号</td><td class="my_td" style="width:80px;">生产序号</td>
					<td class="my_td" style="width:80px;">生产序号</td><td class="my_td" style="width:80px;">生产序号</td>
					<td class="my_td" style="width:80px;">生产序号</td><td class="my_td" style="width:80px;">生产序号</td>
					<td class="my_td" style="width:80px;">生产序号</td><td class="my_td" style="width:80px;">生产序号</td>
				</tr>
				</table>
				
				<table style="width:900px;">
				<tr>
					<td class="x" style="width:13%;">生产序号</td><td class="x" style="width:20%;"></td>
					<td class="x" style="width:13%;">检验类型</td><td class="x" style="width:20%;"></td>
					<td class="x" style="width:13%;">车辆类型</td><td class="x" style="width:20%;"></td>
				</tr>
				<tr>
					<td class="my_td" style="width:13%;">车型</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">VIN(出厂编号)</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">电机号(左/右)</td><td class="my_td" style="width:20%;"></td>
				</tr>
				<tr>
					<td class="my_td" style="width:13%;">燃料类别</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">驱动型式</td><td class="my_td" style="width:20%;"></td>
					<td class="my_td" style="width:13%;">前照灯制</td><td class="my_td" style="width:20%;"></td>
				</tr>
				</table>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
		</div>
	</div>
	</body>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/quality/testingDateReportPrint.js"></script>
</html>
