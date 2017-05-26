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
		<title>技改物料确认</title>
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
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
			<div class="page-content">
				<div id="bodyright" class="offset2">
					<legend style="margin: 0 auto;">技改物料确认</legend>
				</div>
				<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">技改任务：</td><td style="width:250px"><input type="text" style="width:250px" disabled="disabled" id="task_content" class="input-small" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">技改单编号：</td><td style="width:250px"><input type="text" style="width:250px" disabled="disabled" id="tech_order_no" class="input-small" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">切换方式：</td>
						<td>
							<input checked name="switch_mode" value="全部切换" id="type1" type="radio"><span>全部切换&nbsp;&nbsp;</span>
							<input name="switch_mode" value="节点前切换" id="type2" type="radio"><span>节点前切换&nbsp;&nbsp;</span>
							<input name="switch_mode" value="节点后切换" id="type3" type="radio"><span>节点后切换&nbsp;&nbsp;</span>
						</td>
					</tr>
					<tr id="tr_switch_node" style="display:none;height:40px">
						<td align="right" style="width:100px">切换节点：</td>
						<td style="width:250px">
							<select id="switch_node" class="input-medium">
								<option value='焊装'>焊装</option>
								<option value='玻璃钢'>玻璃钢</option>
								<option value='涂装'>涂装</option>
								<option value='底盘'>底盘</option>
								<option value='总装'>总装</option>
								<option value='检测线'>检测线</option>
							</select>
						</td>
					</tr>
					</table>
					<label class="control-label" for=""><b>&nbsp;&nbsp;&nbsp;&nbsp;实施范围：</b>
						<ul class="nav nav-tabs" id="new_tab" role="tablist" style="height: 51px;margin-left:17px;border-color:#f3f3f3">
							<li class="active"><a href="#new_task1" data-toggle="tab" style="font-size: 14px; color: #333">订单1</a></li>
							<li><a href="#new_task1" data-toggle="tab" style="font-size: 14px; color: #333">订单2</a></li>
						</ul>
					</label>
					<table id="RangeTable" class="table table-bordered table-striped" style="text-align: center;margin-left:17px; font-size: 12px;width:96%;max-width:96%;margin-top:-21px">
						<thead>
							<tr>
							<th>车间</th><th>自制件</th><th>部件</th><th>焊装</th>
							<th>玻璃钢</th><th>涂装</th><th>底盘</th><th>总装</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							<td>技改台数</td><td id="tech_zzj"></td><td id="tech_bj"></td><td id="tech_hz"></td>
							<td id="tech_blg"></td><td id="tech_tz"></td><td id="tech_dp"></td><td id="tech_zz"></td>
							</tr>
							<tr>
							<td>完成台数</td><td id="finish_zzj"></td><td id="finish_bj"></td><td id="finish_hz"></td>
							<td id="finish_blg"></td><td id="finish_tz"></td><td id="finish_dp"></td><td id="finish_zz"></td>
							</tr>
							<tr>
							<td>技改工时</td><td id="time_zzj"></td><td id="time_bj"></td><td id="time_hz"></td>
							<td id="time_blg"></td><td id="time_tz"></td><td id="time_dp"></td><td id="time_zz"></td>
							</tr>
						</tbody>
					</table>
					<table id="MaterielInfoTable" class="table table-bordered table-striped" style="text-align: center;margin-left:17px; font-size: 12px;width:96%;max-width:96%">
						<thead>
							<tr>
							<th style="vertical-align:middle"><input type="checkbox" onclick="selectAll()" id="selectAll"></th>
							<th style="vertical-align:middle">SAP料号</th>
							<th style="vertical-align:middle">物料描述</th>
							<th style="vertical-align:middle">物料类型</th>
							<th style="vertical-align:middle">材料/规格</th>
							<th style="vertical-align:middle">单位</th>
							<th style="vertical-align:middle">供应商<br>代码</th>
							<th style="vertical-align:middle">单车损耗<br>（%）</th>
							<th style="vertical-align:middle">层级用量</th>
							<th style="vertical-align:middle">单重</th>
							<th style="vertical-align:middle">单车用量<br>含损耗</th>
							<th style="vertical-align:middle">使用车间</th>
							<th style="vertical-align:middle">工序</th>
							<th style="vertical-align:middle">装备位置</th>
							<th style="vertical-align:middle">备注</th>
							<th style="vertical-align:middle">确认人</th>
							<th style="vertical-align:middle">确认时间</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				<center>
				<input type="button" class="btn btn-primary" id="btnCheck" value="确认" style="margin-left: 2px;"></input>
				</center>
				<input id="check_id"  type="text" style="display: none;width:410px;height:18px"></input>
				
				
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/tech/techTaskMaterialCheckPage.js"></script>
</html>
