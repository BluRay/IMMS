package com.byd.bms.report.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
@Repository(value="reportDao")
public interface IReportDao {

	List<Map<String, Object>> queryFactoryOutputYear(Map<String, Object> condMap);

}
