package com.byd.bms.order.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.byd.bms.order.dao.IReviewDao;
import com.byd.bms.order.model.BmsFactoryOrderDetail;
import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.order.model.BmsOrderConfigDetail;
import com.byd.bms.order.model.BmsOrderReviewResults;
import com.byd.bms.order.service.IReviewService;
import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.dao.ISettingDao;
import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.util.DataSource;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
@Service
@DataSource("dataSourceMaster")
public class ReviewServiceImpl implements IReviewService {
	@Resource(name="reviewDao")
	private IReviewDao reviewDao;
	@Resource(name="settingDao")
	private ISettingDao settingDao;
	@Resource(name="baseDataDao")
	private IBaseDataDao baseDataDao;
    // 订单评审业务方法
	@Override
	public Map<String, Object> getOrderReviewListPage(
			Map<String, Object> condMap) {
		int totalCount=0;
		List<Map<String, Object>> datalist=reviewDao.getOrderReviewList(condMap);
		// 查询是否有权限，有permission：true
		Map<String, Object> queryMap=new HashMap<String, Object>();
		queryMap.put("userId", condMap.get("userId"));
		queryMap.put("roleName", "评审");
		List<Map<String, Object>> list=settingDao.getPermissionByMap(queryMap);
		String permissionValue="";
		for(Map<String,Object> m : list){
			permissionValue+=(String) m.get("permission_value")+",";
		}
		for(Map<String, Object> map : datalist){
			boolean isResult=false;
			String factory_code=(String)map.get("factory_code");
			if(permissionValue.indexOf(factory_code)>=0){
				isResult=true;
			}
			map.put("permission", isResult); // 判断该用户是否有该订单的评审权限 【Y: true;N: false】
		}
		totalCount=reviewDao.getOrderReviewTotalCount(condMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", condMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	public int saveBmsOrderReviewResults(
			BmsOrderReviewResults bmsOrderReviewResults) {
		return reviewDao.saveBmsOrderReviewResults(bmsOrderReviewResults);
	}

	public int updateBmsOrderReviewResults(
			Map<String, Object> bmsOrderReviewResultsMap) {
		return reviewDao.updateBmsOrderReviewResults(bmsOrderReviewResultsMap);
	}

	public BmsOrderReviewResults getOrderReview(Map<String, Object> condMap) {
		return reviewDao.getOrderReview(condMap);
	}
    // 根据评审结果表id查询订单评审结果
	public Map<String, Object> getOrderReviewById(String id) {
		return reviewDao.getOrderReviewById(id);
	}

	public List<Map<String, Object>> getOrderReviewNodeList(
			Map<String, Object> condMap) {
		return reviewDao.getOrderReviewNodeList(condMap);
	}

	public boolean isPermission(Map<String, Object> condMap) {
		boolean isResult=false;
		List<Map<String,Object>> list=settingDao.getPermissionByMap(condMap);
		
		if(list!=null && list.size()>0){
			String permissionValue="";
			for(Map<String,Object> m : list){
				String str=m.get("permission_value")!=null ? (String) m.get("permission_value") : "";
				permissionValue+=str+",";
			}
			
			BmsBaseFactory factory=baseDataDao.getFactoryById((String)condMap.get("factoryId"));
			if(permissionValue.indexOf(factory.getFactoryCode())>=0){
				isResult=true;
			}
		}
		
		return isResult;
	}

	public String getNextOperator(Map<String, Object> conMap) {
		String result="";
		BmsBaseFactory factory=baseDataDao.getFactoryById((String)conMap.get("factoryId"));
		List<Map<String,Object>> list=settingDao.getPermissionByMap(conMap);
		if(list!=null && list.size()>0){
			for(Map m : list){
				String permissionValue= m.get("permission_value")!=null ? (String)m.get("permission_value") : "";
				String [] array=permissionValue.split(",");
				for(String arr : array){
					if(arr.trim().equals(factory.getFactoryCode())){
						result+=m.get("id")+",";
					}
				}
			}
		}
		if(!result.equals("")){
			result=result.substring(0, result.length()-1);
		}
		return result;
	}

	@Override
	public List getOrderDetailList(Map<String, Object> conditionMap) {
		List datalist=new ArrayList();
		datalist=reviewDao.getOrderDetailList(conditionMap);
		return datalist;
	}

	@Override
	public String getReviewPersonList(String id) {
		String result="";
		List<Map<String,String>> datalist=reviewDao.getReviewPersonList(id);
		for(Map<String,String> obj : datalist){
			result+=obj.get("username")+";";
		}
		if(result.length()>1){
			result=result.substring(0, result.length()-1);
		}
		return result;
	}

}
