package com.byd.bms.production.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.byd.bms.production.model.ProductionException;
@Repository(value="productionDao")
public interface IProductionDao {

	List queryLineProcessList(Map<String, Object> condMap);

	List<Map<String, Object>> queryProcessMonitorList(Map<String, Object> condMap);

	List<Map<String, Object>> queryKeyParts(Map<String, Object> condMap);

	Map<String, Object> queryBusInfo(String bus_number);

	List<Map<String, Object>> queryOrderConfigList(String order_config_id);
	
	Map<String, Object> queryScanLastPlanNode(Map<String,Object> condMap);//查询车辆当前扫描节点的上一个计划节点是否存在扫描记录
	
	Map<String, Object> queryLastPlanNode(Map<String,Object> condMap);//查询车辆当前扫描节点的上一个计划节点

	int queryScanRecord(Map<String, Object> condMap);//查询车辆当前工序是否存在扫描记录

	int saveParts(@Param(value = "parts_list") List parts_list);
	
	int updateParts(@Param(value = "parts_list")List parts_list);

	void saveScanRecord(Map<String, Object> condMap);//保存扫描记录

	void updateBusProcess(Map<String, Object> condMap);//更新PLAN_BUS表的当前节点信息和节点扫描时间

	int insertProductionException(List<ProductionException> exceptionList);
}
