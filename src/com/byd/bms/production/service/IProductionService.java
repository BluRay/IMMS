package com.byd.bms.production.service;

import java.util.List;
import java.util.Map;

public interface IProductionService {
	public List getLineProcessList(Map<String,Object> condMap);
}
