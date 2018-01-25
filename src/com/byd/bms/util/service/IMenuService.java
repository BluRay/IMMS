package com.byd.bms.util.service;

import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

import com.byd.bms.util.model.BmsBaseMenu;

public interface IMenuService {
	public List<BmsBaseMenu> getMenu(String staff_number);
	
	public void addFavorite(Map<String,Object> condMap,ModelMap model);
	public void removeFavorite(Map<String,Object> condMap,ModelMap model);
}
