CREATE DEFINER=`bmsadmin`@`%` PROCEDURE `P_CACULATE_PIECE_SALLARY_0`(in q_factory varchar(100),in q_workshop varchar(100),in q_workgroup varchar(100),in q_team varchar(100),in q_bus_number varchar(5000),in q_start_date varchar(10), in q_end_date varchar(10))
BEGIN		
	declare v_sql varchar(20000);
	declare cal_status varchar(1);

	SET SESSION  group_concat_max_len = 200000; 
	SET SESSION max_heap_table_size=128*1024*1024;
	
	DROP TEMPORARY TABLE IF EXISTS staff_hours_count;

    set v_sql='create TEMPORARY  TABLE staff_hours_count select h1.* from BMS_HR_STAFF_PIECE_HOURS h1 where h1.salary_model=''技能系数'' and h1.status = ''1''';
	if q_bus_number !='' and q_bus_number is not null then
		set v_sql=concat(v_sql,' and FIND_IN_SET(h1.bus_number,''',q_bus_number,''')>0');
	end if;
	if q_factory !='' and q_factory is not null then
		set v_sql=concat(v_sql,' and h1.factory=''',q_factory,'''');
	end if;
	if q_workshop !='' and q_workshop is not null then
		set v_sql=concat(v_sql,' and h1.workshop=''',q_workshop,'''');
	end if;
	if q_workgroup !='' and q_workgroup is not null then
		set v_sql=concat(v_sql,' and h1.workgroup=''',q_workgroup,'''');
	end if;
	if q_team !='' and q_team is not null then
		set v_sql=concat(v_sql,' and h1.team=''',q_team,'''');
	end if;
	if q_start_date !='' and q_start_date is not null then
		set v_sql=concat(v_sql,' and h1.work_date>=''',q_start_date,'''');
	end if;
	if q_end_date !='' and q_end_date is not null then
		set v_sql=concat(v_sql,' and h1.work_date<=''',q_end_date,'''');
	end if;

    
    set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;
	#select * from staff_hours_count;

	set cal_status=1;

	drop TEMPORARY TABLE IF EXISTS PIECE_PARTICIPATION_SUM;
	create TEMPORARY TABLE PIECE_PARTICIPATION_SUM ENGINE = MEMORY as
	select h.bus_number,sum(ifnull(h.skill_parameter*h.work_hour,0)) total_real_hour,h.org_id
	from staff_hours_count h
	where h.status ='1' and h.salary_model='技能系数'
	group by h.bus_number,h.org_id;
	
	#删除之前的工资

	delete from BMS_HR_PIECE_SALARY 
	where factory=q_factory and workshop=q_workshop and workgroup=q_workgroup and team=q_team 
	#and work_date>=q_start_date and work_date<=q_end_date  
	and FIND_IN_SET(bus_number,q_bus_number)>0
	and salary_model='技能系数';

	#向计件工资计算表中插入工资记录	
	insert into BMS_HR_PIECE_SALARY 
	select null,h.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,h.skill_parameter,h.work_hour,
	round(ifnull(h.work_hour*h.skill_parameter/tmp.total_real_hour,0),2) work_real_hour, ifnull(h.standard_price,0) standard_price,'' distribution,h.work_date,
	round(ifnull(h.work_hour*h.skill_parameter*h.standard_price*( ifnull(h.bus_count,1)+ifnull(h.bonus,0))/tmp.total_real_hour,0),2) ppay,
	h.bus_number,h.factory,h.workshop,h.workgroup,h.team,ifnull(h.bus_count,1) bus_count,ifnull(h.bonus,0) bonus,'技能系数','1',h.editor_id,h.edit_date,0,'',h.order_id
	from staff_hours_count h
	left join BMS_HR_STAFF s on h.staff_number=s.staff_number 
	left join PIECE_PARTICIPATION_SUM tmp on tmp.bus_number=h.bus_number and tmp.org_id=h.org_id
	where h.salary_model='技能系数' and h.status in('1','3')  and h.work_hour>0;
	
	select cal_status;
END