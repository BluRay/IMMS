CREATE DEFINER=`bmsadmin`@`%` PROCEDURE `P_CACULATE_TMP_SALLARY`(in q_factory varchar(100),in q_workshop varchar(100),in q_workgroup varchar(100),in q_team varchar(100),in q_month varchar(10))
BEGIN		
	declare query_condition varchar(200);
	declare query_condition_2 varchar(200);
	declare v_sql text(200000);
	declare query_staff_numbers text(50000);
	declare limit_cond varchar(50);
	declare query_order_ids text(50000);
	declare query_org_ids varchar(10000);
	declare cal_status varchar(1);

	SET SESSION  group_concat_max_len = 200000; 
	SET SESSION max_heap_table_size=128*1024*1024;

	set query_condition=concat('and ((s.status=''离职'' and s.leave_date>=''',q_month,''') or s.status=''在职'')');
	set query_condition_2=concat('and ((s1.status=''离职'' and s1.leave_date>=''',q_month,''') or s1.status=''在职'')');
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
	select distinct s1.staff_number,s1.workshop_org,s1.workgroup_org,s1.team_org,s1.job from BMS_HR_STAFF_TMP_HOURS h 
	left join BMS_HR_STAFF s1 on h.staff_number =s1.staff_number where h.status in (''1'',''3'') and  h.work_date like concat(''',q_month,''',''%'')',
	query_condition_2 ,' order by workshop_org,workgroup_org,team_org,job',') tmp ',limit_cond,' )t');
	
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;
	#select @vsql;

	set query_staff_numbers=@query_staff_numbers ;
	
	select group_concat(distinct h1.temp_order_id separator ''',''') into query_order_ids
	from BMS_HR_STAFF_TMP_HOURS h1 left join BMS_HR_STAFF s on h1.staff_number=s.staff_number
	where find_in_set(s.staff_number,query_staff_numbers)>0  and substr(h1.work_date,1,7)=q_month;

	DROP TEMPORARY TABLE IF EXISTS staff_hours_count;
	if query_order_ids is  null then
		set query_order_ids='''''';		
	end if;
	#select query_bus_numbers;
	#select query_org_ids;

    set v_sql=concat('create TEMPORARY  TABLE staff_hours_count select h1.* from BMS_HR_STAFF_TMP_HOURS h1 left join BMS_HR_STAFF s on h1.staff_number=s.staff_number 
		where h1.temp_order_id in (''',query_order_ids,''') and substr(h1.work_date,1,7)=''',q_month,''' and h1.status in (''1'',''3'') ');
	set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;
	#select * from staff_hours_count;

	drop TEMPORARY TABLE IF EXISTS TMP_HOUR_TOTAL;
	create TEMPORARY TABLE TMP_HOUR_TOTAL as
	select sum(h.work_hour) total_real_hour,o.id order_id,o.tmp_order_no,substr(h.work_date,1,7) work_month,sum(h.work_hour*h.skill_parameter) total_hour
	from staff_hours_count h
	#left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
		#and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
	left join BMS_PD_TMP_ORDER o on h.temp_order_id=o.id
	where  h.status in('1','3') and h.work_hour>0
	group by o.id,substr(h.work_date,1,7);

	drop TEMPORARY TABLE IF EXISTS TMP_SCHEDULE_TOTAL;
	create TEMPORARY TABLE TMP_SCHEDULE_TOTAL as
	select temp_order_id,sum(ifnull(output,0)) finished_qty,substr(record_date,1,7) work_month from BMS_PD_TMP_ORDER_SCHEDULE group by temp_order_id,substr(record_date,1,7);


	#删除计件工资计算表中对应工厂车间月份下的记录
	delete from BMS_HR_TMP_SALARY  where factory=q_factory and workshop=q_workshop and work_date like concat(q_month,'%');	
	#向计件工资计算表中插入工资记录	
	insert into BMS_HR_TMP_SALARY 
	select null,s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,r.new_value skill_parameter,h.work_date,h.hour_price price,h.work_hour,
	case when tmp.total_real_hour<(tmp1.finished_qty*od.single_hour)*0.8 then  round((h.work_hour*h.skill_parameter/(tmp.total_hour))*(tmp.total_real_hour*1.2),2) 
		else  round((h.work_hour*h.skill_parameter/tmp.total_hour)*tmp1.finished_qty*od.single_hour,2) end as real_work_hour,
		od.order_serial_no,od.id order_id,tmp1.finished_qty*od.single_hour total_hours,od.reason_content,h.factory,h.workshop,h.workgroup,h.team
	from staff_hours_count h
	left join BMS_HR_STAFF s on s.staff_number=h.staff_number 
	left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_number=r.staff_number and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
		and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_number=r1.staff_number  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
	left join BMS_PD_TMP_ORDER od on od.id=h.temp_order_id
	#left join BMS_HR_HOUR_PRICE p on p.factory_id=(select id from BMS_BASE_FACTORY where factory_name=h.factory and delete_flag='0' limit 1) and p.hour_type=(select k.value from BMS_BASE_KEY k where k.key_code='HOUR_PRICE' and k.key_name='额外工时' limit 1) and h.work_date>=p.effective_date
	#	and p.effective_date=(select max(p1.effective_date) from BMS_HR_HOUR_PRICE p1 where p1.factory_id=p.factory_id and p1.hour_type=p.hour_type and h.work_date>=p1.effective_date)
	left join TMP_HOUR_TOTAL tmp on tmp.order_id=od.id and substr(h.work_date,1,7)=tmp.work_month
	left join TMP_SCHEDULE_TOTAL tmp1 on tmp1.temp_order_id=h.temp_order_id and substr(h.work_date,1,7)=tmp1.work_month
	where  h.status in('1','3') and h.work_hour>0 and h.factory=q_factory and h.workshop=q_workshop;
	
	set cal_status=1;
	select cal_status;
END