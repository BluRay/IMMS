
<!-- <!DOCTYPE html> -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>历史任务</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
<!-- 		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" /> -->
		<link rel="stylesheet" href="${ctx}/snaker/css/style.css" type="text/css" media="all" />
<%-- 		<link rel="stylesheet" href="${ctx}/snaker/css/snaker.css" type="text/css" media="all" /> --%>
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
					<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
					<li>流程管理</li>
					<li class="active">流程实例</li>
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
				<table class="table table-striped table-bordered table-hover" style="overflow-x:auto;font-size: 12px;">
			    <tr style="text-align:center;font-weight:bold">
					<td align="center" colspan=2>
						流程信息
					</td>
				</tr>
				<tr>
					<td align="left" class="td_list_2" style="font-weight: bold">
						流程名称：<font color="red">${order.processName }</font>&nbsp;&nbsp;
						流程编号：<font color="red">${order.orderNo }</font>&nbsp;&nbsp;
						流程创建时间：<font color="red">${order.createTime }</font>
					</td>
			        <td align="right" style="padding-right:20px">
			            <a href="" onclick="history.back()">打印</a>&nbsp;
						<a href="" onclick="history.back()">返回</a>
					</td>
			    </tr>
		</table>
		<table class="table table-striped table-bordered table-hover" style="overflow-x:auto;font-size: 12px;">
			<thead>
			   <tr style="text-align:center;font-weight:bold">
				<td>
					任务名称
				</td>
				<td>
					完成时间
				</td>
				<td>
					审批结果
				</td>
				<td>
					审批意见
				</td>
				<td>
					任务处理人
				</td>
			</tr>
			</thead>
			<c:forEach items="${tasks}" var="item">
				<tr style="text-align:center;">
					<td>
						${item.display_Name}&nbsp;
					</td>
					<td>
						${item.finish_Time}&nbsp;
					</td>
					<td>
						${item.result=='0' ? '同意' : (item.result=='1' ? '驳回' :'' )}&nbsp;
					</td>
					<td>
						${item.description }&nbsp;
					</td>
					<td>
						${item.operator }&nbsp;
					</td>
				</tr>
			</c:forEach>
		</table>
		
<!-- 		<table class="properties_all" align="center" border="1" cellpadding="0" cellspacing="0" style="margin-top: 0px"> -->
<!-- 			<div id="snakerflow" style="border: 1px solid #d2dde2; margin-top:10px; margin-left:10px; width:98%;"> -->
<!-- 			</div> -->
<!-- 		</table> -->
		
				</div>
			</div><!-- /.main-content -->
			
			</div>
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
    <script src="../../assets/js/jquery-ui.min.js"></script>
	<script src="../../js/jsrender.min.js"></script>
	<script src="../../js/common.js"></script>
	<script src="../../js/browser.js"></script>
	<script src="${ctx}/assets/js/jquery-ui.min.js"></script>
	<script src="${ctx}/assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="${ctx}/assets/js/jquery.dataTables.min.js"></script>
	<script src="${ctx}/assets/js/jquery.dataTables.bootstrap.js"></script>
<!--     <script src="../../assets/js/ace-elements.min.js"></script> -->
    <script src="${ctx}/snaker/raphael-min.js" type="text/javascript"></script>
	<script src="${ctx}/snaker/snaker.designer.js" type="text/javascript"></script>
	<script src="${ctx}/snaker/snaker.model.js" type="text/javascript"></script>
<%-- 	<script src="${ctx}/js/flow/processView.js" type="text/javascript" ></script> --%>
	<script type="text/javascript">
	    var data=JSON.parse('${tasks}');//eval("${tasks}"); //eval('${tasks}');
		if($.fn.dataTable.isDataTable("#tableData")){
			$('#tableData').DataTable().destroy();
			$('#tableData').empty();
		}
		$("#tableData").dataTable({
			serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
			destroy: true,sScrollX:true,orderMulti:false,
			pagingType:"full_numbers",
			lengthChange:false,
			orderMulti:false,
			
			data:data,
			columns: [
	          	{"title":"任务名称 ","class":"center","data":"display_Name","defaultContent": ""},
	            {"title":"完成时间 ","class":"center","data":"end_Time","defaultContent": ""},
	            {"title":"期望完成时间","class":"center","data":"expire_Time","defaultContent": ""},
	            {"title":"流程创建人 ","class":"center","data":"create_Time","defaultContent": ""},
	            {"title":"审批结果","class":"center","data":"create_Time","defaultContent": "","render":function(data,type,row){
	            	var result=(data==0 ? '同意' : '不同意');
	            	return result;
	            }},
	            {"title":"操作人 ","class":"center","data":"operator","defaultContent": ""},
	        ],
		});
	</script>
</html>
