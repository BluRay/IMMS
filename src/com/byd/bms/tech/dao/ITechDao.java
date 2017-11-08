package com.byd.bms.tech.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository(value="techDao")
public interface ITechDao {
	/**
	 * 技改任务维护
	 */
	public List<Map<String,Object>> queryTechTaskMaintainList(Map<String,Object> conditionMap);
	public int queryTechTaskMaintainListTotalCount(Map<String,Object> conditionMap);
	public int addTechTask(Map<String, Object> conditionMap);
	public int addChangedMaterialList(List<Map<String, Object>> conditionList);

	public List<Map<String,Object>> querySingleTechTaskMaintain(Map<String,Object> conditionMap);
	public int updateTechTaskMaintain(List<Map<String, Object>> conditionList);
	public int deleteChangedMaterialList(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryChangedMaterialList(Map<String,Object> conditionMap);
	public int addTechTaskMaintain(Map<String, Object> conditionMap);
	
	public int queryTechTaskListCount(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryTechList( Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechTaskList(Map<String,Object> conditionMap);
	public List<Map<String, Object>> queryFactoryOrderList(Map<String, Object> conditionMap);
	public int deleteTechFollowBus(Map<String, Object> conditionMap);
	public int deleteTechTaskDetail(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusList_All(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusList_Pre(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusList_After(Map<String, Object> conditionMap);
	public int insertTechFollowBus(List<Map<String, Object>> followList);
	public void insertTechTaskDetail(Map<String, Object> conditionMap);
	public void updateTechTaskInfo(Map<String, Object> cdmap);
	public List<Map<String,String>> queryTaskBaseInfo(Map<String, Object> conditionMap);	
	public List<Map<String,String>> queryTaskMaterielInfo(Map<String, Object> conditionMap);
	public List<Map<String,String>> queryTaskOrderInfo(Map<String, Object> conditionMap);
	public List<Map<String, String>> queryAssignList(String taskid);
	public List<Map<String, String>> queryStaffWorkHours(Map<String, Object> conditionMap);
	public List<Map<String, String>> queryBusNumberFollowList(Map<String, Object> conditionMap);
	public int checkTaskMaterial(Map<String, Object> conditionMap);
	public int queryTaskMaterialCheckCount(Map<String, Object> conditionMap);
	public int checkTask(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTaskOrderFinishInfo(Map<String, Object> conditionMap);

	public List<Map<String,Object>> queryTechWorkHourEstimateList(Map<String,Object> conditionMap);
	public int queryTechWorkHourEstimateListTotalCount(Map<String,Object> conditionMap);
	public int updateTechWorkHourEstimate(List<Map<String, Object>> conditionList);

	public List<Map<String,Object>> queryTechFollowingUpList(Map<String,Object> conditionMap);
	public int queryTechFollowingUpListTotalCount(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryFollowingUpDetailList(Map<String,Object> conditionMap);
	public int updateFollowingUp(List<Map<String, Object>> conditionList);
	public int updateWorkshopStatus2(List<Map<String, Object>> conditionList);
	public List<Map<String,Object>> queryFollowingUpDetailList1(Map<String,Object> conditionMap);
	public int addFollowingUp1(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusNum_All(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusNum_Pre(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTechBusNum_After(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryTaskBusNumber(Map<String, Object> map);
	public List<Map<String,Object>> queryTaskPreInfo(Map<String, Object> map);

	public List<Map<String, String>> queryTechTaskReport(Map<String, Object> conditionMap);
	public int queryTechTaskReportCount(Map<String, Object> conditionMap);
	public List<Map<String, String>> queryTechTaskReport2(Map<String, Object> conditionMap);
	public int queryTechTaskReportCount2(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryChangeTypeReport(Map<String, Object> conditionMap);
	public int queryChangeTypeReportCount(Map<String, Object> conditionMap);
	public List<Map<String, String>> queryTechTaskFollowList(@Param(value="bus_number")String bus_number);
	public void updateTechTaskStatus(@Param(value="taskList")List<Map<String, String>> taskList);
	public List<Map<String, String>> queryTechTaskDetailByBus(@Param(value="bus_number")String bus_number);
	public void updateTechTaskFollow(Map<String, Object> condMap);
	
	public List<Map<String, Object>> getSingleTaskList(Map<String,Object> queryMap);
	public int getSingleTaskListCount(Map<String,Object> queryMap);
	public int saveWorkHourInfo(List<Map<String, Object>> swh_list);
	public int deleteWorkHourInfo(Map<String, String> conditionMap);
	public int batchUpdateWorkHour(List<Map<String, Object>> swh_list);
	public int updateTechTaskPrice(Map<String, Object> conditionMap);
	
	public int deleteBusFollow(Map<String, Object> conditionMap);
	public int addBusFollow(List<Map<String, Object>> add_list);

	public void caculateEcnSalary(Map<String, Object> conditionMap);
	public List<Map<String,String>> getBusNumberByOrder(Map<String, Object> conditionMap);
}
