<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();
String staff_number = (String)session.getAttribute("staff_number");
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
String display_name = (String)session.getAttribute("display_name");
/* if(rqip!=request.getServerName()){
	basePath=rqip+"/";
} */
%>
<head>
<link rel="stylesheet" href="/BMS/assets/css/bootstrap.min.css" />
<link rel="stylesheet" href="/BMS/assets/css/font-awesome.min.css" />
<!-- text fonts -->
<link rel="stylesheet" href="/BMS/assets/css/ace-fonts.css" />
<!-- ace styles -->
<link rel="stylesheet" href="/BMS/assets/css/ace.min.css" id="main-ace-style" />
<link rel="stylesheet" href="/BMS/assets/css/ace-skins.min.css" />
<link rel="stylesheet" href="/BMS/assets/css/ace-rtl.min.css" />

<script src="<%=basePath%>/assets/js/jquery.min.js"></script>
<script src="<%=basePath%>/assets/js/jquery-ui.min.js"></script>
<script src="<%=basePath%>/assets/js/jquery.mobile.custom.min.js"></script>
<script src="<%=basePath%>/assets/js/ace-extra.min.js"></script>
<script src="<%=basePath%>/assets/js/bootstrap.min.js"></script>
<!-- page specific plugin scripts -->
<!-- ace scripts -->
<script src="<%=basePath%>/assets/js/ace-elements.min.js"></script>
<script src="<%=basePath%>/assets/js/ace.min.js"></script>
<style>
	.ui-dialog .ui-dialog-titlebar {
	    position: relative;
	}
</style>
</head>

