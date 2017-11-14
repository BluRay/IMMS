package com.byd.bms.quality.model;
/*
 * 品质标准更新记录
 */

public class BmsBaseQCStdRecord {
	private int id;
	private String recordNo;//记录编号
	private String busType;//适用车型
	private String orderId;//适用订单
	private String workshop;//适用车间
	private String scope;//适用工厂范围
	private String implementFactory;//实施工厂
	private String implementBusNumber;//实施车号
	private String confirmor;//确认人
	private String confirm_date;//确认日期
	private String usynopsis;//更新内容摘要
	private String ureason;//标准更新原因
	private String standardfile;//标准文件名称
	private String uchapter;//标准更新章节
	private String uscope;//发放范围
	private String bdescription;//更替前标准描述
	private String bfilePath;//更替前附件
	private String adescription;//更替后标准描述
	private String afilePath;//更替后附件
	private String beforeDesc;//更替前描述
	private String afterDesc;//更替后描述
	private String memo;//备注
	private int editorId;//编辑者id
	private String editor;//编辑者名称
	private String editDate;//编辑日期
	private String mailAddrs;//接收邮箱地址
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRecordNo() {
		return recordNo;
	}
	public void setRecordNo(String recordNo) {
		this.recordNo = recordNo;
	}
	public String getUsynopsis() {
		return usynopsis;
	}
	public void setUsynopsis(String usynopsis) {
		this.usynopsis = usynopsis;
	}
	public String getUreason() {
		return ureason;
	}
	public void setUreason(String ureason) {
		this.ureason = ureason;
	}
	public String getStandardfile() {
		return standardfile;
	}
	public void setStandardfile(String standardfile) {
		this.standardfile = standardfile;
	}
	public String getUchapter() {
		return uchapter;
	}
	public void setUchapter(String uchapter) {
		this.uchapter = uchapter;
	}
	public String getUscope() {
		return uscope;
	}
	public void setUscope(String uscope) {
		this.uscope = uscope;
	}
	public String getBdescription() {
		return bdescription;
	}
	public void setBdescription(String bdescription) {
		this.bdescription = bdescription;
	}
	public String getAdescription() {
		return adescription;
	}
	public void setAdescription(String adescription) {
		this.adescription = adescription;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getEditorId() {
		return editorId;
	}
	public void setEditorId(int editorId) {
		this.editorId = editorId;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getEditDate() {
		return editDate;
	}
	public void setEditDate(String editDate) {
		this.editDate = editDate;
	}
	public String getMailAddrs() {
		return mailAddrs;
	}
	public void setMailAddrs(String mailAddrs) {
		this.mailAddrs = mailAddrs;
	}
	public String getBfilePath() {
		return bfilePath;
	}
	public void setBfilePath(String bfilePath) {
		this.bfilePath = bfilePath;
	}
	public String getAfilePath() {
		return afilePath;
	}
	public void setAfilePath(String afilePath) {
		this.afilePath = afilePath;
	}
	public String getBusType() {
		return busType;
	}
	public void setBusType(String busType) {
		this.busType = busType;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getWorkshop() {
		return workshop;
	}
	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public String getImplementFactory() {
		return implementFactory;
	}
	public void setImplementFactory(String implementFactory) {
		this.implementFactory = implementFactory;
	}
	public String getImplementBusNumber() {
		return implementBusNumber;
	}
	public void setImplementBusNumber(String implementBusNumber) {
		this.implementBusNumber = implementBusNumber;
	}
	public String getConfirmor() {
		return confirmor;
	}
	public void setConfirmor(String confirmor) {
		this.confirmor = confirmor;
	}
	public String getConfirm_date() {
		return confirm_date;
	}
	public void setConfirm_date(String confirm_date) {
		this.confirm_date = confirm_date;
	}
	public String getBeforeDesc() {
		return beforeDesc;
	}
	public void setBeforeDesc(String beforeDesc) {
		this.beforeDesc = beforeDesc;
	}
	public String getAfterDesc() {
		return afterDesc;
	}
	public void setAfterDesc(String afterDesc) {
		this.afterDesc = afterDesc;
	}
	
}
