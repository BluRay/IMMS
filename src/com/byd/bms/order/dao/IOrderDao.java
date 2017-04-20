package com.byd.bms.order.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.byd.bms.order.model.BmsFactoryOrderDetail;
import com.byd.bms.order.model.BmsOrder;
@Repository(value="orderDao")
public interface IOrderDao {
	public List<Map<String,Object>> getOrderList(Map<String,Object> queryMap);
	public int getOrderTotalCount(Map<String,Object> queryMap);
	public List<BmsOrder> getOrderDetailList(Map<String,Object> queryMap);
	public int getBusNumberStart(Map<String, Object> conditionMap);
	public void deleteFactoryOrderById(int factory_order_id);
	public void deleteFactoryOrderNoProduction(int order_id);
	public int updateOrder(BmsOrder order);
	public int insertFactoryOrder(BmsFactoryOrderDetail factoryorder);
	public int updateFactoryOrder(BmsFactoryOrderDetail factoryorder);
	public String queryOrderSerial(String year);
	public int insertOrder(BmsOrder order);
	
	
}
