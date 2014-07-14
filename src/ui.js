/**
 * @author Administrator
 */
function Tabs(tab,cont,events,active){	 
	for(var i=0;i<tab.length;i++){
		//存储用户原始class
		tab[i].oldClass = tab[i].className;
		cont[i].oldClass = cont[i].className;

		tab[i].index = i;		//给每一个tabs（li标签）添加一个序号           
    	tab[i]["on"+events] = function(){
		   for(var i=0;i<tab.length;i++){
		       tab[i].className = tab[i].oldClass;                     //把所有的li的class设为空 
		       cont[i].className = cont[i].oldClass;               //把所有的div盒子隐藏起
		   }
	    cont[this.index].className = "current "+cont[this.index].oldClass;    //当前的div盒子设置为显示
	    tab[this.index].className = "current "+tab[this.index].oldClass;     //当前鼠标所在对象的li的class设置current		       	
	    };	
    }
    //设置默认选中
	tab[active].className = cont[active].className = "current";
};

//$("父元素").tabs(事件类型[string]，默认选中[number]，自动切换[boolean)
dQuery.fn.extend({
	tabs:function(events,active,auto){
		var ev = events || "click",
			active = active || 0,
			auto = auto,
			tab = this.find("li"),	
			cont = this.find("div");	
		new Tabs(tab,cont,ev,active);	
	}
});
//drag
var minZindex = 1;
function Drag(obj){
	obj.onmousedown = function(e){
		 obj.style.zIndex = minZindex++;
	     var oEvent = e||event;
		 var distX = oEvent.clientX - obj.offsetLeft;   //鼠标点击位置距屏幕左边的位置减去元素原点距屏幕左边的距离 => 点击位置距元素原点的距离
		 var distY = oEvent.clientY - obj.offsetTop;
		 document.onmousemove = function(e){
			 var oEvent = e||event;
		     obj.style.left = oEvent.clientX - distX + "px";    //元素真实坐标为鼠标屏幕点击位置减去在元素中点击位置与元素原点的距离
		     obj.style.top = oEvent.clientY - distY + "px";
		 };
		 document.onmouseup = function(){
		     document.onmouseup = null;
		     document.onmousemove = null;
		     if(boomerang){
				 setMove(obj,aPos[obj.index].left,aPos[obj.index].top,20);
			 }
		 };
		 e.preventDefault();
		 return false;
	};		
}
//$("要操作的dquery对象").drag(boomerang[boolean]释放后是否返回初始位置，destination[object]释放后到指定坐标)
dQuery.fn.extend({
	drag:function(boomerang,destination){
		boomerang = boomerang || false;
		destination = destination || {};
		this.each(function(i,v){
			new Drag(v,boomerang,destination);
		});
	}
});
//draglist
function Draglist(context,elems){
	var oUl = context || document.getElementById("wraplist");
	var aLi = elems || oUl.getElementsByTagName("li");
	var aPos = [];
	var minZindex = 1;
	var oNear = null;
	//布局转换			
	for(var i= 0;i<aLi.length;i++){
		aPos[i] = {left:aLi[i].offsetLeft, top:aLi[i].offsetTop};
		//alert(aPos);
	}
	for(var i = 0;i<aLi.length;i++){
		aLi[i].style.position = "absolute";
		aLi[i].style.left = aPos[i].left + "px";
		aLi[i].style.top = aPos[i].top + "px";
		aLi[i].index = i;
	}
	//拖拽
	for(var i=0;i<aLi.length;i++){
	    setDrag(aLi[i]);
	}
	function setDrag(obj){
		obj.onmousedown = function(e){
		     var oEvent = e||event;
			 var distX = oEvent.clientX - obj.offsetLeft;   //鼠标点击位置距屏幕左边的位置减去元素原点距屏幕左边的距离 => 点击位置距元素原点的距离
			 var distY = oEvent.clientY - obj.offsetTop;
			 var self = this;
			 obj.style.zIndex = minZindex++;
			 document.onmousemove = function(e){
				 var oEvent = e||event;
			     obj.style.left = oEvent.clientX - distX + "px";    //元素真实坐标为鼠标屏幕点击位置减去在元素中点击位置与元素原点的距离
			     obj.style.top = oEvent.clientY - distY + "px";
				 
                 for(var i= 0;i<aLi.length;i++)    //清空所有边框
				 {
					 aLi[i].className = "";
				 }
				 oNear = findNearest(obj);
				 if(oNear){
                   	 oNear.className = "current";
					 			  
				 };
			 };
			 document.onmouseup = function(){
			     document.onmouseup = null;
			     document.onmousemove = null;
			     var oNear = findNearest(obj);

				 if(oNear){
				 	oNear.className = "";
				    oNear.style.zIndex = minZindex++;   //防止图片后穿
				    obj.style.zIndex = minZindex++;   //防止图片后穿						 	
				 	//console.log(aPos[obj.index].left+"+"+aPos[obj.index].top)
				 	setMove(oNear,aPos[obj.index].left,aPos[obj.index].top,20);
				 	setMove(obj,aPos[oNear.index].left,aPos[oNear.index].top,20);
				 	var consign = obj.index;
				 	obj.index = oNear.index;
				 	oNear.index = consign;
					//console.log(oNear.j+"--"+obj.j)
				 }else{
				 	setMove(obj,aPos[obj.index].left,aPos[obj.index].top,20);
				 }
			 };
			 e.preventDefault();
			 return false;
		};
	}
	//碰撞检测
	function cdTest(obj1,obj2){
		var l1 = obj1.offsetLeft;
		var r1 = obj1.offsetLeft + obj1.offsetWidth;
		var t1 = obj1.offsetTop;
		var b1 = obj1.offsetTop+ obj1.offsetHeight;
		var l2 = obj2.offsetLeft;
		var r2 = obj2.offsetLeft + obj2.offsetWidth;
		var t2 = obj2.offsetTop;
		var b2 = obj2.offsetTop+ obj2.offsetHeight;				
		if(r1<l2 || l1>r2 || t1>b2 || b1<t2){
			return false;
		}else{
			return true;
		}
	}
	//得到距离
	function getDis(obj1,obj2){
	     var a = obj1.offsetTop - obj2.offsetTop;
		 var b = obj1.offsetLeft - obj2.offsetLeft;	
		 
		 return Math.sqrt(a*a+b*b);
	}
	//计算最近的
	function findNearest(obj){
		var iMin = 99999999999;
		var iMinIndex = -1;
		for(var i= 0;i<aLi.length;i++)
		{
			if(obj == aLi[i]) continue;
			if(cdTest(obj,aLi[i]))
			{
			    var dis = getDis(obj,aLi[i]);
				if(iMin > dis)
				{
					iMin = dis;
					iMinIndex = i;
				}	
			}
		}
		if(iMinIndex == -1)
		{
		    return null;	
		}
		else
		{
		    return aLi[iMinIndex];
		}
	}
	//运动类
	function setMove(obj,x,y,speed)   //对象，x坐标，y坐标，步速（值越大速度越慢）
	{
		//计算出移动距离 把运动距离分成等份
		var	disXM = Math.round(Math.abs(x - obj.offsetLeft)%speed);
		var	disYM = Math.round(Math.abs(y - obj.offsetTop)%speed);	
		var	disX = Math.abs(x - obj.offsetLeft-disXM)/speed;  
		var disY = Math.abs(y - obj.offsetTop-disYM)/speed;
		var startX = obj.offsetLeft,startY = obj.offsetTop;
		//定义一个变量计算调用定时器次数
		var i=0;		
		var timer = null;		
		timer = setInterval(function(){
			i++;
			if(startX > x){					//如果要运动原始位置的左边
				obj.style.left = startX - disX*i +disXM+"px";
			}else
			{
			    obj.style.left = startX + disX*i +disXM+"px";
			}
			if(startY > y){					//如果要运动原始位置的上边
				obj.style.top = startY - disY*i +disYM+"px";
			}else
			{
			    obj.style.top = startY + disY*i +disYM+"px";
			}
			if(i>=speed)
			{
				clearInterval(timer);				
			}				
		},1000/60);	
	}		
}
//$("父元素").draglist()
dQuery.fn.extend({
	draglist:function(){	
		new Draglist(this[0],this.find("li"));	
	}
});

//上下左右居中
function Center(elem){
	var h = elem.offsetHeight;
	var w = elem.offsetWidth;
	var body = document.documentElement || document.body;
	var scorllTop = body.scrollTop ;
	var scorllLeft = body.scrollLeft ;
	var pageWidth = window.innerWidth;
	var pageHeight = window.innerHeight;
	if(typeof pageWidth != "number"){
			pageWidth = body.clientWidth;
			pageHeight =body.clientHeight;
	}
	elem.style.position = "absolute";
	elem.style.left = (pageWidth-w)/2 + "px";
	elem.style.top = (pageHeight-h)/2 + "px";
	document.title = pageWidth+"---"+pageHeight;
}

