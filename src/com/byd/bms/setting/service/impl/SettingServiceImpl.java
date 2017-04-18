package com.byd.bms.setting.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.byd.bms.setting.dao.ISettingDao;
import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.setting.model.BmsUserRole;
import com.byd.bms.setting.service.ISettingService;
import com.byd.bms.util.model.BmsBaseUser;

@Service
public class SettingServiceImpl implements ISettingService {
	@Resource(name="settingDao")
	private ISettingDao settingDao;

	@Override
	public List<BmsBaseRole> getRoleList() {
		List<BmsBaseRole> list = settingDao.getRoleList();
		return list;
	}

	@Override
	public List<BmsBaseFunction> getFunctionList() {
		List<BmsBaseFunction> list = settingDao.getFunctionList();
		return list;
	}

	@Override
	public List<BmsBaseRolePermission> getRolePermission(String role_id) {
		List<BmsBaseRolePermission> list = settingDao.getRolePermission(role_id);
		return list;
	}

	@Override
	public List<BmsBaseFunctionPermission> getBaseFunctionPermission(String role_id) {
		List<BmsBaseFunctionPermission> list = settingDao.getBaseFunctionPermission(role_id);
		return list;
	}

	@Override
	public int addRole(BmsBaseRole role) {
		return settingDao.addRole(role);
	}

	@Override
	public int delRoleFunction(String role_id, String function_ids) {
		return settingDao.delRoleFunction(role_id, function_ids);
	}

	@Override
	public int addRoleFunction(String role_id, String function_id) {
		return settingDao.addRoleFunction(role_id, function_id);
	}

	@Override
	public int delFunctionPermission(String role_id, String permission_ids) {
		return settingDao.delFunctionPermission(role_id, permission_ids);
	}

	@Override
	public int addFunctionPermission(String role_id, String permission_id) {
		return settingDao.addFunctionPermission(role_id, permission_id);
	}

	@Override
	public int addUser(BmsBaseUser user) {
		return settingDao.addUser(user);
	}
	
	@Override
	public int editUser(BmsBaseUser user) {
		return settingDao.editUser(user);
	}

	@Override
	public int delUser(BmsBaseUser user) {
		return settingDao.delUser(user);
	}
	@Override
	public Map<String,Object> getUserList(Map<String,Object> condMap) {
		int totalCount=0;
		List<BmsBaseUser> datalist = settingDao.getUserList(condMap);
		totalCount = settingDao.getTotalUserCount(condMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("draw", condMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public List<BmsUserRole> getUserRole(String staff_number) {
		return settingDao.getUserRole(staff_number);
	}

	@Override
	@Transactional
	public int saveUserRole(String staff_number, String this_role, String role_permission, String factory_permission,String workshop_permission, String line_permission,String edit_user) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_time = df.format(new Date());
		String[] roles = role_permission.split(",");
		System.out.println("---->staff_number" + "=" + staff_number + " " + role_permission.substring(0, role_permission.length()-1));
		int result = 0;
		//删除roles以外的用户权限
		settingDao.delUserRole(staff_number, role_permission.substring(0, role_permission.length()-1));
		//增加 新增的用户权限
		for (int i = 0 ; i <roles.length ; i++ ) {
			System.out.println("---->" + i + "=" + roles[i]);
			BmsUserRole userRole = new BmsUserRole();
			userRole.setStaff_number(staff_number);
			userRole.setRole_id(roles[i]);
			userRole.setPermission_key("");
			userRole.setPermission_value("");
			userRole.setEdit_user(edit_user);
			userRole.setEdit_time(edit_time);
			result += settingDao.addUserRole(userRole);
		}
		//修改 当前权限的 数据权限
		int permission_count = 0;
		if (!factory_permission.equals(""))permission_count++;
		if (!workshop_permission.equals(""))permission_count++;
		if (!line_permission.equals(""))permission_count++;
		if (permission_count > 0){
			//delete
			settingDao.delOneUserRole(staff_number, this_role);
			if(!factory_permission.equals("")){
				BmsUserRole userRole = new BmsUserRole();
				userRole.setStaff_number(staff_number);
				userRole.setRole_id(this_role);
				userRole.setPermission_key("1");
				userRole.setPermission_value(factory_permission);
				userRole.setEdit_user(edit_user);
				userRole.setEdit_time(edit_time);
				result += settingDao.addOneUserRole(userRole);
			}
			if(!workshop_permission.equals("")){
				BmsUserRole userRole = new BmsUserRole();
				userRole.setStaff_number(staff_number);
				userRole.setRole_id(this_role);
				userRole.setPermission_key("2");
				userRole.setPermission_value(workshop_permission);
				userRole.setEdit_user(edit_user);
				userRole.setEdit_time(edit_time);
				result += settingDao.addOneUserRole(userRole);
			}
			if(!line_permission.equals("")){
				BmsUserRole userRole = new BmsUserRole();
				userRole.setStaff_number(staff_number);
				userRole.setRole_id(this_role);
				userRole.setPermission_key("3");
				userRole.setPermission_value(line_permission);
				userRole.setEdit_user(edit_user);
				userRole.setEdit_time(edit_time);
				result += settingDao.addOneUserRole(userRole);
			}			
		}
		return result;
	}

	@Override
	public List<BmsUserRole> getOneUserRole(String staff_number, String role_id) {
		return settingDao.getOneUserRole(staff_number,role_id);
	}



}
