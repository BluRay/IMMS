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

		model.put("data", commonService.getFactorySelect());

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

		model.put("data", commonService.getBusTypeSelect());

		return model;
	}
}
