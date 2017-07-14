package com.byd.bms.hr.service;

import java.util.List;
import java.util.Map;

public interface IHrBaseDataService {
	// 组织架构树结构数据List
	public List<Map<String, Object>> getOrgDataTreeList(Map<String,Object> queryMap);
}
