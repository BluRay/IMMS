package com.byd.bms.setting.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.setting.dao.ISettingDao;
import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.setting.service.ISettingService;

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

}
