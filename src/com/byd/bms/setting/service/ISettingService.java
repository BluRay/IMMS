package com.byd.bms.setting.service;

import java.util.List;

import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.setting.model.BmsUserRole;
import com.byd.bms.util.model.BmsBaseUser;

public interface ISettingService {
	public List<BmsBaseRole> getRoleList();
	public List<BmsBaseFunction> getFunctionList();
	public List<BmsBaseRolePermission> getRolePermission(String role_id);
	public List<BmsBaseFunctionPermission> getBaseFunctionPermission(String role_id);
	public int addRole(BmsBaseRole role);
	public int delRoleFunction(String role_id,String function_ids);
	public int addRoleFunction(String role_id,String function_id);
	public int delFunctionPermission(String role_id,String permission_ids);
	public int addFunctionPermission(String role_id,String permission_id);
	
	public int addUser(BmsBaseUser user);
	public List<BmsBaseUser> getUserList(String search_key);
	public List<BmsUserRole> getUserRole(String staff_number);	
	public int saveUserRole(String staff_number,String this_role,String role_permission,String factory_permission,String workshop_permission,String line_permission,String edit_user);
}
