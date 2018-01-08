<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<html lang="zh-CN">
	<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="utf-8" />
	<title>流程审批</title>
	<meta name="description" content="Common Buttons &amp; Icons" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/bootstrap.min.css" />
	</head>

	<body>
	    <div style="border:1px;overflow:auto;height:300px">
		    <c:forEach items="${vars}" var="item">
				<table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
				     style="font-size: 14px;" role="grid" aria-describedby="tableData_info">
					<tr class="odd">
			            <td>申请人：</td>
						<td>${item['user_name'] }</td>
						<td>申请部门：</td>
						<td>${item['department'] }</td>
						<td>申请日期：</td>
						<td>${item['apply_date'] }</td>
						<td>采购类型：</td>
						<td>${item['purchase_type'] }</td>
					</tr>
					<tr>
						<td>&nbsp;项目类型：</td>
						<td>${item['apply_type'] }</td>
						<td>&nbsp;物料编号：</td>
						<td>${item['material_code'] }</td>
						<td>&nbsp;物料名称：</td>
						<td>${item['material_name'] }</td>
						<td>&nbsp;规格/型号：</td>
						<td>${item['specification'] }</td>
					</tr>
					<tr>
						<td>&nbsp;采购项目负责人：</td>
						<td>${item['purchase_leader'] }</td>
						<td>&nbsp;成本中心：</td>
						<td>${item['cost_center'] }</td>
						<td>&nbsp;成本会计：</td>
						<td>${item['accountant'] }</td>
						<td>&nbsp;要求到位时间：</td>
						<td>${item['require_date'] }</td>
					</tr>
					<tr>
						<td>使用地区：</td>
						<td>${item['useage_place'] }</td>
						<td>&nbsp;采购数量：</td>
						<td>${item['quntity'] }</td>
						<td>&nbsp;BOM：</td>
						<td>${item['bomdemandNode'] }</td>
						<td>&nbsp;附件：</td>
						<td></td>
					</tr>
					<tr>
						<td>技术要求：</td>
						<td colspan='3'>${item['techcical_require'] }</td>
						<td>申请理由：</td>
						<td colspan='3'>${item['apply_reason'] }</td>
					</tr>
					<tr>
						<td>其他：</td>
						<td colspan='7'>${item['remark'] }</td>
					</tr>
				</table>
			</c:forEach>
			<c:forEach items="${approvalData}" var="item">
			    <table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
				     style="font-size: 14px;" role="grid" aria-describedby="tableData_info">
					<tr class="even">
					    <td>审批节点：</td>
						<td>${item['display_name'] }</td>
						<td>审批意见：</td>
						<td colspan='3'>${item['description'] }</td>
					</tr>
					<tr class="odd">
					    <td>审批人：</td>
						<td>${item['operator'] }</td>
						<td>申请结果：</td>
						<td>${item['result']=='0' ? '同意' : '不同意' }</td>
						<td>申请时间：</td>
						<td>${item['operate_time'] }</td>
					</tr>
				</table>
			</c:forEach>
		</div>
		<form id="inputForm" action="${ctx }/materialPurchase/doApproval" method="post" target="mainFrame">
			<input type="hidden" name="processId" id="processId" value="${processId }" />
			<input type="hidden" name="orderId" id="orderId" value="${orderId }" />
			<input type="hidden" name="taskId" id="taskId" value="${taskId }" />
			<input type="hidden" name="taskName" id="taskName" value="${taskName }" />
			<input type="hidden" name="displayName" id="displayName" value="${displayName }" />
			<input type="hidden" id="divisionId"  value="${divisionId}" />
			<input type="hidden" id="departmentId" value="${departmentId}" />
			<input type="hidden" id="departmentManager"/>
			<input type="hidden" id="boss"/>
			<table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
		            style="font-size: 14px;margin-top:5px" role="grid">
				<tr>
					<td>&nbsp;紧急/特采事项：</td>
					<td><select id="item" style="width:120px" class="col-sm-10"></select></td>						
					<td>&nbsp;供应商类型：</td>
					<td><input id="vendorType" value="" style="width:120px" class="col-sm-10" type="text"></td>
					<td>&nbsp;供应商名称：</td>
					<td><input id="vendorName" value="" style="width:120px" class="col-sm-10" type="text"></td>	    
				</tr>
				<tr>
					<td>&nbsp;预估单价：</td>
					<td><select id="price" style="width:120px" class="col-sm-10"></select></td>						
					<td>&nbsp;预估金额：</td>
					<td><input id="amount" value="" style="width:120px" class="col-sm-10" type="text"></td>
					<td>资源开发科科长</td>
					<td><select id="leader" style="width:120px" class="col-sm-10"></select></td>	    
				</tr>
				<tr>
					<td colspan="4"  align="right" style="padding-right:50px">
						<input type="button" class="btn btn-sm btn-info" id="btnAgree" value="同意">
						&nbsp;&nbsp;
						<input type="button" class="btn btn-sm btn-info" id="btnDisagree" value="不同意">
						&nbsp;&nbsp;
						<input type="button" class="btn btn-sm btn-info" name="reback" value="取消"
							onclick="history.back()">
					</td>
				</tr>
			</table>
		</form>
	</body>
	<script src="<%=basePath%>/js/jquery-2.1.0.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery-ui.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.gritter.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.dataTables.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.dataTables.bootstrap.js"></script>
	<script type="text/javascript">
		$(function(){
			getOperator("科长审批组",$("#departmentId").val(),$("#leader"),"select");
		    getOperator("经理/厂长审批组",$("#divisionId").val(),$("#departmentManager"),"text");
		    getOperator("事业部总经理组","1",$("#boss"),"text");
		    $("#btnAgree").click(function(){
        		save("0");
        	});
        	$("#btnDisagree").click(function(){
        		save("1");
        	});
        })
        function save(result){
        	$.ajax({
    			type:"post",
    			url: "/BMS/materialPurchase/doDeveloper",
    			dataType: "json",
    			data: {
    				"result" : result,
    				"item" : $("#item").val(),
    				"vendorType" : $("#vendorType").val(),
    				"vendorName" : $("#vendorName").val(),
    				"price" : $("#price").val(),
    				"amount" : $("#amount").val(),
    				"orderId" : $("#orderId").val(),
    				"taskId" : $("#taskId").val(),
    				"taskName" : $("#taskName").val(),
    				"displayName" : $("#displayName").val(),
    				"purchaseLeader" : $("#leader").val(),
    				"purchaseManager" : $("#departmentManager").val(),
    				"boss" : $("#boss").val()
    			},
    			error: function () {},
    			success: function (response) {
    				if(response.success){
    					alert("审批成功");
    					var url="/BMS/task/active";
    					window.open(url,"_parent");     
    				}else{
    					alert("审批失败");
    				}
    			}
    		})
        }
		function getOperator(group_name,org_id,obj,element){
			$.ajax({
		        type: "post",
		        url: "getGroupListByGroupName",
		        data: {
		        	"group_name":group_name,
		        	"org_id":org_id,
		        	"process_name":"materialPurchase"
		        },  //传入组装的参数
		        dataType: "json",
		        success: function (result) {
		        	var str="";
		        	if(element=="select"){
		        		$.each(result.data,function(index,value){
		             	   str+="<option value='"+value.user_id+"'>"+value.username+"</option>"
		                 });
		                 $(obj).html(str);
		        	}
		        	if(element=="text"){
		        		$.each(result.data,function(index,value){
		             	   str+=value.user_id+",";
		                 });
		                 $(obj).val(str.substring(0,str.length-1));
		        	}
		        }
		    });
		}
    </script>
</html>
