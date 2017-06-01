package com.byd.bms.tech.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.byd.bms.tech.dao.ITechDao;
import com.byd.bms.tech.service.ITechService;

@Service
public class TechServiceImpl implements ITechService {
	@Resource(name="techDao")
	private ITechDao techDao;

	@Override
	public Map<String, Object> queryTechTaskMaintainList(Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String, Object>> datalist=techDao.queryTechTaskMaintainList(conditionMap);
		totalCount=techDao.queryTechTaskMaintainListTotalCount(conditionMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", conditionMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("total", totalCount);
		result.put("rows", datalist);
		result.put("data", datalist);
		return result;
	}

	@Override
	@Transactional
	public void addTechTask(Map<String, Object> conditionMap) {
		/**
		 * 新增技改技改任务
		 */
		int tech_task_id = techDao.addTechTask(conditionMap);
		tech_task_id = Integer.valueOf(conditionMap.get("id").toString());
		List<Map<String, Object>> changeMaterialList = new ArrayList<Map<String, Object>>();
		JSONArray jsonArray = JSONArray.fromObject(conditionMap.get("selectedrows").toString());
		JSONObject obj = null;
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String, Object> changeMaterialMap = new HashMap<String, Object>();
			obj = jsonArray.getJSONObject(i);
			// asns.add(obj.getString("asnNo"));
			changeMaterialMap.put("tech_task_id", tech_task_id);
			changeMaterialMap.put("sap_no", obj.getString("sap_no"));
			changeMaterialMap.put("material_desc", obj.getString("material_desc"));
			changeMaterialMap.put("material_type", obj.getString("material_type"));
			changeMaterialMap.put("material_spec", obj.getString("material_spec"));
			changeMaterialMap.put("unit", obj.getString("unit"));
			changeMaterialMap.put("supplier_code", obj.getString("supplier_code"));
			changeMaterialMap.put("single_loss", obj.getString("single_loss"));
			changeMaterialMap.put("level_usage", obj.getString("level_usage"));
			changeMaterialMap.put("single_weight", obj.getString("single_weight"));
			changeMaterialMap.put("single_usage", obj.getString("single_usage"));
			changeMaterialMap.put("workshop", obj.getString("workshop"));
			changeMaterialMap.put("process", obj.getString("process"));
			changeMaterialMap.put("assemb_site", obj.getString("assemb_site"));
			changeMaterialMap.put("remark", obj.getString("remark"));
			changeMaterialList.add(changeMaterialMap);
		}
		if (changeMaterialList.size() > 0) {
			techDao.addChangedMaterialList(changeMaterialList);
		}
		 
	}

	@Override
	public List<Map<String, Object>> querySingleTechTaskMaintain(Map<String, Object> conditionMap) {
		List<Map<String,Object>> list = techDao.querySingleTechTaskMaintain(conditionMap);		
		return list;
	}

	@Override
	public List<Map<String, Object>> queryChangedMaterialList(Map<String, Object> conditionMap) {
		List<Map<String,Object>> list = techDao.queryChangedMaterialList(conditionMap);	
		return list;
	}

	@Override
	public int addTechTaskMaintain(Map<String, Object> conditionMap) {
		return techDao.addTechTaskMaintain(conditionMap);	
	}

	@Override
	public int addChangedMaterialList(List<Map<String, Object>> conditionMap) {
		return techDao.addChangedMaterialList(conditionMap);	
	}

	@Override
	public int updateTechTaskMaintain(List<Map<String, Object>> conditionList) {
		return techDao.updateTechTaskMaintain(conditionList);	
	}

	@Override
	public int deleteChangedMaterialList(Map<String, Object> conditionMap) {
		return techDao.deleteChangedMaterialList(conditionMap);	
	}

