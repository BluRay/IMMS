package com.byd.bms.flow.controller;

import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.snaker.engine.access.Page;
import org.snaker.engine.access.QueryFilter;
import org.snaker.engine.entity.Process;
import org.snaker.engine.entity.HistoryOrder;
import org.snaker.engine.entity.Task;

import com.byd.bms.flow.model.Approval;
//import com.snakerflow.framework.security.shiro.ShiroUtils;
import com.byd.bms.flow.util.ConvertUtils;
import com.byd.bms.flow.service.IApprovalService;
import com.byd.bms.flow.service.IFlowService;
import com.byd.bms.flow.service.imp.SnakerEngineFacets;
import com.byd.bms.util.controller.BaseController;

import org.snaker.engine.model.TaskModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import java.util.*;

/**
 * @author yuqs
 * @since 2.0
 */
@Controller("flowManager")
@RequestMapping(value = "/flow")
public class FlowController extends BaseController{
    public static final String PARA_PROCESSID = "processId";
    public static final String PARA_ORDERID = "orderId";
    public static final String PARA_TASKID = "taskId";
    public static final String PARA_TASKNAME = "taskName";
    public static final String PARA_METHOD = "method";
    public static final String PARA_NEXTOPERATOR = "nextOperator";
    public static final String PARA_NODENAME = "nodeName";
    public static final String PARA_CCOPERATOR = "ccOperator";

    @Autowired
    private SnakerEngineFacets facets;
    @Autowired
    private IApprovalService approvalService;
    @Autowired
    private IFlowService flowService;
    /**
     * 流程实例查询
     * @param model
     * @param page
     * @return
     */
    @RequestMapping("/order")
	public ModelAndView history(){
		mv.setViewName("snaker/order");
		return mv;
	}
    @RequestMapping(value = "orderList")
    @ResponseBody
    public ModelMap order() {
//        facets.getEngine().query().getHistoryOrders(page, new QueryFilter());
//        model.addAttribute("page", page);
//        return "snaker/order";
    	model.clear();
		String userId=session.getAttribute("user_id").toString();
		String startDate=request.getParameter("start_date");
		String endDate=request.getParameter("end_date");
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String, Object> condMap = new HashMap<String, Object>();
		condMap.put("userId", userId);
		condMap.put("startDate", startDate);
		condMap.put("endDate", endDate);
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		flowService.getProcessInstanceList(condMap, model);
		return model;
    }

    /**
     * 抄送实例已读
     * @param id
     * @param url
     * @return
     */
    @RequestMapping(value = "ccread")
    public String ccread(String id, String url) {
    	String userId= (String) session.getAttribute("user_id");
        //List<String> list = ShiroUtils.getGroups(); 暂时注释
    	List<String> list = new ArrayList<String>();
        list.add(userId);
        String[] assignees = new String[list.size()];
        list.toArray(assignees);
        facets.getEngine().order().updateCCStatus(id, assignees);
        return "redirect:" + url;
    }

    @SuppressWarnings("unchecked")
	@RequestMapping(value = "process")
    public String process(HttpServletRequest request) {
    	String userId= session.getAttribute("user_id").toString();
        Map<String, Object> params = new HashMap<String, Object>();
        Enumeration<String> paraNames = request.getParameterNames();
        while (paraNames.hasMoreElements()) {
            String element = paraNames.nextElement();
            int index = element.indexOf("_");
            String paraValue = request.getParameter(element);
            if(index == -1) {
                params.put(element, paraValue);
            } else {
                char type = element.charAt(0);
                String name = element.substring(index + 1);
                Object value = null;
                switch(type) {
                    case 'S':
                        value = paraValue;
                        break;
                    case 'I':
                        value = ConvertUtils.convertStringToObject(paraValue, Integer.class);
                        break;
                    case 'L':
                        value = ConvertUtils.convertStringToObject(paraValue, Long.class);
                        break;
                    case 'B':
                        value = ConvertUtils.convertStringToObject(paraValue, Boolean.class);
                        break;
                    case 'D':
                        value = ConvertUtils.convertStringToObject(paraValue, Date.class);
                        break;
                    case 'N':
                        value = ConvertUtils.convertStringToObject(paraValue, Double.class);
                        break;
                    default:
                        value = paraValue;
                        break;
                }
                params.put(name, value);
            }
        }
        String processId = request.getParameter(PARA_PROCESSID);
        String orderId = request.getParameter(PARA_ORDERID);
        String taskId = request.getParameter(PARA_TASKID);
        String nextOperator = request.getParameter(PARA_NEXTOPERATOR);
        if (StringUtils.isEmpty(orderId) && StringUtils.isEmpty(taskId)) {
            facets.startAndExecute(processId, userId, params);
        } else {
            String methodStr = request.getParameter(PARA_METHOD);
            int method;
            try {
                method = Integer.parseInt(methodStr);
            } catch(Exception e) {
                method = 0;
            }
            switch(method) {
                case 0://任务执行
                    facets.execute(taskId, userId, params);
                    break;
                case -1://驳回、任意跳转
                    facets.executeAndJump(taskId, userId, params, request.getParameter(PARA_NODENAME));
                    break;
                case 1://转办
                    if(StringUtils.isNotEmpty(nextOperator)) {
                        facets.transferMajor(taskId, userId, nextOperator.split(","));
                    }
                    break;
                case 2://协办
                    if(StringUtils.isNotEmpty(nextOperator)) {
                        facets.transferAidant(taskId, userId, nextOperator.split(","));
                    }
                    break;
                default:
                    facets.execute(taskId, userId, params);
                    break;
            }
        }
        String ccOperator = request.getParameter(PARA_CCOPERATOR);
        if(StringUtils.isNotEmpty(ccOperator)) {
        	//            facets.getEngine().order().createCCOrder(orderId, ShiroUtils.getUsername(), ccOperator.split(","));
        	String [] ccOperatorArr=ccOperator.split(",");
        	facets.getEngine().order().createCCOrder(orderId, ccOperatorArr);
        }
        return "redirect:/task/active";
    }

