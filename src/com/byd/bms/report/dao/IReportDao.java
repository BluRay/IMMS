package com.byd.bms.report.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
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

}
