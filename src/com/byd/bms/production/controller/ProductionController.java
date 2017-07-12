package com.byd.bms.production.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.production.model.ProductionException;
import com.byd.bms.production.service.IProductionService;
import com.byd.bms.util.controller.BaseController;
import com.byd.bms.util.model.BmsBaseUser;
/**
 * 生产模块Controller
 * @author xiong.jianwu 2017/5/2
 *
 */
@Controller
@RequestMapping("/production")
public class ProductionController extends BaseController {
	static Logger logger = Logger.getLogger(ProductionController.class.getName());
	@Autowired
	protected IProductionService productionService;

	/****************************  xiongjianwu ***************************/
	/**
	 * 生产模块首页
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(){
		mv.setViewName("production/productionIndex");
		return mv;
	}
	
	/**
	 * 车间工序页面
	 * @return
	 */
	@RequestMapping("/executionindex")
	public ModelAndView executionindex(){
		mv.getModelMap().addAttribute("workshop", request.getParameter("workshop"));
		mv.setViewName("production/executionIndex");
		return mv;
	}
	
	/**
	 * 获取线别工序列表
	 * @return
	 */
	@RequestMapping("/getLineProcessList")
	@ResponseBody
	public ModelMap getLineProcessList(){
		model=new ModelMap();
		String conditions=request.getParameter("conditions");
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();	
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		model.put("dataList", productionService.getLineProcessList(conditionMap));
		
		return model;
	}
	
	/**
	 * 生产扫描页面
	 * @return
	 */
	@RequestMapping("/execution")
	public ModelAndView execution(){
		mv.setViewName("production/productionExecution");
		return mv;
	}
	
	/**
	 * 生产扫描页面(移动端)
	 * @return
	 */
	@RequestMapping("/execution_mobile")
	public ModelAndView execution_mobile(){
		mv.setViewName("production/productionExecution_Mobile");
		return mv;
	}
	
	@RequestMapping("/productionsearch")
	public ModelAndView productionsearch(){
		mv.setViewName("production/productionsearch");
		return mv;
	}
	
	/**
	 * 查询监控工序下拉列表
	 * @return
	 */
	@RequestMapping("/getProcessMonitorSelect")
	@ResponseBody
	public ModelMap getProcessMonitorSelect(){
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("workshop", request.getParameter("workshop"));
		condMap.put("line", request.getParameter("line"));
		condMap.put("order_type", request.getParameter("order_type"));
		model=new ModelMap();
		model.put("data", productionService.getProcessMonitorSelect(condMap));
		return model;
	}
	
	/**
	 * 车辆扫描后获取车辆信息（订单、车间、线别、当前工序、状态、颜色、订单配置信息）
	 * @return
	 */
	@RequestMapping("/getBusInfo")
	@ResponseBody
	public ModelMap getBusInfo(){
		model=new ModelMap();
		//封装查询条件
		String bus_number=request.getParameter("bus_number");
/*		String factory=request.getParameter("factory");
		String workshop=request.getParameter("workshop");
		String line=request.getParameter("line");
		*/
		//查询车辆基本信息
		Map<String,Object> businfo=new HashMap<String,Object>();
		businfo=productionService.getBusInfo(bus_number);
		if(businfo==null){
			model.put("businfo", null);
			model.put("nextProcess", null);
		}else{
			Map<String,Object> condMap=new HashMap<String,Object>();
			condMap.put("factory_name", businfo.get("factory"));
			condMap.put("order_type", businfo.get("order_type"));
			condMap.put("process_name", businfo.get("process_name"));
			Map<String,Object> nextProcess=productionService.getNextProcess(condMap);
			model.put("businfo", businfo);
			model.put("nextProcess", nextProcess);
		}
				
/*		//根据车辆所属订单类型、工厂、车间、线别查询监控工序列表
		if(businfo!=null&&!businfo.isEmpty()&&businfo.containsKey("factory_name")){
			String factory=(String) businfo.get("factory_name");
			String workshop=(String) businfo.get("workshop");
			String line=(String) businfo.get("line");
			String order_type=(String) businfo.get("order_type");
			Map<String,Object> condMap=new HashMap<String,Object>();
			condMap.put("factory", factory);
			condMap.put("workshop", workshop);
			condMap.put("line", line);
			condMap.put("order_type", order_type);
			model.put("processList", productionService.getProcessMonitorSelect(condMap));
		}	*/
		
		//查询订单配置信息
		if(businfo!=null&&!businfo.isEmpty()&&businfo.containsKey("order_config_id")){
			String order_config_id=String.valueOf(businfo.get("order_config_id"));
			model.put("configList", productionService.getOrderConfigList(order_config_id));
		}
		
		return model;
	}
	

