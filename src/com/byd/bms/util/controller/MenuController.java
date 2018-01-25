package com.byd.bms.util.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.byd.bms.util.model.BmsBaseMenu;
import com.byd.bms.util.service.IMenuService;
import com.google.gson.Gson;

@Controller
public class MenuController extends BaseController {
	@Autowired
	protected IMenuService menuService;

	@RequestMapping("/getMenu")
	@ResponseBody
	public ModelMap getMenu() {
		List<BmsBaseMenu> list = new ArrayList<BmsBaseMenu>();
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		list = menuService.getMenu(staff_number);
		Gson gson = new Gson();
		String jsonstr = gson.toJson(list).toString();
		model.put("result", jsonstr);
		model.put("success", true);
		return model;
	}
	
	@RequestMapping("/addFavorite")
	@ResponseBody
	public ModelMap addFavorite(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", session.getAttribute("staff_number"));
		condMap.put("model_id", request.getParameter("model_id"));
		condMap.put("function_name", request.getParameter("function_name"));
		
		menuService.addFavorite(condMap, model);
		return model;
	}
	
	@RequestMapping("/removeFavorite")
	@ResponseBody
	public ModelMap removeFavorite(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", session.getAttribute("staff_number"));
		condMap.put("model_id", request.getParameter("model_id"));
		condMap.put("function_name", request.getParameter("function_name"));
		
		menuService.removeFavorite(condMap, model);
		return model;
	}
}
