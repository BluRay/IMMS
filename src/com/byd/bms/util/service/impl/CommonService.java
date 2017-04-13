package com.byd.bms.util.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.util.dao.ICommonDao;
import com.byd.bms.util.service.ICommonService;
@Service
public class CommonService implements ICommonService {
	@Resource
	private ICommonDao commonDao;
	@Override
	public List<Map<String, Object>> getOrderFuzzySelect(Map<String, Object> condMap) {
		List<Map<String, Object>> orderlist=commonDao.queryOrderList(condMap);
		return orderlist;
	}

}
