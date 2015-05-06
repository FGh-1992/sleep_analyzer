/*
	Jalendar Lite 1.0
	by Seyyed Reza Hosseyni Nezhad
	contact hosseyni.nezhad@yahoo.com
*/

var config={
	weekdays:["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه"],
	weekdaysshort:["ش","ی","د","س","چ","پ","ج"],
	months: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
};

$("#jalendar").html("<div id=\"head\"></div><table id=\"body\"></table>");
showHeader();
current=today();
showTable(current);

// Events -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

$("#jalendar #today").click(function(e){
	e.preventDefault();	
	if(notToday){
		current=today();
		showTable(current);
	}
	$("#jalendar #body .todayCell").fadeOut("fast",function(){
		$(this).fadeIn("fast",function(){
			$(this).fadeOut("fast",function(){
				$(this).fadeIn("fast");
			});
		});
	});
});

$("#jalendar #next").click(function(e){
	e.preventDefault();
	current=nextMonth(current);
	showTable(current);
});

$("#jalendar #prev").click(function(e){
	e.preventDefault();
	current=prevMonth(current);
	showTable(current);
});

$(window).resize(function(){
	resizeTable();
});

// functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function showHeader(){
	$jalendarhead=$("#jalendar #head");
	$jalendarhead.append("<a class=\"button\" id=\"next\" href=\"#\"><i class=\"icon-angle-left\"></i></a>");
	$jalendarhead.append("<a class=\"button\" id=\"today\" href=\"#\"><i class=\"icon-map-marker\"></i></a>");
	$jalendarhead.append("<a class=\"button\" id=\"prev\" href=\"#\"><i class=\"icon-angle-right\"></i></a>");
	$jalendarhead.append("<div id=\"title\"></div>");
}

function showTable(j){
	createTable(j);
	markToday();
	resizeTable();
}

function createTable(j){
	j=new jate(j.year(),j.month(),1);
	var day=j.day();
	$("#jalendar #head #title").html(config.months[j.month()]+" "+j.year());
	var table="";
	table+="<thead><tr>";
	for(i=0;i<7;i++)
		table+="<th></th>";
	table+="</tr></thead>";
	table+="<tbody>";
	var n=0;	
	for(k=0;k<6;k++){
		if(k<5){
			table+="<tr>";
			for(i=0;i<7;i++){
				table+="<td";
				if(k>0 || i>=day ){
					n++;
				}
				if(i==6)
					table+=" class=\"lastCell\"";
				if(isJate(j.year(),j.month(),n)){
					j=new jate(j.year(),j.month(),n);

					table+=" id=\""+j2s(j)+"\"";
					table+=">";
					table+="<a href='../../sleeps'>"
					table+=n;
					table+="</a>"
				}
				else{
					table+=">";
				}
				table+="</td>";
			}
			table+="</tr>";
		}
		else{
			table+="</tbody>";
			$("#jalendar #body").html(table);
			for(i=0;i<7;i++){
				n++;
				if(isJate(j.year(),j.month(),n)){
					j=new jate(j.year(),j.month(),n);
					$("#jalendar #body tbody tr:first-child() td:nth-child("+(i+1)+")").attr("id",j2s(j)).html(n);
				}
			}
		}
	}
}

function resizeTable(){
	$("#jalendar #body td").each(function(index,cell){
		cell=$(cell);
		cell.height(cell.width());
	});
	if($("#jalendar").width()<500){
		$("#jalendar #body th").each(function(index,hcell){
			$(hcell).html(config.weekdaysshort[index]);
		});
	}else{
		$("#jalendar #body th").each(function(index,hcell){
			$(hcell).html(config.weekdays[index]);
		});
	}
}

function markToday(){
	notToday=true;
	$("#jalendar #body #"+j2s(today())).each(function(index,cell){	
		cell=$(cell);
		cell.css("background-color","#EEEEEE");				
		cell.addClass("todayCell");
		notToday=false;
	});
}

// jate functions -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function jate(p1,p2,p3){
	var _year=p1;
	var _month=p2;
	var _date=p3;
	this.year=year;
	this.month=month;
	this.date=date;
	this.day=day;
	function year(){
		return _year;
	}
	function month(){
		return _month;
	}
	function date(){
		return _date;
	}
	function day(){
		g=j2g(this);
		return (g.getDay()+1)%7;
	}
}

