package com.byd.bms.flow.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.snaker.engine.access.Page;
import org.snaker.engine.access.QueryFilter;
import org.snaker.engine.entity.HistoryOrder;
import org.snaker.engine.entity.Task;
import org.snaker.engine.entity.WorkItem;
import org.snaker.engine.model.TaskModel.TaskType;







import com.byd.bms.flow.service.IFlowService;
//import com.snakerflow.framework.security.shiro.ShiroUtils;
import com.byd.bms.flow.service.imp.SnakerEngineFacets;
import com.byd.bms.flow.controller.TaskController;
import com.byd.bms.util.controller.BaseController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Snaker流程引擎常用Controller
 * @author yuqs
 * @since 0.1
 */
@Controller("taskManager")
@RequestMapping(value = "/task")
public class TaskController extends BaseController {
	private static final Logger log = LoggerFactory.getLogger(TaskController.class);
	@Autowired
	private SnakerEngineFacets facets;
	@Autowired
	private IFlowService flowService;
	// 代办任务查看页面
	@RequestMapping("/active")
	public ModelAndView active(){
		mv.setViewName("snaker/activeTask");
		return mv;
	}
	// 根据当前用户查询待办任务列表
	@RequestMapping(value = "homeTaskList")
	@ResponseBody
	public ModelMap homeTaskList() {
		model.clear();
		String userId= session.getAttribute("user_id").toString();
        //List<String> list = ShiroUtils.getGroups(); 暂时注释
    	List<String> list = new ArrayList<String>();
        list.add(userId);
		log.info(list.toString());
		String[] assignees = new String[list.size()];
		list.toArray(assignees);
		String taskType=request.getParameter("taskType");
		Map<String,Object> conMap=new HashMap<String,Object>();
		conMap.put("userId", userId);
		if(taskType.equals("Major")){
			conMap.put("taskType", TaskType.Major.ordinal());
			flowService.getCurrentTaskList(conMap, model);
		}
//		else if(taskType.equals("Aidant")){
//			conMap.put("taskType", TaskType.Aidant.ordinal());
//			flowService.getCurrentTaskList(conMap, model);
//		}else if(taskType.equals("CC")){
//			conMap.put("status", 1);
//			flowService.getCCTaskList(conMap, model);
//		}
//		Page<WorkItem> majorPage = new Page<WorkItem>(5);
//		Page<WorkItem> aidantPage = new Page<WorkItem>(3);
//		Page<HistoryOrder> ccorderPage = new Page<HistoryOrder>(3);
//		List<WorkItem> majorWorks = facets.getEngine()
//				.query()
//				.getWorkItems(majorPage, new QueryFilter()
//				.setOperators(assignees)
//				.setTaskType(TaskType.Major.ordinal()));
//		List<WorkItem> aidantWorks = facets.getEngine()
//				.query()
//				.getWorkItems(aidantPage, new QueryFilter()
//				.setOperators(assignees)
//				.setTaskType(TaskType.Aidant.ordinal()));
//		List<HistoryOrder> ccWorks = facets.getEngine()
//				.query()
//				.getCCWorks(ccorderPage, new QueryFilter()
//				.setOperators(assignees)
//				.setState(1));
//		
//		model.addAttribute("majorWorks", majorWorks);
//		model.addAttribute("majorTotal", majorPage.getTotalCount());
//		model.addAttribute("aidantWorks", aidantWorks);
//		model.addAttribute("aidantTotal", aidantPage.getTotalCount());
//		model.addAttribute("ccorderWorks", ccWorks);
//		model.addAttribute("ccorderTotal", ccorderPage.getTotalCount());
		return model;
	}
	
