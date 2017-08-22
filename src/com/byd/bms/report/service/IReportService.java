package com.byd.bms.report.service;

import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

public interface IReportService {
	/**
	 * 获取工厂年度产量数据
	 * @author xiong.jianwu
	 * @param condMap
	 * @param model
	 */
	void getFactoryOutputYear(Map<String,Object> condMap,ModelMap model);
}