    /**
     * 通用的流程展现页面入口
     * 将流程中的各环节表单以tab+iframe方式展现
     */
    @RequestMapping(value = "all")
    public ModelAndView all(Model model, String processId, String orderId,
    		String taskId,String type) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
        if(StringUtils.isNotEmpty(processId)) {
            model.addAttribute("process", facets.getEngine().process().getProcessById(processId));
        }
        if(StringUtils.isNotEmpty(orderId)) {
            model.addAttribute("order", facets.getEngine().query().getOrder(orderId));
        }
        if(StringUtils.isNotEmpty(taskId)) {
        	
            model.addAttribute("task", facets.getEngine().query().getTask(taskId));
        }
        mv.setViewName("snaker/all"); 
       
		return mv;
        //return "snaker/all";
    }

    /**
     * 节点信息以json格式返回
     * all页面以节点信息构造tab及加载iframe
     */
    @RequestMapping(value = "node")
    @ResponseBody
    public Object node(String processId) {
        Process process = facets.getEngine().process().getProcessById(processId);
        List<TaskModel> models = process.getModel().getModels(TaskModel.class);
        List<TaskModel> viewModels = new ArrayList<TaskModel>();
        for(TaskModel model : models) {
            TaskModel viewModel = new TaskModel();
            viewModel.setName(model.getName());
            viewModel.setDisplayName(model.getDisplayName());
            viewModel.setForm(model.getForm());
            viewModels.add(viewModel);
        }
        return viewModels;
    }

    /**
     * 由于审批类流程在各业务系统中经常出现，至此本方法是统一审批的url
     * 如果审批环节能够统一，建议使用该方法返回统一审批页面
     */
    @RequestMapping(value = "approval")
    public String approval(Model model, String processId, String orderId, String taskId, String taskName) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
        if(StringUtils.isNotEmpty(taskId)) {
            return "snaker/approval";
        } else {
            model.addAttribute("approvals", approvalService.findByFlow(orderId, taskName));
            return "snaker/approvalView";
        }
    }

    /**
     * 审批环节的提交处理
     * 其中审批表可根据具体审批的业务进行定制，此处仅仅是举例
     */
    @RequestMapping(value = "doApproval", method = RequestMethod.POST)
    public String doApproval(Approval model) {
    	String userId= (String) session.getAttribute("user_id");
        model.setOperateTime(new DateTime().toString("yyyy-MM-dd HH:mm:ss"));
        model.setOperator(userId);
        approvalService.save(model);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("result", model.getResult());
        facets.execute(model.getTaskId(), userId, params);
        return "redirect:/snaker/task/active";
    }
    /*************************流程移动版**************************/
    
    // 流程主页
    @RequestMapping("/flowHomeMobile")
	public ModelAndView flowHomeMobile(){
		mv.setViewName("snaker/flowHomeMobile");
		return mv;
	}
    /**
     * 
     */
    @RequestMapping(value = "allMobile")
    public ModelAndView allMobile(Model model, String processId, String orderId,
    		String taskId) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
		
		Process process=null;
        if(StringUtils.isNotEmpty(processId)) {
        	process=facets.getEngine().process().getProcessById(processId);
            model.addAttribute("process", process);
        }
        if(StringUtils.isNotEmpty(orderId)) {
            model.addAttribute("order", facets.getEngine().query().getOrder(orderId));
        }
        Task task=null;
        if(StringUtils.isNotEmpty(taskId)) {
        	task=facets.getEngine().query().getTask(taskId);
            model.addAttribute("task", task);
            model.addAttribute("taskName", task.getTaskName());
            model.addAttribute("displayName", task.getDisplayName());
        }
        List<TaskModel> models = process.getModel().getModels(TaskModel.class);
        for(TaskModel object : models) {
        	if(task==null){
        		mv.setViewName("redirect:"+object.getForm()+"Mobile");// 移动端
        		break;
        	}
            if(task.getTaskName().equals(object.getName())){
            	mv.setViewName("redirect:"+object.getForm()+"Mobile");// 移动端
            	//mv.setViewName("flow/materialPurchase/approvalMobile"); // 移动端
            	break;
            }
        }   	  
		return mv;
    }

}
