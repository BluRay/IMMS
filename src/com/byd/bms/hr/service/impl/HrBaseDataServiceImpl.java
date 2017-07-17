package com.byd.bms.hr.service.impl;

import java.util.HashMap;
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
	@Override
	public Map<String,Object> getStaffList(Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String,Object>> datalist = hrBaseDataDao.getStaffList(conditionMap);
		totalCount = hrBaseDataDao.getStaffCount(conditionMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}
	@Override
	public List<Map<String, Object>> getOrg(List<Map<String, Object>> conditionMap) {
		return hrBaseDataDao.getOrg(conditionMap);
	}
	@Override
	public List<String> getStaffListByStaffNumbers(Map<String, Object> conditionMap) {
		return hrBaseDataDao.getStaffListByStaffNumbers(conditionMap);
	}
}
