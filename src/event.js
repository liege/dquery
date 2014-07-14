//批量添加注册事件方法
//event 扩展
dQuery.fn.extend({
	//事件绑定
	on:function(events,fn){
		this.each(function(i,v){
			eventUtil(v,events,fn,"on");			
		});
	},
	//解除事件绑定,暂时不支持匿名函数移除
	off:function(events,fn){
		this.each(function(i,v){
			eventUtil(v,events,fn,"");			
		});		
	},
	/*
	//click
	click:function(fn){
		this.each(function(i,v){
			v.onclick = fn;
		});
	},
	//dblclick
	dblclick:function(fn){
		this.each(function(i,v){
			v.ondblclick = fn;
		});
	},
	//mouseover
	mouseover:function(fn){
		this.each(function(i,v){
			v.onmouseover = fn;
		});
	},
	//mouseout
	mouseout:function(fn){
		this.each(function(i,v){
			v.onmouseout = fn;
		});
	},
	//mousedown
	mousedown:function(fn){
		this.each(function(i,v){
			v.onmousedown = fn;
		});
	},
	//mouseup
	mouseup:function(fn){
		this.each(function(i,v){
			v.onmouseup = fn;
		});
	},
	//mouseenter
	mouseenter:function(fn){
		this.each(function(i,v){
			v.onmouseenter = fn;
		});
	},
	//mouseleave
	mouseleave:function(fn){
		this.each(function(i,v){
			v.onmouseleave = fn;
		});
	},
	*/
	//toggle 点击切换事件
	toggle:function(){
		_arguments = arguments;
		this.each(function(i,v){
			var count = 0;
			v.onclick = function(){
				_arguments[count++%_arguments.length].call(v);
			};
		});	
		return this;	
	},		
});

dQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
	// 事件注册
	dQuery.fn[ name ] = function(fn) {
		//为dQuery对象里的每一个dom元素注册事件
		this.each(function(i,v){
			v["on"+name] = fn;
		});
	};
});