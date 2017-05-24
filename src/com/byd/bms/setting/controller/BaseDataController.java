package com.byd.bms.setting.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.setting.model.BmsBaseLine;
import com.byd.bms.setting.model.BmsBaseProcess;
import com.byd.bms.setting.model.BmsBaseWorkshop;
import com.byd.bms.setting.service.IBaseDataService;
import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/setting")
public class BaseDataController extends BaseController {
	static Logger logger = Logger.getLogger("SETTING");
	@Autowired
	protected IBaseDataService baseDataService;

	// 工厂
	@RequestMapping("/factory")
	public ModelAndView factoryPage() {
		mv.setViewName("setting/factory");
		return mv;
	}

	// 车间
	@RequestMapping("/workshop")
	public ModelAndView workshopPage() {
		mv.setViewName("setting/workshop");
		return mv;
	}

	// 班组
	@RequestMapping("/workgroup")
	public ModelAndView workgroupPage() {
		mv.setViewName("setting/workgroup");
		return mv;
	}

	// 线别
	@RequestMapping("/line")
	public ModelAndView linePage() {
		mv.setViewName("setting/line");
		return mv;
	}

	// 工序
	@RequestMapping("/process")
	public ModelAndView processPage() {
		mv.setViewName("setting/process");
		return mv;
	}

	// 车型
	@RequestMapping("/busType")
	public ModelAndView busTypePage() {
		mv.setViewName("setting/busType");
		return mv;
	}

	/**
	 * ajax 获取工厂列表
	 * 
	 * @return model
	 */
	@RequestMapping("/getFactoryList")
	@ResponseBody
	public ModelMap getFactoryList() {
		Map<String, Object> queryMap = new HashMap<String, Object>();
		int draw = Integer.parseInt(request.getParameter("draw"));// jquerydatatables
		int start = Integer.parseInt(request.getParameter("start"));// 分页数据起始数
		int length = Integer.parseInt(request.getParameter("length"));// 每一页数据条数

		String factory = request.getParameter("factory");// 工厂
		String assembcode = request.getParameter("assembcode");//

		queryMap.put("draw", draw);
		queryMap.put("start", start);
		queryMap.put("length", length);
		queryMap.put("factory", factory);
		queryMap.put("assembcode", assembcode);
		Map<String, Object> result = baseDataService.getFactoryList(queryMap);
		model.addAllAttributes(result);

		return model;
	}