	/**
	 * 根据车号、工厂、车间、工序、订单、车型、配置查询关键零部件列表
	 * @return
	 */
	@RequestMapping("/getKeyParts")
	@ResponseBody
	public ModelMap getKeyParts(){	
		model=new ModelMap();
		int factory_id=Integer.parseInt(request.getParameter("factory_id"));
		String workshop=(String)  request.getParameter("workshop");
		int order_id=Integer.parseInt(request.getParameter("order_id"));
		int order_config_id=Integer.parseInt(request.getParameter("order_config_id"));
		int bus_type_id=Integer.parseInt(request.getParameter("bus_type_id"));
		String processName=(String)  request.getParameter("process_name");
		String bus_number=request.getParameter("bus_number");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory_id", factory_id);
		condMap.put("workshop", workshop);
		condMap.put("order_id", order_id);
		condMap.put("order_config_id", order_config_id);
		condMap.put("bus_type_id", bus_type_id);
		condMap.put("process_name", processName);
		condMap.put("bus_number", bus_number);
		model.put("partsList", productionService.getKeyParts(condMap));
					
		return model;	
	}
	
	/**
	 * 车辆扫描，判断该工序是否有扫描记录，未扫描判断上一个计划节点是否有扫描记录，无则提示先扫描上一个计划节点
	 * 保存扫描信息、关键零部件信息、更新bus表对应车辆的latest_process_id
	 * @return
	 */
	@RequestMapping("/enterExecution")
	@ResponseBody
	public ModelMap enterExecution(){
		model=new ModelMap();
		Map<String,Object> condMap=new HashMap<String,Object>();
		/**
		 * 封装service 参数
		 */
		int factory_id=Integer.parseInt(request.getParameter("factory_id"));
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		int process_id=Integer.parseInt(request.getParameter("process_id"));
		String process_name=request.getParameter("process_name");
		String process_number=request.getParameter("process_number");
		String line_name=request.getParameter("line_name");
		String plan_node_name=request.getParameter("plan_node_name");
		String field_name=request.getParameter("field_name");
		String bus_number=request.getParameter("bus_number");
		String parts_list_str=request.getParameter("parts_list");
		String order_type=request.getParameter("order_type");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		
		condMap.put("factory_id", factory_id);
		condMap.put("factory_name", factory_name);
		condMap.put("workshop_name", workshop_name);
		condMap.put("process_id", process_id);
		condMap.put("process_name", process_name);
		condMap.put("line_name", line_name);
		condMap.put("plan_node_name", plan_node_name);
		condMap.put("bus_number", bus_number);
		condMap.put("field_name", field_name.equals("")?"":(field_name+"_date"));
		condMap.put("order_type", order_type);
		condMap.put("editor_id", userid);
		condMap.put("edit_date", curTime);
		
		/**
		 * 关键零部件列表
		 */
		List<Map<String,Object>> parts_list=new ArrayList<Map<String,Object>>();
		if(parts_list_str.contains("{")){
			JSONArray jsa=JSONArray.fromObject(parts_list_str);
			parts_list=JSONArray.toList(jsa, Map.class);
		}	
		for(Map m:parts_list){
			m.put("factory_id", factory_id);
			m.put("bus_number", bus_number);
			m.put("process_number", process_number);
			m.put("process_name", process_name);
			m.put("editor_id", userid);
			m.put("edit_date", curTime);
		}
		
		model.addAllAttributes(productionService.scan(condMap,parts_list));

		return model;
	}
	
	/**
	 * 生产异常登记页面
	 * @return
	 */
	@RequestMapping("/exception")
	public ModelAndView exception(){
		mv.setViewName("production/productionException");
		return mv;
	}
	
	/**
	 * 生产异常登记页面(移动端)
	 * @return
	 */
	@RequestMapping("/exception_mobile")
	public ModelAndView exception_mobile(){
		mv.setViewName("production/productionException_Mobile");
		return mv;
	}
	
