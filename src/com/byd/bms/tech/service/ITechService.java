package com.byd.bms.tech.service;

import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

public interface ITechService {
	
	/**
	 * 技改任务维护查询
	 */
	public Map<String,Object> queryTechTaskMaintainList(Map<String,Object> conditionMap);
	/**
	 * 新增技改任务
	 * @param conditionMap
	 * @return
	 */
	public void addTechTask(Map<String, Object> conditionMap);
	
	public List<Map<String,Object>> querySingleTechTaskMaintain(Map<String,Object> conditionMap);

	public List<Map<String,Object>> queryChangedMaterialList(Map<String,Object> conditionMap);
	
	public int addTechTaskMaintain(Map<String, Object> conditionMap);
	
	public int  addChangedMaterialList(List<Map<String, Object>> conditionMap);
	
	public int updateTechTaskMaintain(List<Map<String, Object>> conditionList);

	public int deleteChangedMaterialList(Map<String,Object> conditionMap);
	
	public Map<String, Object> getTaskList(Map<String, Object> queryMap);
	
	public List<Map<String, Object>> queryTechList( Map<String, Object> conditionMap);
	
	public List<Map<String, Object>> queryFactoryOrderList(Map<String, Object> conditionMap);
	
	public int assignTechTask(String conditions,String edit_user,String curTime);
	
	public Map<String, Object> getTaskInfo(Map<String, Object> conditionMap);
	
	public int checkTaskMaterial(String taskid,String check_id,String curTime,String edit_user);
	
	public Map<String, Object> getTaskOrderFinishInfo(Map<String, Object> conditionMap);
	
	public Map<String, Object> getWorkHourEstimateList(Map<String, Object> conditionMap);
	
	public int editTechWorkHourEstimate(List<Map<String, Object>> conditionList);
	
	public Map<String, Object> getFollowingUpList(Map<String, Object> conditionMap);
	
	public List<Map<String,Object>> getFollowingUpDetailList(Map<String, Object> conditionMap);
	
	public List<Map<String,Object>> getFollowingUpDetailList1(Map<String, Object> conditionMap);
	
	public int editFollowingUp(String curTime,String edit_user,String ids,String task_detail_id,String update_status,String workshop);

	public int editFollowingUp1(String curTime,String edit_user,String tech_task_id,String factory,String workshop,String follow_num,String order_no,String task_detail_id,String update_status);
	
	public List<Map<String,Object>> queryTechBusNum_All(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusNum_Pre(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusNum_After(Map<String, Object> conditionMap);

	public Map<String,Object> searchTaskList(String conditions);
	public List<Map<String,Object>> queryTaskBusNumber(Map<String, Object> map);
	
	public Map<String,Object> checkTaskReport(Map<String, Object> conditionMap);

	public List<Map<String, Object>> queryChangeTypeReport(Map<String, Object> conditionMap);
	public int queryChangeTypeReportCount(Map<String, Object> conditionMap);
	
	public void getTechtaskListByBus(String bus_number, ModelMap model);
	
	public void followTechTaskByBus(String bus_number, String tech_task_follow_ids,int userid,String curTime,ModelMap model);
	
	public Map<String,Object> querySingleTasklist(String conditions);
}
