package com.byd.bms.hr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.hr.dao.IHrReportDao;
import com.byd.bms.hr.service.IHrReportService;
@Service
public class HrReportServiceImpl implements IHrReportService {
	@Resource(name="hrReportDao")
	private IHrReportDao hrReportDao;
	
	@Override
	public Map<String, Object> getRewardsList(Map<String,Object> queryMap){
		int totalCount=0;
		List<Map<String,Object>> datalist = hrReportDao.getRewardsCollectList(queryMap);
		totalCount = hrReportDao.getRewardsCollectTotalCount(queryMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}
}
