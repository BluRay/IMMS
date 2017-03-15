package com.byd.bms.setting.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.setting.dao.ISettingDao;
import com.byd.bms.setting.model.BmsBaseRole;
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

}
