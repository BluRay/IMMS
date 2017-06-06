package com.byd.bms.production.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.byd.bms.production.model.ProductionException;

public interface IProductionService {
	public List getLineProcessList(Map<String,Object> condMap);
	
	List<Map<String,Object>> getProcessMonitorSelect(Map<String, Object> condMap);

	List<Map<String,Object>>  getKeyParts(Map<String, Object> condMap);

	public Map<String, Object> getBusInfo(String bus_number);

	public List<Map<String,Object>> getOrderConfigList(String order_config_id);

	@Transactional
	public Map<String, Object> scan(Map<String,Object> condMap,List partsList);

	@Transactional
	public void createProductionException(List<ProductionException> exceptionList,ModelMap model);
	
	public Map<String, Object> getBusInfoList(Map<String, Object> condMap);

	public void updateBusInfo(Map<String, Object> condMap, ModelMap model);

	public void getSupplyTotalCount(Map<String, Object> condMap, ModelMap model);

	public void saveUpdateWorkshopSupply(Map<String, Object> condMap,
			ModelMap model);

	public Map<String, Object> getWorkshopSupplyList(Map<String, Object> condMap);
}
