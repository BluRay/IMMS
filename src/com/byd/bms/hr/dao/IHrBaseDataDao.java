package com.byd.bms.hr.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository(value="hrBaseDataDao")
public interface IHrBaseDataDao {
    // 组织架构树结构数据List
	public List<Map<String,Object>> getOrgDataTreeList(Map<String,Object> queryMap);
	
	public List<Map<String,Object>> getOrgDataByParentId(Map<String,Object> queryMap);
	
	public int addOrgData(Map<String,Object> queryMap);
	
	public int editOrgData(Map<String,Object> queryMap);
	
	public int deleteOrgData(Map<String,Object> conditionMap);
	
	public int addPositionData(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> getPositionList(Map<String,Object> conditionMap);
	
	public int getPositionCount(Map<String, Object> conditionMap);
	
	public List<Map<String,Object>> getPositionData(Map<String,Object> conditionMap);
	
	public int editPositionData(Map<String,Object> conditionMap);
	
	public void deletePositionData(String id);
	
	public List<Map<String,Object>> getStaffList(Map<String, Object> conditionMap);
	public int getStaffCount(Map<String, Object> conditionMap);
	public List<Map<String,Object>> getOrg(List<Map<String,Object>> conditionMap);
	public List<String> getStaffListByStaffNumbers(Map<String, Object> conditionMap);
	public int dimissionStaff(Map<String, Object> conditionMap);
	
	public List<Map<String,Object>> getWorkgroupPriceList(Map<String, Object> cMap);
	public int getWorkgroupPriceCount(Map<String, Object> cMap);
	public Map<String,Object> getOrgInfo(Map<String,Object> conditionMap);
	public Map<String,Object> queryWorkgroupPrice(Map<String, Object> map);
	public int addWorkgroupPrice(List<Map<String, Object>> addList);
	public int updateWorkgroupPrice(List<Map<String, Object>> upDateList);
	
	public List<Map<String,Object>> getStaffDistribution(Map<String, Object> cMap);
	public int getStaffDistributionCount(Map<String, Object> cMap);
	public int checkIsValidStaff(Map<String, Object> cMap);
	public Double getWorkgroupPrice(Map<String, Object> pmap);
	public int deleteStaffDistribution(Map<String,Object> conditionMap);
	public int saveStaffDistribution(List<Map<String, Object>> datalist);
}
