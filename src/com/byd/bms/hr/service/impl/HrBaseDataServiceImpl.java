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
	public int addPositionData(List<Map<String,Object>> list) {
		int result=0;
		for(Map<String,Object> map : list){
			Map<String,Object> conMap=new HashMap<String,Object>();
			conMap.put("job_no", (String)map.get("job_no"));
			List<Map<String,Object>> plist=hrBaseDataDao.getPositionList(conMap);
			if(plist.size()>0){
				Map pMap=plist.get(0);
				map.put("id", pMap.get("id"));
				result=hrBaseDataDao.editPositionData(map);
			}else{
				result=hrBaseDataDao.addPositionData(map);
			}
		}
		return result;
	}
	@Override
	public Map<String, Object> getPositionList(
			Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String,Object>> datalist = hrBaseDataDao.getPositionList(conditionMap);
		totalCount = hrBaseDataDao.getPositionCount(conditionMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}
	@Override
	public List<Map<String, Object>> getPositionData(
			Map<String, Object> conditionMap) {
		return hrBaseDataDao.getPositionData(conditionMap);
	}
	@Override
	public int editPositionData(Map<String, Object> conditionMap) {
		return hrBaseDataDao.editPositionData(conditionMap);
	}
	@Override
	public void deletePositionData(List<String> list) {
		for(String id : list){
			hrBaseDataDao.deletePositionData(id);
		}
	}
	@Override
	public List<Map<String, Object>> getOrg(List<Map<String, Object>> conditionMap) {
		return hrBaseDataDao.getOrg(conditionMap);
	}
	@Override
	public List<String> getStaffListByStaffNumbers(Map<String, Object> conditionMap) {
		return hrBaseDataDao.getStaffListByStaffNumbers(conditionMap);
	}
	
	@Override
	public int dimissionStaff(Map<String, Object> conditionMap) {
		return hrBaseDataDao.dimissionStaff(conditionMap);
	}
	@Override
	public Map<String, Object> getWorkgroupPriceList(Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String,Object>> datalist = hrBaseDataDao.getWorkgroupPriceList(conditionMap);
		totalCount = hrBaseDataDao.getWorkgroupPriceCount(conditionMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}
	@Override
	public Map<String, Object> getOrgInfo(Map<String, Object> conditionMap) {
		return hrBaseDataDao.getOrgInfo(conditionMap);
	}
	@Override
	public Map<String, Object> queryWorkgroupPrice(Map<String, Object> map) {
		return hrBaseDataDao.queryWorkgroupPrice(map);
	}
	@Override
	public int addWorkgroupPrice(List<Map<String, Object>> addList) {
		return hrBaseDataDao.addWorkgroupPrice(addList);
	}
	@Override
	public int updateWorkgroupPrice(List<Map<String, Object>> upDateList) {
		return hrBaseDataDao.updateWorkgroupPrice(upDateList);
	}
	@Override
	public Map<String, Object> getStaffDistribution(Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String,Object>> datalist = hrBaseDataDao.getStaffDistribution(conditionMap);
		totalCount = hrBaseDataDao.getStaffDistributionCount(conditionMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}
	@Override
	public int checkIsValidStaff(Map<String, Object> cMap) {
		return hrBaseDataDao.checkIsValidStaff(cMap);
	}
	@Override
	public Double getWorkgroupPrice(Map<String, Object> pmap) {
		return hrBaseDataDao.getWorkgroupPrice(pmap);
	}
	@Override
	public int deleteStaffDistribution(Map<String, Object> conditionMap) {
		return hrBaseDataDao.deleteStaffDistribution(conditionMap);
	}
	@Override
	public int saveStaffDistribution(List<Map<String, Object>> datalist) {
		return hrBaseDataDao.saveStaffDistribution(datalist);
	}
}
