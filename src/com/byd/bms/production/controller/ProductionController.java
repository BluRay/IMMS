package com.byd.bms.production.controller;

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

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.production.service.IProductionService;
import com.byd.bms.util.controller.BaseController;
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
		model.put("businfo", businfo);
		
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
		model.clear();
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
}
