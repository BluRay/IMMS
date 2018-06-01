package com.byd.bms.order.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.byd.bms.order.model.BmsFactoryOrderDetail;
import com.byd.bms.order.model.BmsOrder;
@Repository(value="orderDao")
public interface IOrderDao {
	public List<Map<String,Object>> getOrderList(Map<String,Object> queryMap);
	public int getOrderTotalCount(Map<String,Object> queryMap);
	public Map<String,Object> getOrderByNo(Map<String,Object> queryMap);
	public List<BmsOrder> getOrderDetailList(Map<String,Object> queryMap);
	public int getBusNumberStart(Map<String, Object> conditionMap);
	public void deleteFactoryOrderById(int factory_order_id);
	public void deleteFactoryOrderNoProduction(int order_id);
	public int updateOrder(BmsOrder order);
	public int insertFactoryOrder(BmsFactoryOrderDetail factoryorder);
	public int updateFactoryOrder(BmsFactoryOrderDetail factoryorder);
	public String queryOrderSerial(String year);
	public int insertOrder(BmsOrder order);
	public List queryBusNumberByOrder(Map<String, Object> conditionMap);
	public List<Map<String, Object>> getOrderConfigList(Map<String, Object> condMap);
	public int getConfigTotalCount(Map<String, Object> condMap);
	public List queryConfigDetailList(String configId);
	public int saveOrderConfig(Map<String, Object> configDetail);
	public String getMaxOrderLineNo(Map<String, Object> configDetail);
	public void saveConfigDetails(Map<String, Object> smap);
	public void updateOrderConfig(Map<String, Object> configDetail);
	public void deleteConfigDetailById(int config_id);
	public List<Map<String, Object>> queryConfigAllotList(Map<String, Object> condMap);
	public int queryConfigAllotTotalCount(Map<String, Object> condMap);
	public List queryConfigListByOrder(Map<String, Object> condMap);
	public void batchSaveFactoryOrderConfig(List detail_list);
	public List queryOrderQueryList(Map<String, Object> condMap);
	public int queryOrderQueryListCount(Map<String, Object> condMap);
	public int queryOrderConfigTotalQty(String order_id);
	public List getOrderConfigParam(Map<String, Object> conditionMap);
	public int editOrderConfigParam(Map<String, Object> conditionMap);
	public int getBusTypeIdByCode(Map<String, Object> condMap);
	public int getOrderIdByBomNo(String order_no_bom);
	public int insertOrderByBom(BmsOrder order);
	public int updateOrderByBom(BmsOrder order);
	public int getFactoryOrderCountByOrderId(String order_id);
	public int getOrderQtyById(String order_id);
	public int getOrderConfigCountByOrderId(String order_id);
	public int insertOrderConfigByBom(Map<String, String> condMap);
	public int updateOrderConfigByBom(Map<String, String> condMap);
	public int deleteOrderConfigByBom(Map<String, Object> condMap);
	public int getBusCountByVehicle_model(Map<String, Object> condMap);
	public int getBusCountByOneVehicle_model(Map<String, Object> condMap);
	public int deleteOrderConfigNoBusNumberl(Map<String, Object> condMap);
	public int getOrderConfigIdByVehicle_model(Map<String, Object> condMap);
	public int getOrderConfigIdByVehicleModel(String order_vehicle_model);
	public int insertOrderConfigDetailByBom(Map<String, Object> condMap);
	public int updateOrderConfigDetailByBom(Map<String, Object> condMap);
	public int getOrderConfigDetailIdByVehicleModel(String order_vehicle_model);

	public int getBomPmdIdByBom(Map<String, Object> condMap);
	public int insertBomPmdIdByBom(Map<String, Object> condMap);
	public int updateBomPmdIdByBom(Map<String, Object> condMap);

	public List queryOrderConfigByVehicle(String orderVechicleModel);
}
