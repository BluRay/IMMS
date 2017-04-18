package com.byd.bms.setting.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.byd.bms.setting.model.BmsBaseFunction;
import com.byd.bms.setting.model.BmsBaseFunctionPermission;
import com.byd.bms.setting.model.BmsBaseRole;
import com.byd.bms.setting.model.BmsBaseRolePermission;
import com.byd.bms.setting.model.BmsUserRole;
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
	public int editUser(BmsBaseUser user);
	public int delUser(BmsBaseUser user);
	public List<BmsBaseUser> getUserList(Map<String,Object> queryMap);
	public int getTotalUserCount(Map<String,Object> queryMap);
	public List<BmsUserRole> getUserRole(@Param("staff_number") String staff_number);
	public List<BmsUserRole> getOneUserRole(@Param("staff_number") String staff_number,@Param("role_id") String role_id);
	public int addUserRole(BmsUserRole userRole);
	public int addOneUserRole(BmsUserRole userRole);
	public int updateUserRole(BmsUserRole userRole);
	public int delUserRole(@Param("staff_number")String staff_number,@Param("roles")String roles);
	public int delOneUserRole(@Param("staff_number")String staff_number,@Param("role")String role);
}
