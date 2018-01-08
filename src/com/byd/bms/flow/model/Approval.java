package com.byd.bms.flow.model;

/**
 * @author tangjin
 * @desc 审批实体类
 */

public class Approval extends FlowEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1280430261161731105L;
	private Long id;
	private String operator;
    private String operateTime;
    private String result;
    private String content;
    private String taskName;
    private String description;
    public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(String operateTime) {
        this.operateTime = operateTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }
}
