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
}