	/**
	 * 根据当前用户查询待办任务列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "user", method=RequestMethod.GET)
	public String userTaskList(Model model, Page<WorkItem> page) {
		String userId= (String) session.getAttribute("user_id");
		facets.getEngine().query().getWorkItems(page, 
				new QueryFilter().setOperator(userId));
		model.addAttribute("page", page);
		return "snaker/userTask";
	}

    @RequestMapping(value = "actor/add", method=RequestMethod.GET)
    public String addTaskActor(Model model, String orderId, String taskName) {
        model.addAttribute("orderId", orderId);
        model.addAttribute("taskName", taskName);
        return "snaker/actor";
    }

    @RequestMapping(value = "actor/add", method=RequestMethod.POST)
    @ResponseBody
    public String addTaskActor(Model model, String orderId, String taskName, String operator) {
        List<Task> tasks = facets.getEngine().query().getActiveTasks(new QueryFilter().setOrderId(orderId));
        for(Task task : tasks) {
            if(task.getTaskName().equalsIgnoreCase(taskName) && StringUtils.isNotEmpty(operator)) {
                facets.getEngine().task().addTaskActor(task.getId(), operator);
            }
        }
        return "success";
    }

    @RequestMapping(value = "tip", method=RequestMethod.GET)
    @ResponseBody
    public Map<String, String> addTaskActor(String orderId, String taskName) {
        List<Task> tasks = facets.getEngine().query().getActiveTasks(new QueryFilter().setOrderId(orderId));
        StringBuilder builder = new StringBuilder();
        String createTime = "";
        for(Task task : tasks) {
            if(task.getTaskName().equalsIgnoreCase(taskName)) {
                String[] actors = facets.getEngine().query().getTaskActorsByTaskId(task.getId());
                for(String actor : actors) {
                    builder.append(actor).append(",");
                }
                createTime = task.getCreateTime();
            }
        }
        if(builder.length() > 0) {
            builder.deleteCharAt(builder.length() - 1);
        }
        Map<String, String> data = new HashMap<String, String>();
        data.put("actors", builder.toString());
        data.put("createTime", createTime);
        return data;
    }
	
	/**
	 * 活动任务查询列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "active/more", method=RequestMethod.GET)
	public String activeTaskList(Model model, Page<WorkItem> page, Integer taskType) {
		String userId= (String) session.getAttribute("user_id");
		//List<String> list = ShiroUtils.getGroups();
		List<String> list=new ArrayList<String>();
		list.add(userId);
		log.info(list.toString());
		String[] assignees = new String[list.size()];
		list.toArray(assignees);
		facets.getEngine().query().getWorkItems(page, 
				new QueryFilter().setOperators(assignees).setTaskType(taskType));
		model.addAttribute("page", page);
		model.addAttribute("taskType", taskType);
		return "snaker/activeTaskMore";
	}
	
	/**
	 * 活动任务查询列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "active/ccmore", method=RequestMethod.GET)
	public String activeCCList(Model model, Page<HistoryOrder> page) {
		String userId= (String) session.getAttribute("user_id");
		//List<String> list = ShiroUtils.getGroups();
		List<String> list=new ArrayList<String>();
		list.add(userId);
		log.info(list.toString());
		String[] assignees = new String[list.size()];
		list.toArray(assignees);
		facets.getEngine()
				.query()
				.getCCWorks(page, new QueryFilter()
				.setOperators(assignees)
				.setState(1));
		model.addAttribute("page", page);
		return "snaker/activeCCMore";
	}
	
	/**
	 * 测试任务的执行
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "exec", method=RequestMethod.GET)
	public String activeTaskExec(Model model, String taskId) {
		String userId= (String) session.getAttribute("user_id");
		facets.execute(taskId, userId, null);
		return "redirect:/snaker/task/active";
	}
	
	/**
	 * 活动任务的驳回
	 * @param model
	 * @param taskId
	 * @return
	 */
	@RequestMapping(value = "reject", method=RequestMethod.GET)
	public String activeTaskReject(Model model, String taskId) {
		String error = "";
		String userId= (String) session.getAttribute("user_id");
		try {
			facets.executeAndJump(taskId, userId, null, null);
		} catch(Exception e) {
			error = "?error=1";
		}
		return "redirect:/snaker/task/active" + error;
	}
	@RequestMapping("/history")
	public ModelAndView history(){
		mv.setViewName("snaker/historyTask");
		return mv;
	}
	
	/**
	 * 历史完成任务查询列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "historyTaskList")
	@ResponseBody
	public ModelMap historyTaskList() {
		model.clear();
		String userId=session.getAttribute("user_id").toString();
		String startDate=request.getParameter("start_date");
		String endDate=request.getParameter("end_date");
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("userId", userId);
		conditionMap.put("startDate", startDate);
		conditionMap.put("endDate", endDate);
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		flowService.getHistoryTaskList(conditionMap,model);
		return model;
	}
	
	/**
	 * 历史任务撤回
	 * @param taskId
	 * @return
	 */
	@RequestMapping(value = "undo", method=RequestMethod.GET)
	public String historyTaskUndo(Model model, String taskId) {
		String returnMessage = "";
		String userId= (String) session.getAttribute("user_id");
		try {
			facets.getEngine().task().withdrawTask(taskId, userId);
			returnMessage = "任务撤回成功.";
		} catch(Exception e) {
			returnMessage = e.getMessage();
		}
		model.addAttribute("returnMessage", returnMessage);
		return "redirect:/snaker/task/history";
	}
}
