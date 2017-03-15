package com.byd.bms.setting.dao;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.byd.bms.setting.model.BmsBaseRole;

@Repository(value="settingDao")
public interface ISettingDao {
	public List<BmsBaseRole> getRoleList();

}
