package com.byd.bms.hr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository(value="hrBaseDataDao")
public interface IHrBaseDataDao {
    // 组织架构树结构数据List
	public List<Map<String,Object>> getOrgDataTreeList(Map<String,Object> queryMap);
}
