package com.byd.bms.util.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.byd.bms.util.model.BmsBaseMenu;
@Repository(value="menuDao")
public interface IMenuDao {
	public List<BmsBaseMenu> getMenu(String staff_number);
	
	Map<String,Object> getFavorite(Map<String,Object> condMap);
	void deleteFavorite(Map<String,Object> condMap);
	void insertFavorite(Map<String,Object> condMap);
}
