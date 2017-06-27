<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>订单评审</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery.gritter.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<jsp:include page="../top.jsp" flush="true" />
	<!-- 身 -->
	<div class="main-container" id="main-container">
		<!-- 左边菜单 -->
		<jsp:include page="../left.jsp" flush="true" />
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
			<div class="breadcrumbs ace-save-state" id="breadcrumbs">
				<ul class="breadcrumb">
					<li><i class="ace-icon fa fa-home home-icon"></i><a
						href="<%=request.getContextPath()%>/index">首页</a></li>
					<li class="active">订单评审</li>
				</ul>
				<!-- /.breadcrumb -->

				<div class="nav-search" id="nav-search">
					<form class="form-search">
						<span class="input-icon"> <input type="text"
							placeholder="Search ..." class="nav-search-input"
							id="nav-search-input" autocomplete="off" /><i
							class="ace-icon fa fa-search nav-search-icon"></i>
						</span>
					</form>
				</div>
				<!-- /.nav-search -->
			</div>

			<div class="page-content">
				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>订单编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入订单编号..." value=""
								id="search_order_no" /></td>
							<td>评审状态：</td>
							
							<td><select id="search_review_status" class="input-medium revise">
								<option value=''>全部</option>
								<option value='0'>未评审</option>
								<option value='1'>评审中</option>
								<option value='2'>已评审</option>
								</select>
							</td>
							<td>生产年份：</td>
							<td>
								<input class="input-small"  style="height: 30px;" id="search_productive_year" onclick="WdatePicker({el:'search_productive_year',dateFmt:'yyyy'});" type="text">
							</td>
							<td>生产工厂：</td>
							<td><select name="" id="search_factory" class="input-small">
							</select>
							 	<script id="tmplBusTypeSelect" type="text/x-jsrander">
                                    <option value='{{:id}}'>{{:code}}</option>
                                </script>
							</td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
						</tr>
					</table>
				</div>

				<div class="row"  >
					<div class="col-xs-12"  style="width:100%">
						<table id="tableOrder" class="table table-striped table-bordered table-hover" style="font-size: 12px;" >
						</table>
					</div>
				</div>
				<div id="dialog-edit" class="hide">
					<table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
					            style="font-size: 14px;width:800px" role="grid" aria-describedby="tableData_info">
						 <tr role="row" class="odd">
				            <th class="sorting_disabled center" rowspan="1" colspan=7 style="width: 96px;">十九事业部订单评审评估表</th>
						 </tr>
						 <tr role="row" class="odd">
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">客户</th>
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">车型</th>
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">生产数量</th>
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">生产工厂</th>
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">订单类型</th>
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">交付日期</th>
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">产能/天</th>
						 </tr>
						 <tr role="row" class="odd">
						    <td id="custom" ></td>
						    <td id="busType" ></td>
						    <td id="productionQty"></td>
						    <td id="factoryName"></td>
				            <td id="order_type"></td>
							<td id="delveryDate"></td>
							<td id=""></td>
						</tr>
						 <tr role="row" class="odd">
						    <th class="sorting_disabled center" rowspan="2" style="width: 96px;">订单启动节点</th>
				            <th class="sorting_disabled center" rowspan="1" style="width: 96px;">部件上线</th>
							<th class="sorting_disabled center" rowspan="1" style="width: 96px;">焊装上线</th>
							<th class="sorting_disabled center" rowspan="1" style="width: 96px;">涂装上线</th>
							<th class="sorting_disabled center" rowspan="1" style="width: 96px;">底盘上线</th>
							<th class="sorting_disabled center" rowspan="1" style="width: 96px;">总装上线</th>
							<th class="sorting_disabled center" rowspan="1" style="width: 96px;">全部入库</th>
						</tr>
						<tr>
							<td id="partsonlineDate"></td>
							<td id="weldingonlineDate"></td>
							<td id="paintonlineDate"></td>
							<td id="chassisonlineDate"></td>
							<td id="assemblyonlineDate"></td>
							<td id="warehousingDate"></td>
						</tr>
					    <tr>
					        <th class="sorting_disabled center" rowspan="2" style="width: 96px;">资料需求节点</th>
						    <th class="sorting_disabled center" style="width: 96px;">&nbsp;数模输出时间</th>
							<th class="sorting_disabled center" style="width: 96px;">下料明细</th>
							<th class="sorting_disabled center" style="width: 96px;">BOM</th>
							<th class="sorting_disabled center" style="width: 96px;">图纸输出时间</th>
							<th class="sorting_disabled center" style="width: 96px;">SOP</th>
							<th class="sorting_disabled center" style="width: 96px;">SIP</th>
						</tr>
						<tr role="row" class="odd">
						    <td id="modelexportDate" ></td>
						    <td id="detaildemandNode"></td>
						    <td id="bomdemandNode"></td>
				            <td id="drawingexportDate"></td>
							<td id="sopdemandNode"></td>
							<td id="sipdemandNode"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" rowspan="4" style="width: 96px;">技术部</th>
						    <th class="sorting_disabled center" rowspan="4" style="width: 96px;">技术资料完善及可行性</th>
							<th class="sorting_disabled center" style="width: 96px;">配置表</th>
							<th class="sorting_disabled center" style="width: 96px;">型材清单</th>
							<th class="sorting_disabled center" style="width: 96px;">数模评审</th>
							<th class="sorting_disabled center" style="width: 96px;">图纸受控前评审</th>
							<th class="sorting_disabled center" style="width: 96px;">采购明细</th>
						</tr>
						<tr>
						    <td id="configTable"></td>
						    <td id="proximatematter"></td>
				            <td id="modeljudging"></td>
							<td id="drawingearlierjudging"></td>
							<td id="purchasedetail"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" style="width: 96px;">资料需求节点</th>
						    <td id="technicaldatanode"></td>
				            <th class="sorting_disabled center" style="width: 96px;">其他</th>
							<td colspan=2 id="mintechInfo"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" style="width: 96px;">签字</th>
						    <td id="technical_operator"></td>
				            <th class="sorting_disabled center" style="width: 96px;">日期</th>
							<td colspan=2 id="technical_create_time"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" rowspan="2" style="width: 96px;">工艺部</th>
						    <th class="sorting_disabled center" rowspan="2" style="width: 96px;">是否有新增工装、模具、工艺等</th>
							<th class="sorting_disabled center" style="width: 96px;">资料需求节点</th>
							<td id="technicsNode"></td>
							<th class="sorting_disabled center" style="width: 96px;">其他</th>
							<td colspan=2 id="technicsInfo"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" style="width: 96px;">签字</th>
						    <td id="technology_operator"></td>
				            <th class="sorting_disabled center" style="width: 96px;">日期</th>
							<td colspan=2 id="technology_create_time"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">品质部</th>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">首车生产是否有指导文件</th>
							<th class="sorting_disabled center" style="width: 96px;">资料需求节点</th>
							<td id="qualityNode"></td>
							<th class="sorting_disabled center" style="width: 96px;">其他</th>
							<td colspan=2 id="qualityInfo"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" style="width: 96px;">签字</th>
						    <td id="quality_operator"></td>
				            <th class="sorting_disabled center" style="width: 96px;">日期</th>
							<td colspan=2 id="quality_create_time"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">工厂内部</th>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">人员、场地、设备等</th>
							<th class="sorting_disabled center" style="width: 96px;">资料需求节点</th>
							<td id="factoryNode"></td>
							<th class="sorting_disabled center" style="width: 96px;">其他</th>
							<td colspan=2 id="factoryInfo"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" style="width: 96px;">签字</th>
						    <td id="factory_operator"></td>
				            <th class="sorting_disabled center" style="width: 96px;">日期</th>
							<td colspan=2 id="factory_create_time"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">综合计划部物控</th>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">物料风险</th>
							<th class="sorting_disabled center" style="width: 96px;">资料需求节点</th>
							<td id="materialcontrolNode"></td>
							<th class="sorting_disabled center" style="width: 96px;">其他</th>
							<td colspan=2 id="materialcontrolInfo"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" style="width: 96px;">签字</th>
						    <td id="planning_operator"></td>
				            <th class="sorting_disabled center" style="width: 96px;">日期</th>
							<td colspan=2 id="planning_create_time"></td>
						</tr>
						
						<tr>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">综合计划部计划</th>
						    <th class="sorting_disabled center" rowspan=2 style="width: 96px;">计划风险</th>
							<th class="sorting_disabled center" style="width: 96px;">资料需求节点</th>
							<td id="plandepNode"></td>
							<th class="sorting_disabled center" style="width: 96px;">其他</th>
							<td colspan=2 id="plandepInfo"></td>
						</tr>
						<tr>
						    <th class="sorting_disabled center" style="width: 96px;">签字</th>
						    <td id="plandep_operator"></td>
				            <th class="sorting_disabled center" style="width: 96px;">日期</th>
							<td colspan=2 id="plandep_create_time"></td>
						</tr>
						<tr role="row" class="odd">
					    	<th class="sorting_disabled center" style="width: 96px;" rowspan=4>评审结果修正</th>
						    <th class="sorting_disabled center" style="width: 96px;" rowspan=2>订单启动节点</th>
				            <th class="sorting_disabled center" style="width: 96px;">部件上线</th>
							<th class="sorting_disabled center" style="width: 96px;">焊装上线</th>
							<th class="sorting_disabled center" style="width: 96px;">涂装上线</th>
							<th class="sorting_disabled center" style="width: 96px;">底盘上线</th>
							<th class="sorting_disabled center" style="width: 96px;">总装上线</th>
							
						</tr>
						<tr>
							<td id="revisionpartsonlineDate"></td>
							<td id="revisionweldingonlineDate"></td>
							<td id="revisionpaintonlineDate"></td>
							<td id="revisionchassisonlineDate"></td>
							<td id="revisionassemblyonlineDate"></td>
							
						</tr>
					    <tr>
					        <th class="sorting_disabled center" style="width: 96px;" rowspan=2>修正资料需求节点</th>
							<th class="sorting_disabled center" style="width: 96px;">全部入库</th>
							<th class="sorting_disabled center" style="width: 96px;">下料明细</th>
							<th class="sorting_disabled center" style="width: 96px;">BOM</th>
							<th class="sorting_disabled center" style="width: 96px;">SOP</th>
							<th class="sorting_disabled center" style="width: 96px;">SIP</th>
						</tr>
						<tr role="row" class="odd">
						    <td id="revisionwarehousingDate"></td>
						    <td id="revisiondetailNode"></td>
						    <td id="revisionbomNode"></td>
							<td id="revisionsopNode"></td>
							<td id="revisionsipNode"></td>
						</tr>
					</table>
				</div>
            </div>
		</div>
	</div>	
		<!-- /.main-container -->
	</div>
	<script src="<%=basePath%>/js/datePicker/WdatePicker.js"></script>
	<script src="<%=basePath%>/assets/js/jquery-ui.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.gritter.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.dataTables.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="<%=basePath%>/assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="<%=basePath%>/assets/js/dataTables.rowGroup.js"></script>
	<script src="<%=basePath%>/assets/js/ace/elements.onpage-help.js"></script>
	<script src="<%=basePath%>/assets/js/ace/ace.onpage-help.js"></script>
	<script src="<%=basePath%>/assets/js/bootstrap3-typeahead.js"></script>
	<script src="<%=basePath%>/js/jsrender.min.js"></script>
	<script src="<%=basePath%>/js/common.js"></script>
	<script src="<%=basePath%>/js/order/internalReview.js"></script>
</body>

</html>
