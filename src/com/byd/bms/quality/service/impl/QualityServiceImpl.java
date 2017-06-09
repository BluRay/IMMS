package com.byd.bms.quality.service.impl;

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
import org.springframework.ui.ModelMap;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.service.IQualityService;
@Service
public class QualityServiceImpl implements IQualityService {
	@Resource(name="qualityDao")
	private IQualityDao qualityDao;
	@Override
	public void getOrderConfigList(Map<String, Object> condMap, ModelMap model) {
		int totalCount=0;
		List<Map<String, Object>> datalist=qualityDao.getOrderConfigList(condMap);
		totalCount=qualityDao.getConfigTotalCount(condMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", condMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		model.addAllAttributes(result);

	}
	@Override
	@Transactional
	public void saveKeyPartsDetail(Map<String, Object> keyParts) {
		String parts_detail=(String)keyParts.get("parts_detail");
		List detail_list=new ArrayList();
		JSONArray jsa=new JSONArray();
		if(parts_detail.contains("[")){
			jsa=JSONArray.fromObject(parts_detail);
		}
		Iterator it=jsa.iterator();
		while(it.hasNext()){
			JSONObject el= (JSONObject) it.next();
			Map<String,Object> detail=(Map<String, Object>) JSONObject.toBean(el, Map.class);
			detail_list.add(detail);
		}
		
		int header_id=0;
		Map<String,Object> m=qualityDao.queryKeyPartsHeader(keyParts);
		if(m!=null){
			header_id=Integer.parseInt(m.get("id").toString());
		}
		Map<String,Object> smap=null;
		if(header_id==0){
			qualityDao.saveKeyPartsHeader(keyParts);
			header_id=(int) keyParts.get("id");	
			smap=new HashMap<String,Object>();
			smap.put("header_id", header_id);
			smap.put("detail_list", detail_list);
			
			if(detail_list.size()>0){
				qualityDao.saveKeyPartsDetails(smap);
			}	
		}else{
			qualityDao.updateKeyPartsHeader(keyParts);
			if(detail_list.size()>0){
				smap=new HashMap<String,Object>();
				smap.put("header_id", header_id);
				smap.put("detail_list", detail_list);
				qualityDao.deleteKeyPartsByHeader(header_id);
				qualityDao.saveKeyPartsDetails(smap);
			}		
		}
	}
	@Override
	public void getKeyPartsList(HashMap<String, Object> condMap, ModelMap model) {
		model.put("data", qualityDao.queryKeyPartsList(condMap));		
	}

		
}
