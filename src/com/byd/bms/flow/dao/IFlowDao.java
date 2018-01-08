package com.byd.bms.flow.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository(value="flowDao")
public interface IFlowDao {
	// 根据Map封装条件查询历史任务
	public List<Map<String,Object>> getHistoryTaskList(Map<String, Object> conMap);	//查询奖惩汇总数据
	// 根据Map封装条件查询历史任务记录数量
	public int getHistoryTaskCount(Map<String, Object> conMap);
	// 根据Map封装条件当前任务【主办、协办】
	public List<Map<String,Object>> getCurrentTaskList(Map<String, Object> conMap);
	// 根据Map封装条件查询当前任务【主办、协办】记录数量
	public int getCurrentTaskCount(Map<String, Object> conMap);
	// 根据Map封装条件查询抄送任务
	public List<Map<String,Object>> getCCTaskList(Map<String, Object> conMap);	
	// 根据Map封装条件查询抄送任务记录数量
	public int getCCTaskCount(Map<String, Object> conMap);
	// 根据Map封装条件查询流程记录
	public List<Map<String,Object>> getProcessList(Map<String, Object> conMap);	
	// 根据Map封装条件查询流程记录条数
	public int getProcessCount(Map<String, Object> conMap);
	// 根据Map封装条件查询流程实例记录
	public List<Map<String,Object>> getProcessInstanceList(Map<String, Object> conMap);	
	// 根据Map封装条件查询流程实例记录条数
	public int getProcessInstanceCount(Map<String, Object> conMap);
	// save紧急物料采购申请信息
	public int addMaterialPurchase(Map<String, Object> map);
	// update紧急物料采购申请信息
	public int updateMaterialPurchase(Map<String, Object> map);
	// 根据审批组名称查询改组下用户信息记录
	public List<Map<String,Object>> getGroupListByGroupName(Map<String, Object> conMap);
	// save审批记录
	public int addApproval(Map<String, Object> map);
	// 根据流程实例Id、任务名称查询审批信息
	public List<Map<String,Object>> findApprovalInfoByFlow(@Param(value = "orderId")String orderId,@Param(value = "taskName") String taskName);
	// 根据流程实例Id采购表信息
	public List<Map<String,Object>> getMaterialPurchaseByOrderId(@Param(value = "orderId")String orderId);
	// 根据流程实例Id查询wf_hist_task信息
	public List<Map<String,Object>> getOrderInstanceByOrderId(@Param(value = "orderId")String orderId);
}
