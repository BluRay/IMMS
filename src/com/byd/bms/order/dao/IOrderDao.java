package com.byd.bms.order.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.byd.bms.order.model.BmsOrder;
@Repository(value="orderDao")
public interface IOrderDao {
	public List<BmsOrder> getOrderList(Map<String,Object> queryMap);
	public int getOrderTotalCount(Map<String,Object> queryMap);
	public List<BmsOrder> getOrderDetailList(Map<String,Object> queryMap);
}
