package com.byd.bms.production.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

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
	 * 车辆扫描后获取车辆信息（订单、车间、线别、当前工序、状态、颜色、关键零部件信息、订单配置信息）
	 * @return
	 */
	@RequestMapping("/getBusInfo")
	@ResponseBody
	public ModelMap getBusInfo(){
		//封装查询条件
		String bus_number=request.getParameter("bus_number");
		
		//查询车辆基本信息
		
		//查询关键零部件信息列表
		
		//查询订单配置信息
		
		
		return model;
	}
}
