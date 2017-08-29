package com.byd.bms.util.job;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.ui.ModelMap;

import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.production.model.ProductionException;
import com.byd.bms.util.EmailSender;
import com.byd.bms.util.EmailSender.TableTable;
import com.byd.bms.util.EmailSender.TableTable.TdTd;
import com.byd.bms.util.dao.ICommonDao;
import com.byd.bms.util.dao.IEmailDao;
import com.byd.bms.util.service.impl.MailSenderServiceImpl;


public class SendPlanEmailJob  implements Job {
	
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		
	}

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private IPlanDao planDao;
	private ICommonDao commonDao;	
	private IEmailDao emailDao;

	public IPlanDao getPlanDao() {
		return planDao;
	}

	public void setPlanDao(IPlanDao planDao) {
		this.planDao = planDao;
	}

	public ICommonDao getCommonDao() {
		return commonDao;
	}

	public void setCommonDao(ICommonDao commonDao) {
		this.commonDao = commonDao;
	}

	public IEmailDao getEmailDao() {
		return emailDao;
	}

	public void setEmailDao(IEmailDao emailDao) {
		this.emailDao = emailDao;
	}

	/**
	 * 计划生产日报表
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void work() throws IllegalAccessException{
		Map emailConditionMap = new HashMap<String,Object>();
		emailConditionMap.put("email_type", "生产日报表");
		List<Map<String,Object>> emaildatalist=new ArrayList();
		emaildatalist = emailDao.getEmailTemplet(emailConditionMap);
		for(Map<String,Object> map : emaildatalist){
			sendPlanDayEmail(map);
		}
	}
	
	public void sendPlanDayEmail(Map<String,Object> m){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", String.valueOf(m.get("factory_id")));
		conditionMap.put("order_no", "");
		String workshop = "";
		/*if (!request.getParameter("workshop").equals("全部")) workshop = request.getParameter("workshop");*/
		conditionMap.put("workshop", workshop);
		conditionMap.put("start_date", sdf.format(new Date()));
		conditionMap.put("end_date", sdf.format(new Date()));
		List<Map<String,String>> datalist=new ArrayList();
		datalist = planDao.getPlanSerach(conditionMap);
		
		List plan_code=new ArrayList();
		if (datalist.size() == 0){
			//无数据，不发邮件
			System.out.println(String.valueOf(m.get("factory_name"))+"无数据!");
			return;
		}
		
		//邮件模块
		MailSenderServiceImpl mss = new MailSenderServiceImpl();
		
		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
        // 设定 Mail Server
        senderImpl.setHost("smtp.byd.com");
        
        //SMTP验证时，需要用户名和密码
        senderImpl.setUsername("div19BMS@byd.com");
        senderImpl.setPassword("rhc3@kxrz");
        senderImpl.setPort(25);
        mss.setMailSender(senderImpl);
        mss.setDefaultFrom("div19BMS@byd.com");
        //mss.send("duan.qiling@byd.com", "测试", "54321");
		
		mss.setTemplet("classpath:com/byd/bms/util/emailTemplet.html");
		mss.setEncode("utf-8");
		
		EmailSender emailSender = new EmailSender();
		emailSender.setTo(String.valueOf(m.get("inbox"))/*"wang.bo44@byd.com;liu.rui3@byd.com;wang.haitao4@byd.com;jiang.xiayun@byd.com;tan.haiwen@byd.com;wu.xiao1@byd.com;duan.qiling@byd.com;zeng.ni@byd.com;jiang.pei1@byd.com;liu.hongpu@byd.com;dong.ping@byd.com;huang.hua6@byd.com;zhu.yunfeng@byd.com"*/);
		emailSender.setCc(String.valueOf(m.get("cc")));
		emailSender.setFrom("div19BMS@byd.com");
		//emailSender.setContent("http://10.23.1.61:8080/19bms/login.jsp");
		emailSender.getParam().put("content", String.valueOf(m.get("content")));
		emailSender.getParam().put("factory", String.valueOf(m.get("factory_name")));
		emailSender.getParam().put("maintitle", "生产日报");
		//Date d=new Date();
		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		emailSender.getParam().put("subtitle", sdf.format(new Date()));
		emailSender.setSubject(String.valueOf(m.get("subject")).replaceAll("XX年XX月XX日", sdf.format(new Date())));
		
		emailSender.setMerge(true);
		
		List<TableTable> tables = new ArrayList<TableTable>();
		
		TableTable tableX = emailSender.new TableTable();
		List<TdTd> theadX = new ArrayList<TdTd>();
		
		theadX.add(tableX.new TdTd("订单"));
		theadX.add(tableX.new TdTd("车间"));
		theadX.add(tableX.new TdTd("今日计划"));
		theadX.add(tableX.new TdTd("实际完成"));
		theadX.add(tableX.new TdTd("累计完成"));
		theadX.add(tableX.new TdTd("备注"));
		
		tableX.setThead(theadX);
		
		List<List<TdTd>> tbodyX = new ArrayList<List<TdTd>>();
		for(Map<String,String> m1 : datalist){
			List<TdTd> tr = new ArrayList<TdTd>();
			tr.add(tableX.new TdTd(String.valueOf(m1.get("order_desc"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("key_name"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("total_plan_qty"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("real_qty"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("total_qty"))));
			
			if(m1.get("key_name").endsWith("下线")){
				Map<String,Object> conditionMap1 = new HashMap<String,Object>();
				conditionMap1.put("date_start", sdf.format(new Date()));
				conditionMap1.put("date_end", sdf.format(new Date()));
				conditionMap1.put("factory_id", String.valueOf(m.get("factory_id")));
				conditionMap1.put("order_no", m1.get("order_no"));
				conditionMap1.put("workshop_name", m1.get("key_name").replaceAll("下线", ""));
				List<ProductionException> datalist1=new ArrayList<ProductionException>();
				datalist1=planDao.getExceptionList(conditionMap1);
				if(datalist1.size()>0){
					String remark = datalist1.get(0).getDetailed_reasons();
					if(datalist1.size()>1){
						remark += "<br>"+datalist1.get(1).getDetailed_reasons();
					}
					tr.add(tableX.new TdTd(remark));
				}else{
					tr.add(tableX.new TdTd(" "));
				}
			}else{
				tr.add(tableX.new TdTd(" "));
			}
			tbodyX.add(tr);
		}
		tableX.setTbody(tbodyX);
		
		//tableX.setTbody(tbodyX);
		tables.add(tableX);
		
		emailSender.setTables(tables);
		
		mss.send(emailSender,new ModelMap());
	}
	
}
