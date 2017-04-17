package com.byd.bms.order.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.order.dao.IOrderDao;
import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.order.service.IOrderService;
@Service
public class OrderServiceImpl implements IOrderService {
	@Resource(name="orderDao")
	private IOrderDao orderDao;
	@Override
	public Map<String, Object> getOrderListPage(Map<String, Object> condMap) {
		int totalCount=0;
		List<BmsOrder> datalist=orderDao.getOrderList(condMap);
		totalCount=orderDao.getOrderTotalCount(condMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", condMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

}
