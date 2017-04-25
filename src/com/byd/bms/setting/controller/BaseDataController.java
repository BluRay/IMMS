package com.byd.bms.setting.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.setting.model.BmsBaseLine;
import com.byd.bms.setting.model.BmsBaseWorkshop;
import com.byd.bms.setting.service.IBaseDataService;
import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/setting")
public class BaseDataController extends BaseController {
	static Logger logger = Logger.getLogger("SETTING");
	@Autowired
	protected IBaseDataService baseDateService;

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
		Map<String, Object> result = baseDateService.getFactoryList(queryMap);
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

			int reuslt = baseDateService.addFactory(factory);
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

			baseDateService.updateFactory(factory);
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
			baseDateService.deleteFactory(idlist);
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
		Map<String, Object> result = baseDateService.getWorkshopList(queryMap);
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

			int reuslt = baseDateService.addWorkshop(workshop);
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

			baseDateService.updateWorkshop(workshop);
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
			baseDateService.deleteWorkshop(idlist);
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
		Map<String, Object> result = baseDateService.getLineList(queryMap);
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

			int reuslt = baseDateService.addLine(line);
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

			baseDateService.updateLine(line);
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
			baseDateService.deleteLine(idlist);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
}
