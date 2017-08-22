package com.byd.bms.report.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

import com.byd.bms.report.dao.IReportDao;
import com.byd.bms.report.service.IReportService;
@Service
public class ReportServiceImpl implements IReportService {
	@Resource(name="reportDao")
	private IReportDao reportDao;
	
	@Override
	public void getFactoryOutputYear(Map<String, Object> condMap, ModelMap model) {
		List<Map<String,Object>> resultList=new ArrayList<Map<String,Object>>();
		String[] keys=new String[12];
		keys[0]="自制件下线";
		keys[1]="部件下线";
		keys[2]="焊装上线";
		keys[3]="焊装下线";
		keys[4]="涂装上线";
		keys[5]="涂装下线";
		keys[6]="底盘上线";
		keys[7]="底盘下线";
		keys[8]="总装上线";
		keys[9]="总装下线";
		keys[10]="入库";
		keys[11]="发车";
		
		List<Map<String,Object>> datalist=reportDao.queryFactoryOutputYear(condMap);
		
		for(String key:keys){
			Map<String,Object> m=new HashMap<String,Object>();
			m.put("workshop", key);			
			m.put("output_1", 0);
			m.put("output_2", 0);
			m.put("output_3", 0);
			m.put("output_4", 0);
			m.put("output_5", 0);
			m.put("output_6", 0);
			m.put("output_7", 0);
			m.put("output_8", 0);
			m.put("output_9", 0);
			m.put("output_10", 0);
			m.put("output_11", 0);
			m.put("output_12", 0);
			
			for(Map<String,Object> d:datalist){
				String workshop=d.get("workshop").toString();
				if(workshop.equals(key)){
					String[] outputs=d.get("output_info").toString().split(",");
					for(int i=0;i<outputs.length;i++){
						String[] o=outputs[i].split(":");
						int month=Integer.parseInt(o[0]);
						String output=o[1];
						m.put("output_"+month, output);
					}
					
					break;
				}
				
				
			}
			
			resultList.add(m);
		}
				
		model.put("data", resultList);
	}


}
