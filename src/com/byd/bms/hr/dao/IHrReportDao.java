package com.byd.bms.hr.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository(value="hrReportDao")
public interface IHrReportDao {
	
	public List<Map<String,Object>> getRewardsCollectList(Map<String, Object> conditionMap);	//查询奖惩汇总数据
	public int getRewardsCollectTotalCount(Map<String, Object> conditionMap);					//查询奖惩汇总数据数量
	public int queryStaffPieceHoursCount(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryStaffPieceHours(Map<String, Object> conditionMap);
}
