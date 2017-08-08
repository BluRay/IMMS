CREATE DEFINER=`root`@`%` PROCEDURE `P_QueryOrgTreeList`(in staff_number varchar(10),in url varchar(100),in orgtype varchar(50),in orgKind varchar(10))
BEGIN
	declare var_stemp text(200000);	#车间维度org tree id列表
	declare var_stempChd text(200000); #车间维度子节点org tree  id列表
	declare parentid varchar(10000);	#工厂节点id列表
	declare workshop_limit varchar(500); #权限车间
	declare level2id varchar(500);#生产部id列表
	declare var_stemp1 text(200000);#工厂下管理型org id 列表
	declare var_stemp1Chd text(200000);#工厂下管理型子节点org id 列表

#设置session级别group_concat 方法返回值的最大长度


SET SESSION  group_concat_max_len = 200000; 

#查询权限工厂id列表

select GROUP_CONCAT(o.id) into parentid
from BMS_BASE_ORG o
where deleted='0' and o.org_type='1' and 
(case when (select ifnull(group_concat(REPLACE(REPLACE(r.permission_value,' ',''),'，',',')),'')
from BMS_BASE_USER_ROLE r
left join BMS_BASE_ROLE_PERMISSION p on r.role_id=p.role_id
left join BMS_BASE_FUNCTION f on f.id=p.function_id and f.isPermission='1'
where r.staff_number=staff_number and r.permission_key='1' and f.function_url=url) =''
 then 1=1
else (find_in_set(o.org_code,(
select distinct REPLACE(REPLACE(r.permission_value,' ',''),'，',',')
from BMS_BASE_USER_ROLE r
left join BMS_BASE_ROLE_PERMISSION p on r.role_id=p.role_id
left join BMS_BASE_FUNCTION f on f.id=p.function_id and f.isPermission='1'
where r.staff_number=staff_number and r.permission_key='1' and f.function_url=url) )>0) end);

#select parentid;

	set var_stemp='';
	#查询工厂下车间的org id

	select  case when group_concat(o.id) is null then parentid else group_concat(o.id) end into var_stempChd 
	from BMS_BASE_ORG o
	where deleted='0' and o.org_type='2' and find_in_set(o.parent_id,parentid)>0 and
	(case when (select ifnull(group_concat(REPLACE(REPLACE(r.permission_value,' ',''),'，',',')),'')
	from BMS_BASE_USER_ROLE r
	left join BMS_BASE_ROLE_PERMISSION p on r.role_id=p.role_id
	left join BMS_BASE_FUNCTION f on f.id=p.function_id and f.isPermission='1'
	where r.staff_number=staff_number and r.permission_key='2' and f.function_url=url) ='' then 1=1
	else (find_in_set(o.org_code,(
	select distinct REPLACE(REPLACE(r.permission_value,' ',''),'，',',')
	from BMS_BASE_USER_ROLE r
	left join BMS_BASE_ROLE_PERMISSION p on r.role_id=p.role_id
	left join BMS_BASE_FUNCTION f on f.id=p.function_id and f.isPermission='1'
	where r.staff_number=staff_number and r.permission_key='2' and f.function_url=url) )>0) end);

	#查询工厂下车间及其子节点的org id 
	while var_stempChd is not null do
		set var_stemp=concat(var_stempChd,',',var_stemp);
		if orgtype !='' then
			select group_concat(id) into var_stempChd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stempChd)>0 and FIND_IN_SET(org_type,orgtype)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
		else
			select group_concat(id) into var_stempChd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stempChd)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
		end if;	
	end while;

	#查询工厂下管理型及其子节点的org id 
	set var_stemp1='';
	if orgKind='0' or orgKind='0,1' then
		select group_concat(id) into var_stemp1Chd from BMS_BASE_ORG where FIND_IN_SET(parent_id,parentid)>0 and org_kind='0';
		while var_stemp1Chd is not null do
			set var_stemp1=concat(var_stemp1Chd,',',var_stemp1);
			if orgtype !='' then
				select group_concat(id) into var_stemp1Chd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stemp1Chd)>0 and FIND_IN_SET(org_type,orgtype)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
			else
				select group_concat(id) into var_stemp1Chd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stemp1Chd)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
			end if;
		end while;
		set var_stemp=concat(var_stemp1,',',var_stemp);
	end if;
	
	#查询工厂下的生产部 org id
	#select group_concat(id) into level2id from BMS_BASE_ORG where FIND_IN_SET(parent_id,parentid)>0 and org_kind=1 and org_type=3;

	#获取org tree 数据
	SELECT s.*  FROM BMS_BASE_ORG s  WHERE s.deleted='0'  AND  (FIND_IN_SET(s.id,  var_stemp)>0  OR  FIND_IN_SET(s.id,parentid)>0) ORDER BY s.id, s.sort_number ASC;

END