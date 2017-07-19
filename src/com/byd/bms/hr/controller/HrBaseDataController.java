package com.byd.bms.hr.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.hr.service.IHrBaseDataService;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.ExcelTool;
import com.byd.bms.util.controller.BaseController;
/**
 * HR基础数据Controller
 * @author tangjin 2017-07-12
 */ 
@Controller
@RequestMapping("/hrBaseData")
public class HrBaseDataController extends BaseController {

	static Logger logger = Logger.getLogger("HR");
	@Autowired
	protected IHrBaseDataService hrBaseDataService;
    private static List orgList;
	
	public List getOrgList() {
		return orgList;
	}

	public void setOrgList(List orgList) {
		this.orgList = orgList;
	}
	//组织架构
	@RequestMapping("/orgData")
	public ModelAndView orgDataPage() {
		mv.setViewName("hr/orgData");
		return mv;
	}
	//标准岗位库
	@RequestMapping("/positionSystem")
	public ModelAndView positionSystemPage() {
		mv.setViewName("hr/positionSystem");
		return mv;
	}
	// 获取组织架构tree型菜单
	@RequestMapping("/getOrgDataTreeList")
	@ResponseBody
	public ModelMap getOrgDataTreeList() {
		Map<String, Object> queryMap = new HashMap<String, Object>();
		String id = request.getParameter("id");
		queryMap.put("id", id);
		List result = hrBaseDataService.getOrgDataTreeList(queryMap);
		if(request.getParameter("id")==null){
			this.setOrgList(result);
		}

		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "data",result);
        map.put( "success",true);
		model.addAllAttributes(map);
        return model;
	}
	// 根据parent_id查询该子节点菜单
	@RequestMapping("/getOrgDataByParentId")
	@ResponseBody
	public ModelMap getOrgDataByParentId() {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		String id = request.getParameter("id");
		String parent_id = request.getParameter("parent_id");
		conditionMap.put("id", id);
		conditionMap.put("parent_id", parent_id);
		List result = hrBaseDataService.getOrgDataByParentId(conditionMap);
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "data",result);
        model.addAllAttributes(map);
        return model;
	}
	/**
	 * 修改组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/editOrgData")
	@ResponseBody
	public ModelMap editOrgData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
        conditionMap.put("parent_id", request.getParameter("parent_id"));
		conditionMap.put("org_type", request.getParameter("org_type"));
		conditionMap.put("org_kind", request.getParameter("org_kind"));
		conditionMap.put("name", request.getParameter("name"));
		conditionMap.put("name_en", request.getParameter("name_en"));
		conditionMap.put("org_code", request.getParameter("org_code"));
		conditionMap.put("manager", request.getParameter("manager"));
		conditionMap.put("responsibilities",
				request.getParameter("responsibilities"));
		conditionMap.put("deleted", "0");
		conditionMap.put("editor_id", editor_id);
		conditionMap.put("edit_date", curTime);

		conditionMap.put("id", request.getParameter("id"));

		int result = hrBaseDataService.editOrgData(conditionMap);
		if(result==1){
			conditionMap.put("success",true);
			model.addAllAttributes(conditionMap);
		}
		return model;
	}
	/**
	 * 删除组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/deleteOrgData")
	@ResponseBody
	public ModelMap deleteOrgData() throws UnsupportedEncodingException {
		int result=0;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		String ids=request.getParameter("ids");
		List idlist=Arrays.asList(ids.split(","));
		for(Object id : idlist){
			conditionMap.put("id", (String)id);
            //生成子tree
			TreeNode t = recursiveTree((String)id,this.getOrgList());
			//递归删除子tree的所有节点
			traverseTreeDeleteOrg(t);
			//删除当前节点
			result = hrBaseDataService.deleteOrgData(conditionMap);
		}
		if(result==1){
			conditionMap.put("success",true);
			model.addAllAttributes(conditionMap);
		}
		return model;
	}
	public void traverseTreeDeleteOrg(TreeNode node){
		for(TreeNode n :(List<TreeNode>)node.getNodes()){
			//do something
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("id", n.getId());
			hrBaseDataService.deleteOrgData(conditionMap);
			traverseTreeDeleteOrg(n);
		}
	}
	/**
	 * 添加组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/addOrgData")
	@ResponseBody
	public ModelMap addOrgData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("parent_id", request.getParameter("parent_id"));
			conditionMap.put("org_type", request.getParameter("org_type"));
			conditionMap.put("org_kind", request.getParameter("org_kind"));
			conditionMap.put("name", request.getParameter("name"));
			conditionMap.put("name_en", request.getParameter("name_en"));
			conditionMap.put("org_code", request.getParameter("org_code"));
			conditionMap
					.put("sort_number", request.getParameter("sort_number"));
			conditionMap.put("manager", request.getParameter("manager"));
			conditionMap.put("foreign_id", request.getParameter("foreign_id"));
			conditionMap.put("responsibilities",
					request.getParameter("responsibilities"));
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", editor_id);
			conditionMap.put("edit_date", curTime);
			
			//数据插入成功后返回新插入数据的id
			conditionMap.put("id", "");
			
			int result = hrBaseDataService.addOrgData(conditionMap);
			
			//复制
			if(request.getParameter("id")!=null){
				//生成子tree
				TreeNode t = recursiveTree(request.getParameter("id"),this.getOrgList());
				//递归复制子tree的所有节点
				traverseTreeCopyOrg(t,conditionMap.get("id").toString());
			}

			if(result==1){
				conditionMap.put("success",true);
				model.addAllAttributes(conditionMap);
			}
			return model;
		
	}
	public void traverseTreeCopyOrg(TreeNode node,String parent){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		for(TreeNode n :(List<TreeNode>)node.getNodes()){
			//do something
			
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("parent_id", parent);
			conditionMap.put("org_type", n.getOrg_type());
			conditionMap.put("org_kind", n.getOrg_kind());
			conditionMap.put("name", n.getDisplay_name());
			conditionMap.put("name_en", n.getName());
			conditionMap.put("org_code", n.getShort_name());
			conditionMap
					.put("sort_number", n.getSort_number());
			conditionMap.put("manager", n.getManager());
			conditionMap.put("responsibilities",
					n.getResponsibilities());
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", editor_id);
			conditionMap.put("edit_date", curTime);
			
			conditionMap.put("id", "");
			
			//conditionMap.put("id", n.getId());
			hrBaseDataService.addOrgData(conditionMap);
			traverseTreeCopyOrg(n,conditionMap.get("id").toString());
		}
	}
	
	/**
	 * 递归算法解析成树形结构
	 *
	 * @param id
	 * @return
	 * @author wx
	 */
	public TreeNode recursiveTree(String id,List<HashMap<Object,Object>> s) {
		// 根据cid获取节点对象(SELECT * FROM tb_tree t WHERE t.cid=?)
		TreeNode node = getTreeNode(id,s);
		// 查询cid下的所有子节点(SELECT * FROM tb_tree t WHERE t.pid=?)
		List<TreeNode> childTreeNodes = queryTreeNode(id,s);
		// 遍历子节点
		for (TreeNode child : childTreeNodes) {
			TreeNode n = recursiveTree(child.getId(),s); // 递归
			node.getNodes().add(n);
		}

		return node;
	}

	private List<TreeNode> queryTreeNode(String id,List<HashMap<Object,Object>> s) {
		List list = new ArrayList();
		for(HashMap<Object,Object> h : s){
			if(h.get("parent_id")==null){
				//
			}else
			if(h.get("parent_id").toString().equals(id)){
				TreeNode tn = new TreeNode();
				tn.setId(h.get("id")==null?"":h.get("id").toString());
				if(h.get("parent_id")==null){
					tn.setParent("0");
				}else{
					tn.setParent(h.get("parent_id").toString());
				}
				tn.setName(h.get("name")==null?"":h.get("name").toString());
				tn.setDisplay_name(h.get("display_name")==null?"":h.get("display_name").toString());
				tn.setShort_name(h.get("short_name")==null?"":h.get("short_name").toString());
				tn.setSort_number(h.get("sort_number")==null?"0":h.get("sort_number").toString());
				tn.setManager(h.get("manager")==null?"":h.get("manager").toString());
				tn.setOrg_type(h.get("org_type")==null?"":h.get("org_type").toString());
				tn.setOrg_kind(h.get("org_kind")==null?"":h.get("org_kind").toString());
				tn.setResponsibilities(h.get("responsibilities")==null?"":h.get("responsibilities").toString());
				tn.setDeleted(h.get("deleted")==null?"":h.get("deleted").toString());
				list.add(tn);
			}
		}
		return list;
	}

	private TreeNode getTreeNode(String id,List<HashMap<Object,Object>> s) {
		TreeNode tn = new TreeNode();
		for(HashMap<Object,Object> h : s){
			if(h.get("id").toString().equals(id)){
				tn.setId(h.get("id")==null?"":h.get("id").toString());
				if(h.get("parent")==null){
					tn.setParent("0");
				}else{
					tn.setParent(h.get("parent").toString());
				}
				tn.setName(h.get("name")==null?"":h.get("name").toString());
				tn.setDisplay_name(h.get("display_name")==null?"":h.get("display_name").toString());
				tn.setShort_name(h.get("short_name")==null?"":h.get("short_name").toString());
				tn.setSort_number(h.get("sort_number")==null?"0":h.get("sort_number").toString());
				tn.setManager(h.get("manager")==null?"":h.get("manager").toString());
				tn.setOrg_type(h.get("org_type")==null?"":h.get("org_type").toString());
				tn.setOrg_kind(h.get("org_kind")==null?"":h.get("org_kind").toString());
				tn.setResponsibilities(h.get("responsibilities")==null?"":h.get("responsibilities").toString());
				tn.setDeleted(h.get("deleted")==null?"":h.get("deleted").toString());
			}
		}
		return tn;
	}
	public class TreeNode implements Serializable {
		private String id;
		private String parent;
		private String name;
		private String display_name;
		private String short_name;
		private String sort_number;
		private String manager;
		private String org_type;
		private String org_kind;
		private String responsibilities;
		private String deleted;
		public String getDeleted() {
			return deleted;
		}
		public void setDeleted(String deleted) {
			this.deleted = deleted;
		}
		//子节点
		private List nodes = new ArrayList();
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getParent() {
			return parent;
		}
		public void setParent(String parent) {
			this.parent = parent;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDisplay_name() {
			return display_name;
		}
		public void setDisplay_name(String display_name) {
			this.display_name = display_name;
		}
		public String getShort_name() {
			return short_name;
		}
		public void setShort_name(String short_name) {
			this.short_name = short_name;
		}
		public String getSort_number() {
			return sort_number;
		}
		public void setSort_number(String sort_number) {
			this.sort_number = sort_number;
		}
		public String getManager() {
			return manager;
		}
		public void setManager(String manager) {
			this.manager = manager;
		}
		public String getOrg_type() {
			return org_type;
		}
		public void setOrg_type(String org_type) {
			this.org_type = org_type;
		}
		public String getOrg_kind() {
			return org_kind;
		}
		public void setOrg_kind(String org_kind) {
			this.org_kind = org_kind;
		}
		public String getResponsibilities() {
			return responsibilities;
		}
		public void setResponsibilities(String responsibilities) {
			this.responsibilities = responsibilities;
		}
		public List getNodes() {
			return nodes;
		}
		public void setNodes(List nodes) {
			this.nodes = nodes;
		}
	}
	@RequestMapping(value="/uploadPositionSystem",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadPositionSystem(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading.....");
		String fileName="positionSystem.xls";
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		try{
		ExcelModel excelModel = new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String, Integer> dataType = new HashMap<String, Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileName);
		File tempfile=new File(fileName);
		file.transferTo(tempfile);
		/**
		 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
		 */
		InputStream is = new FileInputStream(tempfile);

		ExcelTool excelTool = new ExcelTool();
		excelTool.readExcel(is, excelModel);

		List<Map<String, Object>> addList = new ArrayList<Map<String, Object>>();
		for (Object[] data : excelModel.getData()) {
			Map<String, Object> infomap = new HashMap<String, Object>();

			infomap.put("job_no", data[0] == null ? null : data[0].toString().trim());
			infomap.put("job_name", data[1] == null ? null : data[1].toString().trim());
			infomap.put("basic_besponsibilit", data[2] == null ? null : data[2].toString().trim());
			infomap.put("requirements", data[3] == null ? null : data[3].toString().trim());
			infomap.put("skill_and_capability", data[4] == null ? null : data[4].toString().trim());
			infomap.put("required_train", data[5] == null ? null : data[5].toString().trim());
			infomap.put("editor_id", editor_id);
			infomap.put("edit_date", curTime);
			addList.add(infomap);
		}
		hrBaseDataService.addPositionData(addList);
		initModel(true,"导入成功！",addList);
		}catch(Exception e){
			initModel(false,"导入失败！",null);
		}
		return mv.getModelMap();
	}
	@RequestMapping(value="/editPositionData",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap editPositionData(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id",request.getParameter("id"));
		map.put("job_no",request.getParameter("job_no"));
		map.put("job_name", request.getParameter("job_name"));
		map.put("basic_besponsibilit", request.getParameter("basic_besponsibilit"));
		map.put("requirements", request.getParameter("requirements"));
		map.put("skill_and_capability",request.getParameter("skill_and_capability"));
		map.put("required_train",request.getParameter("required_train"));
		map.put("editor_id", editor_id);
		map.put("edit_date", curTime);
		
		int result=hrBaseDataService.editPositionData(map);
		if(result==1){
			initModel(true,"编辑成功！",null);
		}
		return mv.getModelMap();
	}
	@RequestMapping("/getPositionList")
	@ResponseBody
	public ModelMap getPositionList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("job_no", request.getParameter("job_no"));
		condMap.put("orgStr", request.getParameter("orgStr"));
		
		Map<String,Object> list = hrBaseDataService.getPositionList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping("/getPositionData")
	@ResponseBody
	public ModelMap getPositionData(){
	
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("id", request.getParameter("id"));
		Map<String, Object> result=new HashMap<String, Object>(); 
		List<Map<String,Object>> list = hrBaseDataService.getPositionData(condMap);
		if(list.size()>0){
			result.put("data",list.get(0));
		}
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping("/deletePositionData")
	@ResponseBody
	public ModelMap deletePositionData() {
		try {
			String ids = request.getParameter("ids");
			List<String> idlist = new ArrayList<String>();
			for(String id : ids.split(",")){
				idlist.add(id);
			}
			hrBaseDataService.deletePositionData(idlist);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	/****************START YangKe**************************************************/
	@RequestMapping("/staffManager")
	public ModelAndView staffManager(){ 		//基础数据 员工库
		mv.setViewName("hr/staffManager");
        return mv;  
    }
	
	@RequestMapping("/workgroupPrice")
	public ModelAndView workgroupPrice(){ 		//基础数据 班组承包单价
		mv.setViewName("hr/workgroupPrice");
        return mv;  
    }
	
	@RequestMapping("/getStaffList")
	@ResponseBody
	public ModelMap getStaffList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("org_id", request.getParameter("org_id"));
		condMap.put("orgType", request.getParameter("orgType"));
		condMap.put("staff_number", request.getParameter("staff_number"));
		condMap.put("staff_level", request.getParameter("staff_level"));
		condMap.put("salary_type", request.getParameter("salary_type"));
		condMap.put("job_type", request.getParameter("job_type"));
		condMap.put("job", request.getParameter("job"));
		condMap.put("workplace", request.getParameter("workplace"));
		condMap.put("status", request.getParameter("status"));
		condMap.put("orgStr", request.getParameter("orgStr"));
		
		Map<String,Object> list = hrBaseDataService.getStaffList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/dimissionStaff")
	@ResponseBody
	public ModelMap dimissionStaff(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", request.getParameter("staff_number"));
		condMap.put("curTime", curTime);
		condMap.put("edit_user", edit_user);
		int result = hrBaseDataService.dimissionStaff(condMap);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="/uploadWorkgroupPrice",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadWorkgroupPrice(@RequestParam(value="file",required=false) MultipartFile file){
		String order_no = request.getParameter("orderId");
		String effective_date = request.getParameter("effective_date");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		String result = "";
		boolean success = true;
		String fileFileName = "uploadWorkgroupPrice.xls";
		//int result = 0;
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_STRING);
		dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);
		try{
			File staffFile = new File(fileFileName);
			file.transferTo(staffFile);
			InputStream is = new FileInputStream(staffFile);
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			List<String> headers=excelModel.getHeader();
			if(!headers.get(0).equals("工厂")||!headers.get(1).equals("车间")||
					!headers.get(2).equals("班组")||!headers.get(3).equals("小班组")||!headers.get(4).equals("承包单价")){
				Exception e=new Exception("请使用下载的模板导入！");
				throw e;			
			}
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			List<Map<String, Object>> upDateList = new ArrayList<Map<String,Object>>();
			int i = 1;
			int dataFlag = 0;
			for(Object[] data : excelModel.getData()){
				++i;
				Map<String, Object> info = new HashMap<String, Object>();
				String factory = data[0].toString().trim(); 
				info.put("factory", factory);
				info.put("workshop", data[1] == null?null:data[1].toString().trim());
				info.put("workgroup", data[2] == null?null:data[2].toString().trim());
				info.put("small_workgroup", data[3] == null?null:data[3].toString().trim());
				info.put("standard_price", data[4] == null?null:data[4].toString().trim());
				info.put("editor_id", edit_user);
				info.put("edit_date", curTime);
				info.put("effective_date", effective_date);
				info.put("order_no", order_no);
				
				//校验用户填写的工厂、车间、班组、小班组、车型 信息是否正确
				Map<String,Object> orgMap =  hrBaseDataService.getOrgInfo(info);
				if(null == orgMap){
					++dataFlag;
					//用户填写的工厂、车间、班组、小班组信息有误
					success = false;
					result = "用户填写的工厂、车间、班组、小班组信息有误!";
					break;
				}else{
					info.put("org_id", orgMap.get("id"));
					//根据工厂、车间、班组、小班组、订单、日期查询标准工时和单价
					Map<String,Object> map = hrBaseDataService.queryWorkgroupPrice(info);
					
					if(null != map && Integer.parseInt(map.get("id").toString()) >0){
						//修改
						info.put("id", map.get("id"));
						upDateList.add(info);
					}else{
						addList.add(info);
					}
					
					if(dataFlag>0){
						result = result+"行数据输入的工厂、车间、班组或小班组信息有误，请确认组织结构是否存在！\n";
					}
					if(success && addList.size()>0){
						//批量新增标准工时/单价
						hrBaseDataService.addWorkgroupPrice(addList);
						result =  "导入成功！";
					}
					if(success && upDateList.size()>0){
						//批量修改标准工时/单价
						hrBaseDataService.updateWorkgroupPrice(upDateList);
						result =  "导入成功！";
					}
				}
			}
		
		} catch (Exception e) {
			e.printStackTrace();
			initModel(false,"导入文件的格式有误！",null);
			model = mv.getModelMap();
			return model;
		}
		initModel(success,result,result);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/uploadStaff",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadStaff(@RequestParam(value="file",required=false) MultipartFile file){
		String fileFileName = "uploadStaff.xls";
		//int result = 0;
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("3", ExcelModel.CELL_TYPE_DATE);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("9", ExcelModel.CELL_TYPE_DATE);
		dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("11", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("12", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("13", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("14", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("15", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("16", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("17", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("18", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("19", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("20", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("21", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("22", ExcelModel.CELL_TYPE_DATE);
		dataType.put("23", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("24", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("25", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("26", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("27", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("28", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("29", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("30", ExcelModel.CELL_TYPE_CANNULL);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);
		
		try {
			File staffFile = new File(fileFileName);
			file.transferTo(staffFile);
			InputStream is = new FileInputStream(staffFile);
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			
			if(excelModel.getData().size()>500){
				initModel(false,"不能同时导入500条以上数据！",null);
				model = mv.getModelMap();
				return model;
			}else{
				StringBuffer staff_numbers = new StringBuffer();
				String result = "";
				boolean success = true;
				int i = 1;
				List<Map<String, Object>> queryOrgList = new ArrayList<Map<String,Object>>();
				List staffNumberList = new ArrayList();
				for(Object[] data : excelModel.getData()){
					++i;
					if(null != data[0] && StringUtils.isNotBlank(data[0].toString().trim())){
						String staff_number = data[0].toString().trim();
						if(!staffNumberList.contains(staff_number)){
							staff_numbers.append(staff_number);
							staff_numbers.append(",");
							staffNumberList.add(staff_number);
						}else{
							result = result+"第"+i+"行工号信息！\n";
						}
					}else{
						//用户填写的工厂、车间、班组、小班组信息有误
						success = false;
						result = result+"第"+i+"行工号信息为必填项！\n";
					}
					//工厂/部	科室	车间	班组	小班组
					if(null == data[13] || StringUtils.isBlank(data[13].toString().trim())){
						//工厂/部为必填值
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					//组织结构信息校验
					Map queryOrgMap = new HashMap<String, Object>();
					queryOrgMap.put("plant_org", data[13].toString());
					
					if(StringUtils.isEmpty(data[14].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[15].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[16].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[17].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					
					if(null!=data[14] && !"".equals(data[14].toString().trim())){
						queryOrgMap.put("dept_org", data[14]==null?null:data[14].toString());
					}
					if(null!=data[15] && !"".equals(data[15].toString().trim())){
						queryOrgMap.put("workshop_org", data[15]==null?null:data[15].toString());
					}
					if(null!=data[16] && !"".equals(data[16].toString().trim())){
						queryOrgMap.put("workgroup_org", data[16]==null?null:data[16].toString());
					}
					if(null!=data[17] && !"".equals(data[17].toString().trim())){
						queryOrgMap.put("team_org", data[17]==null?null:data[17].toString());
					}
					
					queryOrgList.add(queryOrgMap);
				}
				//根据用户填写的组织结构信息查询bms_base_org表
				List<Map<String, Object>> orgResultList = hrBaseDataService.getOrg(queryOrgList);
				
				if(success){
					for(Object[] data : excelModel.getData()){
						System.out.println("-->" + data[1].toString().trim());
					}
					
				}
				
			}
		
		} catch (Exception e) {
			e.printStackTrace();
			initModel(false,"导入文件的格式有误！",null);
			model = mv.getModelMap();
			return model;
		}
		
		initModel(true,"导入成功！",null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getWorkgroupPriceList")
	@ResponseBody
	public ModelMap getWorkgroupPriceList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("workshop", request.getParameter("workshop"));
		condMap.put("workgroup", request.getParameter("workgroup"));
		condMap.put("team", request.getParameter("team"));
		condMap.put("orderId", request.getParameter("orderId"));
		condMap.put("effctiveDateStart", request.getParameter("effctiveDateStart"));
		condMap.put("effctiveDateEnd", request.getParameter("effctiveDateEnd"));
		
		Map<String,Object> list = hrBaseDataService.getWorkgroupPriceList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	/****************END YangKe**************************************************/
}
