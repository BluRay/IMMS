<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>技改跟进</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow: hidden;">
			<div class="main-content">			
			
				<div class="page-content-area">
					<div id="form" class="well form-search">
						<table>
							<tr>
								<td>工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:120px"></select></td>
								<td>&nbsp;生产车间：</td>
								<td><select id="search_workshop" class="input-small" style="height: 30px;width:110px"></select></td>
								<td>&nbsp;订单：</td>
								<td><input id="search_order_no" placeholder="请输入订单编号..." style="height: 30px;width:110px" type="text"></td>
								<td>&nbsp;技改单编号：</td>
								<td><input id="search_tech_order_no" placeholder="技改单编号..." style="height: 30px;width:110px" type="text"></td>
								<td>&nbsp;任务内容：</td>
								<td><input id="search_tech_task_content" placeholder="技改任务..." style="height: 30px;width:110px" type="text"></td>
							</tr>
							<tr>
								<td>状态：</td>
								<td>
									<select class="input-small" id="status" style="height: 30px;width:120px">
										<option value="全部">全部</option>
										<option value="已创建" selected>已创建</option>
										<option value="已分配">已分配</option>
										<option value="已评估">已评估</option>
										<option value="已完成">已完成</option>
									</select>
								</td>
								<td>&nbsp;技改单日期：</td>
								<td colspan=3><input id="search_date_start" placeholder="开始时间..." style="height: 30px;width:110px" type="text" onClick="WdatePicker({el:'search_date_start',dateFmt:'yyyy-MM-dd'});"> - <input id="search_date_end" placeholder="结束时间..." style="height: 30px;width:110px" type="text" onClick="WdatePicker({el:'search_date_end',dateFmt:'yyyy-MM-dd'});"></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></input></td>
							</tr>
						</table>
					</div>

					<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
					</table>
					
					</div>
					
					<div id="selectBusNumberModal" class="hide" style="align:center;height:500px">
						车号流水：<input type="text" class="input-medium revise" placeholder="车号流水开始..."  id="bus_num_start" >
				       	~<input type="text" class="input-medium revise" placeholder="车号流水结束..."  id="bus_num_end" >
				       	<input class="btn btn-sm btn-danger" id="btnBuslist" value="指定车号" style="margin-left: 2px;" type="button">
				       	<input type="button" class="btn btn-sm btn-primary" id="btn_single_bus_num_query" value="查询"></input>
				       	
				       	<table id="selectBusNumber_table" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
							<thead>
				                <tr>
				                	<th style="width: 50px;text-align: center;"><input type="checkbox" id="selectBusNumber_checkall" class="checkall"></th>
				                	<th style="text-align:center;" width="60px">序号</th>
				                	<th style="text-align:center;">车号</th>
				                    <th style="text-align:center;">生产工厂</th>
				                    <th style="text-align:center;">当前工序</th>
				                    <th style="text-align:center;">确认人</th>
				                    <th style="text-align:center;">确认时间</th>
				                </tr>
				            </thead>
				            <tbody id="selectBusNumber_table_tbody">
				                
				            </tbody>
				        </table>
				    	<input type="hidden" id="select_tech_task_id" /> 
				    	<input type="hidden" id="select_factory" /> 
				    	<input type="hidden" id="select_workshop" />
				    	<input type="hidden" id="select_order_no" />
				    	<input type="hidden" id="task_detail_id" />

					</div>
					
					<div id="selectBusNumberModal1" class="hide" style="align:center;width:700px;height:500px">
						产量：<input type="text" class="input-medium revise" placeholder="" id="follow_num" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;"></input>
				       	<input type="button" class="btn btn-sm btn-primary" id="btn_follow_num_confirm" value="保存" style="margin-left: 2px;margin-bottom: 2px;"></input>
						<table id="selectBusNumber_table1" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
							<thead>
				                <tr>
				                	<th style="text-align:center;width:80px"><input type="checkbox" id="selectBusNumber_checkall1" class="checkall"></th>
				                	<th style="text-align:center;">产量</th>
				                    <th style="text-align:center;">维护人</th>
				                    <th style="text-align:center;">维护时间</th>
				                </tr>
				            </thead>
				            <tbody id="selectBusNumber_table_tbody1">
				                
				            </tbody>
				        </table>
				    	<input type="hidden" id="select_tech_task_id1" /> 
				    	<input type="hidden" id="select_factory1" /> 
				    	<input type="hidden" id="select_workshop1" />
				    	<input type="hidden" id="select_order_no1" />
				    	<input type="hidden" id="total_num1" />
				    	<input type="hidden" id="task_detail_id1" />
					</div>
					
					<div id="selectBusNumberModal_view1" class="hide" style="align:center;width:700px;height:500px">
						<table id="selectBusNumber_table_view1" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
							<thead>
				                <tr>
				                    <th style="text-align:center;width:80px"><input type="checkbox" id="selectBusNumber_checkall2" class="checkall"></th>
				                	<th style="text-align:center;">产量</th>
				                    <th style="text-align:center;">维护人</th>
				                    <th style="text-align:center;">维护时间</th>
				                </tr>
				            </thead>
				            <tbody id="selectBusNumber_table_tbody_view1">
				                
				            </tbody>
				        </table>
				    	<input type="hidden" id="select_tech_task_id_view1" /> 
				    	<input type="hidden" id="select_factory_view1" /> 
				    	<input type="hidden" id="select_workshop_view1" />
				    	<input type="hidden" id="select_order_no_view1" />
					</div>
					
					<div id="selectBusNumberModal_view" class="hide" style="align:center;width:900px;height:500px">
					车号流水：<input type="text" class="input-medium revise" placeholder="车号流水开始..."  id="bus_num_start_view" >
			       	~<input type="text" class="input-medium revise" placeholder="车号流水结束..."  id="bus_num_end_view" >
			       	<input type="button" class="btn btn-sm btn-primary" id="btn_single_bus_num_query_view" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
			       	
			       	<table id="selectBusNumber_table_view" style="table-layout:fixed;font-size:12px;width:850px" class="table table-bordered table-striped">
						<thead>
			                <tr>
			                	<th style="text-align:center;" width="60px">序号</th>
			                	<th style="text-align:center;">车号</th>
			                    <th style="text-align:center;">生产工厂</th>
			                    <th style="text-align:center;">当前工序</th>
			                    <th style="text-align:center;">确认人</th>
			                    <th style="text-align:center;">确认时间</th>
			                </tr>
			            </thead>
			            <tbody id="selectBusNumber_table_tbody_view">
			                
			            </tbody>
			        </table>
			    	<input type="hidden" id="select_tech_task_id_view" /> 
			    	<input type="hidden" id="select_factory_view" /> 
			    	<input type="hidden" id="select_workshop_view" />
			    	<input type="hidden" id="select_order_no_view" />
					
					</div>
					
					<div id="dialog-config" class="hide">
						<form id="  " class="form-horizontal">
							<div class="form-group">
								<label class="col-sm-2 control-label no-padding-right no-padding-right" for="vin">车号：</label>
								<div class="col-sm-9">
									<textarea rows="6" id="search_bus_number" style="width:300px" placeholder="每行输入一个车号后回车！"></textarea>
								</div>
							</div>
						</form>
					</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script type="text/javascript" src="../js/tech/followingUpPage.js"></script>
</html>
