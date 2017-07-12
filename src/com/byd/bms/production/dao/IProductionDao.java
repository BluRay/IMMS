package com.byd.bms.production.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.byd.bms.production.model.ProductionException;
@Repository(value="productionDao")
public interface IProductionDao {
	/*****************************xiong jianwu start  *****************************/
	List queryLineProcessList(Map<String, Object> condMap);

	List<Map<String, Object>> queryProcessMonitorList(Map<String, Object> condMap);

	List<Map<String, Object>> queryKeyParts(Map<String, Object> condMap);

	Map<String, Object> queryBusInfo(String bus_number);

	List<Map<String, Object>> queryOrderConfigList(String order_config_id);
	
	Map<String, Object> queryScanLastPlanNode(Map<String,Object> condMap);//查询车辆当前扫描节点的上一个计划节点是否存在扫描记录
	
	Map<String, Object> queryLastPlanNode(Map<String,Object> condMap);//查询车辆当前扫描节点的上一个计划节点
	
	Map<String,Object> queryNextProcess(Map<String, Object> condMap);//查询车辆当前扫描节点的下一个扫描工序

	int queryScanRecord(Map<String, Object> condMap);//查询车辆当前工序是否存在扫描记录

	int saveParts(@Param(value = "parts_list") List parts_list);
	
	int updateParts(@Param(value = "parts_list")List parts_list);

	void saveScanRecord(Map<String, Object> condMap);//保存扫描记录

	void updateBusProcess(Map<String, Object> condMap);//更新PLAN_BUS表的当前节点信息和节点扫描时间

	int insertProductionException(List<ProductionException> exceptionList);
	
	List<Map<String, Object>> queryBusInfoList(Map<String, Object> condMap);
	
	int queryBusInfoCount(Map<String, Object> condMap);

	int updateBusInfo(Map<String, Object> condMap);
	
	Map<String,Object> querySupplyTotalCount(Map<String, Object> condMap);

	int saveWorkshopSupply(Map<String, Object> condMap);

	int updateWorkshopSupply(Map<String, Object> condMap);

	List<Map<String, Object>> queryWorkshopSupplyList(
			Map<String, Object> condMap);

	int queryWorkshopSupplyCount(Map<String, Object> condMap);

	Map<String,Object> queryPartsFinishCount(Map<String, Object> condMap);

	int updatePartsOnOffRecord(Map<String, Object> condMap);

	int savePartsOnOffRecord(Map<String, Object> condMap);

	List<Map<String, Object>> queryPartsOnOffList(Map<String, Object> condMap);

	int queryPartsOnOffCount(Map<String, Object> condMap);
	
	public List<Map<String,String>> getProductionSearchScan(String bus_number);
	
	public List<Map<String,String>> getNamePlateInfo(String bus_number);
	
	public List<Map<String,String>> getProductionSearchException(String bus_number);
	
	public List<Map<String,String>> getCertificationInfo(String bus_number);
	
	public List<Map<String,String>> getEcnTasksByBusNumber(String bus_number);
	
	public List<Map<String,String>> getQmTestCardList(String bus_number);
	
	List<Map<String, Object>> getNameplatePrintList(Map<String, Object> condMap);

	int getNameplatePrintCount(Map<String, Object> condMap);

	int updateNameplatePrint(Map<String, Object> conditionMap);

	List<Map<String, Object>> getCertificationList(Map<String, Object> condMap);

	int getCertificationCount(Map<String, Object> condMap);
	/*****************************xiong jianwu end  *****************************/

	/******************* tangjin start**************************/
	public List<Map<String,Object>> getVinPrintList(Map<String,Object> conditionMap);
	
	public List<Map<String,String>> getProductionSearchBusinfo(String bus_number);
	
	public int getVinPrintCount(Map<String,Object> conditionMap);
	/*** 打印后更新VIN表打印次数，打印人，打印时间，打印状态*/
	public int updateVinPrint(Map<String,Object> conditionMap);
	/*** 保存左右电机号到bus表*/
	public int updateBusMotorNumber(Map<String, Object> buslist);
	/**保存左右电机号到Vin表*/
	public int updateVinMotorNumber(Map<String, Object> buslist);
	
	public List<Map<String,String>> getVinList(Map<String, Object> conditionMap);
	
	public List<Map<String,String>> getBusNumberByVin(Map<String, Object> conditionMap);//根据vin码查询BusNumber
	
	/*** 查询车号打印列表*/
	public List<Map<String,Object>> getBusNoPrintList(Map<String, Object> conditionMap);
	/**工厂、订单、配置查询bus表中已分配的车号数量*/
	public int getOrderConfigDoneQty(Map<String, Object> conditionMap);
    /**查询车号打印列表总数 */
	public int getBusNoPrintCount(Map<String, Object> conditionMap);
	/** 打印后更新车号表打印次数，打印人，打印时间，打印状态*/
	public int updateBusPrint(Map<String,Object> conditionMap);
	/**打印后更新bus表订单配置*/
	public int updateBusConfig(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> getOrderConfigList(Map<String, Object> conditionMap);
	/******************* tangjin end**************************/

	public List<Map<String,String>> getProductionSearch(Map<String,Object> queryMap);
	public List<Map<String,String>> getProductionWIPBusInfo(Map<String,Object> queryMap);
	public List<Map<String,String>> getProductionSearchCarinfo(Map<String,Object> queryMap);
}
