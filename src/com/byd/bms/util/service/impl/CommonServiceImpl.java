package com.byd.bms.util.service.impl;

import java.lang.reflect.Array;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.snaker.engine.access.Page;
import org.snaker.engine.access.QueryFilter;
import org.snaker.engine.entity.WorkItem;
import org.snaker.engine.model.TaskModel.TaskType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.byd.bms.order.dao.IReviewDao;
import com.byd.bms.order.model.BmsOrderReviewResults;
import com.byd.bms.snaker.engine.SnakerEngineFacets;
import com.byd.bms.util.DataSource;
import com.byd.bms.util.dao.ICommonDao;
import com.byd.bms.util.model.BmsBaseProcess;
import com.byd.bms.util.model.BmsBaseTask;
import com.byd.bms.util.service.ICommonService;
@Service
@DataSource("dataSourceMaster")
public class CommonServiceImpl implements ICommonService {
	@Resource
	private ICommonDao commonDao;
	@Autowired
	private SnakerEngineFacets facets;
	@Autowired
	private IReviewDao reviewDao;
	@Autowired 
	protected HttpSession session;
	@Override
	public List<Map<String, Object>> getOrderFuzzySelect(Map<String, Object> condMap) {
		List<Map<String, Object>> orderlist=commonDao.queryOrderList(condMap);
		return orderlist;
	}
	@Override
	public List<Map<String, Object>> getFactorySelect(Map<String, Object> condMap) {
		List<Map<String, Object>> factoryList=commonDao.queryFactoryList(condMap);
		return factoryList;
	}
	@Override
	public List<Map<String, Object>> getBusTypeSelect() {
		List<Map<String, Object>> busTypeList=commonDao.queryBusTypeList();
		return busTypeList;
	}
	@Override
	public List<Map<String, Object>> getKeysSelect(String keyCode) {
		List<Map<String, Object>> keylist=commonDao.queryKeysList(keyCode);
		return keylist;
	}
	@Override
	public List<Map<String, Object>> getDepartmentByFactory(String factory_id) {
		List<Map<String, Object>> departmentList=commonDao.queryDepartmentByFactory(factory_id);
		return departmentList;
	}
	@Override
	public List<String> getAllRoleAuthority() {
		List<String> datalist = commonDao.getAllRoleAuthority();
		return datalist;
	}
	@Override
	public List<String> getRoleAuthority(String staff_number) {
		List<String> datalist = commonDao.getRoleAuthority(staff_number);
		return datalist;
	}
	@Override
	public List<Map<String, Object>> getWorkshopSelect( Map<String, Object> condMap) {
		List<Map<String, Object>> workshopList=commonDao.queryWorkshopList(condMap);
		return workshopList;
	}
	@Override
	public List<Map<String, Object>> getFactorySelectAuth(Map<String, Object> condMap) {
		List<Map<String, Object>> factoryList=commonDao.queryFactoryListAuth(condMap);
		return factoryList;
	}
	@Override
	public List<Map<String, Object>> getWorkshopSelectAuth(Map<String, Object> condMap) {
		List<Map<String, Object>> workshopList=commonDao.queryWorkshopListAuth(condMap);
		return workshopList;
	}
	@Override
	public List<Map<String, String>> getAllReasonType() {
		return commonDao.getAllReasonType();
	}
	@Override
	public List<Map<String, Object>> getLineSelect() {
		
		return commonDao.queryLineList();
	}
	@Override
	public List<Map<String, Object>> getLineSelectAuth(
			Map<String, Object> condMap) {
		
		return commonDao.queryLineListAuth(condMap);
	}
	@Override
	public List<BmsBaseProcess> queryProcessList(Map<String, Object> condMap) {
		return commonDao.queryProcessList(condMap);
	}
	@Override
	public List<Map<String, String>> getWorkshopSelect_Key() {
		return commonDao.getWorkshopSelect_Key();
	}
	@Override
	public List<Map<String, Object>> getOrderConfigSelect(String order_id) {
		return commonDao.queryOrderConfigList(order_id);
	}
	@Override
	public List<Map<String, String>> getPartsSelect(String parts) {
		return commonDao.getPartsSelect(parts);
	}
	@Override
	public List<Map<String, String>> getBusNumberList(String bus_input) {
		return commonDao.queryBusNumberList(bus_input);
	}
	@Override
	public List<Map<String, Object>> getWorkgroupSelect(
			Map<String, Object> condMap) {
		return commonDao.queryWorkgroupList(condMap);
	}
	@Override
	public List<Map<String, Object>> getWorkgroupSelectAll(
			Map<String, Object> condMap) {
		return commonDao.queryWorkgroupListAll(condMap);
	}
	@Override
	public List<Map<String, String>> getUserInfoByCard(String card_no) {
		return commonDao.getUserInfoByCard(card_no);
	}
	@Override
	public void getIndexOrderData(String actYear,ModelMap model) {
		model.put("data", commonDao.queryIndexOrderData(actYear));		
	}
	@Override
	public void getIndexFactoryDailyData(Map<String, Object> condMap,
			ModelMap model) {
		model.put("data", commonDao.queryIndexFactoryDailyData(condMap));			
	}
	@Override
	public Map<String, Object> getTaskList(Map<String, Object> condMap) {
		Map<String, Object> result=new HashMap<String, Object>();
		List taskList=new ArrayList<BmsBaseTask>();
		// 获取评审任务
        String[] assignees = new String[]{(String)condMap.get("user_id")};
		Page<WorkItem> majorPage = new Page<WorkItem>(100);
		List<WorkItem> majorWorks = facets.getEngine().query().getWorkItems(majorPage, new QueryFilter()
				.setOperators(assignees).setTaskType(TaskType.Major.ordinal()));
		Map<String, Object> map=new HashMap<String, Object>();
		String url="snaker/flow/all";
		int count=0;
		for(WorkItem majorWork : majorWorks){
			//WorkItem majorWork=majorWorks.get(0);
			map.put("wfOrderId", majorWork.getOrderId());
			BmsOrderReviewResults review=reviewDao.getOrderReview(map);
			if(review!=null){
				BmsBaseTask task=new BmsBaseTask();
				String params="?processId="+review.getWfProcessId()+"&orderId="+majorWork.getOrderId()
						+"&taskId="+majorWork.getTaskId()+"&reviewResultId="+review.getId()
						+"&factoryId="+review.getFactoryId()+"&orderNo="+review.getOrderNo();
				task.setUrl(url);
				task.setParams(params);
				task.setCount("1");
				task.setFinish_count("0");
				task.setTask_type_name(majorWork.getTaskName()+review.getOrderNo()+" "+review.getFactoryCode());
				task.setPercent("0");
				taskList.add(task);
				count++;
			}
			
		}
		// 获取其他任务
		List<Map<String,Object>> otherTaskList=commonDao.queryTaskList(condMap);
		for(Map m : otherTaskList){
			BmsBaseTask task=new BmsBaseTask();
			task.setUrl((String)m.get("url"));
			task.setParams((String)m.get("param"));
			String countstr=String.valueOf(m.get("count"));
			task.setCount(countstr.substring(0,countstr.indexOf(".")));
			String finishcountStr=String.valueOf(m.get("finish_count"));
			task.setFinish_count(finishcountStr.substring(0,finishcountStr.indexOf(".")));
			if((String)m.get("factory_code")!=null){
				task.setTask_type_name((String)m.get("task_type")+" "+(String)m.get("factory_code"));
			}else{
				task.setTask_type_name((String)m.get("task_type"));
			}
			
			NumberFormat numberFormat = NumberFormat.getInstance();

			// 设置精确到小数点后2位

			numberFormat.setMaximumFractionDigits(0);

			String percent = numberFormat.format(Double.parseDouble(finishcountStr) / Double.parseDouble(countstr) * 100);
			task.setPercent(percent);
			taskList.add(task);
			count++;
		}
		result.put("datalist", taskList);
		result.put("count", count);
		return result;
	}
	// /**往当前任务表 BMS_BASE_TASK 中新增一个新任务*/
    public int createTask(String task_type,String count,String param,String factoryCode){
    	int result=0;
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		Map conditionMap=new HashMap<String,Object>();
		conditionMap.put("task_type", task_type);
		conditionMap.put("param", param);
		List<Map<String,Object>> taskList=commonDao.queryTaskList(conditionMap);
		// 如果BMS_BASE_TASK 存在未完成的任务
		if(taskList.size()>0){  
			Map<String,Object> taskMap=taskList.get(0);
			// 任务类型task_type与参数param都相同  任务数在该记录上累加 将count加 1
			String exeistParam=taskMap.get("param")!=null ?((String)taskMap.get("param")).trim() : "";
			String exeistTasktype=taskMap.get("task_type")!=null ?((String)taskMap.get("task_type")).trim() : "";
			if(param.equals(exeistParam) && task_type.equals(exeistTasktype)){
				Map<String,Object> task=new HashMap<String,Object>();
				task.put("id",(String)taskMap.get("id"));
				task.put("count",count);
				task.put("task_type_name",task_type);
				task.put("editor_id", Integer.parseInt(userid));
				task.put("edit_date", curTime);
				commonDao.updateTask(task);
			}else{ // 新增一条记录
				Map map=commonDao.queryTaskType(conditionMap);
				if(map!=null && !map.isEmpty()){
					map.put("count", count);
					map.put("finish_count", "0");
					map.put("editor_id", Integer.parseInt(userid));
					map.put("edit_date", curTime);
					map.put("param", param);
					map.put("factory_code", factoryCode);
					result=commonDao.addTask(map);
				}
			}			
		}else{ // 如果BMS_BASE_TASK的任务 都已完成，重新new一个task，新增一条记录
			Map map=commonDao.queryTaskType(conditionMap);
			if(map!=null && !map.isEmpty()){
				map.put("count", count);
				map.put("finish_count", "0");
				map.put("editor_id", Integer.parseInt(userid));
				map.put("edit_date", curTime);
				map.put("param", param);
				map.put("factory_code", factoryCode);
				result=commonDao.addTask(map);
			}
		}
    	return result;
    }
 // /**更新任务表 BMS_BASE_TASK*/
    public int updateTask(String task_type,String finish_count){
    	int result=0;
		Map conditionMap=new HashMap<String,Object>();
		conditionMap.put("task_type", task_type);
		List<Map<String,Object>> list=commonDao.queryTaskList(conditionMap);
		if(list.size()>0){
			Map m=list.get(0);
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String curTime = df.format(new Date());
			String userid=String.valueOf(session.getAttribute("user_id"));
			Map<String,Object> task=new HashMap<String,Object>();
			task.put("id",(String)m.get("id"));
			task.put("finish_count",finish_count);
			task.put("task_type_name",task_type);
			task.put("handler", Integer.parseInt(userid));
			task.put("finish_date", curTime);
			result=commonDao.updateTask(task);
		}
    	return result;
    }
    
