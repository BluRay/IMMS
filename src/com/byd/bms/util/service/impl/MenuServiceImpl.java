package com.byd.bms.util.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.byd.bms.util.DataSource;
import com.byd.bms.util.dao.IMenuDao;
import com.byd.bms.util.model.BmsBaseMenu;
import com.byd.bms.util.service.IMenuService;
@Service
@DataSource("dataSourceMaster")
public class MenuServiceImpl implements IMenuService {
	@Resource(name="menuDao")
	private IMenuDao menuDao;
	@Override
	public List<BmsBaseMenu> getMenu(String staff_number) {
		// TODO Auto-generated method stub
		List<BmsBaseMenu> list= menuDao.getMenu(staff_number);
		return list;
	}
	/**
	 * @author xiong.jianwu
	 * 添加收藏
	 */
	@Override
	public void addFavorite(Map<String, Object> condMap, ModelMap model) {
		try{
			if(menuDao.getFavorite(condMap)==null){
				menuDao.insertFavorite(condMap);
			}			
			model.put("success", true);
			model.put("message", "收藏成功!");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "收藏失败!");
			throw e;
		}
		
		
	}
	/**
	 * @author xiong.jianwu
	 * 取消收藏
	 */
	@Override
	public void removeFavorite(Map<String, Object> condMap, ModelMap model) {
		try{
			menuDao.deleteFavorite(condMap);
			model.put("success", true);
			model.put("message", "取消收藏成功!");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "取消收藏失败!");
			throw e;
		}
	}
	
}
