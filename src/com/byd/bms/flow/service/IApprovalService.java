package com.byd.bms.flow.service;

import java.util.List;

import com.byd.bms.flow.model.Approval;

public interface IApprovalService {
	
	public void save(Approval entity);
	
	public void delete(Integer id);
	
	public Approval get(Integer id);
	
	public List<Approval> getAll();
	
	public List<Approval> findByFlow(String orderId, String taskName);
	
}
