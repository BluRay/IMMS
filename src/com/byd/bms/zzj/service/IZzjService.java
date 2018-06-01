package com.byd.bms.zzj.service;

import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

public interface IZzjService {

	void getMatList(Map<String, Object> condMap, ModelMap model);

	void updateMatById(Map<String, Object> condMap, ModelMap model);

	void getZzjTypeList(Map<String, Object> condMap, ModelMap model);

	void getMatInfo(Map<String, Object> condMap, ModelMap model);
	
	public int savePmdInfo(Map<String,Object> condMap);
	
	public Map<String,Object> queryPmdInfo(Map<String,Object> condMap);
	public Map<String,Object> queryZzjPlan(Map<String,Object> condMap);
	public Map<String,Object> queryFactoryOrderQuantity(Map<String,Object> condMap);
	
	public int addZzjPlan(Map<String,Object> condMap);
	public int deleteZzjPlan(int id);
	public int editZzjPlan(Map<String,Object> condMap);
	public int importOutput(Map<String,Object> condMap);
	public Map<String,Object> queryMatOutput(Map<String, Object> condMap);
	void enterMatOutput(Map<String, Object> condMap, ModelMap model);

	String validatePlanStatus(Map<String, Object> condMap);

	void getMatOutputData(Map<String, Object> condMap, ModelMap model);
	
	void getZzjBatchList(Map<String, Object> condMap, ModelMap model);
	
	void getElectrophoresisList(Map<String, Object> condMap, ModelMap model);
	// 批量save电泳件记录
	public int saveElectrophoresis(List<Map<String, Object>> addlist);
	// 验电泳件进仓数量
	public int checkElectroEnterQuantity(Map<String, Object> map);
	
	void getMatListMatDesc(Map<String, Object> condMap, ModelMap model);
	
    public int updateElectrophoresis(Map<String, Object> map);
	
	public int delElectrophoresis(String id);
	
    void getWorkshopSupplyList(Map<String, Object> condMap, ModelMap model);
	// 批量save车间供应记录
	public int saveWorkshopSupply(List<Map<String, Object>> addlist);
		
	public int updateWorkshopSupply(Map<String, Object> map);
		
	public int delWorkshopSupply(String id);
	
	void getWorkshopSupplyAddByMap(Map<String, Object> condMap,ModelMap model);

	void deleteMatOutput(Map<String, Object> condMap, ModelMap model);
	
	void getPmdByMap(Map<String, Object> condMap, ModelMap model);
	
	void getPmdDetailByMap(Map<String, Object> condMap, ModelMap model);

	void getBatchList(Map<String, Object> condMap, ModelMap model);

	void getOutputDetailList(Map<String, Object> condMap, ModelMap model);
	// 查询电泳件报表【按订单维度】
	public void getElectrophoresisByOrderList(Map<String, Object> condMap, ModelMap model);
	// 查询电泳件报表【按批次维度】
	public void getElectrophoresisByBatchList(Map<String, Object> condMap, ModelMap model);
	
	void getElectrophoresisUnOuterList(Map<String, Object> condMap, ModelMap model);
	
	void getOutputCountData(Map<String, Object> condMap, ModelMap model);
	// 查询电泳件报表【按订单分类汇总】
	void getElectrophoresisTotalList(Map<String,Object> condMap,ModelMap model);
	void getOutputCountDetailData(Map<String, Object> condMap, ModelMap model);
	/**
	 * 自制件产量录入批量保存（PC扫描录入）
	 * @param condMap
	 * @return
	 */
	int enterMatOutput(Map<String, Object> condMap);
	/**
	 * 获取产量批次达成报表数据
	 * @param condMap
	 * @param model
	 */
	void getOutputBatchCountData(Map<String, Object> condMap, ModelMap model);

}