	/**
	 * 生产异常登记
	 * @return
	 */
	@RequestMapping("/enterException")
	@ResponseBody
	public ModelMap enterException(){
		model=new ModelMap();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		logger.info("---->enterException " + curTime + " " + userid);
		
		String bus_number = request.getParameter("bus_number");
		//logger.info("---->bus_number = " + bus_number);
		//String[] bus_numberArray=bus_number.split("\\|");
		JSONArray busarr=JSONArray.fromObject(request.getParameter("bus_list"));
		List<ProductionException> exceptionList=new ArrayList<ProductionException>();
		
		for(Iterator it=busarr.iterator();it.hasNext();){
			//logger.info("---->bus_numberArray = " + bus_numberArray[i] + " ");
			JSONObject bus=(JSONObject) it.next();
			String cur_bus_number = bus.getString("bus_number");
			ProductionException exception = new ProductionException();
			exception.setFactory(request.getParameter("factory"));
			exception.setWorkshop(request.getParameter("workshop"));
			exception.setLine(request.getParameter("line"));
			exception.setProcess(request.getParameter("process"));
			exception.setBus_number(cur_bus_number);
			exception.setReason_type_id(request.getParameter("reason_type_id"));
			if(request.getParameter("lack_reason_id") != "") exception.setLack_reason_id(request.getParameter("lack_reason_id"));
			exception.setStart_time(request.getParameter("start_time"));
			exception.setSeverity_level_id(request.getParameter("severity_level"));
			exception.setDetailed_reasons(request.getParameter("detailed_reasons"));
			exception.setEditor_id(userid);
			exception.setEdit_date(curTime);
			exceptionList.add(exception);
		}	
		productionService.createProductionException(exceptionList,model);
		return model;
	}
	
	/**
	 * 车辆信息维护页面
	 * @return
	 */
	@RequestMapping("/busInfoMtn")
	public ModelAndView busInfoMtn(){
		mv.setViewName("production/busInfoMtn");
		return mv;
	}
	