function today(){
	var g=new Date();
	return g2j(g);
}

function j2g(j){
	var g_days_in_month= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var j_days_in_month= [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
	var jy = j.year()-979;
	var jm = j.month();
	var jd = j.date()-1;
	var j_day_no = 365*jy + parseInt(jy / 33)*8 + parseInt((jy%33+3) / 4);
	for (var i=0; i < jm; ++i) j_day_no += j_days_in_month[i];
	j_day_no += jd;
	var g_day_no = j_day_no+79;
	var gy = 1600 + 400 * parseInt(g_day_no / 146097);
	g_day_no = g_day_no % 146097;
	var leap = true;
	if (g_day_no >= 36525)
	{
		g_day_no--;
		gy += 100*parseInt(g_day_no/  36524);
		g_day_no = g_day_no % 36524;
		if (g_day_no >= 365)
			g_day_no++;
		else
			leap = false;
	}
	gy += 4*parseInt(g_day_no/ 1461);
	g_day_no %= 1461;
	if (g_day_no >= 366) {
		leap = false;
		g_day_no--;
		gy += parseInt(g_day_no/ 365);
		g_day_no = g_day_no % 365;
	}
	for (var i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap); i++)
		g_day_no -= g_days_in_month[i] + (i == 1 && leap);
	var gm = i+1;
	var gd = g_day_no+1;
	return new Date(gy, gm-1, gd);
}

function g2j(g){
    g_days_in_month= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	j_days_in_month= [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    var gy = g.getFullYear()-1600;
    var gm = g.getMonth();
    var gd = g.getDate()-1;
    var g_day_no = 365*gy+parseInt((gy+3) / 4)-parseInt((gy+99)/100)+parseInt((gy+399)/400);
    for (var i=0; i < gm; ++i)
    g_day_no += g_days_in_month[i];
    if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
    ++g_day_no;
    g_day_no += gd;
    var j_day_no = g_day_no-79;
    var j_np = parseInt(j_day_no/ 12053);
    j_day_no %= 12053;
    var jy = 979+33*j_np+4*parseInt(j_day_no/1461);
    j_day_no %= 1461;
    if (j_day_no >= 366) {
        jy += parseInt((j_day_no-1)/ 365);
        j_day_no = (j_day_no-1)%365;
    }
    for (var i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
        j_day_no -= j_days_in_month[i];
    }
    var jm = i+1;
    var jd = j_day_no+1;
    return new jate(jy, jm-1, jd);
}

function isLeap(y){
	var g_days_in_month= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var j_days_in_month= [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
	var jy = y-979;
	var jm = 0;
	var jd = 0;
	var j_day_no = 365*jy + parseInt(jy / 33)*8 + parseInt((jy%33+3) / 4);
	for (var i=0; i < jm; ++i) j_day_no += j_days_in_month[i];
	j_day_no += jd;
	var g_day_no = j_day_no+79;
	var gy = 1600 + 400 * parseInt(g_day_no / 146097);
	g_day_no = g_day_no % 146097;
	var leap = true;
	if (g_day_no >= 36525)
	{
		g_day_no--;
		gy += 100*parseInt(g_day_no/  36524);
		g_day_no = g_day_no % 36524;
		if (g_day_no >= 365)
			g_day_no++;
		else
			leap = false;
	}
	gy += 4*parseInt(g_day_no/ 1461);
	g_day_no %= 1461;
	if (g_day_no >= 366) {
		leap = false;
		g_day_no--;
		gy += parseInt(g_day_no/ 365);
		g_day_no = g_day_no % 365;
	}
	return leap;
}

function isJate(y,m,d){
	var is=true;
	if(d<1 || d>31 || m<0 || m>11)
		is=false;
	else if(m>5 && d>30)
		is=false;
	else if(m==11 && !isLeap(y) && d>29)
		is=false;
	return is;
}

function s2j(s){
	p=s.split("-");
	return new jate(p[0],p[1],p[2]);
}

function j2s(j){
	return j.year()+"-"+j.month()+"-"+j.date();
}

function nextMonth(j){
	var m=j.month()+1;
	var y=j.year();
	if(m==12){
		m=0;
		y=y+1;
	}
	return new jate(y,m,j.date());
}

function prevMonth(j){
	var m=j.month()-1;
	var y=j.year();
	if(m==-1){
		m=11;
		y=y-1;
	}
	return new jate(y,m,j.date());
}