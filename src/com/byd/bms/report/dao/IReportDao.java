package com.byd.bms.report.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.ui.ModelMap;
@Repository(value="reportDao")
public interface IReportDao {

	List<Map<String, Object>> queryFactoryOutputYear(Map<String, Object> condMap);
	
	public List<Map<String, Object>> queryFactoryOutputReportData(List<Map<String, Object>> conditionMap);
	public List<Map<String, Object>> queryFactoryZzjOutputReportData(List<Map<String, Object>> conditionMap);
	public List<Map<String, Object>> queryFactoryBjOutputReportData(List<Map<String, Object>> conditionMap);
	public List<Map<String,Object>> queryDPUData(Map<String, Object> conditionMap);				//DPU报表
	public List<Map<String,Object>> queryDPUDetail(Map<String, Object> conditionMap);			//DPU报表明细
	public int queryDPUDetailCount(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryPassRateData(Map<String, Object> conditionMap);		//一次校检合格率报表
	public List<Map<String,Object>> queryPassRateDetail(Map<String, Object> conditionMap);		//一次校检合格率报表明细
	public int queryPassRateDetailCount(Map<String, Object> conditionMap);
	public List<Map<String,Object>> queryProcessProblemData(Map<String, Object> conditionMap);	//制程问题严重等级分布报表
	public List<Map<String,Object>> queryProcessProblemDetail(Map<String, Object> conditionMap);
	public int queryProcessProblemCount(Map<String, Object> conditionMap);

	List<Map<String, Object>> queryOnlineAndOfflineData(Map<String, Object> condMap);

	List<Map<String, Object>> queryFactoryPlanRateList(Map<String, Object> condMap);

	List<Map<String, Object>> queryPlanNodeOrderList(Map<String, Object> condMap);

	List<Map<String, Object>> queryExceptionList(Map<String, Object> condMap);
	
	//public List<Map<String,String>> getPlanRate(Map<String,Object> queryMap);  //工厂计划达成率报表
	public List<Map<String,Object>> queryPlanQty(Map<String,Object> conditionMap);
	public List<Map<String,String>> getPlanSearchRealCount(List queryMapList);		//查询订单完成实际完成数[订单查询页面]
	public int getPlanPartsRealCount(Map<String,Object> conditionMap);
	public int getPlanZzjRealCount(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryFactoryPlanQty(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getFactoryPlanRealCount(@Param(value ="list") List queryMapList,@Param(value = "start_date") String start_date,
			@Param(value ="end_date") String end_date);
	public List<Map<String,Object>> getHumanReportHeaderData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getStandardHumanReportData(Map<String,Object> conditionMap);

	List<Map<String, Object>> queryStaffUseList(Map<String, Object> cdMap);
	
	public List<Map<String, Object>> getFactoryYieldData_Mobile(Map<String, Object> cdMap);

	List<Map<String, Object>> queryOrderProcessData(Map<String, Object> condMap);

	List<Map<String, Object>> queryFactoryRateData(Map<String, Object> condMap);
}
