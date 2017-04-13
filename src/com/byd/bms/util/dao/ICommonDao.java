package com.byd.bms.util.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository(value="commonDao")
public interface ICommonDao {

	List<Map<String, Object>> queryOrderList(Map<String,Object> condMap);

}
