package com.byd.bms.setting.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.setting.dao.ISettingDao;
import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
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
	public List<BmsBaseUser> getUserList(String search_key) {
		return settingDao.getUserList(search_key);
	}

}
