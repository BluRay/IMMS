package com.byd.bms.report.controller;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.byd.bms.report.service.IReportService;
import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/report")
public class ReportController extends BaseController {
	static Logger logger = Logger.getLogger(ReportController.class.getName());
	@Autowired
	private IReportService reportService;
	
	/************************* xjw start *****************************/
	/**
	 * 工厂年度产量
	 * @return
	 */
	@RequestMapping("/factoryOutputYear")
	public ModelAndView factoryOutputYear(){
		mv.setViewName("report/factoryOutputYear");
		return mv;
	}
	
	@RequestMapping("/factoryOutputReport")
	public ModelAndView factoryOutputReport(){
		mv.setViewName("report/factoryOutputReport");
		return mv;
	}

	@RequestMapping("/dpuReport")
	public ModelAndView dpuReport(){			//报表 单车缺陷数(DPU)
		mv.setViewName("report/dpuReport");
		return mv;
	}
	
	@RequestMapping("/passRateReport")
	public ModelAndView passRateReport(){		//报表 一次交检合格率
		mv.setViewName("report/passRateReport");
		return mv;
	}
	
	@RequestMapping("/processProblemReport")	//报表 制程问题严重等级分布报表
	public ModelAndView processProblemReport(){
		mv.setViewName("report/processProblemReport");
		return mv;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getDPUReportData")
	@ResponseBody
	public ModelMap getDPUReportData() throws ParseException{
		Map<String, Object> result = new HashMap<String, Object>();
		String conditions = request.getParameter("conditions");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		String sdate=(String) conditionMap.get("startDate");
		String edate=(String) conditionMap.get("endDate");
		//查询维度为日,将查询日期范围内的所有日期添加到list中
		if(conditionMap.get("queryItem").equals("day")){			
			result.put("itemList", this.getDateList(sdate, edate));
		}
		//查询维度为周，获取日期范围内周数
		if(conditionMap.get("queryItem").equals("week")){			
			result.put("itemList",this.getWeekList(sdate, edate));
		}
		//查询维度为月，获取日期范围内详细月列表
		if(conditionMap.get("queryItem").equals("month")){
			result.put("itemList", this.getMonthList(sdate, edate));
		}
		
		result.put("chartList", reportService.queryDPUData(conditionMap));
				
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getDPUReportDetail")
	@ResponseBody
	public ModelMap getDPUReportDetail(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		Map<String, Object> result = new HashMap<String, Object>();
		String conditions = request.getParameter("conditions");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		
		result = reportService.queryDPUDetail(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getPassRateReportData")
	@ResponseBody
	public ModelMap getPassRateReportData() throws ParseException{
		Map<String, Object> result = new HashMap<String, Object>();
		String conditions = request.getParameter("conditions");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		String sdate=(String) conditionMap.get("startDate");
		String edate=(String) conditionMap.get("endDate");
		//查询维度为日,将查询日期范围内的所有日期添加到list中
		if(conditionMap.get("queryItem").equals("day")){			
			result.put("itemList", this.getDateList(sdate, edate));
		}
		//查询维度为周，获取日期范围内周数
		if(conditionMap.get("queryItem").equals("week")){			
			result.put("itemList",this.getWeekList(sdate, edate));
		}
		//查询维度为月，获取日期范围内详细月列表
		if(conditionMap.get("queryItem").equals("month")){
			result.put("itemList", this.getMonthList(sdate, edate));
		}
		result.put("chartList", reportService.queryPassRateData(conditionMap));

		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getPassRateDetail")
	@ResponseBody
	public ModelMap getPassRateDetail(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		Map<String, Object> result = new HashMap<String, Object>();
		String conditions = request.getParameter("conditions");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		
		result = reportService.queryPassRateDetail(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getProcessProblemReportData")
	@ResponseBody
	public ModelMap getProcessProblemReportData(){
		Map<String, Object> result = new HashMap<String, Object>();
		String conditions = request.getParameter("conditions");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		result.put("chartList", reportService.queryProcessProblemData(conditionMap));

		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	
	/**
	 * 获取日期范围内所有日期
	 * @param sdate
	 * @param edate
	 * @return
	 * @throws ParseException
	 */
	private List<String> getDateList(String sdate, String edate) throws ParseException {
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(sdate);
		startCalendar.setTime(startDate);
		Date endDate = df.parse(edate);
		endCalendar.setTime(endDate);
		List<String> datelist=new ArrayList<String>();
		while (true) {
			if (startCalendar.getTimeInMillis() <= endCalendar.getTimeInMillis()) {
				datelist.add(df.format(startCalendar.getTime()));
			} else {
				break;
			}
			startCalendar.add(Calendar.DAY_OF_MONTH, 1);
		}
		return datelist;
	}
	private List getWeekList(String sdate, String edate) throws ParseException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		startCalendar.setTime(df.parse(sdate));
		endCalendar.setTime(df.parse(edate));
		int s_week = startCalendar.get(Calendar.WEEK_OF_YEAR);
		int e_week = endCalendar.get(Calendar.WEEK_OF_YEAR);
		int weekcount=1;
		List weeklist=new ArrayList();
		while(weekcount<=(e_week-s_week+1)){
			weeklist.add(weekcount);
			weekcount+=1;
		}
		return weeklist; 
	}
	private List getMonthList(String sdate, String edate) throws ParseException{
		List monthlist=new ArrayList();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		startCalendar.setTime(df.parse(sdate));
		endCalendar.setTime(df.parse(edate));
		int s_month = startCalendar.get(Calendar.MONTH)+1;
		int e_month = endCalendar.get(Calendar.MONTH)+1;
		while(s_month<=e_month){
			monthlist.add(s_month);
			s_month+=1;
		}
		return monthlist;
	}
	
	/**
	 * 工厂年度产量报表数据查询
	 * @return
	 */
	@RequestMapping("/getFactoryOutputYearData")
	@ResponseBody
	public ModelMap getFactoryOutputYearData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		model.put("straw", request.getParameter("straw"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("year", request.getParameter("year"));
		
		reportService.getFactoryOutputYear(condMap, model);
		
		return model;
	}
	
	/**
	 * 工厂月计划达成
	 * @return
	 */
	@RequestMapping("/factoryPlanRate")
	public ModelAndView factoryPlanRate(){
		mv.setViewName("report/factoryPlanRate");
		return mv;
	}
	
	/**
	 * 工厂年度产量报表数据查询
	 * @return
	 */
	@RequestMapping("/getFactoryPlanRateData")
	@ResponseBody
	public ModelMap getFactoryPlanRateData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		model.put("straw", request.getParameter("straw"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("factory_name", request.getParameter("factory_name"));
		condMap.put("month", request.getParameter("month"));
		
		reportService.getFactoryPlanRateData(condMap, model);
		
		return model;
	}
	
	/************************* xjw end *****************************/
	
	/**
	 * 焊装、底盘上下线完成情况
	 * @return
	 */
	@RequestMapping("/onlineAndOfflineReport")
	public ModelAndView onlineAndOfflineReport(){
		mv.setViewName("report/onlineAndOfflineReport");
		return mv;
	}
	@RequestMapping("/getOnlineAndOfflineData")
	@ResponseBody
	public ModelMap getOnlineAndOfflineData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String start_date=request.getParameter("start_date");
		String end_date=request.getParameter("end_date");
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("start_date", start_date);
		condMap.put("end_date", end_date);
		reportService.getOnlineAndOfflineData(condMap, model);
		
		return model;
	}
	/**
	 * 车间计划达成率
	 * @return
	 */
	@RequestMapping("/workshopRateReport")
	public ModelAndView workshopRateReport(){
		mv.setViewName("report/workshopRateReport");
		return mv;
	}
	@RequestMapping("/getWorkshopRateData")
	@ResponseBody
	public ModelMap getWorkshopRateData() throws ParseException, UnsupportedEncodingException{
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		//计划数量
		List datalist=new ArrayList();
		datalist = reportService.queryPlanQty(conditionMap);
		
		List plan_code=new ArrayList();
		java.text.DecimalFormat   df = new   java.text.DecimalFormat("##.##"); 
		for (int i = 0; i < datalist.size(); i++) {			
	        Map<String,Object> resultMap=new HashMap<String,Object>();
			resultMap = (Map<String, Object>) datalist.get(i);
			
			Map<String,Object> conditionMap2=new HashMap<String,Object>();
			conditionMap2.put("factory_id", request.getParameter("factory_id"));
			
			String start_date = request.getParameter("start_date");
			conditionMap2.put("start_date", start_date);
			conditionMap2.put("end_date", request.getParameter("end_date"));
			
			Map<String,Object> conditionMap3=new HashMap<String,Object>();
			Map<String,Object> conditionMap4=new HashMap<String,Object>();
			
			if (resultMap.get("key_name").equals("焊装下线"))conditionMap2.put("workshop", "welding_offline_date");
			if (resultMap.get("key_name").equals("涂装下线"))conditionMap2.put("workshop", "painting_offline_date");
			if (resultMap.get("key_name").equals("底盘下线"))conditionMap2.put("workshop", "chassis_offline_date");
			if (resultMap.get("key_name").equals("总装下线"))conditionMap2.put("workshop", "assembly_offline_date");
			if (resultMap.get("key_name").equals("车辆入库"))conditionMap2.put("workshop", "warehousing_date");
			
			if (resultMap.get("key_name").equals("部件下线")){
				conditionMap3.put("factory_id", request.getParameter("factory_id"));
				conditionMap3.put("start_date", request.getParameter("start_date"));
				conditionMap3.put("end_date", request.getParameter("end_date"));
				conditionMap3.put("workshop", "offline_real_qty");
		
				int realNum = reportService.getPlanPartsRealCount(conditionMap3);
				resultMap.put("real_qty", realNum);
				double count = Double.parseDouble(realNum+"");
				int plan_qty = Integer.parseInt(resultMap.get("plan_qty").toString());
				double rate = Double.parseDouble(df.format(count/plan_qty*100));
				resultMap.put("rate", rate);
				
			}else if (resultMap.get("key_name").equals("自制下线")){
				conditionMap4.put("factory_id", request.getParameter("factory_id"));
				conditionMap4.put("start_date", request.getParameter("start_date"));
				conditionMap4.put("end_date", request.getParameter("end_date"));
				int realNum = reportService.getPlanZzjRealCount(conditionMap4);
				resultMap.put("real_qty", realNum);
				double count = Double.parseDouble(realNum+"");
				int plan_qty = Integer.parseInt(resultMap.get("plan_qty").toString());
				double rate = Double.parseDouble(df.format(count/plan_qty*100));
				resultMap.put("rate", rate);
				
			}else{
				plan_code.add(conditionMap2);
			}	
		}
		//完成数量
		List result=new ArrayList();
		if(plan_code.size()>0){
			result = reportService.getPlanSearchRealCount(plan_code);
		}
		
		int x =0;
		for (int i = 0; i < datalist.size(); i++) {
			
			Map<String,Object> resultMap=new HashMap<String,Object>();
			resultMap = (Map<String, Object>) datalist.get(i);
			if (!resultMap.get("key_name").equals("部件下线")&&!resultMap.get("key_name").equals("自制下线")){
				Map<String,Long> resultMap2=new HashMap<String,Long>();
				resultMap2 = (Map<String, Long>) result.get(x);	
				
				resultMap.put("real_qty", resultMap2.get("count"));
				double count = Double.parseDouble(resultMap2.get("count").toString());
				int plan_qty = Integer.parseInt(resultMap.get("plan_qty").toString());
				double rate = (plan_qty==0&&count>0.0)?100:((plan_qty==0&&count==0.0)?null:Double.parseDouble(df.format(count/plan_qty*100)));
				resultMap.put("rate", rate);
				//System.out.println(resultMap.get("key_name")+" 达成率："+rate);
				x++;
			}
			
		}
		
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "success", true);   
        map.put( "data",datalist);
        JSONArray jsonObject = JSONArray.fromObject(datalist);
		mv.getModelMap().addAllAttributes(jsonObject);
        model.put("data", jsonObject);
		return model;
	}
	@RequestMapping("/showFactoryOutputReportData")
	@ResponseBody 
	public ModelMap showFactoryOutputReportData(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("date_array", request.getParameter("date_array"));
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		
		List<Map<String, Object>> datalist  = reportService.showFactoryOutputReportData(conditionMap);		
		Map<String,Object> list = new HashMap<String,Object>();
		list.put("rows", datalist);
		list.put("total", 0);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	/**
	 * 工厂计划达成率排名
	 * @return
	 */
	@RequestMapping("/factoryRateRankReport")
	public ModelAndView factoryRateRankReport(){
		mv.setViewName("report/factoryRateRankReport");
		return mv;
	}
	// 工厂计划达成率排名报表数据Data
	@RequestMapping("/getfactoryRateRankData")
	@ResponseBody
	public ModelMap getfactoryRateRankData(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		String start_date = request.getParameter("start_date");
		String end_date = request.getParameter("end_date");
		conditionMap.put("start_date", start_date);
		conditionMap.put("end_date", end_date);
        List plan_code=new ArrayList();
        String [] arr={"welding_online_date","welding_offline_date",
        	"painting_online_date","painting_offline_date",
        	"chassis_online_date","chassis_offline_date",
        	"assembly_online_date","assembly_offline_date","warehousing_date"};
		
		for(String str : arr){
			Map<String,Object> conditionMap2=new HashMap<String,Object>();
			conditionMap2.put("start_date", start_date);
			conditionMap2.put("end_date", end_date);
			conditionMap2.put("workshop", str);
			plan_code.add(conditionMap2);
		}
		reportService.getFactoryRateRankData(conditionMap, plan_code, model);
		return model;
	}
	/**
	 * 标准人力报表
	 * @return
	 */
	@RequestMapping("/standardHumansReport")
	public ModelAndView standardHumansReport(){
		mv.setViewName("report/standardHumansReport");
		return mv;
	}
	// 标准人力报表Data
	@RequestMapping("/getStandardHumansReportData")
	@ResponseBody
	public ModelMap getStandardHumansReportData(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		String date = request.getParameter("date");
		String factory = request.getParameter("factory");
		conditionMap.put("date", date);
		conditionMap.put("factory", factory);
		reportService.getStandardHumanReportData(conditionMap, model);
		return model;
	}
}
