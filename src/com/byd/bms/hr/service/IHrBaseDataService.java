package com.byd.bms.hr.service;

import java.util.List;
import java.util.Map;

public interface IHrBaseDataService {
	// 组织架构树结构数据List
	public List<Map<String, Object>> getOrgDataTreeList(Map<String,Object> queryMap);
	
	public List<Map<String, Object>> getOrgDataByParentId(Map<String,Object> queryMap);
	
    public int addOrgData(Map<String,Object> queryMap);
	
	public int editOrgData(Map<String,Object> queryMap);
	
	public int deleteOrgData(Map<String,Object> conditionMap);
	
	public Map<String,Object> getStaffList(Map<String, Object> conditionMap);

	public List<Map<String,Object>> getOrg(List<Map<String,Object>> conditionMap);
	public List<String> getStaffListByStaffNumbers(Map<String, Object> conditionMap);
	public int dimissionStaff(Map<String, Object> conditionMap);
}
