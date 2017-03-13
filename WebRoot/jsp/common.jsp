<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>

<link rel="stylesheet" href="../assets/css/bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/font-awesome.min.css" />
<link rel="stylesheet" href="../assets/css/ace-fonts.css" />
<link rel="stylesheet" href="../assets/css/ace.min.css" id="main-ace-style" />
<link rel="stylesheet" href="../assets/css/ace-skins.min.css" />
<link rel="stylesheet" href="../assets/css/ace-rtl.min.css" />
<script src="../assets/js/ace-extra.min.js"></script>