package com.byd.bms.zzj.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository(value="zzjDao")
public interface IZzjDao {

	Map<String, Object> queryPmdHeader(Map<String, Object> pmd);
	List<Map<String, Object>> queryPmdItems(Map<String, Object> condMap);
	List<Map<String, Object>> queryZzjPlan(Map<String, Object> condMap);
	public Map<String,Object> queryFactoryOrderQuantity(Map<String,Object> condMap);
	public int addZzjPlan(Map<String,Object> condMap);
	public int deletePlan(int id);
	public int editZzjPlan(Map<String,Object> condMap);
	public int importOutput(Map<String,Object> condMap);
	List queryMatList(Map<String, Object> condMap);

	int queryMatListCount(Map<String, Object> condMap);

	void updateMatById(Map<String, Object> condMap);

	List queryZjjTypeList(Map<String, Object> condMap);

	List queryMatInfo(Map<String, Object> condMap);
	
	public int addPmdHeader(Map<String, Object> condMap);
	public int addPmdDetails(Map<String, Object> condMap);
	public int modifyPmdDetails(Map<String, Object> condMap);
	public int deletePmdItems(Map<String, Object> condMap);
	public int addPmdHistoryDetails(Map<String, Object> condMap);
	public int deletePmdHistoryItems(@Param(value="pmd_head_id")int pmd_head_id);
	Map<String,Object> queryPlanDone(Map<String, Object> condMap);

	void saveMatOutput(Map<String, Object> condMap);

	void updateZZJPlanStatus(Map<String, Object> condMap);
	
	List queryTotalPlanDone(Map<String, Object> condMap);

	List queryMatOutputList(Map<String, Object> condMap);
	
	void deleteMatOutputById(String string);
	
	List<Map<String, Object>> queryPlanDoneList(Map<String, Object> condMap);
	
	List queryBatchList(Map<String, Object> condMap);
	
	List queryOutputDetailList(Map<String, Object> condMap);
	
	int queryOutputDetailListCount(Map<String, Object> condMap);
	
	List queryMatOutputCount(Map<String, Object> condMap);
	
	
    /*************  tangjin start ***************/
	
	List queryZjjBatchList(Map<String, Object> condMap);
	// 查询电泳件外发、进仓记录
	List queryElectrophoresisList(Map<String, Object> condMap);
	// 查询电泳件外发、进仓记录条数
	int queryElectrophoresisListCount(Map<String, Object> condMap);
	// 验电泳件进仓数量
	public int checkElectroEnterQuantity(Map<String, Object> map);
	// 批量save电泳件记录
	public int saveElectrophoresis(List<Map<String, Object>> addlist);
	
	List queryMatListMatDesc(Map<String, Object> condMap);
	
	public int updateElectrophoresis(Map<String, Object> map);
	
	public int delElectrophoresis(int id);
	// 查询车间供应记录
	List queryWorkshopSupplyList(Map<String, Object> condMap);
	// 查询车间供应记录条数
	public int queryWorkshopSupplyListCount(Map<String, Object> condMap);
	// 批量save车间供应记录
	public int saveWorkshopSupply(List<Map<String, Object>> addlist);
	
    public int updateWorkshopSupply(Map<String, Object> map);
	
	public int delWorkshopSupply(int id);
	
	List queryWorkshopSupplyAddByMap(Map<String, Object> condMap);
	// 自制件下料查询
	List queryPmdByMap(Map<String, Object> condMap);
	// 自制件下料明细查询
	List queryPmdDetailByMap(Map<String, Object> condMap);
	// 自制件下料明细当前版本查询
	List queryCurVersionQMDList(Map<String, Object> condMap);
	// 查询电泳件报表【按批次维度】
	List<Map<String,Object>> queryElectrophoresisByBatchList(Map<String, Object> condMap);
	// 查询电泳件报表记录条数【按批次维度】
	int queryElectrophoresisByBatchCount(Map<String, Object> condMap);
	// 查询电泳件报表【按订单维度】
	List<Map<String,Object>> queryElectrophoresisByOrderList(Map<String, Object> condMap);
	// 查询电泳件报表记录条数【按订单维度】
	int queryElectrophoresisByOrderCount(Map<String, Object> condMap);
	// 查询电泳件报表【按订单维度分类汇总】
	List<Map<String,Object>> queryElectrophoresisTotalList(Map<String, Object> condMap);
	// 查询电泳件报表【未外发明细】
	List<Map<String,Object>> queryElectrophoresisUnOuterList(Map<String, Object> condMap);
	// 查询电泳件报表记录条数【未外发明细】
	int queryElectrophoresisUnOuterCount(Map<String, Object> condMap);
	/*************  tangjin end ***************/
	void batchSaveOutput(Map<String, Object> condMap);


}
