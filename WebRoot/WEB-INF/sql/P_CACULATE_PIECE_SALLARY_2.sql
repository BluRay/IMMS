CREATE DEFINER=`bmsadmin`@`%` PROCEDURE `P_CACULATE_PIECE_SALLARY_2`(in q_factory varchar(100),in q_workshop varchar(100),in q_workgroup varchar(100),in q_team varchar(100),in q_month varchar(10),in q_order_id varchar(12))
BEGIN		
	declare v_sql varchar(20000);
	declare cal_status varchar(1);

	SET SESSION  group_concat_max_len = 200000; 
	SET SESSION max_heap_table_size=128*1024*1024;
	
	DROP TEMPORARY TABLE IF EXISTS staff_hours_count; 

    set v_sql=' create TEMPORARY  TABLE staff_hours_count select h1.* from BMS_HR_STAFF_PIECE_HOURS h1 where h1.salary_model=''辅助人力'' and h1.status = ''1''';
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
	if q_month !='' and q_month is not null then
		set v_sql=concat(v_sql,' and substring(h1.work_date,1,7)=''',q_month,'''');
	end if;
	if q_order_id !='' and q_order_id is not null then
		set v_sql=concat(v_sql,' and h1.order_id in (',q_order_id,')>0');
	end if;
    
    set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;
	#select * from staff_hours_count;

	#班组计件工资总额：班组承包单价*车间产量  本车间产量：以计划科发出的产量数量为准
	drop TEMPORARY TABLE IF EXISTS TEAM_PRICE_SUM;
	create TEMPORARY TABLE TEAM_PRICE_SUM ENGINE = MEMORY as 
	select (sum(p.qty)+(select s.bonus from staff_hours_count s where s.order_id=p.order_id and s.workshop=p.workshop limit 1))
	* ifnull((select wp.standard_price from BMS_HR_WORKGROUP_PRICE wp 
		where wp.factory=q_factory and wp.workshop=q_workshop and wp.workgroup=q_workgroup and wp.team=q_team
	and wp.order_id=p.order_id and wp.effective_date<=p.cal_date
	order by wp.effective_date desc limit 1),0) total_price, p.workshop,p.order_id
	from(select count(b.id) qty,'焊装' workshop,b.order_id,substring(b.welding_offline_date,1,10) cal_date
		from BMS_PLAN_BUS b
		left join BMS_BASE_FACTORY f on b.factory_id=f.id
		where f.factory_name=q_factory and substring(b.welding_offline_date,1,7)=q_month
		group by substring(b.welding_offline_date,1,10),b.order_id
	union all
		select count(b.id) qty,'涂装' workshop,b.order_id,substring(b.painting_offline_date,1,10) cal_date
		from BMS_PLAN_BUS b
		left join BMS_BASE_FACTORY f on b.factory_id=f.id
		where f.factory_name=q_factory and substring(b.painting_offline_date,1,7)=q_month
		group by substring(b.painting_offline_date,1,10),b.order_id
	union all
		select count(b.id) qty,'底盘' workshop,b.order_id,substring(b.chassis_offline_date,1,10) cal_date
		from BMS_PLAN_BUS b
		left join BMS_BASE_FACTORY f on b.factory_id=f.id
		where f.factory_name=q_factory and substring(b.chassis_offline_date,1,7)=q_month
		group by substring(b.chassis_offline_date,1,10),b.order_id
	union all
		select count(b.id) qty,'总装' workshop,b.order_id,substring(b.assembly_offline_date,1,10) cal_date
		from BMS_PLAN_BUS b
		left join BMS_BASE_FACTORY f on b.factory_id=f.id
		where f.factory_name=q_factory and substring(b.assembly_offline_date,1,7)=q_month
		group by substring(b.assembly_offline_date,1,10),b.order_id
	union all
		select ifnull(sum(s.quantity),0) qty,'自制件' workshop,s.order_id,substring(s.supply_date,1,10) cal_date
		from BMS_PD_WORKSHOP_SUPPLY s
		left join BMS_BASE_FACTORY f ON s.factory_id=f.id
		where supply_workshop='自制件' and receive_workshop='部件' and substring(s.supply_date,1,7)=q_month and f.factory_name=q_factory
		group by substring(s.supply_date,1,10),s.order_id
	union all
		select ifnull(sum(pf.offline_real_qty),0) qty,'部件' workshop,pf.order_id,substring(pf.prod_date,1,10) cal_date
		from BMS_PD_PARTS_PLAN_FINISH pf
		left join BMS_BASE_FACTORY f ON pf.factory_id=f.id
		left join BMS_BASE_KEY k on k.value=pf.parts_id and k.key_code='BASE_PARTS'
		where substring(pf.prod_date,1,7)=q_month and k.key_name='喷砂' and f.factory_name=q_factory
		group by substring(pf.prod_date,1,10),pf.order_id
		) p
	where p.workshop=q_workshop
	group by p.workshop,p.order_id;
	
	drop TEMPORARY TABLE IF EXISTS WORK_HOUR_SUM;
	create TEMPORARY TABLE WORK_HOUR_SUM ENGINE = MEMORY as
	select round(sum(ifnull(h.work_hour*h.skill_parameter,0)) /( select sum(h1.work_hour*h1.skill_parameter) from BMS_HR_STAFF_PIECE_HOURS h1
	where h1.factory=q_factory and h1.workshop=q_workshop and h1.workgroup=q_workgroup and h1.team=q_team and substring(h1.work_date,1,7)=q_month and h1.status='1' and h1.order_id=h.order_id
	),8) as work_hour_real,h.staff_number,sum(h.work_hour) work_hour,h.factory,h.workshop,h.workgroup,h.team,h.editor_id,h.edit_date,h.standard_price,h.skill_parameter,h.order_id,h.bonus
	from staff_hours_count h
	where h.salary_model='辅助人力' and substring(h.work_date,1,7)=q_month
	group by h.staff_number,h.order_id
	;
	 
	#select * from TEAM_PRICE_SUM;
	#select * from WORK_HOUR_SUM;
	
	set cal_status=1;
	#删除小班组下计算月份下的工资
	delete from BMS_HR_PIECE_SALARY where factory=q_factory and workshop=q_workshop and workgroup=q_workgroup and team=q_team and work_date=q_month and salary_model='辅助人力' and find_in_set(order_id,q_order_id)>0;

	#向计件工资计算表中插入工资记录	公式  班组计件工资总额* SUM（员工日操作工时）*岗位系数）/SUM （SUM（员工日操作工时）*岗位系数)
	insert into BMS_HR_PIECE_SALARY 
	select null,whs.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,whs.skill_parameter,whs.work_hour,whs.work_hour_real,
	whs.standard_price,'',q_month ,round(tps.total_price*whs.work_hour_real,2),'',whs.factory,whs.workshop,whs.workgroup,whs.team,'',whs.bonus,'辅助人力','1',whs.editor_id,whs.edit_date,0,'',whs.order_id
	from WORK_HOUR_SUM whs
	left join BMS_HR_STAFF s  on whs.staff_number=s.staff_number
	left join TEAM_PRICE_SUM tps on tps.workshop=whs.workshop and tps.order_id=whs.order_id
	;
	
	select cal_status;
END