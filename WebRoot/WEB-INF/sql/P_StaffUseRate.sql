CREATE DEFINER=`bmsadmin`@`%` PROCEDURE `P_StaffUseRate`(in q_factory varchar(20), in q_factory_id varchar(12), in q_start_date varchar(20), in q_end_date varchar(20))
begin
SET SESSION max_heap_table_size=128*1024*1024;

drop TEMPORARY TABLE IF EXISTS tmp_staff_att;
create TEMPORARY TABLE tmp_staff_att as
select a.*,ifnull(b.output,0) output,case when b.internal_name is null then b.bus_type_m else b.internal_name end as bus_type,b.order_flag
from(
select r.factory,r.workshop,sum(r.direct_num_yd)-
sum(r.out_aid_cs_num +r.out_aid_nj_num+r.out_aid_hz_num+r.out_aid_dl_num+r.out_aid_qd_num+r.out_aid_cd_num+r.out_aid_wh_num+r.out_aid_sw_num+
r.out_aid_ty_num+r.out_aid_sz_num+r.out_aid_xa_num+r.out_aid_nb_num+r.out_aid_yc_num+r.out_aid_tj_num)+
sum(r.in_aid_cs_num +r.in_aid_nj_num+r.in_aid_hz_num+r.in_aid_dl_num+r.in_aid_qd_num+r.in_aid_cd_num+r.in_aid_wh_num+r.in_aid_sw_num+
r.in_aid_ty_num+r.in_aid_sz_num+r.in_aid_xa_num+r.in_aid_nb_num+r.in_aid_yc_num+r.in_aid_tj_num) direct_num_yd,sum(r.short_num_yd) short_num_yd,
sum(r.leave_num) leave_num,sum(holiday_num) holiday_num,sum(absence_num) absence_num,sum(trip_num) trip_num,sum(out_aid_num) out_aid_num
from BMS_HR_ATTENDENCE_REPORT r
where r.report_type='计件' and r.factory=q_factory and r.record_date>=q_start_date and r.record_date<=q_end_date
group by r.factory,r.workshop
)a
left join
(
select q_factory factory, '自制件' workshop,tmp.internal_name,tmp.output,t1.internal_name bus_type_m, 1 order_flag
from(
select '自制件' workshop,t.internal_name,sum(s.quantity) output
from BMS_PD_WORKSHOP_SUPPLY s
left join BMS_OR_ORDER o on s.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id
where s.supply_workshop='自制件' and s.receive_workshop='部件' and s.supply_date >=q_start_date and s.supply_date<=q_end_date and s.factory_id=q_factory_id
group by t.internal_name
order by sum(s.quantity)  desc limit 1
) tmp
right join
(select '自制件' workshop,t.internal_name,sum(s.quantity) output
from BMS_PD_WORKSHOP_SUPPLY s
left join BMS_OR_ORDER o on s.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id
where s.supply_workshop='自制件' and s.receive_workshop='部件' and s.supply_date like concat(substring(q_start_date,1,7),'%' )  and s.factory_id=q_factory_id
group by t.internal_name
order by sum(s.quantity)  desc limit 1) t1 on tmp.workshop=t1.workshop 
union all
select q_factory factory,'部件' workshop,tmp.internal_name,tmp.output,t1.internal_name bus_type_m,2 order_flag
from(
select '部件' workshop,t.internal_name,sum(ifnull(f.offline_real_qty,0)) output
from BMS_PD_PARTS_PLAN_FINISH f
left join BMS_OR_ORDER o on f.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id
left join BMS_BASE_KEY p1 on p1.value=f.parts_id AND p1.key_code ='BASE_PARTS'
where p1.key_name='喷砂' and f.prod_date >=q_start_date and f.prod_date<=q_end_date and f.factory_id=q_factory_id
group by t.internal_name
order by sum(ifnull(f.offline_real_qty,0))  desc limit 1
) tmp
right join
(
select '部件' workshop,t.internal_name,sum(ifnull(f.offline_real_qty,0)) output
from BMS_PD_PARTS_PLAN_FINISH f
left join BMS_OR_ORDER o on f.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id
left join BMS_BASE_KEY p1 on p1.value=f.parts_id AND p1.key_code ='BASE_PARTS'
where p1.key_name='喷砂' and  f.prod_date like concat(substring(q_start_date,1,7),'%' )  and f.factory_id=q_factory_id
group by t.internal_name
order by sum(ifnull(f.offline_real_qty,0))  desc limit 1
) t1 on tmp.workshop=t1.workshop
union all
select q_factory factory,'焊装' workshop,tmp.internal_name,tmp.output,t1.internal_name bus_type_m,3 order_flag
from(
select '焊装' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where b.welding_offline_date_report>=q_start_date and b.welding_offline_date_report<=q_end_date  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
)tmp
right join
(
select '焊装' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where  b.welding_offline_date_report like concat(substring(q_start_date,1,7),'%' )  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
)t1 on tmp.workshop=t1.workshop
union all
select q_factory factory,'涂装' workshop,tmp.internal_name,tmp.output,t1.internal_name bus_type_m,4 order_flag
from(
select '涂装' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where b.painting_offline_date_report>=q_start_date and b.painting_offline_date_report<=q_end_date  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
) tmp
right join
(
select '涂装' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where b.painting_offline_date_report like concat(substring(q_start_date,1,7),'%' )  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
)t1 on tmp.workshop=t1.workshop
union all
select q_factory factory,'底盘' workshop,tmp.internal_name,tmp.output,t1.internal_name bus_type_m,5 order_flag
from(
select '底盘' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where b.chassis_offline_date_report>=q_start_date and b.chassis_offline_date_report<=q_end_date  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
)tmp
right join
(
select '底盘' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where b.chassis_offline_date_report like concat(substring(q_start_date,1,7),'%' )  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
)t1 on tmp.workshop=t1.workshop
union all
select q_factory factory,'总装' workshop,tmp.internal_name,tmp.output,t1.internal_name bus_type_m,6 order_flag
from(
select '总装' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where b.assembly_offline_date_report>=q_start_date and b.assembly_offline_date_report<=q_end_date  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
)tmp
right join
(
select '总装' workshop,t.internal_name,count(b.id) output
from BMS_PLAN_BUS b
left join BMS_OR_ORDER o on b.order_id=o.id
left join BMS_BASE_BUS_TYPE t on t.id=o.bus_type_id 
where b.assembly_offline_date_report like concat(substring(q_start_date,1,7),'%' )  and b.factory_id=q_factory_id
group by t.internal_name
order by count(b.id) desc limit 1
)t1 on tmp.workshop=t1.workshop
)b
on a.factory=b.factory and a.workshop=b.workshop
;

