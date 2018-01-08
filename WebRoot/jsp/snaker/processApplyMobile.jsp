<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css">
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../css/common.css">
<style type="text/css" media="screen">
/* .myselect {
	border: 0px none;
	-moz-appearance: none;
	-webkit-appearance: none;
	font-size: 100%;
	margin-bottom: 3px;
	color: #555;
	background-color: #f5f5f5;
	width: 56px;
	padding: 0px;
	height: 27px;
	cursor: pointer;
	margin-left: -8px;
}

.header {
	padding-left: 12px;
	margin-top: 10px;
	margin-bottom: 0px;
	border-bottom: none;
} */
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
						<li><a href="#">流程列表</a></li>
					</ul>
				</div>

				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;overflow-y:auto;padding-left: 0px;padding-right:12px;">
					<input type="hidden" id="urlPath" value="<%=request.getContextPath()%>/">
					<div id="list">
					</div>
				</div>
			<!-- /.main-container -->
		</div>
		
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
	    <script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script type="text/javascript">
			jQuery(function($) {
				$.ajax({
			        type: "post",
			        url: "../process/processList",
			        data: {
			        },  //传入组装的参数
			        dataType: "json",
			        success: function (result) {
			        	var str="";
			        	$.each(result.data,function(index,value){
			         	   str+="<div style='text-align:center;cursor:pointer;height:45px;width:160px;margin:20px;padding-top:5px;border:1px solid #ffffff;background-color:#ddddff;border-radius:10px; line-height:35px'" +
			         	   		"onclick=openWin('"+value.instance_Url+"','"+value.id+"','"+value.name+"')>"+value.display_Name+"</div>"
			            });
			            $("#list").html(str);
			        }
			    });
			});
			function openWin(url,processId,processName){
				var param="?processId="+processId+"&processName="+processName;
				var path=$("#urlPath").val()+url.substring(1)+param;
				window.location.href=path;
			}
		</script>
</div>
</body>
</html>