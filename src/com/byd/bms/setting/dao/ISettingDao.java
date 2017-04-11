package com.byd.bms.setting.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.util.model.BmsBaseUser;

@Repository(value="settingDao")
public interface ISettingDao {
	public List<BmsBaseRole> getRoleList();
	public List<BmsBaseFunction> getFunctionList();
	public List<BmsBaseRolePermission> getRolePermission(String role_id);
	public List<BmsBaseFunctionPermission> getBaseFunctionPermission(String role_id);
	public int addRole(BmsBaseRole role);
	public int delRoleFunction(@Param("role_id") String role_id,@Param("function_ids") String function_ids);
	public int addRoleFunction(@Param("role_id") String role_id,@Param("function_id") String function_id);
	public int delFunctionPermission(@Param("role_id") String role_id,@Param("permission_ids") String permission_ids);
	public int addFunctionPermission(@Param("role_id") String role_id,@Param("permission_id") String permission_id);
	public int addUser(BmsBaseUser user);
	public List<BmsBaseUser> getUserList(@Param("search_key") String search_key);
}
