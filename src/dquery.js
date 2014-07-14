//Date:2014-5-16 
//dQuery JavaScript Library v1.0

//创建私有作用域，避免变量和函数污染全局作用域
(function(window){
	var document = window.document;
	var dQuery = function(selector,context){
		//dquery.fn.init 实际是dquery对象构造函数
		//dQuery.fn.init(selector) 本身的返回值this的原型对象 = dQuery.fn，实现链式调用dQuery.fn对象的其它方法
		return new dQuery.fn.init(selector,context);		
	};
	//匹配ID选择器的正则
	var rId = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
	//匹配tagName选择器的正则
	var rTagName = /^[A-Za-z0-9]+$/;
	dQuery.fn = dQuery.prototype = {
		//重新指定constructor的值，详见高程3 p155
		constructor:dQuery,
		init:function(selector,context){
			//match用来存储正则返回数组，elem存储dom元素
			var match,elem;
			//为dquery原型对象添加一个属性elements用来存储nodeList
			this.elements = [];
			//处理 $()
			if(!selector){
				return this;
			}
			//处理$(function(){})
			if(typeof selector == "function"){
				window.onload = selector;
				return this;
			}
			//处理 $(字符串)
			if(typeof selector == "string"){
				/*
				match = selector.match(rId);
				//处理 $(#id)
				if(rId.test(selector)){
					elem = document.getElementById(match[2]);
					this.length = 1;
					this.elements.push(elem);
				}
				//处理$(tag)
				if(rTagName.test(selector)){
					context = context||document;
					this.elements = context.getElementsByTagName(selector);
					this.length = this.elements.length;
				}
				*/
				//ES5 选择器API
				if(document.querySelectorAll){
					context = context || document;
					this.elements = context.querySelectorAll(selector);
					this.length = this.elements.length;
				}
				//使用dquery对象存储nodelist，类数组
				for(var i=0;i<this.length;i++){
					this[i] = this.elements[i];
				}		
				// return this;		
			}
		},
		//dQuery 对象默认长度
		length:0,
		//返回长度的方法
		size:function(){
			return this.length;
		},
		get:function(num){
			return num == null?
			//如果不传参，返回整个对象数组
			this.toArray() 
			//有参数时获取指定下标节点对象
			:(num<0?this[this.length+num]:this[num]);	
		},
		//遍历
		each:function(fn){   //fn(index,value) 接受一个函数fn作为参数
			for(var i=0;i<this.length;i++){
				//call方法—— 让this[i]对象拥有fn的属性及方法，以show为例，this[i].style.display = "block";
				//后面两个参数为ECMA5 foreach规范，索引，对象
				fn.call(this[i],i,this[i]);   
			}
			return this;
		},
		//设置与获取属性
		attr:function(propertyName,value){
			//set
			if(arguments.length==2){
				this.each(function(i,o){
					o[propertyName] = value;
				});				
			}
			//get
			else{
				//处理 class属性，className
				if(propertyName == "class"){
					return this[0][propertyName+"Name"];
				}
			    return this[0][propertyName];
			}			
			return this;	
		},		
	};
	//自己给自己一拳……重写原型对象，获得dQuery.fn的所有属性和方法
	//init 和 dQuery 共用的同一个原型对象
	dQuery.fn.init.prototype = dQuery.fn;
	//扩展$对象与$的原型对象（简化版，没有进行深拷贝）
	dQuery.extend = dQuery.fn.extend = function(){
	var options, copy, 
		length = arguments.length;
		//target的值指向调用extend函数的对象，将传入对象合并到此对象
		target = this;
		//参数对象有值的时候
		if ((options = arguments[0])!= null){
			//扩展基本对象
			for ( name in options ) {
				//copy = 传入参数的key值
				copy = options[ name ];
				if (copy !== undefined ) {
					//将传入参数的名、值扩展到当前对象
					target[name] = copy;
				}
			}
		}
	};
	//扩展dQuery方法
	dQuery.extend({
		//全局缓存
		cache:{},
		//检测数据类型
		type:function(vArg){
			//安全的类型检测 高程3 p597			
			return Object.prototype.toString.call(vArg).match(/^\[\w*\s(\w+)\]$/)[1];
			/*
			//ECMA5, Array.isArray(), ie9+ ff4+ safari5+ opera10.5+ chrome
			if(Array.isArray(vArg)){
				return "array";
			};
			*/
		},
		//判断是不是函数
		isFunction:function(vArg){
			return dQuery.type(vArg) == "Function";
		},
		//判断是不是数组
		isArray:function(vArg){
			return dQuery.type(vArg) == "Array";
		},		
		//遍历数组与对象
		each:function(vArg,fn){
			// 遍历数组元素
			if(dQuery.type(vArg) == "Array"){
				for(var i=0;i<vArg.length;i++){
					fn.call(vArg[i],i,vArg[i]);
				}
			}
			// 遍历对象名值
			if(dQuery.type(vArg) == "Object"){
				for(var key in vArg){
					fn.call(key,key,vArg[key]);
				}
			}			
		},
		//data 未完成
		data:function(elem,key,value){
			if(argument.length == 1){
				return elem;
			}
		},
		//客服端检测
		client:function(){
			//呈现引擎
			var engine = {
				ie:0,
				gecko:0,
				webkit:0,
				khtml:0,
				opera:0,
				//完整版本号
				ver:null
			};
			//浏览器
			var browser = {
				ie:0,
				firefox:0,
				safari:0,
				konq:0,
				opera:0,
				chrome:0,
				//具体的版本号
				ver:null
			};
			var ua = navigator.userAgent;
			//opera是个无耻伪装者，别妄想检测它的用户代理字符串
			if(window.opera){
				engine.ver = browser.ver = window.opera.version();
				engine.opera = browser.oprea = parseFloat(engine.ver);
			}
			//chrome or safari
			else if(/AppleWebKit\/(\S+)/.test(ua)){
				engine.ver = RegExp["$1"];
				engine.webkit = parseFloat(engine.ver);
				//判断chrome还是safari
				if(/Chrome\/(\S+)/.test(ua)){
					browser.ver = RegExp["$1"];
					browser.chrome = parseFloat(browser.ver);
				}else if(/Version\/(\S+)/.test(ua)){
					browser.ver = RegExp["$1"];
					browser.safari = parseFloat(browser.ver);
				}else{
					//近似的确定版本号
					var safariVersion = 1;
					if(engine.webkit<100){
						safariVersion = 1;
					}
					else if(engine.webkit<312){
						safariVersion = 1.2;
					}
					else if(engine.webkit<412){
						safariVersion = 1.3;
					}
					else{
						safariVersion = 2;
					}
					browser.safari = browser.ver = safariVersion;
				}
			}
			//khtml konq 只能linux下使用
			else if(/KHTML\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){
				engine.ver = browser.ver = RegExp["$1"];
				engine.khtml = browser.konq = parseFloat(engine.ver);
			}
			//gecko firefox
			else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
				engine.ver = RegExp["$1"];
				engine.gecko = parseFloat(engine.ver);
				
				//确定是不是firefox
				if(/Firefox\/(\S+)/.test(ua)){
					browser.ver = RegExp["$1"];
					browser.firefox = parseFloat(browser.ver);
				}
			}
			//ms ie
			else if(/MSIE ([^;]+)/.test(ua)){
				engine.ver = browser.ver =  RegExp["$1"];
				engine.ie = browser.ie = parseFloat(engine.ver);
			}
			
			//检测浏览器
			browser.ie = engine.ie;
			browser.opera = engine.opera;
			
			
			return {
				engine:engine,
				browser:browser
				};
		},
		
		
	});

	//一些内部函数
	//事件绑定与解绑
	function eventUtil(elem,events,fn,on){
		var handler = fn;
		//绑定
		if(on){
			if(document.attachEvent){
				//IE
		    	elem.attachEvent("on"+events,function(){
		    		//ie this 指向
		    		handler.call(elem);
		    	});
			}else if(elem.addEventListener){
				//dom 2 为了保持兼容一致，设置为在冒泡阶段触发事件
				elem.addEventListener(events,handler,false);
			}else{
				// DOM 0
				elem["on"+ events] = handler;
			}	
		}
		//移除绑定
		else{
			if(document.detachEvent){
				//IE
		    	elem.detachEvent("on"+events,function(){
		    		handler.call(elem);
		    	});
			}else if(elem.addEventListener){
				// DOM 2 为了保持兼容一致，设置为在冒泡阶段触发事件
				elem.removeEventListener(events,handler,false);
			}else{
				// DOM 0
				elem["on"+ events] = null;
			}			
		}		
	}

	

	
	//将dQuery暴露在全局
	window.dQuery = window.$ = dQuery;
})(window);

