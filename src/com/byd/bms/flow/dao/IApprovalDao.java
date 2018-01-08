package com.byd.bms.flow.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.byd.bms.flow.model.Approval;

@Repository(value="approvalDao")
public interface IApprovalDao {
	
	public void save(Approval entity);
	
	public void delete(Integer id);
	
	public Approval get(Integer id);
	
	public List<Approval> getAll();
	
	public List<Approval> find(String orderId, String taskName, String I);
}
