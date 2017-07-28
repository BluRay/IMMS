package com.byd.bms.hr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public Map<String,Object> addStandardHumanData(List<Map<String, Object>> list) {
		int result=0;
		Map<String,Object> resultMap=new HashMap<String,Object>();
		for(Map<String,Object> map : list){
			Map<String,Object> conMap=new HashMap<String,Object>();
			if(map.get("org_id")==null){
				resultMap.put("error", map.get("line")+"行数据错误,请维护组织架构");
				break;
			}
			if(map.get("job_id")==null){
				resultMap.put("error", map.get("line")+"行数据错误,请维护标准岗位："+map.get("job_name"));
				break;
			}
			conMap.put("job_id", map.get("job_id"));
			conMap.put("org_id", map.get("org_id"));
			List<Map<String,Object>> plist=hrBaseDataDao.getStandardHumanData(conMap);
			if(plist.size()>0){
				Map pMap=plist.get(0);
				map.put("id", pMap.get("id"));
				result=hrBaseDataDao.editStandardHumanData(map);
			}else{
				result=hrBaseDataDao.addStandardHumanData(map);
			}
		}
		return resultMap;
	}
	@Override
	public List<Map<String, Object>> getStandardHumanData(
			Map<String, Object> conditionMap) {
		Map<String, Object> conMap=new HashMap<String, Object>();
		List<Map<String, Object>> humanMap=hrBaseDataDao.getStandardHumanData(conditionMap);
		List<Map<String, Object>> orgMap=hrBaseDataDao.getOrgDataTreeList(conMap);
		for(Map map : humanMap){
			String org_id=map.get("org_id")+"";
			String org_type=(String)map.get("org_type");
			if(org_type.equals("1")){
				map.put("factory_name",(String)map.get("org_name"));
				map.put("workshop_name", "");
				map.put("workgroup_name", "");
			}
			if(org_type.equals("2")){
				for(Map gmap : orgMap){
					String id=gmap.get("id")+"";
					if(id.equals(org_id)){
						map.put("factory_name",(String)gmap.get("parent_name"));
						break;
					}
				}
				map.put("workshop_name", (String)map.get("org_name"));
				map.put("workgroup_name", "");
			}
			if(org_type.equals("3")){
				for(Map gmap : orgMap){
					String id=gmap.get("id")+"";
					if(id.equals(org_id)){
						map.put("workshop_name",(String)gmap.get("parent_name"));
					}
				}
				for(Map gmap : orgMap){
					String id=gmap.get("id")+"";
					if(id.equals(org_id)){
						String parent_id=(String)gmap.get("parent_id");
						for(Map p_gmap : orgMap){
							String p_id=p_gmap.get("id")+"";
							if(p_id.equals(parent_id)){
								map.put("factory_name",(String)p_gmap.get("parent_name"));
							}
						}
					}
					
					
				}
				map.put("workgroup_name",  (String)map.get("org_name"));
			}
			
		}
		return humanMap;
	}
	@Override
	public int editStandardHumanData(Map<String, Object> conditionMap) {
		return hrBaseDataDao.editStandardHumanData(conditionMap);
	}
	@Override
	public void deleteStandardHumanData(String id) {
	    hrBaseDataDao.deleteStandardHumanData(id);
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
	@Transactional
	public int uploadStaff(List<Map<String, Object>> addList,List<Map<String, Object>> updateList){
		int result = 0;
		if(addList.size()>0){
			//批量新增用户信息
			result = hrBaseDataDao.insertStaffs(addList);
		}
		if(updateList.size()>0){
			//批量修改用户信息
			result = hrBaseDataDao.updateStaffs(updateList);
		}
		return result;
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
	@Override
	public int addWorkTimePrice(Map<String, Object> conditionMap) {
		return hrBaseDataDao.addWorkTimePrice(conditionMap);
	}
	@Override
	public int editWorkTimePrice(Map<String, Object> conditionMap) {
		return hrBaseDataDao.editWorkTimePrice(conditionMap);
	}
	@Override
	public Map<String, Object> getWorkTimePrice(Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String,Object>> datalist = hrBaseDataDao.getWorkTimePrice(conditionMap);
		totalCount = hrBaseDataDao.getWorkTimePriceCount(conditionMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}
}
