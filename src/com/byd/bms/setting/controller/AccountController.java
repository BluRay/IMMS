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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.setting.model.BmsUserRole;
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

	@RequestMapping("/userProfilePage")
	public ModelAndView userProfilePage(){
		mv.setViewName("setting/userProfilePage");
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
		//String department_id=request.getParameter("department_id");
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
		//user.setDepartment_id(Integer.valueOf(department_id));
		user.setAdmin(admin);
		user.setCreate_user(edit_user);
		user.setCreate_time(edit_time);
		int reuslt = settingService.addUser(user);
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/editUser")
	@ResponseBody
	public ModelMap editUser(){
		String staff_number=request.getParameter("staff_number");
		String username=request.getParameter("username");
		String email=request.getParameter("email");
		String telephone=request.getParameter("telephone");
		String cellphone=request.getParameter("cellphone");
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
		user.setDisplay_name(display_name);
		user.setFactory_id(Integer.valueOf(factory_id));
		//user.setDepartment_id(Integer.valueOf((department_id.equals(""))?"0":department_id));
		user.setAdmin(admin);
		user.setCreate_user(edit_user);
		user.setCreate_time(edit_time);
		int reuslt = settingService.editUser(user);
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/delUser")
	@ResponseBody
	public ModelMap delUser(){
		String staff_number=request.getParameter("staff_number");
		BmsBaseUser user = new BmsBaseUser();
		user.setStaff_number(staff_number);
		int reuslt = settingService.delUser(user);
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/resetUserPass")
	@ResponseBody
	public ModelMap resetUserPass() throws NoSuchAlgorithmException, UnsupportedEncodingException{
		String staff_number=request.getParameter("staff_number");
		BmsBaseUser user = new BmsBaseUser();
		user.setStaff_number(staff_number);
		user.setPassword(MD5Util.getEncryptedPwd(staff_number));
		int reuslt = settingService.resetUserPass(user);
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getUserList")
	@ResponseBody
	public ModelMap getUserList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		String search_key=request.getParameter("search_key");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("search_key", search_key);
		condMap.put("orderColumn", "id");
		
		Map<String,Object> result=settingService.getUserList(condMap);
		model.addAllAttributes(result);
		/**
		List<Object> result = new ArrayList<Object>();
		List<BmsBaseUser> list = new ArrayList<BmsBaseUser>();
		list = settingService.getUserList(search_key);	
		result.add(0,list);
		initModel(true,"success",result);
		model = mv.getModelMap();**/
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
	
	@RequestMapping("/getUserRoleList")
	@ResponseBody
	public ModelMap getUserRoleList(){
		String staff_number=request.getParameter("staff_number");
		List<Object> result = new ArrayList<Object>();
		List<BmsBaseRole> list = new ArrayList<BmsBaseRole>();
		list = settingService.getRoleList();
		result.add(0,list);
		
		List<BmsUserRole> list2 = new ArrayList<BmsUserRole>();
		list2 = settingService.getUserRole(staff_number);
		result.add(1,list2);
		
		initModel(true,"success",result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getFunctionList")
	@ResponseBody
	public ModelMap getFunctionList(){
		String role_id=request.getParameter("role_id");
		String staff_number=request.getParameter("staff_number");
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
		
		List<BmsUserRole> list4 = new ArrayList<BmsUserRole>();
		list4 = settingService.getOneUserRole(staff_number, role_id);
		result.add(3,list4);
		
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
	
	@RequestMapping("/saveUserRole")
	@ResponseBody
	public ModelMap saveUserRole(){
		String staff_number=request.getParameter("staff_number");
		String this_role=request.getParameter("this_role");
		String role_permission=request.getParameter("role_permission");
		String factory_permission=request.getParameter("factory_permission");
		String workshop_permission=request.getParameter("workshop_permission");
		String line_permission=request.getParameter("line_permission");
		String edit_user = request.getSession().getAttribute("user_name") + "";
		int reuslt = settingService.saveUserRole(staff_number, this_role, role_permission, factory_permission, workshop_permission, line_permission,edit_user);
		initModel(true,"success",reuslt);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getUserInfo")
	@ResponseBody
	public ModelMap getUserInfo(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		Map<String, Object> userInfo = settingService.getUserInfoByStaffnumber(staff_number);
		initModel(true,"success",userInfo);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/editUserPassword")
	@ResponseBody
	public ModelMap editUserPassword() throws NoSuchAlgorithmException, UnsupportedEncodingException{
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String old_password = request.getParameter("old_password");
		String new_password = request.getParameter("new_password");
		int result = 0;
		String oldmd5 = MD5Util.getEncryptedPwd(old_password);
		String newmd5 = MD5Util.getEncryptedPwd(new_password);
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("password", oldmd5);
		int checkPassword = settingService.checkUserPassword(condMap);
		if(checkPassword == 0){
			result = -1;
		}else{
			Map<String,Object> condMap2=new HashMap<String,Object>();
			condMap2.put("staff_number", staff_number);
			condMap2.put("password", newmd5);
			result += settingService.updateUserPassword(condMap2);
		}
		mv.clear();
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/editUserInfo")
	@ResponseBody
	public ModelMap editUserInfo(){
		String staff_number = request.getParameter("staff_number");
		String email = request.getParameter("email");
		String telephone = request.getParameter("telephone");
		String cellphone = request.getParameter("cellphone");
		int result = 0;
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("email", email);
		condMap.put("telephone", telephone);
		condMap.put("cellphone", cellphone);
		result = settingService.updateUserInfo(condMap);
		mv.clear();
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}

}
