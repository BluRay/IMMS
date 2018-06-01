
$(document).ready(function(){
	var vin = GetQueryString('vin');
	console.log("-->vin = " + vin);
	
	$.ajax({
		url: "getTestingDateInfo",
		dataType: "json",
		type: "get",
		data: {"vin":vin},
		async: false,
		error: function () {alert(response.message);},
		success: function (response) {
			$("#check_date").html(response.rows[0].check_date);
			$("#check_no").html(response.rows[0].check_no);
			$("#t_1_1").html(response.rows[0].bus_number);
			$("#t_1_2").html(response.rows[0].check_type);
			$("#t_1_3").html(response.rows[0].bus_vehicle_type);
			$("#t_2_1").html(response.rows[0].bus_type);
			$("#t_2_2").html(response.rows[0].vin);
			$("#t_2_3").html(response.rows[0].motor_number);
			$("#t_3_1").html(response.rows[0].fuel_type);
			$("#t_3_2").html(response.rows[0].chassis_model);
			$("#t_3_3").html("两灯");				//前照灯制
			$("#t_4_1").html("");					//引车员
			$("#t_6_1").html(response.rows[0].s1_lft_wgt_val);
			$("#t_6_2").html(response.rows[0].s1_rgt_wgt_val);
			$("#t_6_3").html(response.rows[0].s1_lft_eff_frs_val);					//左MAX
			$("#t_6_4").html(response.rows[0].s1_rgt_eff_frs_val);					//右MAX
			$("#t_6_5").html(response.rows[0].s1_eff_pec_val + "%");
			$("#t_6_6").html(response.rows[0].s1_lft_equ_frs_val);
			$("#t_6_7").html(response.rows[0].s1_rgt_equ_frs_val);
			$("#t_6_8").html(response.rows[0].s1_equ_pec_val + "%");
			$("#t_6_9").html(response.rows[0].s1_lft_lag_pec_val + "%");
			$("#t_6_10").html(response.rows[0].s1_rgt_lag_pec_val + "%");
			$("#t_8_2").html((response.rows[0].s1_eff_pec_val>=60)?"O":"X");
			$("#t_8_4").html((response.rows[0].s1_equ_pec_val<=20)?"O":"X");
			$("#t_8_5").html((response.rows[0].s1_lft_lag_pec_val<=10)?"O":"X");
			$("#t_8_6").html((response.rows[0].s1_rgt_lag_pec_val<=10)?"O":"X");
			$("#t_10_1").html(response.rows[0].s2_lft_wgt_val);
			$("#t_10_2").html(response.rows[0].s2_rgt_wgt_val);
			$("#t_10_3").html(response.rows[0].s2_lft_eff_frs_val);
			$("#t_10_4").html(response.rows[0].s2_rgt_eff_frs_val);
			$("#t_10_5").html(response.rows[0].s2_eff_pec_val + "%");
			$("#t_10_6").html(response.rows[0].s2_lft_equ_frs_val);
			$("#t_10_7").html(response.rows[0].s2_rgt_equ_frs_val);
			$("#t_10_8").html(response.rows[0].s2_equ_pec_val + "%");
			$("#t_10_9").html(response.rows[0].s2_lft_lag_pec_val + "%");
			$("#t_10_10").html(response.rows[0].s2_rgt_lag_pec_val + "%");
			$("#t_12_1").html((response.rows[0].s2_equ_pec_val<=24)?"O":"X");
			$("#t_12_2").html((response.rows[0].s2_lft_lag_pec_val<=20)?"O":"X");
			$("#t_12_3").html((response.rows[0].s2_rgt_lag_pec_val<=20)?"O":"X");
			$("#t_14_1").html(response.rows[0].s2_tot_wgt_val);
			$("#t_14_2").html(response.rows[0].tot_eff_frs_val);
			$("#t_14_3").html(response.rows[0].tot_eff_pec_val + "%");
			$("#t_14_4").html(response.rows[0].park_lft_eff_frs_val);
			$("#t_14_5").html(response.rows[0].park_rgt_eff_frs_val);
			$("#t_14_6").html(response.rows[0].park_eff_pec_val + "%");
			$("#t_16_1").html((response.rows[0].tot_eff_pec_val>=60)?"O":"X");
			$("#t_16_2").html((response.rows[0].park_eff_pec_val>=20)?"O":"X");
			$("#t_17_1").html(response.rows[0].side_slide_val);
			$("#t_17_2").html((parseFloat(response.rows[0].side_slide_val)>=-5&&parseFloat(response.rows[0].side_slide_val)<=5)?"O":"X");
			$("#t_19_1").html("左：" + response.rows[0].lhb_height_val + "<br/>右：" + response.rows[0].rhb_height_val);
			$("#t_19_2").html(response.rows[0].lhb_light_val);
			$("#t_19_3").html(response.rows[0].rhb_light_val);
			$("#t_19_4").html("下" + response.rows[0].lhb_udobs_val + "mm/" + response.rows[0].lhb_udoff_val);
			$("#t_19_5").html("下" + response.rows[0].rhb_udobs_val + "mm/" + response.rows[0].rhb_udoff_val);
			$("#t_19_6").html(response.rows[0].lhb_lroff_val);
			$("#t_19_7").html(response.rows[0].rhb_lroff_val);
			
			$("#t_20_1").html(response.rows[0].lhb_light_std);
			$("#t_20_2").html(response.rows[0].rhb_light_std);
			$("#t_20_3").html((response.rows[0].lhb_udobs_std==null)?"0.8~0.95":response.rows[0].lhb_udobs_std);
			$("#t_20_4").html((response.rows[0].rhb_udobs_std==null)?"0.8~0.95":response.rows[0].rhb_udobs_std);
			$("#t_20_5").html(response.rows[0].lhb_lroff_std);
			$("#t_20_6").html(response.rows[0].rhb_lroff_std);
			
			
			$("#t_21_1").html((response.rows[0].lhb_light_val>=18000)?"O":"X");
			$("#t_21_2").html((response.rows[0].rhb_light_val>=18000)?"O":"X");
			$("#t_21_3").html((response.rows[0].lhb_udoff_jus=="1")?"O":"X");
			$("#t_21_4").html((response.rows[0].rhb_udoff_jus=="1")?"O":"X");
			$("#t_21_5").html((response.rows[0].lhb_lroff_val>=-170&&response.rows[0].lhb_lroff_val<=350)?"O":"X");
			$("#t_21_6").html((response.rows[0].rhb_lroff_val>=-350&&response.rows[0].rhb_lroff_val<=350)?"O":"X");
			
			$("#t_23_1").html("下" + response.rows[0].ldb_udobs_val + "mm/" + response.rows[0].ldb_udoff_val);
			$("#t_23_2").html("下" + response.rows[0].rdb_udobs_val + "mm/" + response.rows[0].rdb_udoff_val);
			$("#t_23_3").html(response.rows[0].ldb_lroff_val);
			$("#t_23_4").html(response.rows[0].rdb_lroff_val);
			
			$("#t_24_1").html((response.rows[0].ldb_udobs_std==null)?"0.6~0.8":response.rows[0].ldb_udobs_std);
			$("#t_24_2").html((response.rows[0].rdb_udobs_std==null)?"0.6~0.8":response.rows[0].rdb_udobs_std);
			$("#t_24_3").html((response.rows[0].ldb_lroff_std==null)?"-170~350":response.rows[0].ldb_lroff_std);
			$("#t_24_4").html((response.rows[0].rdb_lroff_std==null)?"-170~350":response.rows[0].rdb_lroff_std);
			
			$("#t_25_1").html((response.rows[0].ldb_udoff_jus=="1")?"O":"X");
			$("#t_25_2").html((response.rows[0].rdb_udoff_jus=="1")?"O":"X");
			$("#t_25_3").html((response.rows[0].ldb_lroff_val>=-170&&response.rows[0].ldb_lroff_val<=350)?"O":"X");
			$("#t_25_4").html((response.rows[0].rdb_lroff_val>=-170&&response.rows[0].rdb_lroff_val<=350)?"O":"X");
			$("#t_26_1").html(response.rows[0].horn_level);
			$("#t_26_2").html((response.rows[0].horn_level>=90&&response.rows[0].horn_level<=115)?"O":"X");
			$("#t_27_1").html(response.rows[0].speed);
			$("#t_27_2").html((response.rows[0].speed>=32.8&&response.rows[0].speed<=40)?"O":"X");
			$("#t_34_1").html((response.rows[0].is_passed=="合格")?"O":"X");
		}
	});
	
	$("#btnPrint").click(function() {
		$("#btnPrint").hide();
		$("#btnPrint2").hide();
		setTimeout(function() {
			window.print();
		}, 500);
	});
	$("#btnPrint2").click(function() {
		$("#btnPrint").hide();
		$("#btnPrint2").hide();
		setTimeout(function() {
			window.print();
		}, 500);
	});
	window.onafterprint=function(){
		$("#btnPrint").show();
		$("#btnPrint2").show();
	};
	$("#btnClose").click(function() {
		window.opener=null;window.close();
	});
	
	
});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}