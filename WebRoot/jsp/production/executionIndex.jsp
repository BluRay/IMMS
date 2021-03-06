<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>车间工序</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<link rel="stylesheet" href="../css/bootstrap.3.2.css">	
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css">
<style type="text/css" media="screen">
	.myselect {
		border: 0px none;
		-moz-appearance:none;
		-webkit-appearance:none;
		font-size: 100%;
		margin-bottom: 3px;
		color: #555;
		background-color:#f5f5f5;
		width: 56px;
		padding: 0px;
		height:27px;
		cursor: pointer;
		margin-left: -8px;
		}
	</style>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<!-- 身 -->
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<!-- 左边菜单 -->
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
				<div class="breadcrumbs ace-save-state"  style="height: 45px;" id="breadcrumbs">
					<ul class="breadcrumb">
						<li class="active">
						<select name="" id="search_factory" class="myselect">
						</select>
						</li>
						<li class="active">
						<select name="" id="search_workshop" class="myselect">
						</select>
						</li>
					</ul>
					<!-- /.breadcrumb -->

					<!-- /.nav-search -->
				</div>

				<div class="page-content">
					<div class="row">
					<div class="col-xs-12">
						<div style="margin-left: 30px;">
				 		<canvas id="first_canvas" width=1100 height=80 style="border: solid 0px;"> 
					
						</canvas> 
					</div>
					</div>
					</div>
				</div>

			</div>
			<!-- /.main-container -->
		</div>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/production/executionIndex.js"></script>
</body>

</html>
