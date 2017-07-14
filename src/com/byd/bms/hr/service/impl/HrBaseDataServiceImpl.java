package com.byd.bms.hr.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.hr.dao.IHrBaseDataDao;
import com.byd.bms.hr.service.IHrBaseDataService;
import com.byd.bms.setting.dao.IBaseDataDao;
@Service
public class HrBaseDataServiceImpl implements IHrBaseDataService {
	@Resource(name="hrBaseDataDao")
	private IHrBaseDataDao hrBaseDataDao;
	public List<Map<String, Object>> getOrgDataTreeList(Map<String, Object> queryMap) {
		return hrBaseDataDao.getOrgDataTreeList(queryMap);
	}
}