	@Override
	public Map<String, Object> getTaskList(Map<String, Object> queryMap) {
		int totalCount=techDao.queryTechTaskListCount(queryMap);
		List<Map<String,Object>> datalist=techDao.queryTechTaskList(queryMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}

	@Override
	public List<Map<String, Object>> queryTechList(Map<String, Object> conditionMap) {
		return techDao.queryTechList(conditionMap);
	}

	@Override
	public List<Map<String, Object>> queryFactoryOrderList(Map<String, Object> conditionMap) {
		return techDao.queryFactoryOrderList(conditionMap);
	}

	@SuppressWarnings("rawtypes")
	@Override
	@Transactional
	public int assignTechTask(String conditions,String edit_user,String curTime) {
		JSONArray jsa=JSONArray.fromObject(conditions);
		if(jsa.size()==0){
			return -1;
		}
		Map<String,Object> cdmap=new HashMap<String,Object>();
		JSONObject jo=(JSONObject)jsa.get(0);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		//删除技改跟进表中（BMS_TECH_TASK_FOLLOW）未跟进工厂的技改车辆
		techDao.deleteTechFollowBus(conditionMap);
		//删除技改明细中（BMS_TECH_TASK_DETAIL）技改明细
		techDao.deleteTechTaskDetail(conditionMap);
		for(Object o:jsa){
			jo=(JSONObject)o;
			conditionMap=new HashMap<String,Object>();
			for(Iterator it=jo.keys();it.hasNext();){
				String key=(String) it.next();
				conditionMap.put(key, jo.get(key));
			}
			String switch_mode=(String) conditionMap.get("switch_mode");
			String switch_node=(String) conditionMap.get("switch_node");
			int tech_task_id=Integer.valueOf(conditionMap.get("tech_task_id").toString());
			cdmap.put("switch_mode", switch_mode);
			cdmap.put("switch_node", switch_node);
			cdmap.put("tech_task_id", tech_task_id);
			
			List<String> node_list=new ArrayList<String>();
			String nodes=(String) conditionMap.get("node_list");
			node_list=Arrays.asList(nodes.split(","));
			conditionMap.put("node_list", node_list);
			List<Map<String,Object>> followList=new ArrayList<Map<String,Object>>();
			
			//查询需要技改的车辆信息
			if("全部切换".equals(switch_mode)){
				followList=techDao.queryTechBusList_All(conditionMap);
			}
			if("节点前切换".equals(switch_mode)){
				followList=techDao.queryTechBusList_Pre(conditionMap);
			}
			if("节点后切换".equals(switch_mode)){
				followList=techDao.queryTechBusList_After(conditionMap);
			}
			//往技改跟进表中（BMS_TECH_TASK_FOLLOW）插入查询到的技改车辆信息
			if(followList.size()>0){
				techDao.insertTechFollowBus(followList);
			}
			//插入技改明细
			techDao.insertTechTaskDetail(conditionMap);										
		}	
		cdmap.put("editor_id", edit_user);
		cdmap.put("edit_date", curTime);
		//修改技改任务相关内容
		techDao.updateTechTaskInfo(cdmap);
		return 0;
		
	}

	@Override
	public Map<String, Object> getTaskInfo(Map<String, Object> conditionMap) {
		Map<String, Object> result =new HashMap<String,Object>();
		List<Map<String, String>> dataBaseInfo = techDao.queryTaskBaseInfo(conditionMap);
		List<Map<String, String>> dataMaterielInfo = techDao.queryTaskMaterielInfo(conditionMap);
		List<Map<String, String>> dataOrderInfo = techDao.queryTaskOrderInfo(conditionMap);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("ecnTaskId",conditionMap.get("taskid").toString());

		result.put("dataBaseInfo", dataBaseInfo);
		result.put("dataMaterielInfo", dataMaterielInfo);
		result.put("dataOrderInfo", dataOrderInfo);
		result.put("whList", techDao.queryStaffWorkHours(m));
		result.put("assignList", techDao.queryAssignList(conditionMap.get("taskid").toString()));
		
		return result;
	}

	@Override
	@Transactional
	public int checkTaskMaterial(String taskid, String check_id, String curTime, String edit_user) {
		String[] check = check_id.split(",");
		// 更新物料确认信息
		for (int i = 0; i < check.length; i++) {
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("id", check[i]);
			conditionMap.put("userid", edit_user);
			conditionMap.put("curTime", curTime);
			techDao.checkTaskMaterial(conditionMap);
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("taskid", taskid);
		int checkCount = techDao.queryTaskMaterialCheckCount(conditionMap);
		if (checkCount == 0) {
			Map<String, Object> conditionMap2 = new HashMap<String, Object>();
			conditionMap2.put("id", taskid);
			conditionMap2.put("userid", edit_user);
			conditionMap2.put("curTime", curTime);
			techDao.checkTask(conditionMap2);
		}
		return 0;
	}

	@Override
	public Map<String, Object> getTaskOrderFinishInfo(Map<String, Object> conditionMap) {
		Map<String, Object> result =new HashMap<String,Object>();
		List<Map<String, Object>> list = techDao.queryTaskOrderFinishInfo(conditionMap);
		result.put("dataOrderFinishInfo", list);
		return result;
	}

	@Override
	public Map<String, Object> getWorkHourEstimateList(Map<String, Object> conditionMap) {
		List<Map<String,Object>> datalist = techDao.queryTechWorkHourEstimateList(conditionMap);
		int totalCount = techDao.queryTechWorkHourEstimateListTotalCount(conditionMap);
		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("draw", conditionMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public int editTechWorkHourEstimate(List<Map<String, Object>> conditionList) {
		return techDao.updateTechWorkHourEstimate(conditionList);
	}

	@Override
	public Map<String, Object> getFollowingUpList(Map<String, Object> conditionMap) {
		List<Map<String,Object>> datalist = techDao.queryTechFollowingUpList(conditionMap);
		int totalCount = techDao.queryTechFollowingUpListTotalCount(conditionMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("draw", conditionMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public List<Map<String, Object>> getFollowingUpDetailList(Map<String, Object> conditionMap) {
		return techDao.queryFollowingUpDetailList(conditionMap);
	}

	@Override
	@Transactional
	public int editFollowingUp(String curTime, String edit_user, String ids, String task_detail_id,String update_status, String workshop) {
		JSONArray jsonArray = JSONArray.fromObject(ids);
		List<Map<String, Object>> editList = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String, Object> infomap = new HashMap<String, Object>();
			infomap.put("id", jsonArray.getString(i).toString());
			infomap.put("confirmor_id", edit_user);
			infomap.put("confirmor_date", curTime);
			infomap.put("task_detail_id", task_detail_id);
			editList.add(infomap);
		}
		techDao.updateFollowingUp(editList);
		if("1".equals(update_status)){
			List<Map<String, Object>> conditionList = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("workshop", workshop);
			map.put("task_detail_id", task_detail_id);
			conditionList.add(map);
			techDao.updateWorkshopStatus2(conditionList);
		}
		return 0;
	}

	@Override
	public List<Map<String, Object>> getFollowingUpDetailList1(Map<String, Object> conditionMap) {
		return techDao.queryFollowingUpDetailList1(conditionMap);
	}

	@Override
	@Transactional
	public int editFollowingUp1(String curTime, String edit_user, String tech_task_id, String factory, String workshop,String follow_num, String order_no, String task_detail_id, String update_status) {
		Map<String, Object> infomap = new HashMap<String, Object>();
		infomap.put("tech_task_id", tech_task_id);
		infomap.put("factory", factory);
		infomap.put("workshop", workshop);
		infomap.put("follow_num", follow_num);
		infomap.put("confirmor_id", edit_user);
		infomap.put("confirmor_date", curTime);
		infomap.put("order_no", order_no);
		infomap.put("task_detail_id", task_detail_id);		
		techDao.addFollowingUp1(infomap);
		if("1".equals(update_status)){
			List<Map<String, Object>> conditionList = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("workshop", workshop);
			map.put("task_detail_id", task_detail_id);
			conditionList.add(map);
			techDao.updateWorkshopStatus2(conditionList);
		}
		return 0;
	}
	
	
	
}
