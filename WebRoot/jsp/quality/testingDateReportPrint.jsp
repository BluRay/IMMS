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
td{
	height:25px;
}
.print_tb {
	border-collapse: collapse;width:900px;
}
.print_tb, .my_td {
	border: 1px solid black;
	text-align:center;
	height:25px;
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
			<input id="btnPrint" type="button" class="btn btn-sm btn-primary" value="打印" style="margin-left: 420px;"></input>
			<div id="printarea" style="margin-left: 5px;width:900px;text-align:center;" class="printConfigure printable toPrint"><br/>
				<span style="font-size:18px">比亚迪汽车工业有限公司</span><br/><span style="font-size:18px">整车出厂检验单</span>
				<table style="width:900px;">
				<tr>
					<td style="width:33%;text-align:left;">检验日期：<span id="check_date"></span></td><td style="width:33%;text-align:center;">检验流水号：<span id="check_no"></span></td><td style="width:33%;text-align:right;">检验线号：1号线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
				</tr>
				</table>
				
				<table class="print_tb">
				<tr>
					<td class="my_td" style="width:13%;">生产序号</td><td class="my_td" style="width:20%;"><span id="t_1_1"></span></td>
					<td class="my_td" style="width:13%;">检验类型</td><td class="my_td" style="width:20%;"><span id="t_1_2"></span></td>
					<td class="my_td" style="width:13%;">车辆类型</td><td class="my_td" style="width:20%;"><span id="t_1_3"></span></td>
				</tr>
				<tr>
					<td class="my_td" style="width:13%;">车型</td><td class="my_td" style="width:20%;"><span id="t_2_1"></span></td>
					<td class="my_td" style="width:13%;">VIN(出厂编号)</td><td class="my_td" style="width:20%;"><span id="t_2_2"></span></td>
					<td class="my_td" style="width:13%;">电机号(左/右)</td><td class="my_td" style="width:20%;"><span id="t_2_3"></span></td>
				</tr>
				<tr>
					<td class="my_td" style="width:13%;">燃料类别</td><td class="my_td" style="width:20%;"><span id="t_3_1"></span></td>
					<td class="my_td" style="width:13%;">驱动型式</td><td class="my_td" style="width:20%;"><span id="t_3_2"></span></td>
					<td class="my_td" style="width:13%;">前照灯制</td><td class="my_td" style="width:20%;"><span id="t_3_3"></span></td>
				</tr>
				</table><br/>
				
				<table class="print_tb">
				<tr>
					<td class="my_td">检测项目</td><td class="my_td" colspan="7">检测内容</td><td class="my_td" style="width:80px;">引车员</td>
					<td class="my_td" colspan="2"><span id="t_4_1"></span></td>
				</tr>
				<tr>
					<td class="my_td">前制动</td>
					<td class="my_td" colspan="2">左右轮重(KG)</td>
					<td class="my_td" style="width:80px;">左Max(dan)</td><td class="my_td" style="width:80px;">右Max(dan)</td>
					<td class="my_td" style="width:80px;">和(%)</td><td class="my_td" style="width:80px;">左MM(dan)</td>
					<td class="my_td" style="width:80px;">右MM(dan)</td><td class="my_td" style="width:80px;">差(%)</td>
					<td class="my_td" style="width:80px;">左阻滞(%)</td><td class="my_td" style="width:80px;">右阻滞(%)</td>
				</tr>
				<tr>
					<td class="my_td">检测数据</td>
					<td class="my_td" style="width:80px;"><span id="t_6_1"></span></td><td class="my_td" style="width:80px;"><span id="t_6_2"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_6_3"></span></td><td class="my_td" style="width:80px;"><span id="t_6_4"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_6_5"></span></td><td class="my_td" style="width:80px;"><span id="t_6_6"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_6_7"></span></td><td class="my_td" style="width:80px;"><span id="t_6_8"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_6_9"></span></td><td class="my_td" style="width:80px;"><span id="t_6_10"></span></td>
				</tr>
				<tr>
					<td class="my_td">标准</td>
					<td class="my_td" colspan="4"><span id="t_7_1">/</span></td>
					<td class="my_td" style="width:80px;"><span id="t_7_2">≥60</span></td>
					<td class="my_td" colspan="2"><span id="t_7_3">/</span></td>
					<td class="my_td" style="width:80px;"><span id="t_7_4">≤20</span></td>
					<td class="my_td" style="width:80px;"><span id="t_7_5">≤10</span></td>
					<td class="my_td" style="width:80px;"><span id="t_7_6">≤10</span></td>
				</tr>
				<tr>
					<td class="my_td">评价</td>
					<td class="my_td" colspan="4"><span id="t_8_1">/</span></td>
					<td class="my_td" style="width:80px;"><span id="t_8_2"></span></td>
					<td class="my_td" colspan="2"><span id="t_8_3">/</span></td>
					<td class="my_td" style="width:80px;"><span id="t_8_4">⊙</span></td>
					<td class="my_td" style="width:80px;"><span id="t_8_5">⊙</span></td>
					<td class="my_td" style="width:80px;"><span id="t_8_6">⊙</span></td>
				</tr>
				<tr>
					<td class="my_td">后制动</td>
					<td class="my_td" colspan="2">左右轮重(KG)</td>
					<td class="my_td" style="width:80px;">左Max(dan)</td><td class="my_td" style="width:80px;">右Max(dan)</td>
					<td class="my_td" style="width:80px;">和(%)</td><td class="my_td" style="width:80px;">左MM(dan)</td>
					<td class="my_td" style="width:80px;">右MM(dan)</td><td class="my_td" style="width:80px;">差(%)</td>
					<td class="my_td" style="width:80px;">左阻滞(%)</td><td class="my_td" style="width:80px;">右阻滞(%)</td>
				</tr>
				<tr>
					<td class="my_td">检测数据</td>
					<td class="my_td" style="width:80px;"><span id="t_10_1"></span></td><td class="my_td" style="width:80px;"><span id="t_10_2"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_10_3"></span></td><td class="my_td" style="width:80px;"><span id="t_10_4"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_10_5"></span></td><td class="my_td" style="width:80px;"><span id="t_10_6"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_10_7"></span></td><td class="my_td" style="width:80px;"><span id="t_10_8"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_10_9"></span></td><td class="my_td" style="width:80px;"><span id="t_10_10"></span></td>
				</tr>
				<tr>
					<td class="my_td">标准</td>
					<td class="my_td" colspan="4">/</td>
					<td class="my_td" style="width:80px;">/</td>
					<td class="my_td" colspan="2">/</td>
					<td class="my_td" style="width:80px;">≤24</td>
					<td class="my_td" style="width:80px;">≤10</td><td class="my_td" style="width:80px;">≤10</td>
				</tr>
				<tr>
					<td class="my_td">评价</td>
					<td class="my_td" colspan="4">/</td>
					<td class="my_td" style="width:80px;">/</td>
					<td class="my_td" colspan="2">/</td>
					<td class="my_td" style="width:80px;"><span id="t_12_1"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_12_2"></span></td><td class="my_td" style="width:80px;"><span id="t_12_3"></span></td>
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
					<td class="my_td" colspan="3"><span id="t_14_1"></span></td>
					<td class="my_td" colspan="2"><span id="t_14_2"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_14_3"></span></td>
					<td class="my_td" style="width:80px;"><span id="t_14_4"></span></td><td class="my_td" style="width:80px;"><span id="t_14_5"></span></td>
					<td class="my_td" colspan="2"><span id="t_14_6"></span></td>
				</tr>
				<tr>
					<td class="my_td">标准</td>
					<td class="my_td" colspan="5">/</td>
					<td class="my_td" style="width:80px;">≥60</td>
					<td class="my_td" colspan="2">/</td>
					<td class="my_td" colspan="2">≥20</td>
				</tr>
				<tr>
					<td class="my_td">评价</td>
					<td class="my_td" colspan="5">/</td>
					<td class="my_td" style="width:80px;"><span id="t_16_1"></span></td>
					<td class="my_td" colspan="2">/</td>
					<td class="my_td" colspan="2"><span id="t_16_2"></span></td>
				</tr>
				<tr>
					<td class="my_td">侧滑</td>
					<td class="my_td" colspan="3"><span id="t_17_1"></span></td>
					<td class="my_td" colspan="2">(m/km)</td>
					<td class="my_td" style="width:80px;">标准</td>
					<td class="my_td" style="width:80px;">-5~5(m/km)</td><td class="my_td" style="width:80px;">评价</td>
					<td class="my_td" colspan="2"><span id="t_17_2"></span></td>
				</tr>
				</table>
				
				<table style="width:900px;">
				<tr>
					<td class="x" style="width:99px">前照灯</td><td class="x" style="">灯中心高(mm)</td>
					<td class="x" colspan="2">光强(cd)左</td><td class="x" colspan="3">光强(cd)右</td>
					<td class="x" colspan="2">上下偏(H)左</td><td class="x" colspan="2">上下偏(H)右</td>
					<td class="x" style="">左右偏(H)左</td><td class="x" colspan="2">左右偏(H)右</td>
				</tr>
				<tr>
					<td class="x" style="width:99px">检测数据</td><td class="x" rowspan="3"><span id="t_19_1"></span></td>
					<td class="x" colspan="2"><span id="t_19_2"></span></td><td class="x" colspan="3"><span id="t_19_3"></span></td>
					<td class="x" colspan="2"><span id="t_19_4"></span></td><td class="x" colspan="2"><span id="t_19_5"></span></td>
					<td class="x" style=""><span id="t_19_6"></span></td><td class="x" colspan="2"><span id="t_19_7"></span></td>
				</tr>
				<tr>
					<td class="x" style="width:99px">标准</td>
					<td class="x" colspan="2"><span id="t_20_1"></span></td><td class="x" colspan="3"><span id="t_20_2"></span></td>
					<td class="x" colspan="2"><span id="t_20_3"></span></td><td class="x" colspan="2"><span id="t_20_4"></span></td>
					<td class="x" style=""><span id="t_20_5"></span></td><td class="x" colspan="2"><span id="t_20_6"></span></td>
				</tr>
				<tr>
					<td class="x" style="width:99px">评价</td>
					<td class="x" colspan="2"><span id="t_21_1"></span></td><td class="x" colspan="3"><span id="t_21_2"></span></td>
					<td class="x" colspan="2"><span id="t_21_3"></span></td><td class="x" colspan="2"><span id="t_21_4"></span></td>
					<td class="x" style=""><span id="t_21_5"></span></td><td class="x" colspan="2"><span id="t_21_6"></span></td>
				</tr>
				<tr>
					<td class="x" style="width:99px">近光</td><td class="x" colspan="6"> / </td>
					<td class="x" colspan="2">上下偏(H)左</td><td class="x" colspan="2">上下偏(H)右</td>
					<td class="x" style="">左右偏(H)左</td><td class="x" colspan="2">左右偏(H)右</td>
				</tr>
				<tr>
					<td class="x" style="width:99px">检测数据</td><td class="x" colspan="6"> / </td>
					<td class="x" colspan="2"><span id="t_23_1"></span></td><td class="x" colspan="2"><span id="t_23_2"></span></td>
					<td class="x" style=""><span id="t_23_3"></span></td><td class="x" colspan="2"><span id="t_23_4"></span></td>
				</tr>
				<tr>
					<td class="x" style="width:99px">标准</td><td class="x" colspan="6"> / </td>
					<td class="x" colspan="2"><span id="t_24_1"></span></td><td class="x" colspan="2"><span id="t_24_2"></span></td>
					<td class="x" style=""><span id="t_24_3"></span></td><td class="x" colspan="2"><span id="t_24_4"></span></td>
				</tr>
				<tr>
					<td class="x" style="width:99px">评价</td><td class="x" colspan="6"> / </td>
					<td class="x" colspan="2"><span id="t_25_1"></span></td><td class="x" colspan="2"><span id="t_25_2"></span></td>
					<td class="x" style=""><span id="t_25_3"></span></td><td class="x" colspan="2"><span id="t_25_4"></span></td>
				</tr>
				<tr>
					<td class="x" style="width:99px">喇叭</td><td class="x" colspan="6"><span id="t_26_1"></span></td>
					<td class="x" colspan="2">(dB)</td>
					<td class="x" colspan="2">标准：</td><td class="x" style="">90~115</td>
					<td class="x" style="">评价</td><td class="x" style=""><span id="t_26_2"></span></td>
				</tr>
				<tr>
					<td class="x" style="width:99px">车速</td><td class="x" colspan="6"><span id="t_27_1"></span></td>
					<td class="x" colspan="2">(km/h)</td>
					<td class="x" colspan="2">标准：</td><td class="x" style="">32.8~40</td>
					<td class="x" style="">评价</td><td class="x" style=""><span id="t_27_2"></span></td>
				</tr>
				<tr>
					<td class="x" rowspan="3" style="width:99px">尾气</td><td class="x" style="">光吸收数(m)-1</td>
					<td class="x" style="">1:</td><td class="x" style="">&nbsp; &nbsp;-&nbsp; &nbsp;</td>
					<td class="x" style="">2:</td><td class="x" style=""> &nbsp; &nbsp;-&nbsp; &nbsp; </td>
					<td class="x" style="">3:</td><td class="x" style=""> &nbsp; &nbsp;-&nbsp; &nbsp; </td>
					<td class="x" style="">平均值：</td><td class="x" style=""> &nbsp;&nbsp;-&nbsp;&nbsp; </td>
					<td class="x" style="">标准：</td><td class="x" style="">≤1.39(m)-1</td>
					<td class="x" style="">评价</td><td class="x" style="">-</td>
				</tr>
				<tr>
					<td class="x" style="">HC(ppm)</td>
					<td class="x" colspan="7"> - </td>
					<td class="x" colspan="2">标准：</td>
					<td class="x" style="">≤100(ppm)</td>
					<td class="x" >评价</td><td class="x" > - </td>
				</tr>
				<tr>
					<td class="x" style="">CO(%)</td>
					<td class="x" colspan="7"> - </td>
					<td class="x" colspan="2">标准：</td>
					<td class="x" style="">≤0.3(%)</td>
					<td class="x" >评价</td><td class="x" > - </td>
				</tr>
				<tr>
					<td class="x" rowspan="2" style="height:90px;width:99px">外检<br/>不合格项</td>
					<td class="x" rowspan="2" colspan="11"></td>
					<td class="x" colspan="2"> 评价 </td>
				</tr>
				<tr>
					<td class="x" colspan="2"> - </td>
				</tr>
				<tr>
					<td class="x" style="height:90px" colspan="14"> 评价说明：O合格；X不合格。左MAX表示左轮最大制动力，左MM表示左右轮制动力差最大时左轮制动力，右同 </td>
				</tr>
				<tr>
					<td class="x" style="height:90px" colspan="14"> 备注：排放应用标准：GB3847-2005《车用压燃式发动机和压燃式发动机汽车排放烟度限值及测量方法》；<br/>
					GB18285-2005《点燃式发动机汽车排气污染物排放限值及测量方法（双怠速法及简易工况法）》<br/>
					车速、轴重、制动、灯光、声级、侧滑引用标准：GB7258-2012《机动车运行安全技术条件》 </td>
				</tr>
				<tr>
					<td class="x" style="height:80px" colspan="7"> 整车评价说明：O为合格；X为不合格。 </td>
					<td class="x" style="height:80px" colspan="4"> 整车评价 </td>
					<td class="x" style="height:80px" colspan="3"><span id="t_34_1"></span></td>
				</tr>
				<tr>
					<td class="x" style="height:40px;text-align:left;" colspan="14"> &nbsp;&nbsp;检测单位：比亚迪汽车工业有限公司 </td>
				</tr>
				</table>
				<br/>
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
		<input id="btnPrint2" type="button" class="btn btn-sm btn-primary" value="打印" style="margin-left: 420px;"></input>
		</div>
	</div>
	</body>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/quality/testingDateReportPrint.js"></script>
</html>
