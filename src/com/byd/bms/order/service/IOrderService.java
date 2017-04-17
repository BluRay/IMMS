package com.byd.bms.order.service;

import java.util.Map;

public interface IOrderService {
	public Map<String,Object> getOrderListPage(Map<String,Object> condMap);
}