	@RequestMapping("/addFactory")
	@ResponseBody
	public ModelMap addFactory() {
		try {
			String factory_name = request.getParameter("factory_name") == null ? "" : request.getParameter("factory_name");
			String factory_code = request.getParameter("factory_code") == null ? "" : request.getParameter("factory_code");
			String short_name = request.getParameter("short_name") == null ? "" : request.getParameter("short_name");
			String capacity = request.getParameter("capacity") == null ? "" : request.getParameter("capacity");
			String area = request.getParameter("area") == null ? "" : request.getParameter("area");
			String vin_assembly_code = request.getParameter("vin_assembly_code") == null ? "" : request.getParameter("vin_assembly_code");
			String memo = request.getParameter("memo") == null ? "" : request.getParameter("memo");

			String editor_id = request.getSession().getAttribute("user_name") + "";
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String edit_date = df.format(new Date());

			BmsBaseFactory factory = new BmsBaseFactory();

			factory.setFactoryName(factory_name);
			factory.setFactoryCode(factory_code);
			factory.setShortName(short_name);
			factory.setCapacity(capacity);
			factory.setArea(area);
			factory.setAssemblyCode(vin_assembly_code);
			factory.setMemo(memo);
			factory.setEditorId(editor_id);
			factory.setEditDate(edit_date);

			int reuslt = baseDataService.addFactory(factory);
			initModel(true, "success", reuslt);
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}

	@RequestMapping("/updateFactory")
	@ResponseBody
	public ModelMap updateFactory() {
		try {
			int id = Integer.parseInt(request.getParameter("id"));
			
			String factory_name = request.getParameter("factory_name") == null ? "" : request.getParameter("factory_name");
			String factory_code = request.getParameter("factory_code") == null ? "" : request.getParameter("factory_code");
			String short_name = request.getParameter("short_name") == null ? "" : request.getParameter("short_name");
			String capacity = request.getParameter("capacity") == null ? "" : request.getParameter("capacity");
			String area = request.getParameter("area") == null ? "" : request.getParameter("area");
			String vin_assembly_code = request.getParameter("vin_assembly_code") == null ? "" : request.getParameter("vin_assembly_code");
			String memo = request.getParameter("memo") == null ? "" : request.getParameter("memo");

			String editor_id = request.getSession().getAttribute("user_name") + "";
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String edit_date = df.format(new Date());

			BmsBaseFactory factory = new BmsBaseFactory();
			
			factory.setId(id);

			factory.setFactoryName(factory_name);
			factory.setFactoryCode(factory_code);
			factory.setShortName(short_name);
			factory.setCapacity(capacity);
			factory.setArea(area);
			factory.setAssemblyCode(vin_assembly_code);
			factory.setMemo(memo);
			factory.setEditorId(editor_id);
			factory.setEditDate(edit_date);

			baseDataService.updateFactory(factory);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/deleteFactory")
	@ResponseBody
	public ModelMap deleteFactory() {
		try {
			String ids = request.getParameter("ids");
			List<String> idlist = new ArrayList<String>();
			for(String id : ids.split(",")){
				idlist.add(id);
			}
			baseDataService.deleteFactory(idlist);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	
	/**
	 * ajax 获取车间列表
	 * 
	 * @return model
	 */
	@RequestMapping("/getWorkshopList")
	@ResponseBody
	public ModelMap getWorkshopList() {
		Map<String, Object> queryMap = new HashMap<String, Object>();
		int draw = Integer.parseInt(request.getParameter("draw"));// jquerydatatables
		int start = Integer.parseInt(request.getParameter("start"));// 分页数据起始数
		int length = Integer.parseInt(request.getParameter("length"));// 每一页数据条数

		String workshopName = request.getParameter("workshopName");//

		queryMap.put("draw", draw);
		queryMap.put("start", start);
		queryMap.put("length", length);
		queryMap.put("workshopName", workshopName);
		Map<String, Object> result = baseDataService.getWorkshopList(queryMap);
		model.addAllAttributes(result);

		return model;
	}
	
	@RequestMapping("/addWorkshop")
	@ResponseBody
	public ModelMap addWrokshop() {
		try {
			String workshop_name = request.getParameter("workshop_name") == null ? "" : request.getParameter("workshop_name");
			String workshop_code = request.getParameter("workshop_code") == null ? "" : request.getParameter("workshop_code");
			String memo = request.getParameter("memo") == null ? "" : request.getParameter("memo");

			String editor_id = request.getSession().getAttribute("user_name") + "";
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String edit_date = df.format(new Date());

			BmsBaseWorkshop workshop = new BmsBaseWorkshop();

			workshop.setWorkshopName(workshop_name);
			workshop.setWorkshopCode(workshop_code);
			workshop.setMemo(memo);
			workshop.setEditorId(editor_id);
			workshop.setEditDate(edit_date);

			int reuslt = baseDataService.addWorkshop(workshop);
			initModel(true, "success", reuslt);
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}

	@RequestMapping("/updateWorkshop")
	@ResponseBody
	public ModelMap updateWorkshop() {
		try {
			int id = Integer.parseInt(request.getParameter("id"));
			
			String workshop_name = request.getParameter("workshop_name") == null ? "" : request.getParameter("workshop_name");
			String workshop_code = request.getParameter("workshop_code") == null ? "" : request.getParameter("workshop_code");
			String memo = request.getParameter("memo") == null ? "" : request.getParameter("memo");

			String editor_id = request.getSession().getAttribute("user_name") + "";
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String edit_date = df.format(new Date());

			BmsBaseWorkshop workshop = new BmsBaseWorkshop();
			
			workshop.setId(id);

			workshop.setWorkshopName(workshop_name);
			workshop.setWorkshopCode(workshop_code);
			workshop.setMemo(memo);
			workshop.setEditorId(editor_id);
			workshop.setEditDate(edit_date);

			baseDataService.updateWorkshop(workshop);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/deleteWorkshop")
	@ResponseBody
	public ModelMap deleteWorkshop() {
		try {
			String ids = request.getParameter("ids");
			List<String> idlist = new ArrayList<String>();
			for(String id : ids.split(",")){
				idlist.add(id);
			}
			baseDataService.deleteWorkshop(idlist);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	
	/**
	 * ajax 获取线别列表
	 * 
	 * @return model
	 */
	@RequestMapping("/getLineList")
	@ResponseBody
	public ModelMap getLineList() {
		Map<String, Object> queryMap = new HashMap<String, Object>();
		int draw = Integer.parseInt(request.getParameter("draw"));// jquerydatatables
		int start = Integer.parseInt(request.getParameter("start"));// 分页数据起始数
		int length = Integer.parseInt(request.getParameter("length"));// 每一页数据条数

		String lineName = request.getParameter("lineName");//

		queryMap.put("draw", draw);
		queryMap.put("start", start);
		queryMap.put("length", length);
		queryMap.put("lineName", lineName);
		Map<String, Object> result = baseDataService.getLineList(queryMap);
		model.addAllAttributes(result);

		return model;
	}
	
	@RequestMapping("/addLine")
	@ResponseBody
	public ModelMap addLine() {
		try {
			String lineName = request.getParameter("lineName") == null ? "" : request.getParameter("lineName");
			
			String memo = request.getParameter("memo") == null ? "" : request.getParameter("memo");

			String editor_id = request.getSession().getAttribute("user_name") + "";
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String edit_date = df.format(new Date());

			BmsBaseLine line = new BmsBaseLine();

			line.setLineName(lineName);
			line.setMemo(memo);
			line.setEditorId(editor_id);
			line.setEditDate(edit_date);

			int reuslt = baseDataService.addLine(line);
			initModel(true, "success", reuslt);
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}

	@RequestMapping("/updateLine")
	@ResponseBody
	public ModelMap updateLine() {
		try {
			int id = Integer.parseInt(request.getParameter("id"));
			
			String lineName = request.getParameter("lineName") == null ? "" : request.getParameter("lineName");
			String memo = request.getParameter("memo") == null ? "" : request.getParameter("memo");

			String editor_id = request.getSession().getAttribute("user_name") + "";
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String edit_date = df.format(new Date());

			BmsBaseLine line = new BmsBaseLine();
			
			line.setId(id);

			line.setLineName(lineName);
			line.setMemo(memo);
			line.setEditorId(editor_id);
			line.setEditDate(edit_date);

			baseDataService.updateLine(line);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/deleteLine")
	@ResponseBody
	public ModelMap deleteLine() {
		try {
			String ids = request.getParameter("ids");
			List<String> idlist = new ArrayList<String>();
			for(String id : ids.split(",")){
				idlist.add(id);
			}
			baseDataService.deleteLine(idlist);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	
	/**
	 * 获取标准工序列表
	 * @return
	 */
	@RequestMapping("/getProcessList")
	@ResponseBody
	public ModelMap getProcessList(){
		model.clear();
		String draw=request.getParameter("draw");
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		String factory=request.getParameter("factory");
		String workshop=request.getParameter("workshop");
		String line=request.getParameter("line");
		String monitoryPoint_flag=request.getParameter("monitoryPoint_flag");
		String keyProcess_flag=request.getParameter("keyProcess_flag");
		String planNode_flag=request.getParameter("planNode_flag");
		
		
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("monitoryPoint_flag", monitoryPoint_flag);
		condMap.put("keyProcess_flag", keyProcess_flag);
		condMap.put("planNode_flag", planNode_flag);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("draw", draw);
		
		model.addAllAttributes(baseDataService.getProcessList(condMap));
		
		return model;
	}
	
	/**
	 * 编辑标准工序
	 * @return
	 */
	@RequestMapping("/editProcess")
	@ResponseBody
	public ModelMap editProcess(@ModelAttribute("process")  BmsBaseProcess process){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int)session.getAttribute("user_id");
		process.setEditor_id(userid);
		process.setEdit_date(curTime);
		baseDataService.updateProcess(process);
		initModel(true, "编辑成功！", null);
		return mv.getModelMap();
	}
	
	/**
	 * 新增标准工序
	 */
	@RequestMapping("/addProcess")
	@ResponseBody
	public ModelMap addProcess(@ModelAttribute("process")  BmsBaseProcess process){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int)session.getAttribute("user_id");
		process.setEditor_id(userid);
		process.setEdit_date(curTime);
		baseDataService.addProcess(process);
		initModel(true, "新增成功！", null);
		return mv.getModelMap();
	}
	
	/**
	 * 软删除标准工序
	 */
	@RequestMapping("/deleteProcess")
	@ResponseBody
	public ModelMap deleteProcess( ){
		String ids=request.getParameter("ids");
		List idlist=Arrays.asList(ids.split(","));
		baseDataService.deleteProcess(idlist);
		initModel(true, "删除成功！", null);
		return mv.getModelMap();
	}
	
	/**
	 * 工序配置页面
	 * @return
	 */
	@RequestMapping("/processConfig")
	public ModelAndView processConfig(){
		mv.setViewName("setting/processConfig");
		return mv;
	}
	
	/**
	 * 获取工序配置列表
	 */
	@RequestMapping("/getProcessConfigList")
	@ResponseBody
	public ModelMap getProcessConfigList(){
		model.clear();
		String draw=request.getParameter("draw");
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		String factory=request.getParameter("factory");
		String order_type=request.getParameter("order_type");
		
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("order_type", order_type);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("draw", draw);
		
		model.addAllAttributes(baseDataService.getProcessConfigList(condMap));
		return model;
	}
	
	/**
	 * 根据工厂、车间获取工序列表（不区分线别）
	 */
	@RequestMapping("/getProcessListNoLine")
	@ResponseBody
	public ModelMap getProcessListNoLine(){
		model.clear();
		String factory=request.getParameter("factory");
		String workshop=request.getParameter("workshop");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("workshop", workshop);
		
		model.put("data", baseDataService.getProcessListNoLine(condMap));
		return model;
	}
	
	/**
	 * 根据工厂、订单类型获取工序配置明细列表
	 */
	@RequestMapping("/getProcessConfigDetailList")
	@ResponseBody
	public ModelMap getProcessConfigDetailList(){
		model.clear();
		String factory=request.getParameter("factory");
		String order_type=request.getParameter("order_type");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("order_type", order_type);
		
		model.put("data", baseDataService.getProcessConfigDetailList(condMap));
		return model;
	}
	
	/**
	 * 根据工厂获取该工厂下所有车间的标准工序列表
	 */
	@RequestMapping("/getProcessListByFactory")
	@ResponseBody
	public ModelMap getProcessListByFactory(){
		model.clear();
		String factory=request.getParameter("factory");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		
		model.put("data", baseDataService.getProcessListByFactory(condMap));
		return model;
	}
	
	/**
	 * 新增工序配置
	 */
	@RequestMapping("/addProcessConfig")
	@ResponseBody
	public ModelMap addProcessConfig(){
		model.clear();
		String process_list_str=request.getParameter("process_list");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int)session.getAttribute("user_id");
		
		JSONArray jsar=JSONArray.fromObject(process_list_str);
		List<Map<String,Object>> process_list=new ArrayList<Map<String,Object>>();
		if(process_list_str.contains("{")){
			process_list=JSONArray.toList(jsar,Map.class);
		}

		process_list.forEach(e->{
			e.put("editor_id", userid);
			e.put("edit_date", curTime);
		});
		baseDataService.addProcessConfig(process_list,model);
		
		return model;
	}
	
	/**
	 * 编辑工序配置
	 */
	@RequestMapping("/editProcessConfig")
	@ResponseBody
	public ModelMap editProcessConfig(){
		model.clear();
		String process_list_str=request.getParameter("process_list");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int)session.getAttribute("user_id");
		
		JSONArray jsar=JSONArray.fromObject(process_list_str);
		List<Map<String,Object>> process_list=new ArrayList<Map<String,Object>>();
		if(process_list_str.contains("{")){
			process_list=JSONArray.toList(jsar,Map.class);
		}

		process_list.forEach(e->{
			e.put("editor_id", userid);
			e.put("edit_date", curTime);
		});
		baseDataService.editProcessConfig(process_list,model);
		
		return model;
	}
	/**
	 * 编辑工序配置
	 */
	@RequestMapping("/deleteProcessConfig")
	@ResponseBody
	public ModelMap deleteProcessConfig(){
		model.clear();
		String factory=request.getParameter("factory");
		String order_type=request.getParameter("order_type");
		
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("order_type", order_type);
		baseDataService.deleteProcessConfig(condMap,model);
		return model;
	}
	
	
}
