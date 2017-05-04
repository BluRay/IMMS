package com.byd.bms.tech.service.impl;

import java.util.ArrayList;
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
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
@Service
public class TechServiceImpl implements ITechService {
	@Resource(name="techDao")
	private ITechDao techDao;

	@Override
	public Map<String, Object> queryTechTaskMaintainList(
			Map<String, Object> conditionMap) {
		
		int totalCount=0;
		List<Map<String, Object>> datalist=techDao.queryTechTaskMaintainList(conditionMap);
		totalCount=techDao.queryTechTaskMaintainListTotalCount(conditionMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", conditionMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
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
	public List<Map<String, Object>> querySingleTechTaskMaintain(
			Map<String, Object> conditionMap) {
		
		
		return null;
	}
	
	
	
}
