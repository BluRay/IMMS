package com.byd.bms.setting.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.setting.service.ISettingService;
import com.byd.bms.util.MD5Util;
import com.byd.bms.util.controller.BaseController;
import com.byd.bms.util.model.BmsBaseUser;

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
	
	@RequestMapping("/userManagerPage")
	public ModelAndView userManagerPage(){
		mv.setViewName("setting/userManager");
        return mv;  
	}
	
	@RequestMapping("/userRoleManagerPage")
	public ModelAndView userRoleManagerPage(){
		mv.setViewName("setting/userRoleManager");
        return mv;  
	}
	
	@RequestMapping("/addUser")
	@ResponseBody
	public ModelMap addUser() throws NoSuchAlgorithmException, UnsupportedEncodingException{
		String staff_number=request.getParameter("staff_number");
		String username=request.getParameter("username");
		String email=request.getParameter("email");
		String telephone=request.getParameter("telephone");
		String cellphone=request.getParameter("cellphone");
		String password=request.getParameter("password");
		String display_name=request.getParameter("display_name");
		String factory_id=request.getParameter("factory_id");
		String department_id=request.getParameter("department_id");
		String admin=request.getParameter("admin");
		String edit_user = request.getSession().getAttribute("user_name") + "";
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_time = df.format(new Date());
		
		BmsBaseUser user = new BmsBaseUser();
		user.setStaff_number(staff_number);
		user.setUsername(username);
		user.setEmail(email);
		user.setTelephone(telephone);
		user.setCellphone(cellphone);
		user.setPassword(MD5Util.getEncryptedPwd(password));
		user.setDisplay_name(display_name);
		user.setFactory_id(Integer.valueOf(factory_id));
		user.setDepartment_id(Integer.valueOf(department_id));
		user.setAdmin(admin);
		user.setCreate_user(edit_user);
		user.setCreate_time(edit_time);
		int reuslt = settingService.addUser(user);
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
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
	
	@RequestMapping("/addRole")
	@ResponseBody
	public ModelMap addRole(){
		String role_name=request.getParameter("new_role_name");
		String role_description=request.getParameter("new_role_description");
		String type=request.getParameter("new_type");
		String edit_user = request.getSession().getAttribute("user_name") + "";
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_time = df.format(new Date());
		BmsBaseRole role = new BmsBaseRole();
		role.setRole_name(role_name);
		role.setRole_description(role_description);
		role.setType(type);
		role.setEdit_user(edit_user);
		role.setEdit_time(edit_time);
		int reuslt = settingService.addRole(role);
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/saveRole")
	@ResponseBody
	public ModelMap saveRole(){
		String role_id=request.getParameter("role_id");
		String function_ids=request.getParameter("function_ids");
		String permission_ids=request.getParameter("permission_ids");
		int reuslt = settingService.delRoleFunction(role_id, function_ids);
		
		String[] function_id = function_ids.split(",");
		for (int i = 0 ; i <function_id.length ; i++ ) {
			reuslt += settingService.addRoleFunction(role_id, function_id[i]);
		}
		
		if(!"".equals(permission_ids))reuslt += settingService.delFunctionPermission(role_id, permission_ids);
		String[] permission_id = permission_ids.split(",");
		for (int i = 0 ; i <permission_id.length ; i++ ) {
			reuslt += settingService.addFunctionPermission(role_id, permission_id[i]);
		}
		
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
	}

}
