CREATE DEFINER=`bmsadmin`@`%` PROCEDURE `P_CACULATE_ECN_SALLARY`(in q_factory varchar(100),in q_workshop varchar(100),in q_workgroup varchar(100),in q_team varchar(100),in q_month varchar(10))
BEGIN		
	declare query_condition varchar(200);
	declare query_condition_2 varchar(200);
	declare v_sql text(200000);
	declare query_staff_numbers text(50000);
	declare limit_cond varchar(50);
	declare query_ecn_task_ids varchar(10000);
	declare query_org_ids varchar(10000);
	declare cal_status varchar(1);

	SET SESSION  group_concat_max_len = 200000; 
	SET SESSION max_heap_table_size=128*1024*1024;

	set query_condition=concat('and ((s.status=''离职'' and DATE_FORMAT(s.leave_date, ''%Y-%m-%d'')>=''',q_month,''') or s.status=''在职'')');
	set query_condition_2=concat('and ((s1.status=''离职'' and DATE_FORMAT(s1.leave_date, ''%Y-%m-%d'')>=''',q_month,''') or s1.status=''在职'')');
	set limit_cond='';

	if q_factory !='' and q_factory is not null then
	set query_condition=concat(query_condition,' and s.plant_org=''',q_factory,'''');
	set query_condition_2=concat(query_condition_2,' and h.factory=''',q_factory,'''');
	end if;
	if q_workshop !='' and q_workshop is not null  then
	set query_condition=concat(query_condition,' and find_in_set(s.workshop_org,''',q_workshop,''')>0');
	set query_condition_2=concat(query_condition_2,' and find_in_set(h.workshop,''',q_workshop,''')>0');
	end if;
	if q_workgroup !='' and q_workgroup is not null then
	set query_condition=concat(query_condition,' and s.workgroup_org=''',q_workgroup,'''');
	set query_condition_2=concat(query_condition_2,' and h.workgroup=''',q_workgroup,'''');
	end if;
	if q_team !='' and q_team is not null then
	set query_condition=concat(query_condition,' and s.team_org=''',q_team,'''');
	set query_condition_2=concat(query_condition_2,' and h.team=''',q_team,'''');
	end if;

	set v_sql=concat(' select group_concat(t.staff_number) into @query_staff_numbers from ( select distinct tmp.staff_number from (
	select s.staff_number,s.workshop_org,s.workgroup_org,s.team_org,s.job from BMS_HR_STAFF s where 1=1 and s.salary_type=''计件''', query_condition,' 
	union all 
	select distinct s1.staff_number,s1.workshop_org,s1.workgroup_org,s1.team_org,s1.job from BMS_HR_STAFF_TECH_HOURS h 
	left join BMS_HR_STAFF s1 on h.staff_number =s1.staff_number where h.status in (''1'',''3'') and  h.work_date like concat(''',q_month,''',''%'')',
	query_condition_2 ,' order by workshop_org,workgroup_org,team_org,job',') tmp ',limit_cond,' )t');
	
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;
	#select @vsql;

	set query_staff_numbers=@query_staff_numbers ;
	
	select group_concat(distinct h1.ecn_task_detail_id separator ''',''') into query_ecn_task_ids
	from BMS_HR_STAFF_TECH_HOURS h1 left join BMS_HR_STAFF s on h1.staff_number=s.staff_number
	where find_in_set(s.staff_number,query_staff_numbers)>0 and h1.status in ('1','3') and substr(h1.work_date,1,7)=q_month;

	DROP TEMPORARY TABLE IF EXISTS staff_hours_count;
	if query_ecn_task_ids is  null then
		set query_ecn_task_ids='';		
	end if;

	#select query_bus_numbers;
	#select query_ecn_task_ids;

    set v_sql=concat('create TEMPORARY  TABLE staff_hours_count select h1.* from BMS_HR_STAFF_TECH_HOURS h1 left join BMS_HR_STAFF s on h1.staff_number=s.staff_number
		where h1.ecn_task_detail_id in (''',query_ecn_task_ids,''')  and h1.factory=''',q_factory,''' and h1.workshop=''',q_workshop,''' and substr(h1.work_date,1,7)=''',q_month,''' and h1.status in (''1'',''3'') ');
	set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;
	#select * from staff_hours_count;

	drop TEMPORARY TABLE IF EXISTS ECN_HOUR_TOTAL;
	create TEMPORARY TABLE ECN_HOUR_TOTAL as
	select t.id,sum(ifnull(h.work_hour,0)) total_real_hour,substr(h.work_date,1,7) work_month
	from staff_hours_count h
	join BMS_TECH_TASK_DETAIL t on h.ecn_task_detail_id=t.id and t.factory=h.factory  
	where h.status in('1','3') and h.work_hour>0
	group by t.id,h.workshop,substr(h.work_date,1,7);

	drop TEMPORARY TABLE IF EXISTS ECN_BUS_TOTAL;
	create TEMPORARY TABLE  ECN_BUS_TOTAL as
	SELECT  tf.task_detail_id ,tf.factory,tf.workshop,count(tf.bus_number) ecn_bus_total,substr(tf.confirmor_date,1,7) work_month
	FROM BMS_TECH_TASK_FOLLOW tf 
	WHERE  tf.confirmor_id>0 and tf.factory=q_factory and tf.workshop=q_workshop
	GROUP BY tf.task_detail_id,substr(tf.confirmor_date,1,7)
	UNION ALL
	SELECT tfp.task_detail_id,tfp.factory,tfp.workshop,sum(tfp.follow_num) ecn_bus_total,substr(tfp.confirmor_date,1,7) work_month
	FROM BMS_TECH_TASK_FOLLOW_PRE tfp 
	WHERE tfp.confirmor_id>0 and tfp.factory=q_factory and tfp.workshop=q_workshop
	GROUP BY tfp.task_detail_id,substr(tfp.confirmor_date,1,7);


	drop TEMPORARY TABLE IF EXISTS ECN_UNIT_TIME;

	set v_sql=concat('create TEMPORARY TABLE  ECN_UNIT_TIME as select d.id ecn_task_detail_id,d.factory,d.order_no,''',q_workshop,''' workshop,',
	'replace(left(substring(d.time_list,instr(d.time_list,''',q_workshop,''')),instr(substring(concat(d.time_list,'',''),instr(d.time_list,''',q_workshop,''')),'','')-1),concat(''',
	q_workshop,''','':''),'''') unit_time',' from BMS_TECH_TASK_DETAIL d where d.id in (''',query_ecn_task_ids,''')');
	set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;

	drop TEMPORARY TABLE IF EXISTS ECN_BUS_NUMBER;
	create TEMPORARY TABLE  ECN_BUS_NUMBER as
	select d.id ecn_task_detail_id,d.factory,d.order_no,q_workshop workshop,
	replace(left(substring(d.tech_list,instr(d.tech_list,q_workshop)),instr(substring(concat(d.tech_list,','),instr(d.tech_list,q_workshop)),',')-1),concat(q_workshop,':'),'') ecn_number
	from BMS_TECH_TASK_DETAIL d
	where find_in_set(d.id,query_ecn_task_ids)>0;
	
	#删除计件工资计算表中对应工厂车间月份下的记录
	delete from BMS_HR_TECH_SALARY  where factory=q_factory and workshop=q_workshop and work_date like concat(q_month,'%');	
	#向计件工资计算表中插入工资记录	
	insert into BMS_HR_TECH_SALARY 
	select NULL,s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,h.skill_parameter,h.hour_price,h.work_hour,
		case when tmp.total_real_hour<(tmp2.ecn_bus_total*t1.unit_time)*0.8 then  round((h.work_hour/(tmp.total_real_hour))*(tmp.total_real_hour*1.2),4) 
		else  round((h.work_hour/tmp.total_real_hour)*tmp2.ecn_bus_total*t1.unit_time,4) end as real_work_hour,		
		h.work_date,t.id ecn_task_detail_id,tt.tech_order_no,tt.task_content,t1.unit_time*tmp2.ecn_bus_total total_hours,'' task_qty,h.factory,h.workshop,h.workgroup,h.team
	from staff_hours_count h
	left join BMS_HR_STAFF s on s.staff_number=h.staff_number
	left join BMS_TECH_TASK_DETAIL t on h.ecn_task_detail_id=t.id
	left join BMS_TECH_TASK tt on tt.id=t.tech_task_id
	left join ECN_UNIT_TIME t1 on h.ecn_task_detail_id=t1.ecn_task_detail_id and t1.factory=h.factory and t1.workshop=h.workshop 
	left join ECN_BUS_NUMBER bn on bn.ecn_task_detail_id=h.ecn_task_detail_id and bn.factory=h.factory and bn.workshop=h.workshop
	left join ECN_HOUR_TOTAL tmp on tmp.id=t.id and substr(h.work_date,1,7)=tmp.work_month
	left join ECN_BUS_TOTAL tmp2 on t.id=tmp2.task_detail_id and substr(h.work_date,1,7)=tmp2.work_month and tmp2.workshop=h.workshop
	where h.status in('1','3') and h.work_hour>0 and h.factory=q_factory and h.workshop=q_workshop;
	
	set cal_status=1;
	select cal_status;
END