    /**
     * @author xiong.jianwu
     * @param factory_id
     * @param model
     */
	@Override
	public void getIndexFactoryPrdOrdData(String factory_id, ModelMap model) {
		List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
/*		 DecimalFormat df = new DecimalFormat("#.00");*/
		datalist=commonDao.queryIndexFactoryPrdOrdData(factory_id);
		model.put("data", datalist);
	}
	
	/**
	 * @author xiong.jianwu
	 */
	@Override
	public void getIndexOutputData(String actYear, ModelMap model) {
		List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> datalist_f=new ArrayList<Map<String,Object>>();
		datalist=commonDao.queryIndexOutputData_Bustype(actYear);
		datalist_f=commonDao.queryIndexOutputData_Factory(actYear);
		String[] factory_data={"","","","","","","","","","","",""};
		List<Map<String,Object>> series=new ArrayList<Map<String,Object>>();
		for(Map<String,Object> m :datalist){
			int[] a= {0,0,0,0,0,0,0,0,0,0,0,0};
			Map<String,Object> serie=new HashMap<String,Object>();
			serie.put("name", m.get("bus_type"));
			String month_count=m.get("month_count").toString();
			for(String s:month_count.split(",")){
				int month=Integer.parseInt(s.split(":")[0]);
				int finished_qty=Integer.parseInt(s.split(":")[1]);
				a[month-1]=finished_qty;
			}
			serie.put("data", a);
			series.add(serie);
		}
		
		for(Map<String,Object> m:datalist_f){
			int month=Integer.parseInt(m.get("month").toString());
			factory_data[month-1]=m.get("factory_count").toString();
		}
		model.put("series", series);
		model.put("factory_data", factory_data);
		
	}
	/***
	 * @author xiong.jianwu
	 */
	@Override
	public void getIndexExceptionData(String factory, ModelMap model) {
		List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
		datalist=commonDao.queryIndexExceptionData(factory);
		model.put("data", datalist);
	}
	/**
	 * @author xiong.jianwu
	 */
	@Override
	public void getIndexStaffCountData(ModelMap model) {
		List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> datalist_f=new ArrayList<Map<String,Object>>();
		datalist=commonDao.queryIndexStaffCountData();
		datalist_f=commonDao.queryIndexStaffCountData_Factory();
		model.put("series", datalist);
		model.put("factory_data", datalist_f);
	}
	/**
	 * @author xiong.jianwu
	 */
	@Override
	public void getProductionIndexData(Map<String,Object>condMap, ModelMap model) {
		List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
		datalist=commonDao.queryProductionIndexData(condMap);
		model.put("data", datalist);	
	}
	/**
	 * @author xiong.jianwu
	 */
	@Override
	public void getMonitorBoardInfo(Map<String, Object> conditionMap, ModelMap model) {
		Map<String, Object> conditionMap1 = new HashMap<String, Object>();
		Map<String, Object> conditionMap2 = new HashMap<String, Object>();
		Map<String, Object> conditionMap3 = new HashMap<String, Object>();
		Map<String, Object> conditionMap4 = new HashMap<String, Object>();
		Map<String, Object> conditionMap5 = new HashMap<String, Object>();
		conditionMap1.putAll(conditionMap);
		conditionMap1.put("workshop", "焊装");
		conditionMap2.putAll(conditionMap);
		conditionMap2.put("workshop", "涂装");
		conditionMap3.putAll(conditionMap);
		conditionMap3.put("workshop", "底盘");
		conditionMap4.putAll(conditionMap);
		conditionMap4.put("workshop", "总装");
		conditionMap5.putAll(conditionMap);
		conditionMap5.put("workshop", "检测线");
		model.put("exceptionList", commonDao.getIndexExceptionList(conditionMap));
		model.put("weldingList", commonDao.getIndexWorkshopProduction(conditionMap1));
		model.put("paintingList", commonDao.getIndexWorkshopProduction(conditionMap2));
		model.put("bottomList", commonDao.getIndexWorkshopProduction(conditionMap3));
		model.put("assemblyList", commonDao.getIndexWorkshopProduction(conditionMap4));
		model.put("testlineList", commonDao.getIndexWorkshopProduction(conditionMap5));
		model.put("dupList", commonDao.queryIndexDpuData(conditionMap1));
		model.put("passRateList", commonDao.queryIndexPassRateData(conditionMap1));
		model.put("productionInfo", commonDao.getProductionSearch(conditionMap));
		model .put("partsBalance", commonDao.getPartsBalance(conditionMap));
		model.put("pauseList", commonDao.getPauseList(conditionMap));
		
	}	

	
}
