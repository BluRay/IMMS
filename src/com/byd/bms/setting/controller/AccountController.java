package com.byd.bms.setting.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import java.util.ArrayList;
import java.util.List;

import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.setting.service.ISettingService;
import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/account")
public class AccountController extends BaseController{
	static Logger logger = Logger.getLogger("ACCOUNT");
	@Autowired
	protected ISettingService settingService;
	
	@RequestMapping("/roleManagerPage")
	public ModelAndView roleManagerPage(){
		mv.setViewName("setting/roleManager");
        return mv;  
	}
	
	@RequestMapping("/getRoleList")
	@ResponseBody
	public ModelMap getRoleList(){		
		List<BmsBaseRole> list = new ArrayList<BmsBaseRole>();
		list = settingService.getRoleList();		
		initModel(true,"success",list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getFunctionList")
	@ResponseBody
	public ModelMap getFunctionList(){
		String role_id=request.getParameter("role_id");
		List<Object> result = new ArrayList<Object>();
		List<BmsBaseFunction> list = new ArrayList<BmsBaseFunction>();
		list = settingService.getFunctionList();				
		result.add(0,list);
		
		List<BmsBaseRolePermission> list2 = new ArrayList<BmsBaseRolePermission>();
		list2 = settingService.getRolePermission(role_id);
		result.add(1,list2);
		
		List<BmsBaseFunctionPermission> list3 = new ArrayList<BmsBaseFunctionPermission>();
		list3 = settingService.getBaseFunctionPermission(role_id);
		result.add(2,list3);
		
		initModel(true,"success",result);
		model = mv.getModelMap();
		return model;
	}

}
