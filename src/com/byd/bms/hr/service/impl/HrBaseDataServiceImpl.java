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
	public List<Map<String, Object>> getOrgDataByParentId(Map<String,Object> map) {
		return hrBaseDataDao.getOrgDataByParentId(map);
	}
	
    public int addOrgData(Map<String,Object> map){
    	return hrBaseDataDao.addOrgData(map);
    }
	
	public int editOrgData(Map<String,Object> map){
		return hrBaseDataDao.editOrgData(map);
	}
	
	public int deleteOrgData(Map<String,Object> conditionMap){
		return hrBaseDataDao.deleteOrgData(conditionMap);
	}
}