drop TEMPORARY TABLE IF EXISTS tmp_stad_humans;
create TEMPORARY TABLE tmp_stad_humans as
select h.factory,h.workshop,h.bus_type,h.capacity,concat(h.bus_type,' IE标准人力',h.capacity,'台','(',sum(h.standard_humans),')') bus_cap,sum(h.standard_humans) standard_humans
from BMS_HR_BASE_STANDARD_HUMAN h
where h.type='1' and h.deleted='0' and h.factory=q_factory
group by h.factory,h.workshop,h.bus_type,h.capacity
;

drop TEMPORARY TABLE IF EXISTS tmp_stad_humans_order;
create TEMPORARY TABLE tmp_stad_humans_order as
select h.factory,h.workshop,h.bus_type,h.capacity,concat(h.bus_type,' IE标准人力',h.capacity,'台','(',sum(h.standard_humans),')') bus_cap,sum(h.standard_humans) standard_humans
from BMS_HR_BASE_STANDARD_HUMAN h
where h.type='1' and h.deleted='0' and h.factory=q_factory
group by h.factory,h.workshop,h.bus_type,h.capacity
;

select a.*,h.bus_cap,h.standard_humans,round((a.direct_num_yd+a.short_num_yd)/h.standard_humans*h.capacity) capacity
from tmp_staff_att a
left join tmp_stad_humans h 
on a.factory=h.factory and a.workshop=h.workshop and a.bus_type=h.bus_type 
and h.standard_humans=( select h1.standard_humans from tmp_stad_humans_order h1
where a.factory=h1.factory and a.workshop=h1.workshop and a.bus_type=h1.bus_type 
order by ABS(h1.standard_humans-a.direct_num_yd-short_num_yd) limit 1
) 
order by a.order_flag
;


#select * from tmp_staff_att;


end