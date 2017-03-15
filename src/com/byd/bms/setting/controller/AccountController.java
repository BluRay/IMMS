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

import com.byd.bms.setting.model.BmsBaseRole;
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

}
