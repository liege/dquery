/**
 * @author Administrator
 */
//检测浏览器对css属性的支持
function supports(name){
	var elem = document.createElement("div");
	if(name in elem.style){
		return true;
	}else{
		return false;
	}
}
//修复css名
function amendCss(name){
	var re = /\-(.)/,
		css3NameList = "background-size background-clip linear-gradient transform animation border-radius ",
		browser = dQuery.client().browser,
		ver = dQuery.client().browser.ver;		
	//如果浏览器支持name，直接使用	
	if(supports(name)){
		return name;
	}	
	//如果name带连字符,且不属于css3 如 background-image 则返回 backgroundImage	
	if(re.test(name)){
		var nowName = (function(str){		
						return str.replace(re,
							(function(r){				
								return r.toLocaleUpperCase();
							})(re.exec(str)[1]));	
					  })(name);
		//如果浏览器支持去掉连字符的name
		if(supports(nowName)){
			return nowName;
		}
	}		
	//如果去掉连字符浏览器还是不支持，则判断为需要添加前缀的css3属性
	else{
		if(browser.chrome){
			name = "-webkit-" + name;
			alert(name)
		}else if(browser.ie){
			name = "-ms-" + name;
			alert(name)
		}else if(browser.firefox){
			name = "-moz-" + name;
			alert(name)
		}else if(browser.operaW){
			name = "-o-" + name;
		}
	}			
	return name;
}
//获取计算样式
function getCss(elem,propertyName){
	if(elem.currentStyle){
		//IE
	    return elem.currentStyle[propertyName];
	}else{
		//DOM2 级样式
		return document.defaultView.getComputedStyle(elem,null)[propertyName];
	}		
};
//显示隐藏切换
function showHide(elem,show){
	//第一次调用show或者hide时，存储原始display值
	if(!elem.originalDisplay){
		elem.originalDisplay = getCss(elem,"display");
	}
	if(show){
		//如果原始值为none;设置该元素以块级显示
		if(elem.originalDisplay == "none"){    
			elem.style.display = "block";
		}
		//如果原始值不为none;设置该元素以原始值显示
		else{
			elem.style.display = elem.originalDisplay;
		}	
	}else{		
		elem.style.display = "none";
	}
};
//扩展dQuery对象方法 css相关
dQuery.fn.extend({
	//css style 设置与获取
	css:function(propertyName,value){
		//set
		if(arguments.length==2){
			propertyName = amendCss(propertyName);
			this.each(function(i,o){
				o.style[propertyName] = value;
			});				
		}
		//get
		else{
			return getCss(this[0],propertyName);
		}
		return this;
	},
	//dom style 宽度
	w:function(value){
		//set
		if(value){
			this.each(function(i,v){
				v.style.width = value;
			});
		}
		//get
		else{
			return getCss(this[0],"width");
		}
		return this;
	},
	//dom style 高度
	h:function(value){
		//set
		if(value){
			this.each(function(i,v){
				v.style.height = value;
			});
		}
		//get
		else{
			return getCss(this[0],"height");
		}
		return this;
	},
	//get dom style 宽度+左右padding
	innerW:function(){
		return parseInt(this.css("width"))+parseInt(this.css("paddingLeft"))+parseInt(this.css("paddingRight"));
	},
	//get dom style 高度+上下padding
	innerH:function(){
		return parseInt(this.css("height"))+parseInt(this.css("paddingTop"))+parseInt(this.css("paddingBottom"));
	},
	//get dom style 宽度+左右padding+左右border ？+ 左右margin
	outerW:function(includeMargin){
		return includeMargin?this[0].offsetWidth+parseInt(this.css("marginLeft"))+parseInt(this.css("marginRight")):this[0].offsetWidth;
	},
	//get dom style 高度+上下padding+上下border ？+ 上下margin
	outerH:function(includeMargin){
		return includeMargin?this[0].offsetHeight+parseInt(this.css("marginTop"))+parseInt(this.css("marginBottom")):this[0].offsetHeight;
	},		
	//set font color
	color:function(value){
		return this.css("color",value);
	},	
});	
// dom 展示效果扩展
dQuery.fn.extend({
	//显示	
	show:function(){
		this.each(function(i,v){
			showHide(v,true);
		});
	},	
	//隐藏
	hide:function(){
		this.each(function(i,v){
			showHide(v,false);
		});
	},	
});
//改变元素背景图
dQuery.fn.extend({
	bg:function(value){
		//set
		if(value){
			this.each(function(i,v){
				v.style.background = value;
			});
		}
		//get
		else{
			return getCss(this[0],"background");
		}
		return this;
	},
});
//固定定位兼容-***未完成
dQuery.fn.extend({
	fixed:function(){
		if(dQuery.client().browser.ie <= 6 && dQuery.client().browser.ie){
			this.each(function(i,o){
				o.style.position = "absolute";
				o.style.top = "expression(documentElement.scrollTop+(documentElement.clientHeight-this.offsetHeight)/2)";
			});
		}else{
			this.each(function(i,o){
				o.style.position = "fixed";
			});	
		}
	}
});