	/**
	 * 获取车辆信息列表
	 * @return
	 */
	@RequestMapping("/getBusInfoList")
	@ResponseBody
	public ModelMap getBusInfoList(){
		model=new ModelMap();
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("order_no", request.getParameter("order_no"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("bus_type", request.getParameter("bus_type"));
		condMap.put("bus_number", request.getParameter("bus_number"));
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		
		model.addAllAttributes(productionService.getBusInfoList(condMap));
		return model;
	}
	
	/**
	 * 车辆信息维护
	 * @return
	 */
	@RequestMapping("/updateBusInfo")
	@ResponseBody
	public ModelMap updateBusInfo(){
		model=new ModelMap();
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory_id",request.getParameter("factory_id")) ;
		condMap.put("order_id",request.getParameter("order_id")) ;
		condMap.put("bus_list",request.getParameter("bus_list")) ;
		condMap.put("bus_number",request.getParameter("bus_number")) ;
		condMap.put("bus_color",request.getParameter("bus_color")) ;
		condMap.put("bus_seats",request.getParameter("bus_seats")) ;
		condMap.put("passenger_num",request.getParameter("passenger_num")) ;
		condMap.put("tire_type",request.getParameter("tire_type")) ;
		condMap.put("battery_capacity",request.getParameter("battery_capacity")) ;
		condMap.put("rated_voltage",request.getParameter("rated_voltage")) ;
		condMap.put("spring_num",request.getParameter("spring_num")) ;
		condMap.put("dp_production_date",request.getParameter("dp_production_date")) ;
		condMap.put("dp_zzd",request.getParameter("dp_zzd")) ;
		condMap.put("zc_production_date",request.getParameter("zc_production_date")) ;
		condMap.put("zc_zzd",request.getParameter("zc_zzd")) ;
		condMap.put("hgz_note",request.getParameter("hgz_note")) ;
		condMap.put("ccczs_date",request.getParameter("ccczs_date")) ;
		condMap.put("dpgg_date",request.getParameter("dpgg_date")) ;
		condMap.put("zcgg_date",request.getParameter("zcgg_date")) ;
		
		productionService.updateBusInfo(condMap,model);
		
		return model;
		
	}
	
	/**
	 * 铭牌打印页面
	 * @return
	 */
	@RequestMapping("/nameplatePrint")
	public ModelAndView nameplatePrint(){
		mv.setViewName("production/nameplatePrint");
		return mv;
	}
	
	/**
	 * 获取铭牌打印列表数据
	 * @return
	 */
	@RequestMapping("/getNameplatePrintList")
	@ResponseBody
	public ModelMap getNameplatePrintList(){
		model=new ModelMap();
		String conditions=request.getParameter("conditions");
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();	
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			logger.info(key);
			conditionMap.put(key, jo.get(key));
		}
		
		int factoryId=Integer.parseInt(session.getAttribute("factory_id").toString());
		conditionMap.put("factoryId", factoryId);
		
		productionService.getNameplatePrintList(conditionMap,model);
		
		return model;
	}
	
	/**
	 * 铭牌打印后更新状态
	 * @return
	 */
	@RequestMapping("/afterNameplatePrint")
	@ResponseBody
	public ModelMap afterNameplatePrint(){
		model=new ModelMap();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		String conditions=request.getParameter("conditions");
		JSONObject jo = JSONObject.fromObject(conditions);
		String busNOListString=jo.getString("busNoList");

		List<String> busNoList= new ArrayList<String>();
		busNoList=Arrays.asList(busNOListString.split(","));
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("busNoList", busNoList);
		conditionMap.put("printer", userid);
		conditionMap.put("printDate", curTime);
		
		productionService.updateNameplatePrint(conditionMap,model);
		return model;
	}
	
	/**
	 *	车间供货页面
	 * @return
	 */
	@RequestMapping("/workshopSupply")
	public ModelAndView workshopSupply(){
		mv.setViewName("production/workshopSupply");
		return mv;
	}
	
	/**
	 * 根据工厂、订单、供货车间、接收车间获取供应车付信息
	 * @return
	 */
	@RequestMapping("/getSupplyTotalCount")
	@ResponseBody
	public ModelMap getSupplyTotalCount(){
		model=new ModelMap();
		String factory_id=request.getParameter("factory_id");
		String order_no=request.getParameter("order_no");
		String supply_workshop=request.getParameter("supply_workshop");
		String receive_workshop=request.getParameter("receive_workshop");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory_id", factory_id);
		condMap.put("order_no", order_no);
		condMap.put("supply_workshop", supply_workshop);
		condMap.put("receive_workshop", receive_workshop);
		
		productionService.getSupplyTotalCount(condMap,model);
		return model;
	}
	
	/**
	 * 保存车间供付信息
	 * @return
	 */
	@RequestMapping("/saveUpdateWorkshopSupply")
	@ResponseBody
	public ModelMap saveUpdateWorkshopSupply(){
		model=new ModelMap();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("id", request.getParameter("id"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("supply_workshop", request.getParameter("supply_workshop"));
		condMap.put("receive_workshop", request.getParameter("receive_workshop"));
		condMap.put("quantity", request.getParameter("quantity"));
		condMap.put("supply_date", request.getParameter("supply_date"));
		condMap.put("editor_id", userid);
		condMap.put("edit_date", curTime);
		
		productionService.saveUpdateWorkshopSupply(condMap,model);
		return model;
	}
	
	/**
	 * 查询车间供付记录列表
	 * @return
	 */
	@RequestMapping("/getWorkshopSupplyList")
	@ResponseBody
	public ModelMap getWorkshopSupplyList(){
		model=new ModelMap();
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("order_no", request.getParameter("order_no"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("search_date_start", request.getParameter("search_date_start"));
		condMap.put("search_date_end", request.getParameter("search_date_end"));
		condMap.put("supply_workshop", request.getParameter("supply_workshop"));
		condMap.put("receive_workshop", request.getParameter("receive_workshop"));
		condMap.put("orderColumn", request.getParameter("orderColumn"));
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		
		model.addAllAttributes(productionService.getWorkshopSupplyList(condMap));
		return model;
	}
	
	/**
	 *	车间供货页面
	 * @return
	 */
	@RequestMapping("/partsOnOffline")
	public ModelAndView partsOnOffline(){
		mv.setViewName("production/partsOnOffline");
		return mv;
	}
	
	/**
	 * 查询部件上下线剩余数量
	 * @return
	 */
	@RequestMapping("/getPartsFinishCount")
	@ResponseBody
	public ModelMap getPartsFinishCount(){
		model=new ModelMap();
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("order_no", request.getParameter("order_no"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("parts_id", request.getParameter("parts_id"));
		
		productionService.getPartsFinishCount(condMap,model);
		return model;
	}
	
	/**
	 * 保存部件上下线记录
	 * @return
	 */
	@RequestMapping("/saveUpdatePartsOnOffRecord")
	@ResponseBody
	public ModelMap saveUpdatePartsOnOffRecord(){
		model=new ModelMap();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("id", request.getParameter("id"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("parts_id", request.getParameter("parts_id"));
		condMap.put("online_num", request.getParameter("online_num"));
		condMap.put("offline_num", request.getParameter("offline_num"));
		condMap.put("prod_date", request.getParameter("prod_date"));
		condMap.put("editor_id", userid);
		condMap.put("edit_date", curTime);
		
		productionService.saveUpdatePartsOnOffRecord(condMap,model);
		return model;
	}
	
	/**
	 * 查询部件上下线记录列表
	 * @return
	 */
	@RequestMapping("/getPartsOnOffList")
	@ResponseBody
	public ModelMap getPartsOnOffList(){
		model=new ModelMap();
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("order_no", request.getParameter("order_no"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("search_date_start", request.getParameter("search_date_start"));
		condMap.put("search_date_end", request.getParameter("search_date_end"));
		condMap.put("parts_id", request.getParameter("parts_id"));
		condMap.put("orderColumn", request.getParameter("orderColumn"));
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		
		model.addAllAttributes(productionService.getPartsOnOffList(condMap));
		return model;
	}
	
	/**
	 *	合格证打印页面
	 * @return
	 */
	@RequestMapping("/certificationPrint")
	public ModelAndView certificationPrint(){
		mv.setViewName("production/certificationPrint");
		return mv;
	}
	/**
	 * 获取合格证打印列表数据
	 * @return
	 */
	@RequestMapping("/getCertificationList")
	@ResponseBody
	public ModelMap getCertificationList(){
		model=new ModelMap();
		
		String conditions=request.getParameter("conditions");
		logger.info("合格证查询条件:"+conditions);
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();	
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		String bus_number=conditionMap.get("bus_number").toString();
		String[] busNumberList =bus_number.split("\n");
		int bus_number_size = busNumberList.length;
		if (bus_number.equals(""))bus_number_size=0;
		conditionMap.put("bus_number", busNumberList);
		conditionMap.put("bus_number_size", bus_number_size);
		
		productionService.getCertificationList(conditionMap,model);
		return model;
	}
	
	/**
	 * added by xjw 2017/03/10
	 * 合格证信息传输到合格证系统打印
	 * @return
	 */
	@RequestMapping("/certificatePrint")
	@ResponseBody
	public ModelMap certificatePrint(){
		model=new ModelMap();
		String conditions=request.getParameter("conditions");
		JSONArray jsa=JSONArray.fromObject(conditions);
		List<Map<String,Object>> buslist=JSONArray.toList(jsa,Map.class);
		
		productionService.transferDataToHGZSys(buslist,model);
		
		return model;
	}
	
	/****************************  xiongjianwu ***************************/
	
	@RequestMapping("/productionsearchbusinfo")
	public ModelAndView productionsearchbusinfo(){
		mv.setViewName("production/productionsearchbusinfo");
		return mv;
	}
	
	@RequestMapping("/getProductionSearchBusInfo")
	@ResponseBody
	public ModelMap getProductionSearchBusInfo(){		
		List<Map<String, String>> datalist = productionService.getProductionSearchBusinfo(request.getParameter("bus_number"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getProductionSearchScan")
	@ResponseBody
	public ModelMap getProductionSearchScan(){
		List<Map<String, String>> datalist = productionService.getProductionSearchScan(request.getParameter("bus_number"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getProductionSearch")
	@ResponseBody
	public ModelMap getProductionSearch(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("workshop_id", request.getParameter("workshop_id"));
		conditionMap.put("line_id", request.getParameter("line_id"));
		conditionMap.put("exception_type", request.getParameter("exception_type"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("cur_date", curTime.substring(0, 10));
		conditionMap.put("onoff", request.getParameter("onoff"));
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		
		List<Map<String,String>> datalist = productionService.getProductionSearch(conditionMap);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getProductionSearchCarinfo")
	@ResponseBody
	public ModelMap getProductionSearchCarinfo(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String wipFlg=request.getParameter("wip_flg");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("onoff", request.getParameter("onoff"));
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		conditionMap.put("wip_flg", wipFlg);
		if(request.getParameter("workshop").equals("全部")){
			conditionMap.put("workshop","");
		}else if(request.getParameter("workshop").equals("焊装")){
			conditionMap.put("workshop","welding");
		}else if(request.getParameter("workshop").equals("玻璃钢")){
			conditionMap.put("workshop","fiberglass");
		}else if(request.getParameter("workshop").equals("涂装")){
			conditionMap.put("workshop","painting");
		}else if(request.getParameter("workshop").equals("底盘")){
			conditionMap.put("workshop","chassis");
		}else if(request.getParameter("workshop").equals("总装")){
			conditionMap.put("workshop","assembly");
		}else if(request.getParameter("workshop").equals("调试区")){
			conditionMap.put("workshop","debugarea");
		}else if(request.getParameter("workshop").equals("检测线")){
			conditionMap.put("workshop","testline");
		}else if(request.getParameter("workshop").equals("成品库")){
			conditionMap.put("workshop","warehousing");
		}
		if(request.getParameter("line").equals("全部")){
			conditionMap.put("line","");
		}else{
			conditionMap.put("line",request.getParameter("line"));
		}		
		conditionMap.put("exception_type", request.getParameter("exception_type"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("bus_number", request.getParameter("bus_number"));
		conditionMap.put("cur_date", curTime.substring(0, 10));
		List<Map<String,String>> datalist=new ArrayList<Map<String,String>>();
		if(StringUtils.isNotEmpty(wipFlg)){
			datalist = productionService.getProductionWIPBusInfo(conditionMap);
		}else{
			datalist = productionService.getProductionSearchCarinfo(conditionMap);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getNamePlateInfo")
	@ResponseBody
	public ModelMap getNamePlateInfo(){
		List<Map<String, String>> datalist = productionService.getNamePlateInfo(request.getParameter("bus_number"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getProductionSearchException")
	@ResponseBody
	public ModelMap getProductionSearchException(){
		List<Map<String, String>> datalist = productionService.getProductionSearchException(request.getParameter("bus_number"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}

	
	@RequestMapping("/getCertificationInfo")
	@ResponseBody
	public ModelMap getCertificationInfo(){
		List<Map<String, String>> datalist = productionService.getCertificationInfo(request.getParameter("bus_number"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/queryTechSingleCarNolist")
	@ResponseBody
	public ModelMap queryTechSingleCarNolist(){
		List<Map<String, String>> datalist = productionService.getEcnTasksByBusNumber(request.getParameter("bus_number"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getQmTestCardList")
	@ResponseBody
	public ModelMap getQmTestCardList(){	//车辆信息查询 成品纪录表 TEST_CARD
		List<Map<String, String>> datalist = productionService.getQmTestCardList(request.getParameter("bus_number"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	/**************************** TANGJIN  ************************/
	
	/**打印VIN码*/
	@RequestMapping("/showVinPrint")
	public ModelAndView showVinPrint(){
		mv.setViewName("production/showVinPrint");
		return mv;
	}
	@RequestMapping("/getVinPrintList")
	@ResponseBody
	public ModelMap getVinPrintList(){
		model=new ModelMap();
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		String factory_id=String.valueOf(session.getAttribute("factory_id"));
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("orderNo", request.getParameter("orderNo"));
		condMap.put("busNo", request.getParameter("busNumber"));
		condMap.put("factoryId", factory_id);
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		Map<String,Object> list = productionService.getVinPrintList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping("/saveMotorNumber")
	@ResponseBody
	public ModelMap saveMotorNumber(){
		model=new ModelMap();
		Map<String, Object> result = new HashMap<String, Object>();
		String conditions=request.getParameter("conditions");
		JSONArray jsonArray=JSONArray.fromObject(conditions);
		List<Map<String,Object>> buslist=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);		
			 Map<String, Object> map = (Map<String, Object>) object;
			 buslist.add(map);
		}
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("buslist", buslist);
		int a=productionService.updateBusMotorNumber(condMap);
		int b=productionService.updateVinMotorNumber(condMap);
		if(a>0&&b>0){
			result.put("success", true);
			result.put("message", "保存成功");
		}else{
			result.put("success", false);
			result.put("message", "打印失败");
		}
		model.addAllAttributes(result);
		return model;
	}
	@RequestMapping("/afterVinPrint")
	@ResponseBody
	public ModelMap afterVinPrint(){
		model=new ModelMap();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		Map<String, Object> result = new HashMap<String, Object>();
		List<String> vinList= new ArrayList<String>();
		String conditions=request.getParameter("conditions");
		vinList=Arrays.asList(conditions.split(","));
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("vinList", vinList);
		conditionMap.put("printer", userid);
		conditionMap.put("printDate", curTime);
		int i=productionService.updateVinPrint(conditionMap);
		if(i>0){
			result.put("success", true);
			result.put("message", "打印成功");
		}else{
			result.put("success", false);
			result.put("message", "打印失败");
		}
		model.addAllAttributes(result);
		return model;
	}
	/**
	 * 检查vin码是否在PD_VIN表中存在，存在为有效，否则无效
	 * 
	 * @return
	 */
	@RequestMapping("/validateVin")
	@ResponseBody
	public ModelMap validateVin() {
		model=new ModelMap();
		String vin=request.getParameter("vin");
		Map conditionMap=new HashMap<String,Object>();
		conditionMap.put("vin", vin);
		List selectList = productionService.getVinList(conditionMap);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", selectList);
		model.addAllAttributes(result);
		return model;
	}
	@RequestMapping("/getBusNumberByVin")
	@ResponseBody
	public ModelMap getBusNumberByVin() {
		model=new ModelMap();
		String vin=request.getParameter("vin");
		Map conditionMap=new HashMap<String,Object>();
		conditionMap.put("vin", vin);
		List selectList = productionService.getBusNumberByVin(conditionMap);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", selectList);
		model.addAllAttributes(result);
		return model;
	}
	/**打印车身号*/
	@RequestMapping("/showBusNoPrint")
	public ModelAndView showBusNoPrint(){
		mv.setViewName("production/showBusNoPrint");
		return mv;
	}
	@RequestMapping("/getBusNoPrintList")
	@ResponseBody
	public ModelMap getBusNoPrintList(){
		model=new ModelMap();
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		String factory_id=String.valueOf(session.getAttribute("factory_id"));
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("orderNo", request.getParameter("orderNo"));
		condMap.put("busNo", request.getParameter("busNumber"));
		condMap.put("planStart", request.getParameter("planStart"));
		condMap.put("planEnd", request.getParameter("planEnd"));
		condMap.put("factoryId", factory_id);
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		Map<String,Object> list = productionService.getBusNoPrintList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping("/getOrderConfigList")
	@ResponseBody
	public ModelMap getOrderConfigList() {
		model=new ModelMap();
		String search_order_no=request.getParameter("search_order_no");
		String factory_id=request.getParameter("factory_id");
		Map conditionMap=new HashMap<String,Object>();
		conditionMap.put("search_order_no", search_order_no);
		conditionMap.put("factory_id", factory_id);
		List selectList = productionService.getOrderConfigList(conditionMap);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", selectList);
		model.addAllAttributes(result);
		return model;
	}
	@RequestMapping("/afterBusNoPrint")
	@ResponseBody
	public ModelMap afterBusNoPrint(){
		model=new ModelMap();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		Map<String, Object> result = new HashMap<String, Object>();
		List<String> vinList= new ArrayList<String>();
		String conditions=request.getParameter("conditions");
		JSONObject jo = JSONObject.fromObject(conditions);
		String bus_no_list=jo.getString("busNoList");
		String changed_config_id=jo.getString("changedConfigId");
		List<String> busNoList= new ArrayList<String>();
		busNoList=Arrays.asList(bus_no_list.split(","));
		vinList=Arrays.asList(conditions.split(","));
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("busNoList", busNoList);
		conditionMap.put("changedConfigId",changed_config_id);
		conditionMap.put("printer", userid);
		conditionMap.put("printDate", curTime);
		int i=productionService.updateBusPrint(conditionMap);
		i=productionService.updateBusConfig(conditionMap);
		if(i>0){
			result.put("success", true);
			result.put("message", "打印成功");
		}else{
			result.put("success", false);
			result.put("message", "打印失败");
		}
		model.addAllAttributes(result);
		return model;
	}
	/****************************  TANGJIN ***************************/
}
