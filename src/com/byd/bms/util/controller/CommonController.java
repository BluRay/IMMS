package com.byd.bms.util.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.byd.bms.util.service.ICommonService;
@Controller
@RequestMapping("/common")
public class CommonController extends BaseController {
	@Autowired
	protected ICommonService commonService;
	/**
	 * added by xjw for 根据订单编号输入值模糊查询订单下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getOrderFuzzySelect")
	@ResponseBody
	public ModelMap getOrderFuzzySelect() {
		model=new ModelMap();
		String orderNo = request.getParameter("orderNo");
		String busType = request.getParameter("busType");
		String factory = request.getParameter("factory");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("orderNo", orderNo);
		condMap.put("busType", busType);
		condMap.put("factory",factory);
		model.put("data", commonService.getOrderFuzzySelect(condMap));

		return model;
	}
	/**
	 * added by xjw for 查询工厂下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getFactorySelect")
	@ResponseBody
	public ModelMap getFactorySelect(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		model=new ModelMap();
		model.put("data", commonService.getFactorySelect(condMap));

		return model;
	}
	
	/**
	 * added by xjw for 查询工厂下拉列表(权限控制 ORG表获取)
	 * 
	 * @return
	 */
	@RequestMapping("/getFactorySelectAuth")
	@ResponseBody
	public ModelMap getFactorySelectAuth(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		model=new ModelMap();
		model.put("data", commonService.getFactorySelectAuth(condMap));

		return model;
	}
	
	/**
	 * added by xjw for 查询车型列表
	 * 
	 * @return
	 */
	@RequestMapping("/getBusType")
	@ResponseBody
	public ModelMap getBusType(){
		model=new ModelMap();
		model.put("data", commonService.getBusTypeSelect());

		return model;
	}
	/**
	 * added by xjw for 查询弹性建下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getKeysSelect")
	@ResponseBody
	public ModelMap getKeysSelect(){
		model=new ModelMap();
		model.put("data", commonService.getKeysSelect(request.getParameter("keyCode")
				.toString()));
		return model;
	}
	
	@RequestMapping("/getDepartmentByFactory")
	@ResponseBody
	public ModelMap getDepartmentByFactory(String factory_id){
		model=new ModelMap();
		model.put("data", commonService.getDepartmentByFactory(factory_id));
		return model;
	}
	
	/**
	 * added by xjw for 查询车间下拉列表(权限控制，ORG表获取)
	 * 
	 * @return
	 */
	@RequestMapping("/getWorkshopSelectAuth")
	@ResponseBody
	public ModelMap getWorkshopSelectAuth(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		String factory = request.getParameter("factory");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		condMap.put("factory", factory);
		model=new ModelMap();
		model.put("data", commonService.getWorkshopSelectAuth(condMap));

		return model;
	}
	
	/**
	 * added by xjw for 查询车间下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getWorkshopSelect")
	@ResponseBody
	public ModelMap getWorkshopSelect(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		model=new ModelMap();
		model.put("data", commonService.getWorkshopSelect(condMap));

		return model;
	}
}
