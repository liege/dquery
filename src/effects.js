/**
 * @author Administrator
 */
//运动类
function SetMove(obj,x,y,speed)   //对象，x坐标，y坐标，步速（值越大速度越慢）
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
dQuery.fn.extend({
	animate:function(x,y,speed){
		//css3 or js？
		this.each(function(i,o){
			
		});
	}
});
