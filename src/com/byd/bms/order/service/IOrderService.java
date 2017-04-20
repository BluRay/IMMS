package com.byd.bms.order.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.byd.bms.order.model.BmsOrder;
import com.google.gson.JsonArray;

public interface IOrderService {
	public Map<String,Object> getOrderListPage(Map<String,Object> condMap);
	public int getBusNumberStart(Map<String, Object> conditionMap);
	public List getOrderDetailList(Map<String, Object> conditionMap);
	@Transactional
	public void editOrder(JsonArray jel_del, JsonArray jel, Map<String,String> odermap);
	
	public String getOrderSerial(String year);
	@Transactional
	public void createOrder(BmsOrder order, String factoryOrderNum);
}
