package com.byd.bms.tech.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.byd.bms.tech.dao.ITechDao;
import com.byd.bms.tech.service.ITechService;
import com.byd.bms.util.DataSource;

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
		if(conditionMap.get("selectedrows") != null){
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
		String task_page = "";
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
			if(key.equals("task_page")){
				task_page = jo.get(key).toString();
			}
		}
		//删除技改跟进表中（BMS_TECH_TASK_FOLLOW）未跟进工厂的技改车辆
		//前段分配不需操作FollowBus
		//System.out.println("----> task_page = " + task_page);
		//删除技改明细中（BMS_TECH_TASK_DETAIL）技改明细
		////techDao.deleteTechTaskDetail(conditionMap);
		
		if(task_page.equals("taskAssignPrePage")){
			//前段
			//插入技改明细
			//重新计算总工时 ModBy:YK 171115
			String tech_list = conditionMap.get("tech_list").toString();
			String time_list = conditionMap.get("time_list").toString();
			//System.out.println("----> tech_list = " + tech_list + ";time_list = " + time_list);
			//  ----> tech_list = 自制件:1,部件:2,焊装:6,涂装:6,底盘:6,总装:6;time_list = 自制件:1,部件:1,焊装:1,涂装:1,底盘:1,总装:1,检测线:0,成品库:0,弯弧件:0
			float total = 0;
			String[] tech_list_arr = {};
			if(tech_list != null)tech_list_arr = tech_list.split(",");
			String[] time_list_arr = {};
			if(time_list != null)time_list_arr = time_list.split(",");
			
			for (int i = 0 ; i <tech_list_arr.length ; i++ ) {
				String tech = tech_list_arr[i];
				String tech_workshop = tech.substring(0, tech.indexOf(":"));
				float tech_num = Float.valueOf(tech.substring(tech.indexOf(":")+1,tech.length()));

				for (int j = 0 ; j <time_list_arr.length ; j++ ) {
					String time = time_list_arr[j];
					if(!time.equals("")){
						String time_workshop = time.substring(0, time.indexOf(":"));
						if(time_workshop.equals(tech_workshop)){
							total += tech_num * Float.valueOf(time.substring(time.indexOf(":")+1, time.length()));
						}
					}
				}
				
			}
			//删除前段跟进数据
			techDao.deleteTechFollowPre(conditionMap);	
			conditionMap.put("time_total", total);
			int id = techDao.getTechTaskDetailId(conditionMap);
			if(id == 0){
				techDao.insertTechTaskDetail(conditionMap);	
			}else{
				conditionMap.put("id", id);
				techDao.updateTechTaskDetail(conditionMap);	
			}
		}else{
			techDao.deleteTechFollowBus(conditionMap);
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
								
				//插入技改明细
				////techDao.insertTechTaskDetail(conditionMap);		
				//插入-更新 技改明细
				String d_id = conditionMap.get("task_detail_id").toString();
				//int id = techDao.getTechTaskDetailId(conditionMap);
				if(d_id.equals("0")){
					techDao.insertTechTaskDetail(conditionMap);	
					d_id=conditionMap.get("id")+"";
				}else{
					conditionMap.put("id", d_id);
					techDao.updateTechTaskDetail(conditionMap);	
				}
				
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
			}	
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
	public int removeFollowingUp(String curTime, String edit_user, String ids, String task_detail_id,String update_status, String workshop,String status_list) {
		JSONArray jsonArray = JSONArray.fromObject(ids);
		List<Map<String, Object>> editList = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String, Object> infomap = new HashMap<String, Object>();
			infomap.put("id", jsonArray.getString(i).toString());
			infomap.put("confirmor_id", null);
			infomap.put("confirmor_date", null);
			infomap.put("task_detail_id", task_detail_id);
			editList.add(infomap);
		}
		techDao.updateFollowingUp(editList);
		String new_status_list = "";
		String[] ws = status_list.split(",");
		for (int i = 0 ; i <ws.length ; i++ ) {
			if(!(ws[i].equals(workshop))) {
				new_status_list += ","+ws[i];
			}
		}
		if(!new_status_list.equals(""))new_status_list = new_status_list.substring(1, new_status_list.length());
		//System.out.println("-->new_status_list = " + new_status_list);
		Map<String, Object> infomap = new HashMap<String, Object>();
		infomap.put("task_detail_id", task_detail_id);
		infomap.put("status_list", new_status_list);
		techDao.updateTechDetailStatus(infomap);
		return 0;
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

	@Override
	public List<Map<String, Object>> queryTechBusNum_All(Map<String, Object> conditionMap) {
		return techDao.queryTechBusNum_All(conditionMap);
	}

	@Override
	public List<Map<String, Object>> queryTechBusNum_Pre(Map<String, Object> conditionMap) {
		return techDao.queryTechBusNum_Pre(conditionMap);
	}

	@Override
	public List<Map<String, Object>> queryTechBusNum_After(Map<String, Object> conditionMap) {
		return techDao.queryTechBusNum_After(conditionMap);
	}

	@SuppressWarnings("rawtypes")
	@Override
	@DataSource("dataSourceSlave")
	public Map<String, Object> searchTaskList(String conditions,int draw,int start,int length) {
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		String workshops=(String) conditionMap.get("workshop_list");
		List<String> workshopList=Arrays.asList(workshops.split(","));
		conditionMap.put("workshop_list", workshopList);
		int totalCount=techDao.queryTechTaskListCount(conditionMap);
		//int totalCount=0;
		List<Map<String,Object>> data_list=techDao.queryTechTaskList(conditionMap);	
		List<Map<String,Object>> rows=new ArrayList<Map<String,Object>>();
		
		for(Map<String,Object> data:data_list){			
			String tech_list=(String) data.get("tech_list");
			String time_list=(String) data.get("time_list");
			String follow_list=(String) data.get("follow_list");
			
			String follow_num=String.valueOf(data.get("follow_num"));
			
			String ready_hour_list=(String) data.get("ready_hour_list");
			Pattern p=Pattern.compile(":");
			Pattern p1=Pattern.compile(",");
			JSONObject time_jso=new JSONObject();
			JSONObject follow_jso=new JSONObject();
			JSONObject readyHour_jso=new JSONObject();
			
			if(StringUtils.isNotEmpty(time_list)){
				time_list="{\""+time_list+"\"}";
				Matcher m=p.matcher(time_list);
				time_list=m.replaceAll("\":\"");
				Matcher m1=p1.matcher(time_list);
				time_list=m1.replaceAll("\",\"");
				time_jso=JSONObject.fromObject(time_list);
			}
			
			
			if(!follow_num.equals("null")){
				follow_num="{\""+follow_num+"\"}";
				Matcher m=p.matcher(follow_num);
				follow_num=m.replaceAll("\":\"");
				Matcher m1=p1.matcher(follow_num);
				follow_num=m1.replaceAll("\",\"");
				follow_jso=JSONObject.fromObject(follow_num);
			}
			
			if(StringUtils.isNotEmpty(ready_hour_list)){
				ready_hour_list="{\""+ready_hour_list+"\"}";
				Matcher m=p.matcher(ready_hour_list);
				ready_hour_list=m.replaceAll("\":\"");
				Matcher m1=p1.matcher(ready_hour_list);
				ready_hour_list=m1.replaceAll("\",\"");
				readyHour_jso=JSONObject.fromObject(ready_hour_list);
			}
			
			if(StringUtils.isNotEmpty(tech_list)){
				String[] techarr=tech_list.split(",");
				for(String tech:techarr){
					Map<String,Object> data_cp=new HashMap<String,Object>();
					data_cp.putAll(data);
					String workshop=tech.split(":")[0];
					String tech_num=tech.split(":")[1];
					if(StringUtils.contains((String) workshops, workshop)){
						data_cp.put("workshop", workshop);
						data_cp.put("tech_num", tech_num);
						data_cp.put("tech_time", time_jso.get(workshop));
						data_cp.put("follow_num", follow_jso.get(workshop));
						//data_cp.put("follow_num", follow_num);
						data_cp.put("ready_hour", readyHour_jso.get(workshop));
						rows.add(data_cp);
					}
					
				}
			}
			
		}			
		Map<String, Object> result=new HashMap<String,Object>();
		totalCount -= (data_list.size()-rows.size());
		result.put("draw", conditionMap.get("draw"));
		result.put("total", totalCount);
		result.put("dataList", data_list);
		result.put("rows", rows);
		return result;
	}

	@Override
	public List<Map<String, Object>> queryTaskBusNumber(Map<String, Object> map) {
		return techDao.queryTaskBusNumber(map);
	}
	
	@Override
	public List<Map<String, Object>> queryTaskPreInfo(Map<String, Object> map) {
		return techDao.queryTaskPreInfo(map);
	}

	@Override
	@DataSource("dataSourceSlave")
	public Map<String, Object> checkTaskReport(Map<String, Object> conditionMap) {
		String tab_index = conditionMap.get("tab_index").toString();
		List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();;
		int totalCount = 0;
		if(tab_index.equals("1")){
			dataList = techDao.queryTechTaskReport(conditionMap);
			totalCount = techDao.queryTechTaskReportCount(conditionMap);
		}else{
			dataList = techDao.queryTechTaskReport2(conditionMap);
			totalCount = techDao.queryTechTaskReportCount2(conditionMap);
		}
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("rows", dataList);
		result.put("total", totalCount);
		return result;
	}

	@Override
	@DataSource("dataSourceSlave")
	public List<Map<String, Object>> queryChangeTypeReport(Map<String, Object> conditionMap) {
		return techDao.queryChangeTypeReport(conditionMap);
	}

	@Override
	@DataSource("dataSourceSlave")
	public int queryChangeTypeReportCount(Map<String, Object> conditionMap) {
		return techDao.queryChangeTypeReportCount(conditionMap);
	}

	@Override
	public void getTechtaskListByBus(String bus_number, ModelMap model) {
		List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();
		dataList=techDao.queryTechTaskFollowList(bus_number);
		model.put("data", dataList);
	}

	@Override
	@Transactional
	public void followTechTaskByBus(String bus_number, String tech_task_follow_ids,String staff_number,String curTime,ModelMap model) {
		List<Map<String, String>> taskList = new ArrayList<Map<String, String>>();
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("tech_task_follow_ids", tech_task_follow_ids);
		condMap.put("confirmor_id", staff_number);
		condMap.put("confirmor_date", curTime);
		
		try{		
		//更新跟进日期和跟进人
		techDao.updateTechTaskFollow(condMap);
		 //根据车号查询各工厂技改任务的技改跟进明细 
		taskList=techDao.queryTechTaskDetailByBus(bus_number);
		//更新BMS_TECH_TASK_DETAIL status_list字段
		techDao.updateTechTaskStatus(taskList);
		
		model.put("success", true);
		model.put("message","跟进成功！");
		}catch(Exception e){
			model.put("success", false);
			model.put("message","跟进失败！");
			throw new RuntimeException("技改跟进异常!"+e.getMessage());
		}
		
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Map<String, Object> querySingleTasklist(String conditions) {
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		int totalCount=techDao.queryTechTaskListCount(conditionMap);
		//int totalCount=0;
		List<Map<String,Object>> data_list=techDao.queryTechTaskList(conditionMap);	
		
		Map<String, Object> result=new HashMap<String,Object>();
		//Map<String, Object> result=new HashMap<String,Object>();
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", data_list);
		
		return result;
	}

	@Override
	public List<Map<String, String>> queryStaffWorkHours(Map<String, Object> conditionMap) {
		return techDao.queryStaffWorkHours(conditionMap);
	}
	
	@Override
	public List<Map<String, String>> queryBusNumberFollowList(Map<String, Object> conditionMap) {
		return techDao.queryBusNumberFollowList(conditionMap);
	}

	@Override
	public int saveWorkHourInfo(List<Map<String, Object>> swh_list) {
		return techDao.saveWorkHourInfo(swh_list);
	}

	@Override
	public int deleteWorkHourInfo(Map<String, String> conditionMap) {
		return techDao.deleteWorkHourInfo(conditionMap);
	}

	@Override
	public int batchUpdateWorkHour(List<Map<String, Object>> swh_list) {
		return techDao.batchUpdateWorkHour(swh_list);
	}

	@Override
	public void caculateEcnSalary(Map<String, Object> conditionMap) {
		techDao.caculateEcnSalary(conditionMap);
	}

	@Override
	public List<Map<String, String>> getBusNumberByOrder(Map<String, Object> conditionMap) {
		return techDao.getBusNumberByOrder(conditionMap);
	}

	@Override
	public int updateTechTaskPrice(Map<String, Object> conditionMap) {
		return techDao.updateTechTaskPrice(conditionMap);
	}

	@Override
	@Transactional
	public void updateBusNumberFollow(String task_id, String task_detail_id, String order_no, String factory,String workshop, String bus_number,String zzj_num,String bj_num) {
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("tech_task_id", task_id);
		conditionMap.put("task_detail_id", task_detail_id);
		conditionMap.put("order_no", order_no);
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		techDao.deleteBusFollow(conditionMap);
		
		List<Map<String, Object>> add_list = new ArrayList<Map<String, Object>>();
		JSONArray jsonArray = JSONArray.fromObject(bus_number);
		for (int i = 0; i < jsonArray.size(); i++) {
			//System.out.println("-->" + i + jsonArray.getString(i).toString());		
			Map<String, Object> map = new HashMap<String,Object>(); 
			map.put("tech_task_id", task_id);
			map.put("task_detail_id", task_detail_id);
			map.put("order_no", order_no);
			map.put("factory", factory);
			map.put("workshop", workshop);
			map.put("bus_number", jsonArray.getString(i).toString());
			add_list.add(map);
		}
		if(add_list.size() >0 ){
			//techDao.addBusFollow(add_list);
			techDao.insertTechFollowBus(add_list);
		}

		//重新计算总工时
		String time_list = techDao.getTaskTimeList(conditionMap);
		String[] time_list_arr = {};
		if(!StringUtils.isEmpty(time_list))time_list_arr = time_list.split(",");
		float total = 0;
		
		String tech_list_str = "";
		if(!zzj_num.equals("")){
			tech_list_str += "自制件:" + zzj_num + ",";
			for (int i = 0 ; i <time_list_arr.length ; i++ ) {
				String time = time_list_arr[i];
				String time_workshop = time.substring(0, time.indexOf(":"));
				if(time_workshop.equals("自制件")){
					total += Float.valueOf(zzj_num) * Float.valueOf(time.substring(time.indexOf(":")+1, time.length()));
				}
			}
		}
		if(!bj_num.equals("")){
			tech_list_str += "部件:" + bj_num + ",";
			for (int i = 0 ; i <time_list_arr.length ; i++ ) {
				String time = time_list_arr[i];
				String time_workshop = time.substring(0, time.indexOf(":"));
				if(time_workshop.equals("部件")){
					total += Float.valueOf(bj_num) * Float.valueOf(time.substring(time.indexOf(":")+1, time.length()));
				}
			}
		}
		List<Map<String, Object>> tech_list = new ArrayList<Map<String, Object>>();
		tech_list = techDao.getTaskTechList(conditionMap);
		for(Map<String, Object> tech :tech_list){
			tech_list_str += tech.get("workshop") + ":" + tech.get("follow_num") + ",";

			for (int i = 0 ; i <time_list_arr.length ; i++ ) {
				String time = time_list_arr[i];
				String time_workshop = time.substring(0, time.indexOf(":"));
				if(time_workshop.equals(tech.get("workshop"))){
					total += Float.valueOf(tech.get("follow_num").toString()) * Float.valueOf(time.substring(time.indexOf(":")+1, time.length()));
				}
			}
		}
		
		//System.out.println(tech_list_str.substring(0, tech_list_str.length()-1));
		Map<String, Object> map = new HashMap<String,Object>(); 
		map.put("task_detail_id", task_detail_id);
		map.put("tech_list", tech_list_str.substring(0, tech_list_str.length()-1));
		map.put("time_total", total);
		techDao.updateTaskTechList(map);
	}
		
}
