package com.byd.bms.order.service;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.byd.bms.order.model.BmsOrder;
import com.google.gson.JsonArray;

public interface IOrderService {
	public Map<String,Object> getOrderListPage(Map<String,Object> condMap);
	public int getBusNumberStart(Map<String, Object> conditionMap);
	public List getOrderDetailList(Map<String, Object> conditionMap);
	@Transactional
	public void editOrder(JSONArray jel_del, JSONArray jel, Map<String,String> odermap);
	public Map<String,Object> getOrderByNo(Map<String,Object> queryMap);
	public String getOrderSerial(String year);
	@Transactional
	public void createOrder(BmsOrder order, String factoryOrderNum);
	public List getBusNumberByOrder(Map<String, Object> conditionMap);
	public Map<String,Object> getOrderConfigListPage(Map<String, Object> condMap);
	public List getConfigDetailList(String configId);
	public void saveOrderConfigDetail(Map<String, Object> configDetail);
	public Map<String, Object> getConfigAllotListPage(Map<String, Object> condMap);
	public List getConfigListByOrder(Map<String, Object> condMap);
	public void saveOrderConfigAllot(List detail_list);
	public ModelMap getOrderQueryData(Map<String, Object> condMap);
	public void getOrderConfigTotalQty(String order_id, ModelMap model);
	public List<Map> getOrderConfigParam(Map<String, Object> conditionMap);
	public void editOrderConfigParam(Map<String,Object> conditionMap);
	public int getBusTypeIdByCode(Map<String, Object> condMap);
	public int getOrderIdByBomNo(String order_no_bom);
	public int insertOrderByBom(BmsOrder order);
	public int updateOrderByBom(BmsOrder order);
	public int getFactoryOrderCountByOrderId(String order_id);
	public int getOrderQtyById(String order_id);
	public int updateOrderConfigByBom(Map<String, Object> orderConfigMap);
	public int getOrderConfigIdByVehicleModel(String order_vehicle_model);
	
	public int insertOrderConfigDetailByBom(Map<String, Object> condMap);
	public int updateOrderConfigDetailByBom(Map<String, Object> condMap);
	public int getOrderConfigDetailIdByVehicleModel(String order_vehicle_model);
	public int getBomPmdIdByBom(Map<String, Object> condMap);
	public int insertBomPmdIdByBom(Map<String, Object> condMap);
	public int updateBomPmdIdByBom(Map<String, Object> condMap);
	
	public List queryOrderConfigByVehicle(String orderVechicleModel);
}
